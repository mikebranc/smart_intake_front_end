'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConversationEntry {
  id: number
  voice_input: string
  assistant_response: string
  created_at: string
}

interface ConversationSectionProps {
  entries: ConversationEntry[]
}

export default function ConversationSectionComponent({ entries }: ConversationSectionProps) {
  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Conversation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <React.Fragment key={entry.id}>
              {entry.voice_input && (
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-lg p-3 bg-green-100 text-green-900">
                    <p className="text-sm font-semibold">User</p>
                    <p>{entry.voice_input}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(entry.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {entry.assistant_response && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-lg p-3 bg-blue-100 text-blue-900">
                    <p className="text-sm font-semibold">Agent</p>
                    <p>{entry.assistant_response}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(entry.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}