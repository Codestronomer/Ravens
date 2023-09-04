import React from 'react'
import { User } from '@/context/authContext'

function ChatPopUp({ user }: {user: User}) {
  return (
    <div>
      {user.username}
    </div>
  )
}

export default ChatPopUp