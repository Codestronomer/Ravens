import React, { SetStateAction } from 'react';
import ChatPopUp from './chatPopUp';
import styles from './chat.module.css';
import { User } from '@/context/authContext';
import { socketUser } from '@/context';

function PublicChats(
  {
    chats,
    user,
    setView,
    createChat,
    onlineUsers,
  }: {
    user: User,
    chats: User[],
    setView: React.Dispatch<SetStateAction<string>>
    onlineUsers: socketUser[];
    createChat: (firstId: string, secondId: string) => void;
  }) {
  
  return (
    <>
    <div className={styles.chats}>
        {chats && chats.map((chat) => {
          return (
            <ChatPopUp
              key={chat.id}
              chat={chat}
              user={user}
              setView={setView}
              createChat={createChat}
              onlineUsers={onlineUsers}
            />
          )
        })}
      </div>
    </>
  )
}

export default PublicChats