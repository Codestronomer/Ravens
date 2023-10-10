'use client'
import React, { useContext } from 'react';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import Nav from '@/components/themeToggle';
import ChatView from './chatView';
import Notification from '../../components/notification';
import { ThemeContextType } from '@/context';
import { Theme } from '@/context/themeContext';

const Chat = ({ children } : { children: React.ReactNode }) => {

  const { theme } = useContext(Theme) as ThemeContextType;

  return (
  <>
    {/* <Nav /> */}
    <div className={styles.chats}>
      <div className={styles.chatLayout}>
        <div 
          className={`${styles.chatLeft} ${theme == 'dark' ? 'dark' : ''}`}
          style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
          }}
        >
          <div className={styles.chatLeftHeader}>
            <h1>Ravens</h1>
            <Notification />
          </div>
          <div className={styles.chatList}>
            <ChatView />
          </div>
        </div>
        <div 
          className={`${styles.chatRight} ${theme == 'dark' ? 'dark' : ''}`}
          style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
          }}
        >
          <ChatBox />
        </div>
      </div>
    </div>
  </>
  );
}

export default Chat;