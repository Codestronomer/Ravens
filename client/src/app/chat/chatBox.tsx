'use client'
import moment from 'moment';
import Image from 'next/image';
import InputEmoji from 'react-input-emoji'
import React, { useContext, useState }   from 'react';
import styles from './chat.module.css';
import SendIcon from '../../../public/send-alt-svg.svg';
import { ChatContext, ChatContextType } from '@/context/chatContext';
import { AuthContext, AuthContextType, User } from '@/context/authContext';
import ChatImage from '../../../public/undraw/undraw_new_message_re_fp03.svg';

const ChatBox = () => {
  const [message, setMessage] = useState("");
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
          {messages && messages.map((message) => {
            return (
            <div key={message.id} className={
              message.senderId !== recipientUser.id
              ?
              styles.messageLeft : styles.messageRight}>
              <p>{message?.text}</p>
              <span className={styles.messageDate}>{moment(message?.createdAt).calendar()}</span>
            </div>)
          })
          }
        </div>
        <form className={styles.messageForm}>
          {/* className={styles.textInput} */}
            <InputEmoji
              value={message}
              onChange={setMessage}
              fontFamily='nunito'
              borderColor='#5E4291' />
          <button type='submit' className={styles.messageButton}>
            <Image src={SendIcon}
              alt="send"
              className={styles.messageIcon}
            />
          </button>
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