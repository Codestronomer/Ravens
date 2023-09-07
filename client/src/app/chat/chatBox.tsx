'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';
import { ChatContext, ChatContextType } from '@/context/chatContext';
import { AuthContext, AuthContextType, User } from '@/context/authContext';
import ChatImage from '../../../public/undraw/undraw_new_message_re_fp03.svg';

const ChatBox = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { messages, isMessagesLoading, messagesError, currentChat } = useContext(ChatContext) as ChatContextType;
  const recipientUser = currentChat?.members?.find((member: User) => member.id !== user.id);
  return (
    <>
    {recipientUser ?
      <div className={styles.conversation}>
        <div className={styles.messageNav}>
          <h3>{ recipientUser?.username}</h3>
        </div>
        <div className={styles.messages}>
          <div className={styles.messageLeft}>
            <p> Hello !</p>
          </div>
          <div className={styles.messageRight}>
            <p>How are you?</p>
          </div>
        </div>
        <form className={styles.messageForm}>
          <input className={styles.textInput}
            placeholder='Send a message' type='text'></input>
          <button type='submit' className={styles.messageButton}>Send</button>
        </form>
      </div>
      :
      <div className={styles.noConversation}>
        <Image 
          src={ChatImage}
          alt="start a new message"
          className={styles.chatBoxImg}
        />
        <p>Click the &quot;+&quot; icon to start a conversation with someone</p>
      </div>
    }
    </>
  )
}

ChatBox.propTypes = {}

export default ChatBox;