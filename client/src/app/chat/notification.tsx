'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';
import NotificationUnread from '../../../public/notificationUnread.svg';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.notifications}>
      <div className={styles.notificationsIcon} onClick={() => setIsOpen(!isOpen)}>
        <Image src={NotificationUnread} height={20} width={20} alt={'notification-icon'} />
      </div>
      {isOpen && 
        <div className={styles.notificationsBox}>
          <div className={styles.notificationHeader}>
            <h3>Notifications</h3>
            <div className={styles.markRead}>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Notification;