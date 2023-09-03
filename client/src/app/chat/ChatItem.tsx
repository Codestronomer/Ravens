import React from 'react';
import Image from 'next/image';
import ProfileImage from '@/../public/John.jpg';
import ProfileImage2 from '@/../public/teepee.jpg';
import { ChatType } from './chatList';
import styles from './chat.module.css';

const ChatItem = ({ chat }: { chat: ChatType }) => {
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
        <h3>{chat.members[0].username}</h3>
        <p>Hello</p>
      </div>
    </div>
  )
}

export default ChatItem;