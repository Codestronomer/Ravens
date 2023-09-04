import React from 'react';
import Image from 'next/image';
import ProfileImage from '@/../public/John.jpg';
import ProfileImage2 from '@/../public/teepee.jpg';
import { ChatType } from './chatList';
import styles from './chat.module.css';
import { User } from '@/context/authContext';

const ChatItem = ({ chat, user }: { chat: ChatType, user: User }) => {

  const recipientUser = chat.members.find((member) => member.id !== user.id);

  return (
    <div className={styles.chat} key={chat._id}>
      <div className={styles.chatImg}>
        <Image
          src={ProfileImage}
          alt="profile image"
          height={50}
          width={50}
        />
      </div>
      <div className={styles.chatInfo}>
        <div className={styles.chatInfoChild}>
          <h3>{recipientUser?.username}</h3>
          <p>Hello</p>
        </div>
        <div className={styles.chatInfoChild}>
          <p>12/2/2022</p>
          <div className={styles.chatNotification}>
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatItem;