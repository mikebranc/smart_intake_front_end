'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormTemplateCreate, FormFieldCreate, FieldType } from '../../types'
import { FormTemplateDetailPageComponent } from '../../../components/form-template-detail-page'

export default function NewFormTemplate() {
  const router = useRouter()
  const [template, setTemplate] = useState<FormTemplateCreate>({
    name: '',
    description: '',
    is_current: false,
    fields: []
  })

  const addField = () => {
    setTemplate(prev => ({
      ...prev,
      fields: [...prev.fields, { name: '', description: '', field_type: FieldType.STRING, required: false, order: prev.fields.length, options: [] }]
    }))
  }

  const addOption = (fieldIndex: number) => {
    setTemplate(prev => {
      const newFields = [...prev.fields]
      if (!newFields[fieldIndex].options) {
        newFields[fieldIndex].options = []
      }
      newFields[fieldIndex].options.push('')
      return { ...prev, fields: newFields }
    })
  }

  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    setTemplate(prev => {
      const newFields = [...prev.fields]
      if (!newFields[fieldIndex].options) {
        newFields[fieldIndex].options = []
      }
      newFields[fieldIndex].options[optionIndex] = value
      return { ...prev, fields: newFields }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submissionTemplate = {
        ...template,
        fields: template.fields.map(field => {
          if (field.field_type === FieldType.RADIO || field.field_type === FieldType.CHECKBOX) {
            // Ensure options is an array and filter out empty strings
            return {
              ...field,
              options: field.options?.filter(option => option.trim() !== '') || []
            };
          } else {
            // For non-RADIO and non-CHECKBOX fields, remove the options
            const { options, ...fieldWithoutOptions } = field;
            return fieldWithoutOptions;
          }
        })
      };

      console.log('Submitting template:', JSON.stringify(submissionTemplate, null, 2));

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionTemplate)
      });

      if (res.ok) {
        router.push('/templates');
      } else {
        const errorData = await res.json();
        console.error('Failed to create template:', res.status, errorData);
        // You might want to show this error to the user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show this error to the user
    }
  }

  return (
    <FormTemplateDetailPageComponent
      template={template}
      setTemplate={setTemplate}
      addField={addField}
      addOption={addOption}
      updateOption={updateOption}
      handleSubmit={handleSubmit}
    />
  )
}