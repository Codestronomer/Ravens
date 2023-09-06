'use client'
import React, { useContext } from 'react';
import styles from './chat.module.css'
import Image from 'next/image';
import ProfileImage2 from '@/../public/teepee.jpg';
import { AuthContext, AuthContextType, User } from '@/context/authContext';
import { ChatContext, ChatContextType, Chat } from '@/context/chatContext';
import ChatItem from './ChatItem';
import ChatPopUp from './chatPopUp';

export const ChatList = () => {

  const { user } = useContext(AuthContext) as AuthContextType;
  const {
    userChats,
    isChatLoading,
    chatError,
    publicChats,
    createChat,
    updateCurrentChat,
  } = useContext(ChatContext) as ChatContextType;
  console.log("chatError", chatError);
  console.log("publicChats", publicChats);
  return (
    <>
      <div className={styles.publicChats}>
        {publicChats && publicChats.map((chat) => {
          return <ChatPopUp key={chat.id} chat={chat} user={user} createChat={createChat} />
        })}
      </div>
      { isChatLoading && <div> ....Loading chats</div>}
      { userChats && userChats.map((chat: Chat) => {
        return (
          <div key={chat.id} onClick={() => updateCurrentChat(chat)}>
            <ChatItem chat={chat} user={user} key={chat.id} />
          </div>
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
          <div className={styles.chatInfoChild}>
            <h3>Teepee</h3>
            <p>Yo!</p>
          </div>
          <div className={styles.chatInfoChild}>
            <p>12/2/2022</p>
            <div className={styles.chatNotification}>
              <span>2</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}