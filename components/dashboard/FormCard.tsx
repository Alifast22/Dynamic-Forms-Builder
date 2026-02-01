
import React from 'react';
import { FormSchema } from '../../types';
import { FileText, Clock, Play, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormCardProps {
  form: FormSchema;
  onDelete: (id: string) => void;
}

const FormCard: React.FC<FormCardProps> = ({ form, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200/60 p-8 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all group relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100/50 text-indigo-600">
          <FileText size={28} />
        </div>
        <div className="text-[10px] font-black text-slate-400 bg-slate-100/80 px-2.5 py-1.5 rounded-lg uppercase tracking-wider">
          v{form.version}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{form.title}</h3>
      <p className="text-slate-500 text-sm mb-8 line-clamp-2 min-h-[40px] leading-relaxed font-medium">{form.description}</p>
      
      <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 mt-auto">
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-slate-300" />
          <span>Modified {new Date(form.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-slate-200"></div>
          <span>{form.sections.reduce((acc, s) => acc + s.fields.length, 0)} Nodes</span>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-slate-50">
        <button
          onClick={() => navigate(`/render/${form.id}`)}
          className="flex-[2] bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <Play size={16} fill="currentColor" /> Deploy
        </button>
        <button
          onClick={() => navigate(`/edit/${form.id}`)}
          className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
        >
          <Edit size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(form.id)}
          className="bg-rose-50 text-rose-500 hover:bg-rose-100 px-3 py-2.5 rounded-xl transition-all active:scale-95"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default FormCard;
