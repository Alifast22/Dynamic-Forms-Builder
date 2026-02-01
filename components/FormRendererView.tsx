
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStore } from '../infrastructure/store';
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft, Send, Save, RotateCcw, CheckCircle2, AlertCircle, Layout } from 'lucide-react';
import RenderField from './renderer/RenderField';
import { validateFormSchema, evaluateFieldCondition } from '../domain/logic';

const FormRendererView: React.FC = () => {
  const { id, submissionId } = useParams();
  const navigate = useNavigate();
  const { forms, submitData, submissions, getSubmissionById } = useFormStore();
  
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = forms.find(f => f.id === id);

  useEffect(() => {
    if (submissionId) {
      const existing = getSubmissionById(submissionId);
      if (existing) setFormData(existing.data);
    } else if (formSchema) {
      const templateDrafts = submissions.filter(s => s.formId === id && s.isDraft).sort((a, b) => b.submittedAt - a.submittedAt);
      if (templateDrafts[0]) {
        setFormData(templateDrafts[0].data);
      } else {
        const defaults: Record<string, any> = {};
        formSchema.sections.forEach(s => s.fields.forEach(f => { if (f.defaultValue !== undefined) defaults[f.name] = f.defaultValue; }));
        setFormData(defaults);
      }
    }
  }, [id, submissionId, formSchema, submissions, getSubmissionById]);

  if (!formSchema) return (
    <div className="flex flex-col items-center justify-center py-32">
      <AlertCircle size={64} className="text-rose-500 mb-6" />
      <h2 className="text-3xl font-black">Schema Not Found</h2>
      <button onClick={() => navigate('/')} className="mt-10 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black">Return Home</button>
    </div>
  );

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    
    // Domain logic: validation
    if (!isDraft) {
      const validationErrors = validateFormSchema(formSchema, formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    const finalId = submissionId || (isDraft ? (submissions.find(s => s.formId === id && s.isDraft)?.id || uuidv4()) : uuidv4());
    submitData({ id: finalId, formId: formSchema.id, formVersion: formSchema.version, data: formData, submittedAt: Date.now(), isDraft });
    
    if (isDraft) {
      alert('Draft sync complete.');
    } else {
      setIsSubmitted(true);
      setTimeout(() => navigate('/submissions'), 1800);
    }
  };

  if (isSubmitted) return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="bg-emerald-100 p-8 rounded-[3rem] mb-10"><CheckCircle2 size={96} className="text-emerald-600" /></div>
      <h2 className="text-5xl font-black">Record Committed</h2>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-40 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-6 mb-16">
        <button onClick={() => navigate('/')} className="p-4 bg-white hover:bg-slate-50 border rounded-[1.5rem] text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-5xl font-black text-slate-900 leading-none mb-3">{formSchema.title}</h1>
          <p className="text-slate-400 font-semibold text-lg">{formSchema.description}</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-16">
        {formSchema.sections.map((section) => (
          <div key={section.id} className="bg-white rounded-[3rem] border border-slate-200/60 shadow-xl overflow-hidden">
            <div className="bg-slate-50/50 px-12 py-10 border-b">
              <div className="flex items-center gap-3 text-indigo-500 font-black uppercase tracking-widest text-[10px] mb-2"><Layout size={14} /> Domain Section</div>
              <h2 className="text-3xl font-black text-slate-900">{section.title}</h2>
            </div>
            <div className="p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {section.fields.map(field => evaluateFieldCondition(field, formData) ? (
                  <RenderField 
                    key={field.id} 
                    field={field} 
                    value={formData[field.name]} 
                    error={errors[field.name]}
                    onChange={(val) => { 
                      setFormData(p => ({...p, [field.name]: val})); 
                      if(errors[field.name]) setErrors(p => { const n={...p}; delete n[field.name]; return n; }); 
                    }}
                    onCheckboxChange={(opt, checked) => {
                      const cur = Array.isArray(formData[field.name]) ? [...formData[field.name]] : [];
                      if (checked) { if(!cur.includes(opt)) cur.push(opt); } else { const idx=cur.indexOf(opt); if(idx>-1) cur.splice(idx,1); }
                      setFormData(p => ({...p, [field.name]: cur}));
                    }}
                  />
                ) : null)}
              </div>
            </div>
          </div>
        ))}

        <div className="sticky bottom-10 z-30 bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4 w-full md:w-auto">
            <button type="button" onClick={() => { if(confirm('Reset all values?')) setFormData({}); }} className="flex-1 md:flex-none px-8 py-4 rounded-2xl border text-slate-600 font-black uppercase text-[10px] flex items-center gap-2">
              <RotateCcw size={18} /> Reset
            </button>
            <button type="button" onClick={(e) => handleSubmit(e, true)} className="flex-1 md:flex-none px-8 py-4 rounded-2xl border text-slate-600 font-black uppercase text-[10px] flex items-center gap-2">
              <Save size={18} /> Save Draft
            </button>
          </div>
          <button type="submit" className="w-full md:w-auto px-14 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase text-sm flex items-center justify-center gap-3 shadow-lg active:scale-[0.97]">
            Finalize Submission <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRendererView;
