import React from 'react';
import { User } from '@/context/authContext';
import styles from './chat.module.css';

function ChatPopUp({ user, createChat, chat }: {
  user: User,
  createChat: (firstId: string, secondId: string) => void,
  chat: User}) {
  return (
    <div className={styles.chatPop} onClick={() => createChat(chat.id, user.id)}>
      <div className={styles.isOnline}></div>
      {chat.username}
    </div>
  )
}

export default ChatPopUp