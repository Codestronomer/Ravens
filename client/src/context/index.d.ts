export interface Chat {
  id: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface errorType {
  error: boolean
  MessageType: string
}

export interface MessageType {
    senderId: string
    chatId: string
    text: string
    id: string,
    createdAt: string
    updatedAt: string
    __v: number
}

export interface ChatContextType {
  userChats: any
  currentChat: Chat
  isChatLoading: boolean
  messages: MessageType[]
  publicChats: Array<User>
  messagesError: errorType
  onlineUsers: socketUser[]
  isMessagesLoading: boolean
  chatError: errorType | null
  updateCurrentChat: (chat: Chat) => void;
  sendMessage: (
    message: string,
    sender: User,
    currentChatId: string,
    setMessage: (message: string) => void,
  ) => void;
  createChat: (firstId: string, secondId: string) => void;
}

interface socketUser {
  userId: string,
  socketId: string
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}