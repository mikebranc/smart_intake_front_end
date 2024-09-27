'use client';

import { FormTemplate } from '../types'
import Link from 'next/link'
import { useState } from 'react'

// async function setCurrentTemplate(id: number): Promise<void> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates/${id}/set-current`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   })
//   if (!res.ok) {
//     throw new Error('Failed to set current template')
//   }
// }

export default function TemplateList({ templates: initialTemplates }: { templates: FormTemplate[] }) {
  const [templates, setTemplates] = useState(initialTemplates);

//   const handleSetCurrent = async (id: number) => {
//     await setCurrentTemplate(id);
//     setTemplates(templates.map(template => ({
//       ...template,
//       is_current: template.id === id
//     })));
//   };

  return (
    <>
      <ul>
        {templates.map((template) => (
          <li key={template.id} className="mb-2">
            <Link href={`/templates/${template.id}`}>
              {template.name} - {template.is_current ? '(Current)' : ''}
            </Link>
            {/* {!template.is_current && (
              <button
                onClick={() => handleSetCurrent(template.id)}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
              >
                Set as Current
              </button>
            )} */}
          </li>
        ))}
      </ul>
      <Link href="/templates/new" className="mt-4 inline-block">Create New Template</Link>
    </>
  )
}