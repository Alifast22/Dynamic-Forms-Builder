
import React from 'react';
import { FormField, FieldType } from '../../types';
import { 
  Trash2, MoveUp, MoveDown, Info, 
  ShieldCheck, Zap, Plus
} from 'lucide-react';

interface FieldCardProps {
  field: FormField;
  onUpdate: (data: Partial<FormField>) => void;
  onRemove: () => void;
  onMove: (dir: 'up' | 'down') => void;
  allOtherFields: FormField[];
  icon: any;
}

const FieldCard: React.FC<FieldCardProps> = ({ field, onUpdate, onRemove, onMove, allOtherFields, icon: Icon }) => {
  const innerGridClass = field.colSpan === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className={`group relative p-6 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:border-indigo-200 hover:bg-white hover:shadow-xl transition-all col-span-1 md:col-span-${field.colSpan}`}>
      <div className="flex items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="flex-shrink-0 p-2 bg-white rounded-xl border border-slate-100 text-indigo-500 shadow-sm">
            <Icon size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">{field.type}</span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onMove('up')} className="p-1.5 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-indigo-600 transition-colors shadow-sm"><MoveUp size={12} /></button>
          <button onClick={() => onMove('down')} className="p-1.5 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-indigo-600 transition-colors shadow-sm"><MoveDown size={12} /></button>
          <button onClick={onRemove} className="p-1.5 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-rose-500 transition-colors shadow-sm"><Trash2 size={12} /></button>
        </div>
      </div>

      <div className="space-y-5">
        <div className={`grid grid-cols-1`}>
          <div className="space-y-1.5 min-w-0">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1 whitespace-nowrap"><Info size={10} /> Label</label>
            <input type="text" value={field.label} onChange={(e) => onUpdate({ label: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-300" placeholder="Display Label" />
          </div>
        </div>

        <div className={`grid gap-4 ${innerGridClass}`}>
          <div className="space-y-1.5 min-w-0">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Placeholder</label>
            <input type="text" value={field.placeholder || ''} onChange={(e) => onUpdate({ placeholder: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 focus:outline-none focus:border-indigo-300" placeholder="Hint text..." />
          </div>
          <div className="space-y-1.5 min-w-0">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Default Value</label>
            {field.type === FieldType.TOGGLE ? (
              <button onClick={() => onUpdate({ defaultValue: !field.defaultValue })} className={`w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider transition-all ${field.defaultValue ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400'}`}>
                {field.defaultValue ? 'True' : 'False'}
              </button>
            ) : (
              <input type="text" value={field.defaultValue || ''} onChange={(e) => onUpdate({ defaultValue: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-300" />
            )}
          </div>
        </div>

        <div className={`grid gap-4 ${innerGridClass}`}>
          <div className="space-y-1.5 min-w-0">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Layout Span</label>
            <select value={field.colSpan} onChange={(e) => onUpdate({ colSpan: parseInt(e.target.value) as any })} className="text-xs w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold outline-none">
              <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option>
            </select>
          </div>
          <div className="flex items-end pb-1.5 min-w-0">
            <label className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer group/req">
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${field.required ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                {field.required && <Plus size={14} className="text-white rotate-45" />}
                <input type="checkbox" className="hidden" checked={field.required} onChange={(e) => onUpdate({ required: e.target.checked })} />
              </div>
              Required
            </label>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 space-y-4">
          {[FieldType.TEXT, FieldType.TEXTAREA].includes(field.type) && (
          <div> 
          <p className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest"><ShieldCheck size={12} /> Policy Enforcement</p>
          <div className={`grid gap-4 ${innerGridClass}`}>
            <input type="number" placeholder="Min" value={field.validation?.min ?? ''} onChange={(e) => onUpdate({ validation: { ...field.validation, min: parseInt(e.target.value) || undefined } })} className="w-full text-xs bg-white border border-slate-100 rounded-xl px-3 py-1.5 font-bold" />
            <input type="number" placeholder="Max" value={field.validation?.max ?? ''} onChange={(e) => onUpdate({ validation: { ...field.validation, max: parseInt(e.target.value) || undefined } })} className="w-full text-xs bg-white border border-slate-100 rounded-xl px-3 py-1.5 font-bold" />
          </div>
          </div>)}
          <div className="space-y-1.5 pt-1">
            <p className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1"><Zap size={12} /> Render Logic</p>
            <select value={field.condition?.field ?? ''} onChange={(e) => onUpdate({ condition: e.target.value ? { field: e.target.value, operator: 'equals', value: '' } : undefined })} className="w-full text-xs bg-white border border-slate-100 rounded-xl px-3 py-1.5 font-bold">
              <option value="">No dependency</option>
              {allOtherFields.map(f => <option key={f.id} value={f.name}>If [{f.label}]</option>)}
            </select>
            {field.condition && (
               <input type="text" placeholder="Target Value..." value={field.condition.value ?? ''} onChange={(e) => onUpdate({ condition: { ...field.condition!, value: e.target.value } })} className="w-full text-xs bg-white border border-slate-100 rounded-xl px-3 py-1.5 font-bold mt-2" />
            )}
          </div>
        </div>

        {[FieldType.DROPDOWN, FieldType.RADIO, FieldType.CHECKBOX].includes(field.type) && (
          <div className="mt-4 pt-5 border-t border-slate-100 space-y-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Option Payload</p>
            {field.options?.map((opt, oIdx) => (
              <div key={oIdx} className="flex gap-2 items-center">
                <input className="text-xs w-full border border-slate-100 bg-white px-3 py-2 rounded-xl" value={opt.label} onChange={(e) => {
                  const n = [...(field.options || [])];
                  n[oIdx].label = e.target.value;
                  n[oIdx].value = e.target.value.toLowerCase().replace(/\s+/g, '_');
                  onUpdate({ options: n });
                }} />
                <button onClick={() => {
                  const n = field.options?.filter((_, idx) => idx !== oIdx);
                  onUpdate({ options: n });
                }} className="p-2 text-rose-300 hover:text-rose-50 bg-white border border-slate-100 rounded-xl"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => {
              const n = [...(field.options || []), { label: 'New Option', value: 'opt_'+Date.now() }];
              onUpdate({ options: n });
            }} className="w-full py-2.5 border border-dashed border-indigo-100 text-indigo-500 text-[9px] font-black uppercase rounded-xl transition-all hover:bg-indigo-50/50">+ Add Entity</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldCard;
