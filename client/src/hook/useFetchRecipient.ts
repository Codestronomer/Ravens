import { ChatType } from '@/app/chat/chatList';
import { User } from '@/context/authContext';
import { axiosGet, baseUrl } from '@/services/backend';
import React, { useState, useEffect } from 'react';

const useFetchRecipient = (chat: ChatType, user: User) => {
  const [recipient, setRecipient] = useState(null);
  const [error, setError] = useState(null);

  const recipientUser = chat.members.find((member) => member.id !== user.id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientUser) return null;

      const response = await axiosGet(`${baseUrl}/user/find/${recipientUser.id}`);

      if (response.error) {
        return setError(error);
      }

      setRecipient(response)
    };
    
    getUser();
  }, []);

  return {recipient, error};
}