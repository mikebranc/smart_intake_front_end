import { FormResponse, Thread, PhoneMessage } from '../../types'
import { FormDetailsPageComponent } from '../../../components/form-details-page'

async function getFormResponse(id: string): Promise<FormResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/responses/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch form response')
  }
  return res.json()
}

async function getThread(threadId: number): Promise<Thread> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/threads/${threadId}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch thread')
  }
  const thread = await res.json()
  return thread // Assuming there's only one thread per form response
}

async function getThreadMessages(threadId: number): Promise<PhoneMessage[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/threads/${threadId}/messages`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch thread messages')
  }
  return res.json()
}

export default async function FormResponseDetail({ params }: { params: { id: string } }) {
  const response = await getFormResponse(params.id)
  const thread = await getThread(response.thread_id)
  const messages = await getThreadMessages(thread.id)

  return (
    <FormDetailsPageComponent response={response} thread={thread} messages={messages} />
  )
}