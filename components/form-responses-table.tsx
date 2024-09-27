'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDistanceToNow } from 'date-fns'

interface FormResponse {
  id: string
  response: string
  template_id: string
  submitted_at: string
}

interface FormResponsesTableProps {
  responses: FormResponse[]
}

export function FormResponsesTableComponent({ responses }: FormResponsesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Response</TableHead>
          <TableHead>Template ID</TableHead>
          <TableHead>Submitted At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {responses.map((response) => (
          <TableRow key={response.id}>
            <TableCell>{`Response ${response.id}`}</TableCell>
            <TableCell>{response.template_id}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(response.submitted_at), { addSuffix: true })}</TableCell>
            <TableCell>
              <Button asChild>
                <Link href={`/responses/${response.id}`}>
                  View Details
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}