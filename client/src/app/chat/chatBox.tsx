'use client'
import moment from 'moment';
import Image from 'next/image';
import InputEmoji from 'react-input-emoji'
import React, { useContext, useState }   from 'react';
import styles from './chat.module.css';
import { ChatContext } from '@/context/chatContext';
import SendIcon from '../../../public/send-alt-svg.svg';
import { ChatContextType, MessageType } from '@/context';
import { AuthContext, AuthContextType, User } from '@/context/authContext';
import ChatImage from '../../../public/undraw/undraw_new_message_re_fp03.svg';

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext) as AuthContextType;
  const { messages, isMessagesLoading, messagesError, currentChat, sendMessage } = useContext(ChatContext) as ChatContextType;
  const recipientUsers = currentChat?.members?.filter((member: User) => member.id !== user.id);
  return (
    <>
      {recipientUsers && recipientUsers.length > 0 ? (
        <div className={styles.conversation}>
          <div className={styles.messageNav}>
            {/* Display the names of all recipients */}
            <h3>
              {recipientUsers.map((recipientUser: User) => recipientUser.username).join(", ")}
            </h3>
          </div>
          <div className={styles.messages}>
            {messages &&
              messages.map((message: MessageType, index: number) => {
                const isOwnMessage = message.senderId === user.id;
                return (
                  <div
                    key={index}
                    className={
                      isOwnMessage ? styles.messageRight : styles.messageLeft
                    }
                  >
                    <p>{message?.text}</p>
                    <span className={styles.messageDate}>
                      {moment(message?.createdAt).calendar()}
                    </span>
                  </div>
                );
              })}
          </div>
          <form className={styles.messageForm}>
            {/* className={styles.textInput} */}
            <InputEmoji
              value={message}
              onChange={setMessage}
              fontFamily="nunito"
              borderColor="#5E4291"
            />
            <button
              type="submit"
              className={styles.messageButton}
              onClick={(e) => {
                e.preventDefault();
                sendMessage(message, user, currentChat.id, setMessage);
              }}
            >
              <Image
                src={SendIcon}
                alt="send"
                className={styles.messageIcon}
              />
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.noConversation}>
          <Image
            src={ChatImage}
            alt="start a new message"
            className={styles.chatBoxImg}
          />
          <p>Click the &quot;+&quot; icon to start a conversation with someone</p>
        </div>
      )}
    </>
  );
};

export default ChatBox;