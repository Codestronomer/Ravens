import React from 'react';

interface ChatProps {
  children: React.FC;
};

const Chats: React.FC<ChatProps> = ({ children }) => {
  return (
    <div>chats</div>
  );
}