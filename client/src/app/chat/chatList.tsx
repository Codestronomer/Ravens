import React, { useContext } from 'react';
import styles from './chat.module.css'
import Image from 'next/image';
import ProfileImage2 from '@/../public/teepee.jpg';
import { AuthContext, AuthContextType, User } from '@/context/authContext';
import { ChatContext, ChatContextType } from '@/context/chatContext';
import ChatItem from './ChatItem';
import ChatPopUp from './chatPopUp';

export interface ChatType {
  _id: string
  members: Array<User>
  createdAt: Date
  updatedAt: Date
}

export const ChatList = () => {

  const { user } = useContext(AuthContext) as AuthContextType;
  const { userChats, isChatLoading, chatError, publicChats } = useContext(ChatContext) as ChatContextType;

  console.log("userChats", userChats);
  console.log("chatLoading", isChatLoading);
  console.log("chatError", chatError);
  return (
    <>
      { publicChats && publicChats.map((user) => {
        <ChatPopUp key={user.id} user={user} />
      })}
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