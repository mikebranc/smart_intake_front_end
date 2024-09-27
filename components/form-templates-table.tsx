'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'

interface FormTemplate {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  is_current: boolean
}

interface FormTemplatesTableProps {
  templates: FormTemplate[]
  onDelete: (id: string) => void
  onSetCurrent: (id: string) => void
}

export function FormTemplatesTableComponent({ templates, onDelete, onSetCurrent }: FormTemplatesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Template Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Current</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell>{template.name}</TableCell>
            <TableCell>{template.description}</TableCell>
            <TableCell>{new Date(template.created_at).toLocaleString()}</TableCell>
            <TableCell>{new Date(template.updated_at).toLocaleString()}</TableCell>
            <TableCell>{template.is_current ? 'Yes' : 'No'}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/templates/${template.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button variant="destructive" onClick={() => onDelete(template.id)}>Delete</Button>
                {!template.is_current && (
                  <Button variant="outline" onClick={() => onSetCurrent(template.id)}>Set as Current</Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}