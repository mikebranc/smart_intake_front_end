export enum FieldType {
  STRING = "string",
  INTEGER = "integer",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  DATE = "date"
}

export interface FormField {
  id: number
  template_id: number
  name: string
  description?: string
  field_type: FieldType
  options?: string[]
  required: boolean
  order: number
}

export interface FormTemplate {
  id: number
  name: string
  description?: string
  is_current: boolean
  created_at: string
  updated_at: string
  fields: FormField[]
}

export interface FormTemplateCreate {
  name: string
  description?: string
  is_current: boolean
  fields: FormFieldCreate[]
}

export interface FormFieldCreate {
  name: string;
  description?: string;
  field_type: FieldType;
  options?: string[];
  required: boolean;
  order: number;
}

export interface FormFieldValue {
  id: number
  response_id: number
  field_id: number
  value: string
}

export interface FormResponse {
  id: number
  template_id: number
  submitted_at: string
  field_values: FormFieldValue[]
}

export interface Thread {
  id: number
  created_at: string
  updated_at: string
  completed: boolean
  form_id?: number
  transcript?: string
}

export interface PhoneMessage {
  id: number
  thread_id: number
  voice_input: string
  assistant_response: string
  created_at: string
}