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

export const ChatContextProvider = ({ children, user}: {
  children: React.ReactNode, user: User
}) => {
  const [userChats, setUserChats] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);

  useEffect(() => {
      const getUserChats = async () => {
        if (user && user.id !== "") {

          setIsChatLoading(true);
          setChatError(null);
          const response = await axiosGet(`${baseUrl}/chats/${user.id}`);

          setIsChatLoading(false);
          if (response.error) {
              return setChatError(response);
          }
        }
    }

    getUserChats();
  }, [user])
  
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