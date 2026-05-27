import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Contact, 
  Clock, 
  Laptop, 
  BadgeDollarSign, 
  DollarSign,
  GraduationCap,
  Bus, 
  Home,
  MessageSquare,
  BookOpen,
  Calendar,
  Users,
  Music,
  Smartphone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const ModulesGrid: React.FC = () => {
  const navigate = useNavigate();
  
  const modules = [
    { title: "Student Management", path: "/student-management", desc: "360-degree digital database capturing profiles and performance.", icon: Contact, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-500/10" },
    { title: "Staff Management", path: "/staff-management", desc: "Manage faculty records, department allocations, and permissions.", icon: Users, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-500/10" },
    { title: "Admission & Fee", path: "/admission-fee", desc: "Online admissions, lead enquiry tracking, and setup payments.", icon: UserPlus, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-500/10" },
    { title: "Attendance & Leave", path: "/attendance-management", desc: "Biometric attendance tracking and digital leave management.", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-500/10" },
    { title: "Fee Management", path: "/fee-management", desc: "Automate collections, smart invoicing, and reminders.", icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-500/10" },
    { title: "LMS", path: "/lms", desc: "Online classes, digital assignments, and progress tracking.", icon: Laptop, color: "text-[#0071E3]", bgColor: "bg-blue-50 dark:bg-blue-500/10" },
    { title: "Exam Management", path: "/exam-management", desc: "Scheduling, grading configurations, and report cards.", icon: GraduationCap, color: "text-rose-600", bgColor: "bg-rose-50 dark:bg-rose-500/10" },
    { title: "HR & Payroll", path: "/payroll", desc: "Staff compensation, performance, and automated payslips.", icon: BadgeDollarSign, color: "text-sky-600", bgColor: "bg-sky-50 dark:bg-sky-500/10" },
    { title: "Transport Management", path: "/transport-management", desc: "Real-time bus tracking and route optimization patterns.", icon: Bus, color: "text-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-500/10" },
    { title: "Hostel Management", path: "/hostel-management", desc: "Room allocations, attendance, and visitor check-ins.", icon: Home, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-500/10" },
    { title: "Library Management", path: "/library-management", desc: "Book inventory and digital issue/return records.", icon: BookOpen, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-500/10" },
    { title: "Communication", path: "/communication", desc: "Bulk messaging, fee alerts, and exam notifications.", icon: MessageSquare, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-500/10" },
    { title: "Security & Access", path: "/security", desc: "Role-based dashboards and data privacy controls.", icon: ShieldCheck, color: "text-[#2563EB]", bgColor: "bg-blue-50 dark:bg-blue-500/10" },
    { title: "Calendar & Events", path: "/calendar-events", desc: "Institutional calendars and holiday coordination.", icon: Calendar, color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-500/10" },
    { title: "Student App", path: "/student-app", desc: "Personalized portal for grades and assignments.", icon: Smartphone, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-500/10" },
    { title: "Staff App", path: "/staff-app", desc: "Faculty portal for attendance and communication.", icon: Users, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-500/10" },
  ];

  return (
    <section className="bg-[#F8FAFC] dark:bg-black py-24 border-b border-slate-200 dark:border-white/10 w-full transition-colors">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#0071E3] font-black text-[10px] tracking-[0.25em] uppercase mb-4">Enterprise Modules</h2>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white sm:text-5xl uppercase tracking-tighter">Everything Your <span className="text-[#0071E3]">Institution</span> Needs</h3>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto">
            16 purpose-built modules designed to automate every aspect of your school's workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(m.path)}
              className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
            >
              <div className={`w-12 h-12 ${m.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <m.icon className={`w-6 h-6 ${m.color}`} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight tracking-tight">{m.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6 flex-grow">
                {m.desc}
              </p>
              <div className="flex items-center gap-2 text-[#0071E3] font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
