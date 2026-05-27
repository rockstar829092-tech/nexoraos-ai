import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Home, 
  Bus, 
  ShieldCheck,
  ArrowRight,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OperationsPageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const OperationsPage: React.FC<OperationsPageProps> = ({ theme, setTheme }) => {
  const modules = [
    { title: "Staff Management", path: "/staff-management", icon: Users, desc: "Comprehensive faculty records and department allocations." },
    { title: "Library Management", path: "/library-management", icon: BookOpen, desc: "Track book inventory and digital issue/return records." },
    { title: "Hostel Management", path: "/hostel-management", icon: Home, desc: "Manage room allocations and daily hostel attendance." },
    { title: "Transport Management", path: "/transport-management", icon: Bus, desc: "Real-time bus tracking and automated parent alerts." },
    { title: "Security & Access", path: "/security", icon: ShieldCheck, desc: "Assign user roles and maintain complete data privacy." },
  ];

  return (
    <PageLayout theme={theme} setTheme={setTheme}>
      <section className="py-20 px-6 sm:px-12 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
              Institutional <span className="text-[#0071E3]">Operations</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
              Unified command and control for school infrastructure, logistics, and human resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((m, i) => (
              <Link to={m.path} key={i}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <m.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{m.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                    {m.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[#0071E3] font-bold text-sm">
                    Open Module <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* REAL UI PREVIEW: STAFF DIRECTORY */}
          <div className="mt-24">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Staff Directory</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Total Employees: 124 • 8 Departments</p>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search staff..." 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: 'Dr. Michael Chen', role: 'Head of Department', dept: 'Science', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
                        { name: 'Sarah Jenkins', role: 'Senior Professor', dept: 'Mathematics', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop' },
                        { name: 'Rajesh Kumar', role: 'Lab Assistant', dept: 'Physics', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
                        { name: 'Emily Davis', role: 'Curriculum lead', dept: 'History', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' },
                    ].map((staff, i) => (
                        <div key={i} className="p-6 bg-slate-50/50 dark:bg-white/2 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center">
                            <img src={staff.img} alt={staff.name} className="w-16 h-16 rounded-full object-cover mb-4 grayscale hover:grayscale-0 transition-all duration-500" />
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{staff.name}</h4>
                            <p className="text-[10px] font-black text-[#0071E3] uppercase tracking-widest mt-1">{staff.role}</p>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 w-full flex justify-between px-2">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{staff.dept}</span>
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Available</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
