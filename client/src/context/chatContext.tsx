'use client'
import React, { createContext, useCallback, useState, useEffect } from 'react';
import { useChat, axiosPost, baseUrl, axiosGet } from '@/services/backend';
import { User } from './authContext';
import { ChatType } from '@/app/chat/chatList';

interface Chat {
  _id: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ChatContextType {
  userChats: any
  isChatLoading: boolean
  chatError: boolean
  publicChats: Array<Chat>
}

// Create a context for chat-related data
export const ChatContext = createContext({});

export const ChatContextProvider = ({ children, user }: {
  children: React.ReactNode, user: User | null
}) => {
  // State for user chats, chat loading status, chat errors, and public chats
  const [userChats, setUserChats] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [publicChats, setPublicChats] = useState([]);

  // If the user is not provided, try to retrieve it from local storage
  if (!user) {
    const userString = localStorage.getItem('user');
    if (userString) {
      user = JSON.parse(userString);
    }
  }

  // Get public chats when the component mounts
  useEffect(() => {
    const getPublicChats = async () => {
      const response = await axiosGet(`${baseUrl}/user/users`);

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
  }, []);
  

  // Get user chats when the component mounts and the user is available
  useEffect(() => {
    const getUserChats = async () => {
      if (user && user.id) {

        setIsChatLoading(true);
        setChatError(null);
        const response = await axiosGet(`${baseUrl}/chat/${user.id}`);

        setIsChatLoading(false);
        if (response.error) {
            return setChatError(response);
        }

        setUserChats(response);
      }
    }
    getUserChats();
  }, []);

  // Provide chat related data through the context
  return (
    <ChatContext.Provider value = {{
      userChats,
      isChatLoading,
      chatError,
      publicChats,
    }}>
      {children}
    </ChatContext.Provider>
  );
}