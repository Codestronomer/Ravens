import { Chat, ChatContextType, MessageType } from '@/context';
import { ChatContext } from '@/context/chatContext';
import { baseUrl, axiosGet } from '@/services/backend';
import React, {useState, useEffect, useContext} from 'react'

const useFetchLatestMessage = (chat: Chat) => {
  const [latestMessage, setLatestMessage] = useState<MessageType>({
    id: '',
    text: '',
    chatId: '',
    senderId: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });
  const {notifications, newMessage} = useContext(ChatContext) as ChatContextType;

  useEffect(() => {
    const getMessages = async () => {
      const response = await axiosGet(`${baseUrl}/messages/${chat?.id}`);

      if (response.error) {
        return console.log(`Error getting message: ${response.error}`);
      }

      const lastMessage = response[response.length - 1];

      setLatestMessage(lastMessage);

    };

    getMessages();
  }, [notifications, newMessage, chat]);

  return { latestMessage };
}

export default useFetchLatestMessage;
