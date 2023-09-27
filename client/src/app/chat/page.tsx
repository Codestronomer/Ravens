import React, { useContext, useEffect, useState } from 'react';
import styles from './chat.module.css';
import ChatBox from './chatBox';
import Nav from '@/components/nav';
import ChatView from './chatView';

const Chat = ({ children } : { children: React.ReactNode }) => {

  return (
  <>
    {/* <Nav /> */}
    <div className={styles.chats}>
      <div className={styles.chatLayout}>
        <div className={styles.chatLeft}>
          <h1>Chats</h1>
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