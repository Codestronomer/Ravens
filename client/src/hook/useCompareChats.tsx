import React from 'react'
import useFetchLatestMessage from './useFetchLatestMessage';

function useCompareChats(chatA: any, chatB: any) {

  // Create a comparison function to sort chats by the latestMessage
  chatA.latestMessage = useFetchLatestMessage(chatA);
  chatB.latestMessage = useFetchLatestMessage(chatB);

  if (!chatA.latestMessage && !chatB.latestMessage) return 0;
  else if (!chatA.latestMessage) {
    return 1;
  } else if (!chatB.lastMessage) {
    return -1
  } else {
    const date1 = new Date(chatA.lastestMessage.createdAt);
    const date2 = new Date(chatB.latestMessage.createdAt);
    return date1.getTime() - date2.getTime();
  }
}

export default useCompareChats