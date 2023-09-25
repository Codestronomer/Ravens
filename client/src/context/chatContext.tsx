'use client'
import React, { createContext, useCallback, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from './authContext';
import { axiosPost, baseUrl, axiosGet } from '@/services/backend';
import {
  Chat,
  errorType,
  MessageType,
  ChatContextType,
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
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendMessageError, setSendMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  // web socket state
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  console.log("online", onlineUsers);

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, [user]);

  useEffect(() => {
    if (socket == null) return;
    socket?.emit('addNewUser', user?.id);
    socket.on('getOnlineUsers', (res) => {
      setOnlineUsers(res);
    })
  }, [socket, user]);

  console.log("MessageType", messages);
  console.log("MessageType loading", isMessagesLoading);
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
      updateCurrentChat,
      isMessagesLoading,
    }}>
      {children}
    </ChatContext.Provider>
  );
}