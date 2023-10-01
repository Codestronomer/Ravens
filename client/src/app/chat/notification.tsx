'use client'
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';
import NotificationUnread from '../../../public/notificationUnread.svg';
import { ChatContext } from '@/context/chatContext';
import { ChatContextType } from '@/context';
import { AuthContext, AuthContextType } from '@/context/authContext';
import { filterUnreadNotifications } from '@/services/unreadNotification';
import moment from 'moment';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext) as AuthContextType;
  const { notifications, userChats, publicChats } = useContext(ChatContext) as ChatContextType;

  const unreadNotifications = filterUnreadNotifications(notifications);
  const modifiedNotifications = notifications.map((notification) => {
    const sender = publicChats.find((user) => user._id === notification.senderId);

    return {
      ...notification,
      senderName: sender?.username,
    };
  })

  console.log("unread", unreadNotifications);
  console.log("modified", modifiedNotifications);
  return (
    <div className={styles.notifications}>
      <div className={styles.notificationsIcon} onClick={() => setIsOpen(!isOpen)}>
        <Image src={NotificationUnread} height={40} width={40} alt={'notification-icon'} />
        {unreadNotifications?.length === 0 ? null : (
          <div className={styles.notificationCount}>
            <span>{unreadNotifications.length}</span>
          </div>
        )}
      </div>
      {isOpen && 
        <div className={styles.notificationsBox}>
          <div className={styles.notificationHeader}>
            <h3>Notifications</h3>
            <div className={styles.markRead}>
              <span>
                Mark all as read
              </span>
            </div>
          </div>
          <div className={styles.notificationSection}>
            {modifiedNotifications?.length === 0 ? <span>No notifications yet...</span> : null}
            {modifiedNotifications && modifiedNotifications.map((notification, index) => {
              return <div key={index} className={notification.isRead ? styles.notification : styles.unreadNotification}>
                <div className={styles.notificationMessage}>{`${notification.senderName} sent you a message...`}</div>
                <div className={styles.notificationDate}>{moment(notification.date).calendar()}</div>
              </div>
            })}
          </div>
        </div>
      }
    </div>
  )
}

export default Notification;