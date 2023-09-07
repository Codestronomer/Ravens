import React from 'react';
import ChatPopUp from './chatPopUp';
import styles from './chat.module.css';
import { User } from '@/context/authContext';

function PublicChats(
  {
    chats,
    user,
    createChat
  }: {
    chats: User[],
    user: User,
    createChat: (firstId: string, secondId: string) => void;
  }) {
  
  return (
    <>
    <div className={styles.chats}>
        {chats && chats.map((chat) => {
          return <ChatPopUp key={chat.id} chat={chat} user={user} createChat={createChat} />
        })}
      </div>
    </>
  )
}

export default PublicChats