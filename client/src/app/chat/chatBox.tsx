'use client'
import moment from 'moment';
import Image from 'next/image';
import InputEmoji from 'react-input-emoji'
import React, { useContext, useState, useEffect, createRef } from 'react';
import styles from './chat.module.css';
import { ChatContext } from '@/context/chatContext';
import SendIcon from '../../../public/send-alt-svg.svg';
import { ChatContextType, MessageType, ThemeContextType } from '@/context';
import { AuthContext, AuthContextType, User } from '@/context/authContext';
import ChatImage from '../../../public/undraw/undraw_new_message_re_fp03.svg';
import LoadingSpinner from '@/components/loadingSpinner';
import { Theme } from '@/context/themeContext';
import useProfileAvatar from '@/hook/useProfileAvatar';

const ChatBox = () => {
  const scroll = createRef<HTMLDivElement>();
  const [message, setMessage] = useState("");
  const { theme } = useContext(Theme) as ThemeContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const {
    messages,
    currentChat,
    sendMessage,
    messagesError,
    isMessagesLoading,
  } = useContext(ChatContext) as ChatContextType;
  const recipientUsers = currentChat?.members?.filter((member) => member._id !== user.id);

  // get chat avatar
  const profileImage = useProfileAvatar(recipientUsers?.at(0).image);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, scroll]);

  return (
    <>
      {recipientUsers && recipientUsers.length > 0 ? (
        <div className={`styles.conversation ${theme == 'dark' ? 'dark' : ''}`}
            style={{
              backgroundColor: `var(--main-right)`,
              color: `var(--text-color)`,
            }}
        >
          <div className={styles.messageNav}>
            {/* Display the names of all recipients */}
            <h3>
              {recipientUsers.map((recipientUser: User) => recipientUser.username).join(", ")}
            </h3>
            <Image src={profileImage} alt="chat image" width={30} height={30} />
          </div>
          <div className={styles.messagesOverlay}>
            {isMessagesLoading && (
              <div className={styles.loadingSpinnerOverlay}>
                <LoadingSpinner />
              </div>
            )}
            <div className={styles.messagesContainer}>
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
                        ref={scroll}
                      >
                        <p>{message?.text}</p>
                        <span className={styles.messageDate}>
                          {moment(message?.createdAt).calendar()}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
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