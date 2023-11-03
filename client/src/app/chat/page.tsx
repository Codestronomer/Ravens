'use client'
import React, { useContext } from 'react';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import BackIcon from '../../../public/back-icon.svg'
import ChatView from './chatView';
import Notification from '../../components/notification';
import { ThemeContextType } from '@/context';
import { Theme } from '@/context/themeContext';
import ThemeToggle from '@/components/themeToggle';
import Image from 'next/image';

const Chat = ({ children } : { children: React.ReactNode }) => {

  const { theme } = useContext(Theme) as ThemeContextType;

  return (
  <>
    <div className={`${styles.chats} ${theme == 'dark' ? 'dark' : ''}`}
          style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
          }}
    >
      <div className={styles.chatTop}>
        <div className={styles.topLeft}>
          <Image src={BackIcon} alt='back-icon' width={50} height={50}  />
        </div>
        <div className={styles.topRight}>
          <ThemeToggle />
        </div>
      </div>
      <div className={styles.chatLayout}>
        <div 
          className={`${styles.chatLeft} ${theme == 'dark' ? 'dark' : ''}`}
          style={{
            backgroundColor: `var(--main-right)`,
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
            backgroundColor: `var(--main-right)`,
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