import React from 'react';
import Image from 'next/image';
import styles from './chat.module.css';
import { User } from '@/context/authContext';
import ProfileImage from '../../../public/John.jpg';

function ChatPopUp({ user, createChat, chat }: {
  user: User,
  createChat: (firstId: string, secondId: string) => void,
  chat: User}) {
  return (
    <div className={styles.chat} onClick={() => createChat(chat.id, user.id)}>
      <div className={styles.chatImg}>
        <Image
          src={ProfileImage}
          alt="profile image"
          height={50}
          width={50}
        />
        <div className={styles.isOnline}></div>
      </div>
      {chat.username}
    </div>
  )
}

export default ChatPopUp