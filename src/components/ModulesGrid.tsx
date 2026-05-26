/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Contact, 
  Clock, 
  Wallet, 
  Laptop, 
  Award, 
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
  ShieldCheck
} from 'lucide-react';

interface ModulesGridProps {
  onNavigateStudent?: () => void;
  onNavigateStaff?: () => void;
  onNavigateMusic?: () => void;
  onNavigateLibrary?: () => void;
  onNavigatePayroll?: () => void;
  onNavigateFees?: () => void;
  onNavigateExams?: () => void;
  onNavigateAttendance?: () => void;
  onNavigateAdmission?: () => void;
  onNavigateLMS?: () => void;
  onNavigateHostel?: () => void;
  onNavigateTransport?: () => void;
  onNavigateAlerts?: () => void;
  onNavigateApps?: () => void;
  onNavigateSecurity?: () => void;
  onNavigateCalendar?: () => void;
}

export const ModulesGrid: React.FC<ModulesGridProps> = ({ 
  onNavigateStudent, 
  onNavigateStaff, 
  onNavigateMusic, 
  onNavigateLibrary,
  onNavigatePayroll,
  onNavigateFees,
  onNavigateExams,
  onNavigateAttendance,
  onNavigateAdmission,
  onNavigateLMS,
  onNavigateHostel,
  onNavigateTransport,
  onNavigateAlerts,
  onNavigateApps,
  onNavigateSecurity,
  onNavigateCalendar
}) => {
  const modules = [
    {
      title: "Student Management",
      desc: "360-degree digital database capturing profiles, admission forms, RFID gate check-ins, grade trends, and printable ID badges.",
      icon: Contact,
      color: "text-blue-600",
      bgColor: "bg-blue-50/60",
      isInteractive: true,
    },
    {
      title: "Staff Management",
      desc: "Manage comprehensive faculty records, department allocations, and granular role permissions.",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50/60",
      isInteractive: true,
    },
    {
      title: "Arts & Music Management",
      desc: "Supervise music labs, allocate specialized instructors, check instrument inventory logs, and track trainee status.",
      icon: Music,
      color: "text-rose-600",
      bgColor: "bg-rose-50/60",
      isInteractive: true,
    },
    {
      title: "Admission & Fee",
      desc: "Streamline online admissions, track lead enquiries, monitor application stages, and process instant admission setup payments.",
      icon: UserPlus,
      color: "text-blue-600",
      bgColor: "bg-blue-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Attendance & Leave",
      desc: "Track live biometric attendance, manage digital leave applications, and generate automated staff/student attendance reports.",
      icon: Clock,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Fee Management",
      desc: "Automate online fee collection, generate smart invoices, track pending dues, and send automatic payment reminders.",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Learning Management System",
      desc: "Host interactive online classes, manage digital assignments, share rich course materials, and track student progress via a smart learning dashboard.",
      icon: Laptop,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "SMS & Email Alerts",
      desc: "Automate institutional communication with bulk messaging, instant fee reminders, attendance alerts, and exam notifications.",
      icon: MessageSquare,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Mobile Apps Ecosystem",
      desc: "Explore native iOS & Android apps tailored for Students, Staff, and Management with real-time sync.",
      icon: Smartphone,
      color: "text-blue-600",
      bgColor: "bg-blue-100/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Role-Based Access & Security",
      desc: "Assign user roles with custom dashboards for admins, teachers, students, parents, and staff while maintaining complete data privacy and administrative control.",
      icon: ShieldCheck,
      color: "text-[#2563EB]",
      bgColor: "bg-blue-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Exam Management",
      desc: "Streamline exam scheduling, digitize marks entry, automate grading configurations, and generate professional report cards.",
      icon: GraduationCap,
      color: "text-rose-600",
      bgColor: "bg-rose-50/60",
      isInteractive: true,
    },
    {
      title: "HR & Payroll",
      desc: "Automate complex staff compensation, dynamic role permissions, performance evaluations, and one-click payslips.",
      icon: BadgeDollarSign,
      color: "text-sky-600",
      bgColor: "bg-sky-50/60",
      isInteractive: true,
    },
    {
      title: "Transport Management",
      desc: "Real-time bus tracking, automated parent alerts, route optimization patterns, and scheduling logs.",
      icon: Bus,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Hostel Management",
      desc: "Manage room allocations, track daily hostel attendance, monitor warden logs, and streamline visitor check-ins.",
      icon: Home,
      color: "text-amber-600",
      bgColor: "bg-amber-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Library Management",
      desc: "Track book inventory, manage digital issue/return records, and automate overdue notifications.",
      icon: BookOpen,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/60",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    },
    {
      title: "Calendar & Events Planner",
      desc: "Manage shared institutional holiday calendars, publish exam schedules, coordinate PTM slots, and log annual campus events.",
      icon: Calendar,
      color: "text-pink-600",
      bgColor: "bg-pink-50/100",
      isInteractive: true,
      titleColor: "text-[#0F172A]",
      textColor: "text-[#64748B]",
    }
  ];

  return (
    <section id="features" className="bg-[#FAF8F5] py-24 border-b border-[#EFECE1] w-full select-text text-slate-800 relative overflow-hidden">
      {/* Subtle warm decorative details */}
      <span className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-radial-at-t from-[#FDFBF7] via-[#FAF8F5] to-transparent opacity-60 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Centered Heading and Subheading */}
        <div className="text-center mb-20">
          <h2 className="text-[#0066B3] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
            Enterprise Solution
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl tracking-tight leading-tight font-sans max-w-3xl mx-auto">
            Everything Your Institution Needs
          </h3>
          <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop juggling between different tools. NEXORAOS AI offers a unified architecture for every department.
          </p>
        </div>

        {/* Responsive Grid with 3-column layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {modules.map((module, idx) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: Math.min(idx * 0.06, 0.45), duration: 0.5, ease: "easeOut" }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.025,
                  boxShadow: "0 28px 56px -12px rgba(180,165,145,0.45), 0 10px 20px -8px rgba(0,102,179,0.15)",
                  borderColor: module.isInteractive ? "#2563EB" : "rgba(0,102,179,0.35)"
                }}
                onClick={() => {
                  if (module.isInteractive) {
                    if (module.title === "Student Management" && onNavigateStudent) {
                      onNavigateStudent();
                    } else if (module.title === "Staff Management" && onNavigateStaff) {
                      onNavigateStaff();
                    } else if (module.title === "Arts & Music Management" && onNavigateMusic) {
                      onNavigateMusic();
                    } else if (module.title === "HR & Payroll" && onNavigatePayroll) {
                      onNavigatePayroll();
                    } else if (module.title === "Fee Management" && onNavigateFees) {
                      onNavigateFees();
                    } else if (module.title === "Exam Management" && onNavigateExams) {
                      onNavigateExams();
                    } else if (module.title === "Library Management" && onNavigateLibrary) {
                      onNavigateLibrary();
                    } else if (module.title === "Attendance & Leave" && onNavigateAttendance) {
                      onNavigateAttendance();
                    } else if (module.title === "Admission & Fee" && onNavigateAdmission) {
                      onNavigateAdmission();
                    } else if (module.title === "Learning Management System" && onNavigateLMS) {
                      onNavigateLMS();
                    } else if (module.title === "Hostel Management" && onNavigateHostel) {
                      onNavigateHostel();
                    } else if (module.title === "Transport Management" && onNavigateTransport) {
                      onNavigateTransport();
                    } else if (module.title === "SMS & Email Alerts" && onNavigateAlerts) {
                      onNavigateAlerts();
                    } else if (module.title === "Mobile Apps Ecosystem" && onNavigateApps) {
                      onNavigateApps();
                    } else if (module.title === "Role-Based Access & Security" && onNavigateSecurity) {
                      onNavigateSecurity();
                    } else if (module.title === "Calendar & Events Planner" && onNavigateCalendar) {
                      onNavigateCalendar();
                    }
                  }
                }}
                className={`group bg-white p-8 sm:p-10 rounded-[28px] border border-[#ECE7DA] shadow-[0_12px_36px_-6px_rgba(200,185,165,0.18)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden ${module.isInteractive ? 'cursor-pointer' : ''}`}
              >
                {/* Modern subtle neumorphic inner highlights */}
                <span className="absolute inset-px rounded-[27px] border border-white/90 pointer-events-none" />
                
                {/* Interactive Sub-Page Badge for configured modules keys */}
                {module.isInteractive && (
                  <span className="absolute top-3 right-4 bg-blue-100/70 text-blue-800 text-[8px] font-black tracking-widest uppercase py-0.5 px-2.5 rounded-full border border-blue-200/55">
                    Click to Open Module
                  </span>
                )}

                {/* Minimal top pastel icon background */}
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${module.bgColor} ${module.color} transition-all duration-500 group-hover:scale-110 group-hover:shadow-sm`}>
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>

                {/* Blue Bold Heading #0066B3 */}
                <h4 className={`text-lg font-bold ${module.titleColor || 'text-[#0066B3]'} mb-3 leading-snug font-sans tracking-tight`}>
                  {module.title}
                </h4>

                {/* Soft Grey Description Text with optimal readability */}
                <p className={`text-xs sm:text-sm ${module.textColor || 'text-slate-500'} leading-relaxed font-semibold`}>
                  {module.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
