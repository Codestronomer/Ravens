'use client'
import React, { useContext, useState } from 'react';
import { ChatList } from './chatList';
import styles from './chat.module.css';
import PublicChats from './publicChats';
import { ChatContextType } from '@/context';
import { ChatContext } from '@/context/chatContext';
import { AuthContext, AuthContextType } from '@/context/authContext';

function ChatView() {
  const [view, setView] = useState('messages');
  const { user } = useContext(AuthContext) as AuthContextType;
  const {
    userChats,
    chatError,
    createChat,
    publicChats,
    onlineUsers,
    isChatLoading,
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
          user={user}
          userChats={userChats}
          chatError={chatError}
          isChatLoading={isChatLoading}
          updateCurrentChat={updateCurrentChat}
          onlineUsers={onlineUsers}
        />
        :
        <PublicChats
          user={user}
          chats={publicChats}
          createChat={createChat}
          onlineUsers={onlineUsers}
        />
      }
    </>
  )
}

export default ChatView