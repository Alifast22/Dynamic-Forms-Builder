
import React from 'react';
import { FormSection, FormField, FieldType } from '../../types';
import { GripVertical, Trash2 } from 'lucide-react';
import FieldCard from './FieldCard';
import FieldBar from './FieldBar';

interface SectionEditorProps {
  section: FormSection;
  onUpdate: (data: Partial<FormSection>) => void;
  onRemove: () => void;
  onAddField: (type: FieldType) => void;
  onUpdateField: (fieldId: string, data: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  onMoveField: (fieldId: string, dir: 'up' | 'down') => void;
  allOtherFields: (curId: string) => FormField[];
  fieldTypeIcons: Record<string, any>;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ 
  section, onUpdate, onRemove, onAddField, 
  onUpdateField, onRemoveField, onMoveField, 
  allOtherFields, fieldTypeIcons 
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl overflow-hidden">
      <div className="bg-slate-50/50 px-10 py-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 bg-white rounded-xl border border-slate-100 text-slate-300"><GripVertical size={20} /></div>
          <input 
            type="text" 
            value={section.title} 
            onChange={(e) => onUpdate({ title: e.target.value })} 
            className="bg-transparent text-xl font-black text-slate-900 focus:outline-none w-full" 
          />
        </div>
        <button onClick={onRemove} className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {section.fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              icon={fieldTypeIcons[field.type]}
              onUpdate={(data) => onUpdateField(field.id, data)}
              onRemove={() => onRemoveField(field.id)}
              onMove={(dir) => onMoveField(field.id, dir)}
              allOtherFields={allOtherFields(field.id)}
            />
          ))}
        </div>
        <FieldBar onAddField={onAddField} fieldTypeIcons={fieldTypeIcons} />
      </div>
    </div>
  );
};

export default SectionEditor;
