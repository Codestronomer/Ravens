import React from 'react';
import styles from './chat.module.css'
import Image from 'next/image';
import ProfileImage from '@/../public/John.jpg';
import ProfileImage2 from '@/../public/teepee.jpg';

export const ChatList: React.FC = () => {
  return (
    <>
      <div className={styles.chat}>
        <div className={styles.chatImg}>
          <Image
            src={ProfileImage}
            alt="profile image"
            height={50}
            width={50}
          />
        </div>
        <div className={styles.chatInfo}>
          <h3>John</h3>
          <p>Hello</p>
        </div>
      </div>
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