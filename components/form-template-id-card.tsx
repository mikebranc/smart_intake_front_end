'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

interface FormTemplateIdCardProps {
  templateId: string | number
  templateName: string
}

export default function FormTemplateIdCardComponent({ templateId, templateName }: FormTemplateIdCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Template Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-sm font-medium text-muted-foreground">Template Name</p>
            <p className="text-lg font-medium">{templateName}</p>
          </div>
          <Button asChild variant="outline">
          <Link href={`/templates/${templateId}`}>
            View Template
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}