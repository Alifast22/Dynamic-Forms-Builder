
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../infrastructure/store';
import { FileText, Plus, Code2, AlertCircle } from 'lucide-react';
import { FormSchema } from '../domain/types';
import FormCard from './dashboard/FormCard';

const FormList: React.FC = () => {
  const { forms, deleteForm, addForm } = useFormStore();
  const navigate = useNavigate();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');

  const handleImportSchema = () => {
    try {
      const parsed: FormSchema = JSON.parse(importJson);
      if (!parsed.id || !parsed.title || !parsed.sections) throw new Error('Invalid schema format.');
      addForm(parsed);
      setIsImportModalOpen(false);
      setImportJson('');
      setImportError('');
    } catch (e: any) {
      setImportError(e.message || 'Failed to parse JSON.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Form Templates</h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">Architect, deploy, and manage schemas.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => setIsImportModalOpen(true)} className="flex-1 md:flex-none bg-white border border-slate-200 px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2.5 hover:bg-slate-50 transition-all shadow-sm"><Code2 size={20} className="text-indigo-600" /> Import JSON</button>
          <button onClick={() => navigate('/create')} className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2.5 shadow-xl transition-all active:scale-95"><Plus size={20} /> Create Template</button>
        </div>
      </div>

      {forms.length === 0 ? (
        <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-24 text-center">
          <div className="bg-indigo-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><FileText size={48} className="text-indigo-200" /></div>
          <h3 className="text-2xl font-bold text-slate-800">Your workspace is empty</h3>
          <button onClick={() => navigate('/create')} className="mt-10 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Get Started</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.map((form) => (
            <FormCard 
              key={form.id} 
              form={form} 
              onDelete={(id) => { deleteForm(id); }} 
            />
          ))}
        </div>
      )}

      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl flex flex-col border border-slate-200 overflow-hidden">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50/50"><h3 className="text-2xl font-black text-slate-900">Inject Schema</h3><button onClick={() => setIsImportModalOpen(false)}><Plus size={24} className="rotate-45 text-slate-400" /></button></div>
            <div className="p-8 space-y-4"><textarea className="w-full h-64 p-5 bg-slate-900 text-indigo-300 font-mono text-xs rounded-2xl focus:outline-none" value={importJson} onChange={(e) => setImportJson(e.target.value)} placeholder='{ "id": "uuid", ... }' />{importError && <div className="text-rose-500 font-bold text-xs flex items-center gap-2"><AlertCircle size={16} /> {importError}</div>}</div>
            <div className="p-8 bg-slate-50 border-t flex justify-end gap-4"><button onClick={() => setIsImportModalOpen(false)} className="px-6 py-3 font-bold text-slate-600">Cancel</button><button onClick={handleImportSchema} disabled={!importJson.trim()} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold disabled:opacity-50 shadow-lg active:scale-95 transition-all">Verify & Import</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormList;
