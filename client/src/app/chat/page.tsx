'use client'
import React, { useContext, useEffect, useState } from 'react';
import { ChatList } from './chatList';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import { axiosGet, baseUrl } from '@/services/backend';
import { AuthContext, AuthContextType } from '@/context/authContext';
import { ChatContext, ChatContextType } from '@/context/chatContext';

interface ChatProps {
  children: React.FC;
};

const Chat: React.FC<ChatProps> = ({ children }) => {

  const { userChats, isChatLoading, chatError } = useContext(ChatContext) as ChatContextType;

  console.log("userChats", userChats);
  console.log("chatLoading", isChatLoading);
  console.log("chatError", chatError);
  
  return (
  <>
    <div className={styles.chats}>
      <div className={styles.chatLayout}>
        <div className={styles.chatLeft}>
          <h1>Chats</h1>
          <div className={styles.chatList}>
            <ChatList />
          </div>
        </div>
        <div className={styles.chatRight}>
          <ChatBox />
        </div>
      </div>
    </div>
  </>
  );
}

export default Chat;