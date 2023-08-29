import React from 'react';
import { ChatList } from './chatList';
import styles from './chat.module.css';
import ChatBox from './chatBox';

interface ChatProps {
  children: React.FC;
};

const Chats: React.FC<ChatProps> = ({ children }) => {
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

export default Chats;