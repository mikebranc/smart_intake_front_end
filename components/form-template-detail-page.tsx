'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const fieldTypeOptions = [
  { value: 'string', label: 'String' },
  { value: 'integer', label: 'Integer' },
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox (True/False)' },
  { value: 'date', label: 'Date' },
]

const formSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional(),
  is_current: z.boolean(),
  fields: z.array(z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Field name is required'),
    description: z.string().optional(),
    field_type: z.enum(['string', 'integer', 'radio', 'checkbox', 'date']),
    options: z.union([
      z.array(z.string()),
      z.string(),
      z.null()
    ]).optional(),
    order: z.number(),
  })).min(1, 'At least one field is required'),
})

type FormValues = z.infer<typeof formSchema>

interface FormTemplateDetailPageProps {
  template?: FormValues & { id: string }
}

export function FormTemplateDetailPageComponent({ template }: FormTemplateDetailPageProps) {
  const router = useRouter()
  const [showOptions, setShowOptions] = useState<boolean[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, control, handleSubmit, formState: { errors }, watch, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: template || {
      name: '',
      description: '',
      is_current: false,
      fields: [{ name: '', description: '', field_type: 'string', order: 0 }],
    },
  })

  useEffect(() => {
    if (template) {
      reset({
        ...template,
        fields: template.fields.map(field => ({
          ...field,
          id: field.id || undefined
        }))
      })
      setShowOptions(template.fields.map(field => field.field_type === 'radio'))
    }
  }, [template, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  })

  const onSubmit = async (data: FormValues) => {
    console.log('onSubmit called with data:', data)
    setIsSubmitting(true)
    setError(null)

    const processedData = {
      ...data,
      fields: data.fields.map(field => ({
        ...field,
        id: field.id || undefined,
        options: field.field_type === 'radio' 
          ? (typeof field.options === 'string' 
              ? field.options.split(',').map(opt => opt.trim())
              : field.options || [])
          : null
      }))
    }

    try {
      let response;
      if (template?.id) {
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates/${template.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processedData),
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processedData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to submit form: ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log(template?.id ? 'Template updated:' : 'New template created:', result);
      router.push('/templates'); // Redirect to templates page after successful submission
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(`An error occurred while submitting the form: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleButtonClick = () => {
    console.log('handleButtonClick called')
    handleSubmit(
      (data) => {
        console.log('Form is valid, calling onSubmit');
        onSubmit(data);
      },
      (errors) => {
        console.log('Form validation failed:', errors);
        setError('Please correct the errors in the form before submitting.');
      }
    )();
  }

  const watchFieldArray = watch('fields')
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }))

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="outline"
        onClick={() => router.push('/templates')}
        className="flex items-center mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
      </Button>
      <h1 className="text-3xl font-bold mb-6">
        {template ? 'Edit Form Template' : 'Create Form Template'}
      </h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Template Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} />
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="is_current"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="is_current"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="is_current">Set as current template</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {controlledFields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Field {index + 1}</h3>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Label htmlFor={`fields.${index}.name`}>Field Name</Label>
                  <Input {...register(`fields.${index}.name` as const)} />
                  {errors.fields?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.fields[index]?.name?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`fields.${index}.description`}>Description</Label>
                  <Input {...register(`fields.${index}.description` as const)} />
                </div>
                <div>
                  <Label htmlFor={`fields.${index}.field_type`}>Field Type</Label>
                  <Controller
                    name={`fields.${index}.field_type` as const}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={(value) => {
                        field.onChange(value)
                        setShowOptions(prev => {
                          const newShowOptions = [...prev]
                          newShowOptions[index] = value === 'radio'
                          return newShowOptions
                        })
                      }} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select field type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {showOptions[index] && (
                  <div>
                    <Label htmlFor={`fields.${index}.options`}>Options (comma-separated)</Label>
                    <Input
                      {...register(`fields.${index}.options` as const)}
                      placeholder="Option 1, Option 2, Option 3"
                    />
                  </div>
                )}
                <Input
                  type="hidden"
                  {...register(`fields.${index}.order` as const)}
                  value={index}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ name: '', description: '', field_type: 'string', order: fields.length })}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Field
            </Button>
          </CardContent>
        </Card>

        <Button 
          type="button" 
          className="w-full" 
          disabled={isSubmitting}
          onClick={handleButtonClick}
        >
          {isSubmitting ? 'Submitting...' : (template ? 'Update Template' : 'Create Template')}
        </Button>
      </form>
    </div>
  )
}