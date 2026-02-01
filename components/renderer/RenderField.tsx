
import React from 'react';
import { FormField, FieldType } from '../../types';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface RenderFieldProps {
  field: FormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onCheckboxChange: (val: string, checked: boolean) => void;
}

const RenderField: React.FC<RenderFieldProps> = ({ field, value, error, onChange, onCheckboxChange }) => {
  return (
    <div className={`col-span-1 md:col-span-${field.colSpan} space-y-3`} data-has-error={!!error}>
      <label className="block text-sm font-black text-slate-700 ml-1 flex items-center gap-1.5 uppercase tracking-wider">
        {field.label} {field.required && <span className="text-rose-500 text-lg leading-none">*</span>}
      </label>
      <div className="relative">
        {field.type === FieldType.TEXTAREA ? (
          <textarea
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-6 py-5 bg-slate-50/50 border-2 rounded-[2rem] outline-none transition-all resize-none min-h-[160px] font-medium ${error ? 'border-rose-400' : 'border-slate-100 focus:border-indigo-500'}`}
          />
        ) : field.type === FieldType.DROPDOWN ? (
          <div className="relative group">
            <select
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full px-6 py-5 bg-slate-50/50 border-2 rounded-2xl outline-none appearance-none cursor-pointer font-bold text-slate-700 ${error ? 'border-rose-400' : 'border-slate-100 focus:border-indigo-500'}`}
            >
              <option value="" disabled>Choose Implementation...</option>
              {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><ChevronRight size={20} className="rotate-90" /></div>
          </div>
        ) : field.type === FieldType.TOGGLE ? (
          <div className="flex items-center gap-4 py-3 px-6 bg-slate-50/50 rounded-2xl border-2 border-slate-100 w-fit">
            <button type="button" onClick={() => onChange(!value)} className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ${value ? 'bg-indigo-600' : 'bg-slate-300'}`}>
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${value ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className="font-black text-xs text-slate-500 uppercase tracking-widest">{value ? 'On' : 'Off'}</span>
          </div>
        ) : field.type === FieldType.RADIO ? (
          <div className="flex flex-col gap-3 mt-2">
            {field.options?.map(opt => (
              <label key={opt.value} className={`flex items-center gap-4 cursor-pointer p-5 rounded-2xl border-2 transition-all ${value === opt.value ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50/50 border-slate-100'}`}>
                <input type="radio" checked={value === opt.value} onChange={() => onChange(opt.value)} className="w-5 h-5 text-indigo-600" />
                <span className={`text-sm font-bold ${value === opt.value ? 'text-indigo-700' : 'text-slate-600'}`}>{opt.label}</span>
              </label>
            ))}
          </div>
        ) : field.type === FieldType.CHECKBOX ? (
          <div className="flex flex-col gap-3 mt-2">
            {field.options?.map(opt => (
              <label key={opt.value} className={`flex items-center gap-4 cursor-pointer p-5 rounded-2xl border-2 transition-all ${(value || []).includes(opt.value) ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50/50 border-slate-100'}`}>
                <input type="checkbox" checked={(value || []).includes(opt.value)} onChange={(e) => onCheckboxChange(opt.value, e.target.checked)} className="w-5 h-5 text-indigo-600 rounded-lg" />
                <span className={`text-sm font-bold ${(value || []).includes(opt.value) ? 'text-indigo-700' : 'text-slate-600'}`}>{opt.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-6 py-5 bg-slate-50/50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-800 ${error ? 'border-rose-400' : 'border-slate-100 focus:border-indigo-500'}`}
          />
        )}
      </div>
      {error && <p className="text-rose-500 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 ml-1"><AlertCircle size={14} /> {error}</p>}
    </div>
  );
};

export default RenderField;
