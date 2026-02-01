
import React from 'react';
import { FieldType } from '../../types';

interface FieldBarProps {
  onAddField: (type: FieldType) => void;
  fieldTypeIcons: Record<string, any>;
}

const FieldBar: React.FC<FieldBarProps> = ({ onAddField, fieldTypeIcons }) => {
  const fieldTypes = [
    { type: FieldType.TEXT, label: 'TextBox' },
    { type: FieldType.EMAIL, label: 'Email' },
    { type: FieldType.PASSWORD, label: 'Password' },
    { type: FieldType.TEXTAREA, label: 'Text Area' },
    { type: FieldType.DATE, label: 'Date' },
    { type: FieldType.DATETIME, label: 'Date & Time' },
    { type: FieldType.DROPDOWN, label: 'Drop Down' },
    { type: FieldType.CHECKBOX, label: 'CheckBox' },
    { type: FieldType.RADIO, label: 'Radio Button' },
    { type: FieldType.TOGGLE, label: 'Toggle' },
  ];

  return (
    <div className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Field Options</span>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {fieldTypes.map(btn => {
          const Icon = fieldTypeIcons[btn.type];
          return (
            <button key={btn.type} onClick={() => onAddField(btn.type)} className="bg-white hover:bg-indigo-600 border border-slate-100 p-4 rounded-[1.5rem] text-[10px] font-extrabold text-slate-600 hover:text-white flex flex-col items-center gap-2 transition-all shadow-sm active:scale-95 group/btn">
              <Icon size={20} className="text-indigo-500 group-hover/btn:text-white transition-colors" /> {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FieldBar;
