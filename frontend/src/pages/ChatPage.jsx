import React from 'react'
import { useParams } from 'react-router'

const ChatPage = () => {
  const {id} = useParams()
  
  return (
    <div>
      ChatPage {id}
    </div>
  )
}

export default ChatPage
