import React, { useContext, useEffect, useState } from 'react';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import Nav from '@/components/nav';
import ChatView from './chatView';
import Notification from '../../components/notification';

const Chat = ({ children } : { children: React.ReactNode }) => {

  return (
  <>
    {/* <Nav /> */}
    <div className={styles.chats}>
      <div className={styles.chatLayout}>
        <div className={styles.chatLeft}>
          <div className={styles.chatLeftHeader}>
            <h1>Ravens</h1>
            <Notification />
          </div>
          <div className={styles.chatList}>
            <ChatView />
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