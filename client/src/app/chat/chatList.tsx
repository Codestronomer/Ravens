'use client'
import React from 'react';
import styles from './chat.module.css'
import Image from 'next/image';
import ProfileImage2 from '@/../public/teepee.jpg';
import { User, errorType } from '@/context/authContext';
import { Chat } from '@/context/chatContext';
import ChatItem from './ChatItem';

interface ChatListProps {
  user: User
  userChats: Chat[]
  chatError: errorType
  isChatLoading: boolean
  updateCurrentChat: (chat: Chat) => void
}

export const ChatList = ({
    chatError,
    userChats,
    isChatLoading,
    updateCurrentChat,
    user
  } : ChatListProps ) => {

  console.log("chatError", chatError);
  return (
    <>
      { isChatLoading && <div> ....Loading chats</div>}
      { userChats && userChats.map((chat: Chat) => {
        return (
          <div key={chat.id} onClick={() => updateCurrentChat(chat)}>
            <ChatItem chat={chat} user={user} key={chat.id} />
          </div>
        )
      }
    )}
    </>
  )
}