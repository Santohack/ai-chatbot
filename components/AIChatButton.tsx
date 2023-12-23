"use client"
import React from 'react'
import { Button } from './ui/button'
import { Bot, Box } from 'lucide-react'
import AichatBox from './AichatBox'

const AIChatButton = () => {
    const [chatBoxOpen , setChatBoxOpen] = React.useState(false)
  return (
   <>
   <Button onClick={() => setChatBoxOpen(true)}>
    <Bot size={20} className='mr-2 ' />
    AI
   </Button>
   <AichatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)}/>
   </>
  )
}

export default AIChatButton