
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormSchema, Submission } from '../domain/types';

interface FormState {
  forms: FormSchema[];
  submissions: Submission[];
  addForm: (form: FormSchema) => void;
  updateForm: (form: FormSchema) => void;
  deleteForm: (id: string) => void;
  submitData: (submission: Submission) => void;
  deleteSubmission: (id: string) => void;
  getSubmissionById: (id: string) => Submission | undefined;
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      forms: [],
      submissions: [],
      addForm: (form) => set((state) => ({ 
        forms: [...state.forms, form] 
      })),
      updateForm: (updatedForm) => set((state) => ({
        forms: state.forms.map(f => f.id === updatedForm.id ? updatedForm : f)
      })),
      deleteForm: (id) => set((state) => ({
        forms: state.forms.filter(f => f.id !== id),
        submissions: state.submissions.filter(s => s.formId !== id)
      })),
      submitData: (submission) => set((state) => {
        const index = state.submissions.findIndex(s => s.id === submission.id);
        if (index > -1) {
          const newSubmissions = [...state.submissions];
          newSubmissions[index] = submission;
          return { submissions: newSubmissions };
        }
        return { submissions: [...state.submissions, submission] };
      }),
      deleteSubmission: (id) => set((state) => ({
        submissions: state.submissions.filter(s => s.id !== id)
      })),
      getSubmissionById: (id) => get().submissions.find(s => s.id === id),
    }),
    {
      name: 'form-builder-clean-storage',
    }
  )
);
