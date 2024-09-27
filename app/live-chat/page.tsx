'use client'
// for demo purposes, we'll fetch the latest thread and messages every 3 seconds, probably would get rid of this page all together in prod
import { useEffect, useState } from 'react'
import { Thread, PhoneMessage } from '../types'
import ConversationSectionComponent from '@/components/conversation-section'
import { parseISO, compareDesc } from 'date-fns'

async function getLatestThread(): Promise<Thread> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/threads`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch threads')
  }
  const threads: Thread[] = await res.json()
  
  // Sort threads by created_at in descending order (most recent first)
  const sortedThreads = threads.sort((a, b) => 
    compareDesc(parseISO(a.created_at), parseISO(b.created_at))
  )
  
  if (sortedThreads.length === 0) {
    throw new Error('No threads found')
  }
  
  return sortedThreads[0] // Return the most recent thread
}

async function getThreadMessages(threadId: number): Promise<PhoneMessage[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/threads/${threadId}/messages`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch thread messages')
  }
  return res.json()
}

export default function LiveChatPage() {
  const [messages, setMessages] = useState<PhoneMessage[]>([])

  useEffect(() => {
    const fetchLatestMessages = async () => {
      try {
        const latestThread = await getLatestThread()
        const latestMessages = await getThreadMessages(latestThread.id)
        setMessages(latestMessages)
      } catch (error) {
        console.error('Error fetching latest messages:', error)
      }
    }

    // Fetch messages immediately
    fetchLatestMessages()

    // Set up interval to fetch messages every 3 seconds
    const intervalId = setInterval(fetchLatestMessages, 3000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Live Chat</h1>
      <ConversationSectionComponent entries={messages} />
    </div>
  )
}