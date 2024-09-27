import { FormResponse } from '../types'
import { FormResponsesTableComponent } from '../../components/form-responses-table'

async function getFormResponses(): Promise<FormResponse[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/responses`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch form responses')
  }
  return res.json()
}

export default async function FormResponses() {
  const responses = await getFormResponses()
  
  // Sort responses by submission date (most recent first)
  const sortedResponses = responses.sort((a, b) => 
    new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Form Responses</h1>
      <FormResponsesTableComponent responses={sortedResponses} />
    </div>
  )
}