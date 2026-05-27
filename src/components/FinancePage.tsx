import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  BadgeDollarSign, 
  CreditCard,
  TrendingUp,
  ArrowRight,
  PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FinancePageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const FinancePage: React.FC<FinancePageProps> = ({ theme, setTheme }) => {
  const modules = [
    { title: "Fee Management", path: "/fee-management", icon: DollarSign, desc: "Automate collections, smart invoicing, and automated reminders." },
    { title: "HR & Payroll", path: "/payroll", icon: BadgeDollarSign, desc: "Auto-compensate staff, manage payslips and statutory compliance." },
    { title: "Admission & Revenue", path: "/admission-fee", icon: CreditCard, desc: "Track lead revenue, online admissions, and instant setups." },
  ];

  return (
    <PageLayout theme={theme} setTheme={setTheme}>
      <section className="py-20 px-6 sm:px-12 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
              Financial <span className="text-emerald-600">Intelligence</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
              Enterprise-grade financial tools to automate recovery, process payroll, and visualize institutional growth.
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
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    Open Module <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* REAL UI PREVIEW: REVENUE ANALYTICS */}
          <div className="mt-24">
             <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Revenue Stream Analysis</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Q2 Fiscal Year • May 2025</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-500/10 rounded-full border border-green-100 dark:border-green-500/20">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">+12.4% vs Last Month</span>
                    </div>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-end gap-2 h-48 px-4">
                                {[65, 45, 78, 92, 55, 88, 72, 95, 60, 82, 48, 66].map((h, i) => (
                                    <div key={i} className="flex-1 group relative">
                                        <div 
                                            className="w-full bg-[#0071E3] rounded-t-lg transition-all duration-500 opacity-60 group-hover:opacity-100" 
                                            style={{ height: `${h}%` }} 
                                        />
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                          ₹{h}k
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Total Collection</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">₹84,29,000</span>
                                    <span className="text-xs font-bold text-emerald-600">INR</span>
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-[#0071E3]/20 transition-all cursor-pointer">
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <span>Fee Defaulters</span>
                                    <span className="text-red-500">8% Deficit</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-[8%] rounded-full" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-3">12 students with pending dues exceeding ₹50k</p>
                            </div>
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
