'use client'
import React, { createContext, useCallback, useState, useEffect } from 'react';
import { useChat, axiosPost, baseUrl, axiosGet } from '@/services/backend';
import { User } from './authContext';



export const ChatContext = createContext({});

export const ChatContextProvider = ({ children, user}: {
  children: React.ReactNode, user: User
}) => {
  const [userChats, setUserChats] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);

  useEffect(() => {
      const GetUserChats = async () => {
      if (user._id !== "") {

        setIsChatLoading(true);
        setChatError(null);
        const response = await axiosGet(`${baseUrl}/chats/${user._id}`);

        setIsChatLoading(false);
        if (response.error) {
            return setChatError(response);
        }
      }
    }
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