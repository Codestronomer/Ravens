'use client'
import React, { useContext, useEffect, useState } from 'react';
import { ChatList } from './chatList';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import { axiosGet, baseUrl } from '@/services/backend';
import { AuthContext, AuthContextType } from '@/context/authContext';

interface ChatProps {
  children: React.FC;
};

const Chat: React.FC<ChatProps> = ({ children }) => {

  let { user } = useContext(AuthContext) as AuthContextType;

  const [userChats, setUserChats] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user && user.id !== "") {

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

  console.log("userchats", userChats);
  
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