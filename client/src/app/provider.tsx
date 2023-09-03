'use client'
import React, { useContext } from 'react';
import { ChatContextProvider } from "@/context/chatContext"
import { AuthContextProvider, AuthContext, AuthContextType } from "@/context/authContext"

export function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext) as AuthContextType;
  
  return <>
    <AuthContextProvider>
      <ChatContextProvider user={user}>
        {children}
      </ChatContextProvider>
    </AuthContextProvider>
  </>
}