import { FormTemplate } from '../../types'
import { FormTemplateDetailPageComponent } from '../../../components/form-template-detail-page'

async function getFormTemplate(id: string): Promise<FormTemplate> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forms/templates/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch form template')
  }
  return res.json()
}

export default async function FormTemplateDetail({ params }: { params: { id: string } }) {
  const template = await getFormTemplate(params.id)

  return (
    <FormTemplateDetailPageComponent template={template} />
  )
}
