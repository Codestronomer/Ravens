'use client'
import React from 'react';
import Image from 'next/image';
import ChatItem from './ChatItem';
import styles from './chat.module.css'
import { User } from '@/context/authContext';
import { socketUser, errorType, Chat } from '@/context';
import LoadingSpinner from '@/components/loadingSpinner';
import moment from 'moment';
import useCompareChats from '@/hook/useCompareChats';

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

  // let chatlist = userChats.toSorted(useCompareChats);

  // Create a custom comparison function to sort chats by the latestMessage timestamp.
  const compareChatsByLatestTime = (chatA: Chat, chatB: Chat) => {
    const latestTimeA = chatA.updatedAt;
    const latestTimeB = chatB.updatedAt;

    if (!latestTimeA && !latestTimeB) {
      return 0; // No messages for both chats.
    } else if (!latestTimeA) {
      return 1; // ChatA has no messages, so ChatB comes first.
    } else if (!latestTimeB) {
      return -1; // ChatB has no messages, so ChatA comes first.
    } else {
      // Compare timestamps.
      return new Date(latestTimeB).getTime() - new Date(latestTimeA).getTime();
    }
  };

  userChats.sort(compareChatsByLatestTime);

  return (
    <>
      { isChatLoading && <div><LoadingSpinner /></div>}
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