import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Users, 
  Building,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileAppsPageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const MobileAppsPage: React.FC<MobileAppsPageProps> = ({ theme, setTheme }) => {
  const apps = [
    { title: "Student App", path: "/student-app", icon: Smartphone, desc: "Personalized portal for assignments, grades, and attendance tracking.", color: "text-blue-600" },
    { title: "Staff App", path: "/staff-app", icon: Users, desc: "Manage classes, mark attendance, and communicate with parents on the go.", color: "text-indigo-600" },
    { title: "Management App", path: "/management-app", icon: Building, desc: "Institutional oversight, revenue tracking, and security alerts for owners.", color: "text-slate-900" },
  ];

  return (
    <PageLayout theme={theme} setTheme={setTheme}>
      <section className="py-20 px-6 sm:px-12 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
              Mobile <span className="text-[#0071E3]">Ecosystem</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
              Seamlessly connect every stakeholder with native iOS and Android applications synchronized in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {apps.map((app, i) => (
              <Link to={app.path} key={i}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6`}>
                    <app.icon className={`w-6 h-6 ${app.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{app.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                    {app.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[#0071E3] font-bold text-sm">
                    View Details <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* REAL UI PREVIEW: MOBILE UI CARDS */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             <div className="bg-slate-900 rounded-[3rem] p-4 aspect-[9/19] relative shadow-2xl border-[8px] border-slate-800 mx-auto w-full max-w-[280px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-800 rounded-b-2xl" />
                <div className="mt-8 text-white p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="h-2 w-12 bg-white/20 rounded-full" />
                        <div className="h-6 w-6 rounded-full bg-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black uppercase tracking-tight">Student Hub</h4>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Logged in as Arjun Mehta</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/5 space-y-4">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#F5F5F7]">
                            <span>Class Progress</span>
                            <span>84%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[84%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-1">Rank</span>
                            <span className="text-lg font-black italic">#03</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-1">Attendance</span>
                            <span className="text-lg font-black">98%</span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 left-0 right-0 px-8">
                     <button className="w-full bg-[#0071E3] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900">View Report Card</button>
                </div>
             </div>

             <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-[#0071E3]" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Cloud-Native Synchronization</h3>
                </div>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                    Our mobile app uses an offline-first architecture. Data is cached locally and synced instantly once a network connection is detected, ensuring your staff can mark attendance even in low-connectivity areas.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4 h-4 text-[#0071E3]" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black dark:text-white uppercase tracking-tight">Secure Biometrics</h4>
                            <p className="text-xs text-slate-400 font-medium mt-1">Integrated with FaceID and Fingerprint API for secure login.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                            <Globe className="w-4 h-4 text-[#0071E3]" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black dark:text-white uppercase tracking-tight">Push Infrastructure</h4>
                            <p className="text-xs text-slate-400 font-medium mt-1">Real-time alerts for fees, results, and emergency notices.</p>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
