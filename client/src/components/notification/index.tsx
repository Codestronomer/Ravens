'use client'
import moment from 'moment';
import Image from 'next/image';
import React, { useState, useContext } from 'react';
import { ChatContextType } from '@/context';
import { ChatContext } from '@/context/chatContext';
import styles from './notification.module.css';
import { AuthContext, AuthContextType } from '@/context/authContext';
import NotificationUnread from '../../../public/notificationUnread.svg';
import NotificationRead from '../../../public/notificationRead.svg';
import { filterUnreadNotifications } from '@/services/unreadNotification';
import { send } from 'process';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext) as AuthContextType;
  const {
    userChats,
    publicChats,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useContext(ChatContext) as ChatContextType;

  const unreadNotifications = filterUnreadNotifications(notifications);
  const modifiedNotifications = notifications.map((notification) => {
    
    const sender = publicChats.find((user) => user?.id == notification?.senderId);

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
        {unreadNotifications?.length === 0 ?
          <Image src={NotificationRead} height={28} width={28} alt={'notification-icon'} />
        :
          <Image src={NotificationUnread} height={28} width={28} alt={'notification-unread-icon'} />
        }
      </div>
      {isOpen && 
        <div className={styles.notificationsBox} style={{'color': 'white'}}>
          <div className={styles.notificationHeader}>
            <h3>Notifications</h3>
            <div className={styles.markRead} onClick={() => markAllNotificationsAsRead(notifications)}>
              <span>
                Mark all as read
              </span>
            </div>
          </div>
          <div className={styles.notificationSection}>
            {modifiedNotifications?.length === 0 ? <span>No notifications yet...</span> : null}
            {modifiedNotifications && modifiedNotifications.map((notification, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    markNotificationAsRead(
                      user, 
                      userChats,
                      notification,
                      notifications
                    )
                    setIsOpen(false);}}
                  className={notification.isRead ? styles.notification : styles.unreadNotification}
                >
                  <div className={styles.notificationMessage}>{`${notification?.senderName} sent you a message...`}</div>
                  <div className={styles.notificationDate}>{moment(notification.date).calendar()}</div>
                </div>
              )
            })}
          </div>
        </div>
      }
    </div>
  )
}

export default Notification;