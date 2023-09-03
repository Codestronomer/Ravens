import React, { useContext } from 'react';
import styles from './chat.module.css'
import Image from 'next/image';
import ProfileImage2 from '@/../public/teepee.jpg';
import { AuthContext, AuthContextType, User } from '@/context/authContext';
import { ChatContext, ChatContextType } from '@/context/chatContext';
import ChatItem from './ChatItem';

export interface ChatType {
  _id: string
  members: Array<User>
  createdAt: Date
  updatedAt: Date
}

export const ChatList = () => {

  const { user } = useContext(AuthContext) as AuthContextType;
  const { userChats, isChatLoading, chatError } = useContext(ChatContext) as ChatContextType;

  console.log("userChats", userChats);
  console.log("chatLoading", isChatLoading);
  console.log("chatError", chatError);
  return (
    <>
      { isChatLoading && <div> ....Loading chats</div>}
      { userChats && userChats.map((chat: ChatType) => {
        return (
          <ChatItem chat={chat} user={user} key={chat._id} />
        )
      }
    )}
      <div className={styles.chatActive}>
        <div className={styles.chatImg}>
          <Image
            src={ProfileImage2}
            alt="profile image"
            height={50}
            width={50}
          />
        </div>
        <div className={styles.chatInfo}>
          <h3>Teepee</h3>
          <p>Yo!</p>
        </div>
      </div>
    </>
  )
}