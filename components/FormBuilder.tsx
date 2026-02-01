
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useFormStore } from '../infrastructure/store';
import { FormSchema, FormSection, FormField, FieldType } from '../domain/types';
import { 
  Plus, Settings2, Save, ArrowLeft, Code2, Copy,
  LayoutTemplate, Hash, Calendar, Type, CheckSquare, 
  CircleDot, ToggleLeft, Mail, Lock, Clock, Info
} from 'lucide-react';
import SectionEditor from './builder/SectionEditor';

const FormBuilder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { forms, addForm, updateForm } = useFormStore();
  const [showJson, setShowJson] = useState(false);

  const [form, setForm] = useState<FormSchema>({
    id: uuidv4(),
    title: 'New Dynamic Template',
    description: 'Structure your data collection node.',
    version: 1,
    sections: [{ id: uuidv4(), title: 'Core Attributes', fields: [] }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  useEffect(() => {
    if (id) {
      const existingForm = forms.find(f => f.id === id);
      if (existingForm) setForm(existingForm);
    }
  }, [id, forms]);

  const saveFormTemplate = () => {
    const finalForm = { ...form, updatedAt: Date.now() };
    if (id) {
      updateForm({ ...finalForm, version: finalForm.version + 1 });
    } else {
      addForm(finalForm);
    }
    navigate('/');
  };

  const fieldTypeIcons: Record<string, any> = { [FieldType.TEXT]: Type, [FieldType.EMAIL]: Mail, [FieldType.PASSWORD]: Lock, [FieldType.TEXTAREA]: LayoutTemplate, [FieldType.DATE]: Calendar, [FieldType.DATETIME]: Clock, [FieldType.DROPDOWN]: Hash, [FieldType.CHECKBOX]: CheckSquare, [FieldType.RADIO]: CircleDot, [FieldType.TOGGLE]: ToggleLeft };

  const addSection = () => setForm(prev => ({ ...prev, sections: [...prev.sections, { id: uuidv4(), title: 'New Category', fields: [] }] }));
  const updateSection = (sId: string, data: Partial<FormSection>) => setForm(prev => ({ ...prev, sections: prev.sections.map(s => s.id === sId ? { ...s, ...data } : s) }));
  
  const addField = (sectionId: string, type: FieldType) => {
    const newField: FormField = {
      id: uuidv4(), type, label: `New ${type}`, name: `field_${Date.now()}`,
      required: false, colSpan: 4, validation: {}, placeholder: '',
      defaultValue: type === FieldType.TOGGLE ? false : (type === FieldType.CHECKBOX ? [] : '')
    };
    if ([FieldType.DROPDOWN, FieldType.RADIO, FieldType.CHECKBOX].includes(type)) {
      newField.options = [{ label: 'Option 1', value: 'opt_1' }];
    }
    setForm(prev => ({ ...prev, sections: prev.sections.map(s => s.id === sectionId ? { ...s, fields: [...s.fields, newField] } : s) }));
  };

  const updateField = (sId: string, fId: string, data: Partial<FormField>) => setForm(prev => ({ ...prev, sections: prev.sections.map(s => s.id === sId ? { ...s, fields: s.fields.map(f => f.id === fId ? { ...f, ...data } : f) } : s) }));
  const removeField = (sId: string, fId: string) => setForm(prev => ({ ...prev, sections: prev.sections.map(s => s.id === sId ? { ...s, fields: s.fields.filter(f => f.id !== fId) } : s) }));
  
  const moveField = (sId: string, fId: string, dir: 'up' | 'down') => setForm(prev => ({ ...prev, sections: prev.sections.map(s => {
    if (s.id !== sId) return s;
    const idx = s.fields.findIndex(f => f.id === fId);
    const newF = [...s.fields];
    if (dir === 'up' && idx > 0) [newF[idx-1], newF[idx]] = [newF[idx], newF[idx-1]];
    else if (dir === 'down' && idx < newF.length - 1) [newF[idx+1], newF[idx]] = [newF[idx], newF[idx+1]];
    return { ...s, fields: newF };
  }) }));

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-md pt-4 pb-6 mb-10 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/')} className="p-3.5 hover:bg-white rounded-2xl border border-transparent hover:border-slate-200 transition-all text-slate-500 hover:text-indigo-600 shadow-sm"><ArrowLeft size={22} /></button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{id ? 'Refine Schema' : 'Form Schema'}</h1>
            <p className="text-sm font-semibold text-slate-400 mt-0.5 uppercase tracking-widest">Version {form.version}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowJson(true)} className="bg-white border border-slate-200/60 px-5 py-3 rounded-2xl text-slate-600 font-bold flex items-center gap-2.5 hover:bg-slate-50 transition-all shadow-sm active:scale-95"><Code2 size={18} /> JSON Mode</button>
          <button onClick={saveFormTemplate} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2.5 shadow-xl transition-all active:scale-95"><Save size={18} /> {id ? 'Publish Updates' : 'Publish Template'}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        <div className="xl:col-span-3 space-y-10">
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-xl">
            <div className="flex items-center gap-2.5 mb-8 text-indigo-600 font-black uppercase tracking-widest text-[10px]"><Settings2 size={14} /> Global Schema Intelligence</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2"><label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" /></div>
              <div className="space-y-2"><label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label><input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" /></div>
            </div>
          </section>

          {form.sections.map((section) => (
            <SectionEditor
              key={section.id}
              section={section}
              fieldTypeIcons={fieldTypeIcons}
              onUpdate={(data) => updateSection(section.id, data)}
              onRemove={() => setForm(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== section.id) }))}
              onAddField={(type) => addField(section.id, type)}
              onUpdateField={(fId, data) => updateField(section.id, fId, data)}
              onRemoveField={(fId) => removeField(section.id, fId)}
              onMoveField={(fId, dir) => moveField(section.id, fId, dir)}
              allOtherFields={(curId) => form.sections.flatMap(s => s.fields).filter(f => f.id !== curId)}
            />
          ))}
          <button onClick={addSection} className="w-full py-16 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-slate-400 font-extrabold hover:border-indigo-400 hover:bg-indigo-50/30 hover:text-indigo-600 transition-all shadow-sm">
            <Plus size={48} className="bg-white rounded-2xl p-2 border border-slate-100" /><span className="uppercase tracking-[0.2em] text-xs">Append Logic Section</span>
          </button>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl sticky top-28">
            <h4 className="font-black text-[10px] text-indigo-500 uppercase tracking-[0.2em] mb-6">Template Metadata</h4>
            <div className="p-8 bg-slate-50 rounded-[2rem] mb-6 text-center border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Schema Nodes</p><p className="text-5xl font-black text-slate-900 mt-2 tracking-tighter">{form.sections.reduce((acc, s) => acc + s.fields.length, 0)}</p></div>
          </div>
        </div>
      </div>

      {showJson && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh] border border-slate-200 overflow-hidden">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center"><div><h3 className="text-2xl font-black text-slate-900 tracking-tight">System Object Mapping</h3><p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Version {form.version}</p></div><button onClick={() => setShowJson(false)} className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-all shadow-sm"><Plus size={32} className="rotate-45" /></button></div>
            <div className="p-10 overflow-auto flex-1 bg-slate-900"><pre className="text-sm font-mono text-indigo-300 whitespace-pre-wrap leading-relaxed">{JSON.stringify(form, null, 2)}</pre></div>
            <div className="p-10 bg-white border-t border-slate-100 flex justify-end gap-4">
              <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(form, null, 2)); alert('Schema mapping copied to clipboard.'); }} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg flex items-center gap-3"><Copy size={20} /> Copy Mapping</button>
              <button onClick={() => setShowJson(false)} className="bg-slate-100 text-slate-700 px-10 py-4 rounded-2xl font-bold">Close Viewer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
