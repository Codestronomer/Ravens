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

export interface NotificationType {
  senderId: string
  date: string
  isRead: boolean
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

export interface ThemeContextType {
  theme: string
  toggleTheme: () => {}
}

export interface ChatContextType {
  userChats: Chat[]
  currentChat: Chat
  isChatLoading: boolean
  newMessage: MessageType
  messages: MessageType[]
  publicChats: Array<User>
  messagesError: errorType
  onlineUsers: socketUser[]
  isMessagesLoading: boolean
  chatError: errorType | null
  notifications: NotificationType[];
  markNotificationAsRead: (
    user: User,
    userChats: Chat[],
    notification: NotificationType,
    notifications: NotificationType[]
  ) => void;
  sendMessage: (
    message: string,
    sender: User,
    currentChatId: string,
    setMessage: (message: string) => void,
  ) => void;
  updateCurrentChat: (chat: Chat) => void;
  createChat: (firstId: string, secondId: string) => void;
  markAllNotificationsAsRead: (notifications: NotificationType[]) => void;
  markUserNotificationsAsRead: (notifications: NotificationType[], user: User) => void;
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