
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../infrastructure/store';
import { Search, Filter, Database, Clock, Plus, Edit } from 'lucide-react';
import SubmissionRow from './submissions/SubmissionRow';

const SubmissionsList: React.FC = () => {
  const { submissions, forms, deleteSubmission } = useFormStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const filtered = submissions.filter(s => {
    const form = forms.find(f => f.id === s.formId);
    if (!form) return false;
    return form.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-end">
        <div><h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Records Ledger</h1><p className="text-slate-500 mt-2 text-lg font-medium">Audit and manage all data collected.</p></div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-[1.5rem] border border-slate-200/60 shadow-sm">
           <div className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl"><span className="text-xs font-black uppercase tracking-widest">Total Committed</span><p className="text-2xl font-black">{submissions.length}</p></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} /><input type="text" placeholder="Filter records..." className="w-full pl-16 pr-6 py-5 bg-white border rounded-[2rem] outline-none font-bold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <button className="px-10 py-5 bg-white border rounded-[2rem] font-black flex items-center gap-2.5 shadow-sm active:scale-95 transition-all"><Filter size={24} /> <span className="text-sm uppercase tracking-widest">Refine</span></button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-32 rounded-[3rem] border border-slate-200 text-center shadow-xl"><div className="bg-slate-50 w-28 h-28 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><Database size={56} className="text-slate-200" /></div><h3 className="text-3xl font-black">No signals detected</h3></div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-50/50 border-b text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"><th className="px-10 py-6">Source Template</th><th className="px-10 py-6">Status</th><th className="px-10 py-6">Committed Date</th><th className="px-10 py-6">Hardware ID</th><th className="px-10 py-6 text-right">Operations</th></tr></thead><tbody className="divide-y divide-slate-100">
          {filtered.map((sub) => (
            <SubmissionRow key={sub.id} submission={sub} form={forms.find(f => f.id === sub.formId)} onView={() => setSelectedSubmission(sub)} onEdit={() => navigate(`/render/${sub.formId}/edit/${sub.id}`)} onDelete={() => { deleteSubmission(sub.id); }} />
          ))}
        </tbody></table></div>
      )}

      {selectedSubmission && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-50 flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl flex flex-col max-h-[85vh] border border-slate-200 overflow-hidden">
            <div className="p-10 border-b flex justify-between items-center bg-slate-50/50">
              <div><div className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-widest text-[10px] mb-2"><Clock size={14} /> Historical Context</div><h3 className="text-3xl font-black text-slate-900 tracking-tight">Transmission Metadata</h3></div><button onClick={() => setSelectedSubmission(null)} className="w-14 h-14 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm transition-all hover:rotate-90"><Plus size={28} className="rotate-45" /></button>
            </div>
            <div className="p-10 overflow-auto flex-1 space-y-8 bg-white">
              {Object.entries(selectedSubmission.data).map(([key, val]: [string, any]) => {
                const form = forms.find(f => f.id === selectedSubmission.formId);
                const fieldLabel = form?.sections.flatMap(s => s.fields).find(f => f.name === key)?.label || key;
                return (
                  <div key={key} className="group"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{fieldLabel}</p><div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-100 text-slate-900 font-extrabold text-lg shadow-sm">
                    {typeof val === 'boolean' ? <span className="px-4 py-1.5 rounded-xl text-xs uppercase tracking-widest bg-indigo-100 text-indigo-700">{val ? 'Enabled' : 'Disabled'}</span> : String(val || 'N/A')}
                  </div></div>
                );
              })}
            </div>
            <div className="p-10 bg-slate-50/50 border-t flex justify-end gap-4">
              <button onClick={() => { navigate(`/render/${selectedSubmission.formId}/edit/${selectedSubmission.id}`); setSelectedSubmission(null); }} className="bg-white text-slate-800 border-2 border-slate-100 px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all active:scale-95"><Edit size={16} /> Edit Record</button>
              <button onClick={() => setSelectedSubmission(null)} className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black uppercase text-xs shadow-xl active:scale-95 transition-all">Acknowledge</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;
