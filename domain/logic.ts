
import { FormField, FormSchema } from './types';

/**
 * Business Rule: Evaluate if a field should be visible based on conditions
 */
export const evaluateFieldCondition = (field: FormField, formData: Record<string, any>): boolean => {
  if (!field.condition) return true;
  
  const actualValue = formData[field.condition.field];
  const targetValue = field.condition.value;

  switch (field.condition.operator) {
    case 'equals': 
      return String(actualValue) === String(targetValue);
    case 'notEquals': 
      return String(actualValue) !== String(targetValue);
    case 'contains': 
      return String(actualValue || '').toLowerCase().includes(String(targetValue).toLowerCase());
    default: 
      return true;
  }
};

/**
 * Business Rule: Validate form data against schema constraints
 */
export const validateFormSchema = (schema: FormSchema, formData: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  schema.sections.forEach(section => {
    section.fields.forEach(field => {
      // First, check if the field is even active (conditional logic)
      if (!evaluateFieldCondition(field, formData)) return;

      const val = formData[field.name];

      // Required check
      const isEmpty = val === undefined || val === '' || val === null || (Array.isArray(val) && val.length === 0);
      if (field.required && isEmpty) {
        errors[field.name] = field.validation?.message || `${field.label} is required`;
        return;
      }

      // Min/Max constraints
      if (!isEmpty && typeof val === 'string') {
        if (field.validation?.min !== undefined && val.length < field.validation.min) {
          errors[field.name] = `${field.label} must be at least ${field.validation.min} characters`;
        }
        if (field.validation?.max !== undefined && val.length > field.validation.max) {
          errors[field.name] = `${field.label} cannot exceed ${field.validation.max} characters`;
        }
      }
    });
  });

  return errors;
};
