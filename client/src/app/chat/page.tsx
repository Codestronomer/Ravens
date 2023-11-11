"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ChatBox from './chatBox';
import ChatView from './chatView';
import styles from './chat.module.css';
import useDarkMode from 'use-dark-mode';
import ThemeToggle from '@/components/themeToggle';
import BackIcon from '../../../public/back-icon.svg'
import Notification from '../../components/notification';
import BackIconWhite from '../../../public/back-icon-white.svg';

const Chat = () => {
  const theme = useDarkMode(true);

  return (
  <>
    <div className={`${styles.chats} ${theme.value == true ? 'dark' : ''}`}
          style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
          }}
    >
      <div className={styles.chatTop}>
        <Link href={"/"}>
          <div className={styles.topLeft}>
            {theme.value == true ? 
              <Image src={BackIconWhite} alt='back-icon white' width={40} height={20} />
            :
              <Image src={BackIcon} alt='back-icon' width={40} height={20}  />
            }
          </div>
        </Link>
        <div className={styles.topRight}>
          <ThemeToggle />
        </div>
      </div>
      <div className={styles.chatLayout}>
        <div 
          className={`${styles.chatLeft} ${theme.value == true ? 'dark' : ''}`}
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
          className={`${styles.chatRight} ${theme.value == true ? 'dark' : ''}`}
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