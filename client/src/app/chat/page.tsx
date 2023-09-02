'use client'
import React, { useContext } from 'react';
import { ChatList } from './chatList';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import { ChatContext, ChatContextType, ChatContextProvider } from '@/context/chatContext';
import { AuthContext, AuthContextType } from '@/context/authContext';

interface ChatProps {
  children: React.FC;
};

const Chat: React.FC<ChatProps> = ({ children }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { userChats, isChatLoading, chatError } = useContext(ChatContext) as ChatContextType;
  
  console.log(userChats);
  return (
  <>
    <ChatContextProvider user={user}>
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
    </ChatContextProvider>
  </>
  );
}

export default Chat;