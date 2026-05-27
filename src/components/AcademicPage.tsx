import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Laptop, 
  Calendar as CalendarIcon,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StudentManagementPage } from '../components/StudentManagementPage';

interface AcademicPageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const AcademicPage: React.FC<AcademicPageProps> = ({ theme, setTheme }) => {
  const modules = [
    { title: "Student Management", path: "/student-management", icon: Users, desc: "360-degree digital database capturing profiles and performance." },
    { title: "Attendance & Leave", path: "/attendance-management", icon: Clock, desc: "Track live biometric attendance and manage digital leaves." },
    { title: "Exam Management", path: "/exam-management", icon: GraduationCap, desc: "Streamline scheduling, grading, and report card generation." },
    { title: "LMS", path: "/lms", icon: Laptop, desc: "Interactive online classes and assignment management." },
    { title: "Calendar & Events", path: "/calendar-events", icon: CalendarIcon, desc: "Manage institutional schedules and event coordination." },
  ];

  return (
    <PageLayout theme={theme} setTheme={setTheme}>
      <section className="py-20 px-6 sm:px-12 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
              Academic <span className="text-[#0071E3]">Excellence</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
              A comprehensive suite of tools designed to streamline the academic lifecycle, from student onboarding to graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((m, i) => (
              <Link to={m.path} key={i}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <m.icon className="w-6 h-6 text-[#0071E3]" />
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

          {/* REAL UI PREVIEW SECTION */}
          <div className="mt-24 space-y-12">
             <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Student Roster</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Academic Session 2025-26 • Department of Science</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <span className="text-[10px] font-black text-slate-400 block tracking-widest">AVG. ATTENDANCE</span>
                            <span className="text-lg font-black text-green-500">96.7%</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Roll ID</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade/Section</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {[
                                { name: 'Arjun Mehta', roll: '2025/SC/001', grade: '10-A', status: 'Active', att: '98.5%' },
                                { name: 'Sara Khan', roll: '2025/SC/002', grade: '10-A', status: 'Active', att: '94.2%' },
                                { name: 'Vikram Singh', roll: '2025/SC/003', grade: '10-A', status: 'On Leave', att: '88.1%' },
                                { name: 'Priya Sharma', roll: '2025/SC/004', grade: '10-A', status: 'Active', att: '99.0%' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-slate-900 dark:text-white">{row.name}</td>
                                    <td className="px-8 py-5 text-xs font-mono font-medium text-slate-500">{row.roll}</td>
                                    <td className="px-8 py-5 text-sm font-semibold text-slate-600 dark:text-slate-400">{row.grade}</td>
                                    <td className="px-8 py-5">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-black text-slate-900 dark:text-white">{row.att}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
