'use client'
import React, { createContext, useCallback, useState, useEffect } from 'react';
import { useChat, axiosPost, baseUrl, axiosGet } from '@/services/backend';
import { User } from './authContext';

export interface ChatContextType {
  userChats: any
  isChatLoading: boolean
  chatError: boolean
}

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children, user }: {
  children: React.ReactNode, user: User | null
}) => {
  const [userChats, setUserChats] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);

  if (!user) {
    const userString = localStorage.getItem('user');
    if (userString) {
      user = JSON.parse(userString);
    }
  }

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

  return (
    <ChatContext.Provider value = {{
      userChats,
      isChatLoading,
      chatError,
    }}>
      {children}
    </ChatContext.Provider>
  );
}