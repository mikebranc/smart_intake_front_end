'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import FormDetailsCard from './form-details-card'
import ConversationSection from './conversation-section'
import FormTemplateIdCardComponent from './form-template-id-card'

interface FormDetailsPageComponentProps {
  response: any;
  thread: any;
  messages: any[];
}

export function FormDetailsPageComponent({ response, thread, messages }: FormDetailsPageComponentProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Button
        variant="outline"
        onClick={() => router.push('/responses')}
        className="flex items-center mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Responses
      </Button>
      <h1 className="text-3xl font-bold mb-6">Form Response Details</h1>
      <FormDetailsCard fields={response.field_values} />
      <FormTemplateIdCardComponent templateId={response.template_id} templateName={response.template_name} />
      <ConversationSection entries={messages} />
    </div>
  )
}