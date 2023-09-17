'use client'
import React, { createContext, useCallback, useState, useEffect, useRef } from 'react';
import { useChat, axiosPost, baseUrl, axiosGet } from '@/services/backend';
import { User } from './authContext';

export interface Chat {
  id: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface errorType {
  error: boolean
  MessageType: string
}

export interface MessageType {
    senderId: string
    text: string
    id: string,
    createdAt: string
    updatedAt: string
    __v: number
}

export interface ChatContextType {
  userChats: any
  isChatLoading: boolean
  chatError: errorType
  publicChats: Array<User>
  currentChat: Chat
  updateCurrentChat: (chat: Chat) => void;
  createChat: (firstId: string, secondId: string) => void;
  isMessagesLoading: boolean
  messagesError: errorType
  messages: MessageType[]
}

// Create a context for chat-related data
export const ChatContext = createContext({});

export const ChatContextProvider = ({ children, user }: {
  children: React.ReactNode, user: User | null
}) => {
  // State for user chats, chat loading status, chat errors, and public chats
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [publicChats, setPublicChats] = useState([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendMessageError, setSendMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  console.log("MessageType", messages);
  console.log("MessageType loading", isMessagesLoading);
  console.log("MessageType error", messagesError);

  // Get persisted user data from local storage when the component mounts
  useEffect(() => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) {
      user = JSON.parse(persistedUser);
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

  const sendMessage = useCallback(async ({ 
    message,
    sender,
    currentChatId,
    setMessage
  } : {
    message: string,
    sender: User,
    currentChatId: string,
    setMessage: (message: string) => void;
  }) => {
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
      publicChats,
      currentChat,
      isChatLoading,
      messagesError,
      updateCurrentChat,
      isMessagesLoading,
    }}>
      {children}
    </ChatContext.Provider>
  );
}