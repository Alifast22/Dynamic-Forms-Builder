
export enum FieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  DATE = 'date',
  DATETIME = 'datetime-local',
  DROPDOWN = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TOGGLE = 'toggle'
}

export interface ValidationRule {
  pattern?: string;
  min?: number;
  max?: number;
  message?: string;
}

export interface Condition {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains';
  value: any;
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: any;
  options?: FieldOption[];
  colSpan: 1 | 2 | 3 | 4;
  validation?: ValidationRule;
  condition?: Condition;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  version: number;
  sections: FormSection[];
  createdAt: number;
  updatedAt: number;
}

export interface Submission {
  id: string;
  formId: string;
  formVersion: number;
  data: Record<string, any>;
  submittedAt: number;
  isDraft: boolean;
}
