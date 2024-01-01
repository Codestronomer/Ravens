'use client'
import moment from 'moment';
import Image from 'next/image';
import React, { useContext } from 'react';
import styles from './chat.module.css';
import { User } from '@/context/authContext';
import { Chat, ChatContextType, MessageType, NotificationType, socketUser } from '@/context';
import { ChatContext } from '@/context/chatContext';
import ProfileImage from '@/../public/John.jpg';
import { filterUnreadNotifications } from '@/services/unreadNotification';
import useFetchLatestMessage from '@/hook/useFetchLatestMessage';
import useProfileAvatar from '@/hook/useProfileAvatar';

const ChatItem = ({ chat, user, onlineUsers }: { chat: Chat, user: User, onlineUsers: socketUser[] }) => {

  // retrieve chat recipient
  const recipientUser = chat.members
  ?.filter((member: User) => member.username !== user?.username)
  .find(Boolean); // Find the first non-null member

  const { currentChat, notifications, markUserNotificationsAsRead } = useContext(ChatContext) as ChatContextType;

  // get unread notifications
  const unreadNotifications = filterUnreadNotifications(notifications);

  // get unread notifications for the chat recipient
  const chatUserNotifications = unreadNotifications?.filter((notification: NotificationType) => {
    return notification?.senderId == recipientUser?._id
  });

  

  // get chat avatar
  const profileImage = useProfileAvatar(recipientUser?.image);

  return (
    <div
      className={currentChat?.id == chat?.id ? styles.chatActive : styles.chat}
      onClick={() => {
        if (unreadNotifications?.length !== 0) {
          markUserNotificationsAsRead(notifications, chatUserNotifications);
        }
      }}
    >
      <div className={styles.chatImg}>
        <Image
          src={profileImage}
          alt="profile image"
          height={40}
          width={40}
        />
        <div className={onlineUsers?.some((onlineUser) => onlineUser.userId == recipientUser?._id) ? styles.isOnline : ''}></div>
      </div>
      <div className={styles.chatInfo}>
        <div className={styles.chatInfoChild}>
          <h3>{recipientUser?.username}</h3>
          <p>{latestMessage?.text && truncateText(latestMessage?.text)}</p>
        </div>
        <div className={styles.chatInfoChild}>
          <p>{moment(latestMessage?.createdAt).calendar()}</p>
          {currentChat?.id !== chat?.id && chatUserNotifications.length > 0 &&
            <div className={styles.chatNotification}>
              <span>{chatUserNotifications?.length}</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ChatItem;