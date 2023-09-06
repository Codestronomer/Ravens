import React, { useContext, useEffect, useState } from 'react';
import { ChatList } from './chatList';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import { ChatContext, ChatContextType } from '@/context/chatContext';

const Chat = ({ children } : { children: React.ReactNode }) => {

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