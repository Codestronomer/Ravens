'use client'
import Image from 'next/image';
import React, { useContext } from 'react';
import styles from './chat.module.css';
import { User } from '@/context/authContext';
import { Chat, ChatContextType, socketUser } from '@/context';
import { ChatContext } from '@/context/chatContext';
import ProfileImage from '@/../public/John.jpg';

const ChatItem = ({ chat, user, onlineUsers }: { chat: Chat, user: User, onlineUsers: socketUser[] }) => {

  const { currentChat } = useContext(ChatContext) as ChatContextType;

 const recipientUser = chat.members
  ?.filter((member: User) => member.username !== user?.username)
  .find(Boolean); // Find the first non-null member
  
  return (
    <div className={currentChat?.id == chat?.id ? styles.chatActive : styles.chat}>
      <div className={styles.chatImg}>
        <Image
          src={ProfileImage}
          alt="profile image"
          height={50}
          width={50}
        />
        <div className={onlineUsers?.some((onlineUser) => onlineUser.userId == recipientUser?._id) ? styles.isOnline : ''}></div>
      </div>
      <div className={styles.chatInfo}>
        <div className={styles.chatInfoChild}>
          <h3>{recipientUser?.username}</h3>
          <p>Hello</p>
        </div>
        <div className={styles.chatInfoChild}>
          <p>12/2/2022</p>
          {currentChat?.id !== chat?.id && 
            <div className={styles.chatNotification}>
              <span>2</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ChatItem;