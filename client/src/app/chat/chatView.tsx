'use client'
import React, { useContext, useState } from 'react';
import { ChatList } from './chatList';
import styles from './chat.module.css';
import PublicChats from './publicChats';
import { AuthContext, AuthContextType } from '@/context/authContext';
import { ChatContext, ChatContextType } from '@/context/chatContext';

function ChatView() {
  const [view, setView] = useState('messages');
  const { user } = useContext(AuthContext) as AuthContextType;
  const {
    userChats,
    isChatLoading,
    chatError,
    publicChats,
    createChat,
    updateCurrentChat
  } = useContext(ChatContext) as ChatContextType;

  return (
    <>
      <div className={styles.view}>
        <div className={view == 'messages' ? styles.viewTabActive : styles.viewTab} onClick={() => setView('messages')}>
          Messages
        </div>
        <div className={view !== 'messages' ? styles.viewTabActive : styles.viewTab} onClick={() => setView('chats')}>
          Public Chats
        </div>
      </div>
      {view == 'messages' ?
        <ChatList
          userChats={userChats}
          isChatLoading={isChatLoading}
          chatError={chatError}
          updateCurrentChat={updateCurrentChat}
          user={user}
        />
        :
        <PublicChats
          createChat={createChat}
          chats={publicChats}
          user={user}
        />
      }
    </>
  )
}

export default ChatView