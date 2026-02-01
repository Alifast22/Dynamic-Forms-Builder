
import React from 'react';
import { Submission, FormSchema } from '../../types';
import { Tag, Calendar, ExternalLink, Edit, Trash2 } from 'lucide-react';

interface SubmissionRowProps {
  submission: Submission;
  form?: FormSchema;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const SubmissionRow: React.FC<SubmissionRowProps> = ({ submission, form, onView, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-indigo-50/30 transition-all group">
      <td className="px-10 py-8">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 border border-indigo-100/50">
            <Tag size={20} />
          </div>
          <div>
            <p className="font-black text-slate-900 text-lg leading-none">{form?.title || 'System Orphan'}</p>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-2">Architecture v{submission.formVersion}</p>
          </div>
        </div>
      </td>
      <td className="px-10 py-8">
        <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
          submission.isDraft ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {submission.isDraft ? 'Draft Sync' : 'Finalized'}
        </span>
      </td>
      <td className="px-10 py-8">
        <div className="flex items-center gap-2.5 text-slate-600 font-bold text-sm">
          <Calendar size={16} className="text-slate-300" />
          {new Date(submission.submittedAt).toLocaleDateString()}
        </div>
      </td>
      <td className="px-10 py-8">
        <code className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-xl text-[11px] font-mono font-black">
          {submission.id.slice(0, 12).toUpperCase()}
        </code>
      </td>
      <td className="px-10 py-8 text-right">
        <div className="flex items-center justify-end gap-3">
          <button onClick={onView} className="p-3 text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm"><ExternalLink size={20} /></button>
          <button onClick={onEdit} className="p-3 text-slate-500 hover:bg-white rounded-xl transition-all shadow-sm"><Edit size={20} /></button>
          <button onClick={onDelete} className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-95"><Trash2 size={20} /></button>
        </div>
      </td>
    </tr>
  );
};

export default SubmissionRow;
