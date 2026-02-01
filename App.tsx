
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import FormList from './components/FormList';
import FormBuilder from './components/FormBuilder';
import FormRendererView from './components/FormRendererView';
import SubmissionsList from './components/SubmissionsList';
import { LayoutDashboard, FilePlus, Database, Layers } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1' 
        : 'text-slate-600 hover:bg-white hover:shadow-sm'
    }`}
  >
    <Icon size={20} />
    <span className="font-semibold text-sm">{label}</span>
  </Link>
);

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-slate-50/50 backdrop-blur-md border-r border-slate-200/60 p-6 flex flex-col">
      <div className="flex items-center space-x-3 mb-12 px-2">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
          <Layers className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">Form Builder</h1>
          <p className="text-[10px] text-indigo-500 font-bold tracking-widest uppercase mt-1">Building Your Forms Your Way!</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2">
        <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" active={path === '/'} />
        <SidebarLink to="/create" icon={FilePlus} label="New Template" active={path === '/create'} />
        <SidebarLink to="/submissions" icon={Database} label="Records" active={path === '/submissions'} />
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <Navigation />
        <main className="flex-1 ml-64 p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<FormList />} />
              <Route path="/create" element={<FormBuilder />} />
              <Route path="/edit/:id" element={<FormBuilder />} />
              <Route path="/render/:id" element={<FormRendererView />} />
              <Route path="/render/:id/edit/:submissionId" element={<FormRendererView />} />
              <Route path="/submissions" element={<SubmissionsList />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
