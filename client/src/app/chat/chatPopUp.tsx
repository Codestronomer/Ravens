import React, { SetStateAction } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';
import { User } from '@/context/authContext';
import ProfileImage from '../../../public/John.jpg';
import { socketUser } from '@/context';
import useProfileAvatar from '@/hook/useProfileAvatar';

function ChatPopUp({ user, chat, onlineUsers, setView, createChat }: {
  user: User,
  chat: User,
  onlineUsers: socketUser[],
  setView: React.Dispatch<SetStateAction<string>>,
  createChat: (firstId: string, secondId: string) => void,
  }) {
  
  // get chat avatar
  const profileImage = useProfileAvatar(chat.image);
  return (
    <div className={styles.chat} onClick={() => {
      createChat(chat.id, user.id);
      setView('messages');
    }}>
      <div className={styles.chatImg}>
        <Image
          src={profileImage}
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