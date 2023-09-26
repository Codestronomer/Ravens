import React from 'react';
import Image from 'next/image';
import styles from './chat.module.css';
import { User } from '@/context/authContext';
import ProfileImage from '../../../public/John.jpg';
import { socketUser } from '@/context';

function ChatPopUp({ user, createChat, chat, onlineUsers }: {
  user: User,
  createChat: (firstId: string, secondId: string) => void,
  chat: User,
  onlineUsers: socketUser[]}) {
  return (
    <div className={styles.chat} onClick={() => createChat(chat.id, user.id)}>
      <div className={styles.chatImg}>
        <Image
          src={ProfileImage}
          alt="profile image"
          height={50}
          width={50}
        />
        <div className={onlineUsers?.some((onlineUser) => onlineUser.userId == chat?.id) ? styles.isOnline : ''}>
        </div>
      </div>
      {chat.username}
    </div>
  )
}

export default ChatPopUp