'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormField {
  field_name: string
  value: string
}

interface FormDetailsCardProps {
  fields: FormField[]
}

export default function FormDetailsCardComponent({ fields }: FormDetailsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Form Response Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.field_name} className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-500">{field.field_name}</dt>
              <dd className="mt-1 text-gray-900">{field.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}