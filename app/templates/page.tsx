'use client'
import { useState, useEffect } from 'react'
import { FormTemplate } from '../types'
import { FormTemplatesTableComponent } from '../../components/form-templates-table'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

async function getFormTemplates(): Promise<FormTemplate[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch form templates')
  }
  return res.json()
}

export default function FormTemplates() {
  const [templates, setTemplates] = useState<FormTemplate[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates`, { cache: 'no-store' })
        if (!res.ok) {
          throw new Error('Failed to fetch form templates')
        }
        const data = await res.json()
        setTemplates(data)
      } catch (err) {
        console.error('Error fetching templates:', err)
        setError('Failed to load templates. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const onDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete form template');
      }
      // Refresh the templates list after successful deletion
      const updatedTemplates = await getFormTemplates();
      // You'll need to implement a way to update the state with the new templates
      console.log('Template deleted successfully');
    } catch (error) {
      console.error('Error deleting template:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  }

  const onSetCurrent = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_current: true }),
      });

      if (!res.ok) {
        throw new Error('Failed to set current template');
      }

      const updatedTemplate = await res.json();
      console.log('Template set as current successfully:', updatedTemplate);

      // Refresh the templates list after updating
      const updatedTemplates = await getFormTemplates();
      // You'll need to implement a way to update the state with the new templates
    } catch (error) {
      console.error('Error setting current template:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Form Templates</h1>
        <Link href="/templates/new">
          <Button>Create New Template</Button>
        </Link>
      </div>
      <FormTemplatesTableComponent templates={templates} onDelete={onDelete} onSetCurrent={onSetCurrent} />
    </div>
  )
}