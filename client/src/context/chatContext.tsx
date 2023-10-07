'use client'
import React, { createContext, useCallback, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from './authContext';
import { axiosPost, baseUrl, axiosGet } from '@/services/backend';
import {
  Chat,
  errorType,
  MessageType,
  NotificationType,
  ClientToServerEvents,
  ServerToClientEvents,
} from '.';


// Create a context for chat-related data
export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }: {
  children: React.ReactNode, user: User | null
}) => {
  // State for user chats, chat loading status, chat errors, and public chats

  // user state
  const [user, setUser] = useState<User | null>(null);

  // chat states
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [publicChats, setPublicChats] = useState<User[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chatError, setChatError] = useState<errorType | null>(null);

  // messages states
  const [messagesError, setMessagesError] = useState(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sendMessageError, setSendMessageError] = useState(null);
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState<MessageType>({
    id: '',
    text: '',
    chatId: '',
    senderId: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });

  // web socket states
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  console.log("notifications", notifications);

  console.log("online", onlineUsers);

  // create connection to web socket
  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, [user]);

  // add user to the socket
  useEffect(() => {
    if (!user || !socket) return;
    
    socket?.emit('addNewUser', user?.id);

    socket.on('getOnlineUsers', (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket, user]);

  // send Message
  useEffect(() => {
    if (socket == null) return;

    // Ensure that both the user and currentChat are available
    if (user && currentChat) {
      console.log("user", user);
      // Filter out the user's own member object from currentChat.members
      const recipientUser = currentChat.members.find((member) => member._id !== user.id);

      console.log("recipient", recipientUser);

      if (recipientUser) {
        socket.emit('sendMessage', { ...newMessage, recipientId: recipientUser._id });
      }
    };
  }, [newMessage, user, currentChat]);

  // recieve message and notification
  useEffect(() => {
    if (socket == null) return;

    socket.on('getMessage', (response: MessageType) => {
      if (currentChat?.id != response.chatId) return;

      setMessages((prev) => [...prev, response]);
    });

    socket.on('getNotification', (response) => {
      // check if the new notification is from an opened Chat.
      const isChatOpen = currentChat?.members.some((member) => response.senderId === member._id);

      if (response && response.senderId) {
        if (isChatOpen) {
          setNotifications((prev: NotificationType[]) => {
            // Mark all previous notifications of the currentChat as read
            const updatedPrevNotification = prev.map((notification: NotificationType) => { 
              if (currentChat?.members.some((member) => notification.senderId === member._id)) {
                return {...notification, isRead: true };
              }
              return notification;
            });

            // Add the new notification with isRead set to True
            return [{...response, isRead: true}, ...updatedPrevNotification]
          });
        } else {
          // for a closed chat, add the new notification
          setNotifications((prev) => [response, ...prev]);
        }
      }
    })

    return () => {
      socket.off('getMessage');
      socket.off('getNotification');
    };

  }, [currentChat, socket]);

  console.log("MessageType error", messagesError);

  // Get persisted user data from local storage when the component mounts
  useEffect(() => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) {
      setUser(JSON.parse(persistedUser));
    }
  }, []);

  // Get user chats when the component mounts and the user is available
  useEffect(() => {
    const getUserChats = async () => {
      if (user?.id) {
        setIsChatLoading(true);
        setChatError(null);
        const response = await axiosGet(`${baseUrl}/chat/${user?.id}`);
        console.log("response", response);

        setIsChatLoading(false);
        if (response.error) {
            return setChatError(response);
        }

        setUserChats(response);
      }
    }
    getUserChats();
  }, [user]);

  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        setMessagesLoading(true);
        setMessagesError(null);

        const response = await axiosGet(`${baseUrl}/messages/${currentChat?.id}`);
        setMessagesLoading(false);

        if (response.error) {
          return setMessagesError(response);
        }

        setMessages(response);
      }

      getMessages();
    }
  }, [currentChat]);

  // Get public chats when the component mounts
  useEffect(() => {
    const getPublicChats = async () => {
      const response = await axiosGet(`${baseUrl}/users/`);

      if (response.error) {
        return console.log('Error fetching users', response);
      }
      // Filter public chats based on user and existing user chats
      const publicChatsResponse = response.filter((chatUser: User) => {
        if (user?.id === chatUser.id) return false;

        if (userChats) {
          return !userChats.some((chat: Chat) => {
            return chat.members[0].id === chatUser.id || chat.members[1].id === chatUser.id;
          });
        }

        return true;
      });

      setPublicChats(publicChatsResponse);
    }

    getPublicChats();
  }, [user, userChats]);


  const updateCurrentChat = useCallback((chat: Chat) => {
    setCurrentChat(chat)
  }, []);
  


  const createChat = useCallback(async (firstId: string, secondId: string) => {
    const response = await axiosPost(`${baseUrl}/chat/`, { firstId, secondId });

    if (response.error) {
      return setChatError(response);
    }

    setUserChats((prev) => [...prev, response]);
  }, [])

  const sendMessage = useCallback(async (
    message: string,
    sender: User,
    currentChatId: string,
    setMessage: (message: string) => void
  ) => {
    if (!message) return console.log("You must type something...")

    const response = await axiosPost(`${baseUrl}/messages/`, {
      text: message,
      chatId: currentChatId,
      senderId: sender?.id
    });

    if (response.error) {
      return setSendMessageError(response);
    }

    setNewMessage(response);
    setMessages((prev) => [...prev, response ]);
    setMessage("");

  }, []);

  const markAllNotificationsAsRead = useCallback((notifications: NotificationType[]) => {
    const modifiedNotifications = notifications.map((notification: NotificationType) => {
      return { ...notification, isRead: true }
    });

    setNotifications(modifiedNotifications);
  }, []);

  const markNotificationAsRead = useCallback((
    user: User,
    userChats: Chat[],
    notification: NotificationType,
    notifications: NotificationType[],
  ) => {
    // find the chat for the notification
    const desiredChat = userChats?.find((chat) => {
      const chatMembers = [notification.senderId, user.id];
      const isMatch = chat?.members.every((member) => chatMembers.includes(member?._id));
      return isMatch;
    });

    // if desired Chat is found, mark notification as read and update the conversation window.
    if (desiredChat) {
      const mNotifications = notifications.map((el) => {
        if (notification.senderId == el.senderId) {
          return {...notification, isRead: true};
        } else {
          return el
        }
      });

      updateCurrentChat(desiredChat);
      setNotifications(mNotifications);
    }
  }, []);

  const markUserNotificationsAsRead = useCallback(
    (notifications: NotificationType[], userNotifications: NotificationType[]) => {
      
      const modifiedNotifications = notifications.map((notification: NotificationType) => {

        // Find the corresponding userNotification
        const userNotification = userNotifications.find(
          (userNotifn) => (userNotifn.senderId == notification.senderId)
        );

        // If userNotification is found, mark it as read, otherwise use the original notification
        const modifiedNotification = userNotification
          ? {...userNotification, isRead: true }
          : notification;
        
        return modifiedNotification;
      });

      // update notification state
      setNotifications(modifiedNotifications);
  }, []);

  // Provide chat related data through the context
  return (
    <ChatContext.Provider value = {{
      messages,
      userChats,
      chatError,
      createChat,
      onlineUsers,
      publicChats,
      currentChat,
      sendMessage,
      messagesError,
      isChatLoading,
      notifications,
      updateCurrentChat,
      isMessagesLoading,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      markUserNotificationsAsRead,
    }}>
      {children}
    </ChatContext.Provider>
  );
}