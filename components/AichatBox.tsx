import React, { useEffect } from 'react'
import { useChat } from 'ai/react';
import { cn } from '@/lib/utils';
import { Bot, Trash, XCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
interface AichatBoxProps {
    open: boolean,
    onClose: () => void
}
const AichatBox = ({ open, onClose }: AichatBoxProps) => {
    const { error, messages, input, handleInputChange, handleSubmit, setMessages, isLoading } = useChat();
    const lastmessageUser = messages[messages.length - 1]?.role === 'user';
    const inputRef = React.useRef<HTMLInputElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])
    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }

    }, [open])
    return (
        <div className={cn(' p-1 bottom-0 right-0 z-10 w-full max-w-[400px] xl:right-36', open ? 'fixed' : 'hidden')}>

            <button onClick={onClose} className='mb-1 ms-auto block'>
                <XCircle size={30} />
            </button>
            <div className='flex h-[600px] flex-col bg-background border shadow-xl'>

                <div className='h-full mt-3 overflow-y-auto px-3' ref={scrollRef}>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                    {isLoading && lastmessageUser && (
                        <ChatMessage message={{ role: 'assistant', content: 'Loading...' }} />
                    )}
                    {
                        error && <ChatMessage message={{ role: 'assistant', content: "somthing went wrong .Please try again" }} />
                    }
                    {
                        !error && messages.length === 0 &&(
                            <div className='flex items-center justify-center h-full gap-3'>
                                    <Bot />
                                    <p className='text-2xl font-bold'>Chat with AI</p>
                            </div>
                        )
                    }
                </div>
                <form onSubmit={handleSubmit} className=' m-3 flex gap-1'>
                    <Button
                        title='Clear Chat'
                        variant={'outline'}
                        size={'icon'}
                        className='shrink-0'
                        type='button'
                        onClick={() => setMessages([])}
                    >
                        <Trash />
                    </Button>
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder='Type your message...'
                        ref={inputRef}
                    />
                    <Button type='submit'>Send</Button>
                </form>

            </div>

        </div>
    )
}

export default AichatBox


function ChatMessage({ message: { role, content } }: { message: { role: string, content: string } }) {
    const { user } = useUser();
    const isAimessage = role === 'assistant';
    return (
        <div className={cn('mb-3 flex gap-2', isAimessage ? 'justify-start me-5' : 'justify-end ms-5')}>

            {isAimessage && <Bot className='mr-2 shrink-0' size={20} />}
            <p
                className={cn("whitespace-pre-line rounded-md px-3 py-2",
                    isAimessage ? "bg-background" : "bg-primary text-primary-foreground")}
            >
                {content}
            </p>
            {!isAimessage && user?.imageUrl && (
                <Image
                    src={user?.imageUrl}
                    alt='avatar'
                    width={100}
                    height={100}
                    className='rounded-full w-10 h-10 object-cover'
                />
            )}
        </div>

    )
}