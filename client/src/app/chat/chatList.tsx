'use client'
import React from 'react';
import Image from 'next/image';
import ChatItem from './ChatItem';
import styles from './chat.module.css'
import { User } from '@/context/authContext';
import { socketUser, errorType, Chat } from '@/context';

interface ChatListProps {
  user: User
  userChats: Chat[]
  isChatLoading: boolean
  onlineUsers: socketUser[];
  chatError: errorType | null
  updateCurrentChat: (chat: Chat) => void
}

export const ChatList = ({
    user,
    userChats,
    chatError,
    onlineUsers,
    isChatLoading,
    updateCurrentChat,
  } : ChatListProps ) => {

  console.log("chatError", chatError);
  return (
    <>
      { isChatLoading && <div> ....Loading chats</div>}
      { userChats && userChats.map((chat: Chat) => {
        return (
          <div key={chat.id} onClick={() => updateCurrentChat(chat)}>
            <ChatItem
              chat={chat}
              user={user}
              key={chat.id} 
              onlineUsers={onlineUsers}
            />
          </div>
        )
      }
    )}
    </>
  )
}