import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Smartphone, 
  Apple, 
  Play, 
  Download, 
  CheckCircle2, 
  Zap, 
  ClipboardList, 
  GraduationCap, 
  Clock, 
  CreditCard, 
  Globe, 
  Sparkles, 
  BarChart3, 
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Calendar,
  MessageSquare,
  Users,
  LayoutDashboard,
  Bell,
  TrendingUp,
  FileText,
  MapPin,
  LockIcon,
  Search,
  Check,
  X
} from 'lucide-react';

// --- TYPES ---
type AppType = 'student' | 'staff' | 'management';

interface AppsManagementPageProps {
  onBack: () => void;
}

// --- SUB-COMPONENTS ---

/**
 * Premium Smartphone frame for displaying app mockups
 */
const SmartphoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
    {/* Speaker/Camera notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
    
    {/* Screen Content */}
    <div className="h-full w-full bg-white overflow-hidden relative font-sans">
       {children}
    </div>
  </div>
);

const FeatureCard: React.FC<{ icon: any, title: string, desc: string }> = ({ icon: Icon, title, desc }) => (
  <div className="p-6 bg-white border border-slate-200 rounded-[32px] hover:shadow-xl hover:border-blue-100 transition-all group">
    <div className="p-3 w-fit bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-5 h-5" />
    </div>
    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">{title}</h4>
    <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-wider">{desc}</p>
  </div>
);

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="p-1 bg-emerald-50 text-emerald-600 rounded-lg">
      <CheckCircle2 className="w-4 h-4" />
    </div>
    <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{text}</span>
  </div>
);

const AICard: React.FC<{ title: string, badge: string, features: string[] }> = ({ title, badge, features }) => (
  <div className="p-8 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[40px] text-white relative overflow-hidden shadow-2xl">
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500 rounded-2xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-black tracking-tight uppercase">{title}</h4>
        </div>
        <span className="px-3 py-1 bg-blue-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
          {badge}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{f}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute top-0 right-0 p-8 opacity-20">
      <Zap className="w-32 h-32 text-blue-500" />
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export const AppsManagementPage: React.FC<AppsManagementPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<AppType>('student');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 pb-20">
      
      {/* 1. PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </motion.button>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-200">
                MODULE 13
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">NEXORAOS Native Mobile Applications</h1>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Dedicated mobile experiences for students, educators, administrators, and leadership teams.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* PREMIUM TAB NAVIGATION */}
        <div className="flex justify-center mb-20">
           <div className="p-2 bg-slate-100 rounded-3xl flex gap-2 w-fit">
              {(['student', 'staff', 'management'] as AppType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative ${
                    activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-[#2563EB] rounded-2xl shadow-lg shadow-blue-200"
                    />
                  )}
                  <span className="relative z-10">{tab} App</span>
                </button>
              ))}
           </div>
        </div>

        {/* TAB CONTENT BLOCK */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activeTab === 'student' && (
              <div className="space-y-20">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-8">
                      <div className="space-y-4">
                         <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                           Your Entire Campus <br/> <span className="text-blue-600 font-black">In Your Pocket</span>
                         </h2>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                           Access classes, homework, attendance, exams, fees, announcements, and academic resources anytime from a single mobile application.
                         </p>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                         <BenefitItem text="Instant Push Notifications" />
                         <BenefitItem text="Offline Learning Resources" />
                         <BenefitItem text="Teacher Communication Center" />
                         <BenefitItem text="Academic Progress Tracking" />
                      </div>
                   </div>

                   <SmartphoneFrame>
                      {/* Header with Greeting */}
                      <div className="p-6 pt-12 bg-blue-600 text-white rounded-b-[2rem]">
                         <div className="flex justify-between items-start mb-6">
                            <div>
                               <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Good Morning</p>
                               <h3 className="text-lg font-black">Aarav Sharma</h3>
                               <p className="text-[10px] font-medium text-blue-100">Grade X-A • Roll No. 24</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-500/50 border border-white/20 flex items-center justify-center">
                               <Users className="w-5 h-5" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 p-3 rounded-2xl ">
                               <span className="text-[9px] font-bold text-blue-100 block opacity-80 uppercase">Attendance</span>
                               <span className="text-sm font-black">94.2%</span>
                            </div>
                            <div className="bg-white/10 p-3 rounded-2xl ">
                               <span className="text-[9px] font-bold text-blue-100 block opacity-80 uppercase">Fee Status</span>
                               <span className="text-sm font-black">Paid</span>
                            </div>
                         </div>
                      </div>

                      {/* Content Feed */}
                      <div className="p-6 space-y-6">
                         <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Daily Agenda</h4>
                            <div className="space-y-3">
                               {[
                                 { name: 'Mathematics', time: '09:00 - 09:45', instructor: 'Dr. V. Gupta' },
                                 { name: 'Chemistry Lab', time: '10:00 - 11:30', instructor: 'Mrs. S. Roy' },
                               ].map((cls, idx) => (
                                 <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 flex justify-between items-center">
                                    <div>
                                       <span className="text-[11px] font-black text-slate-900 block">{cls.name}</span>
                                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{cls.time}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-orange-50 rounded-2xl text-orange-600 border border-orange-100">
                               <ClipboardList className="w-5 h-5 mb-2" />
                               <span className="text-[10px] font-black block uppercase tracking-tight">3 Tasks</span>
                               <span className="text-[8px] font-bold uppercase opacity-80">Pending</span>
                            </div>
                            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100">
                               <GraduationCap className="w-5 h-5 mb-2" />
                               <span className="text-[10px] font-black block uppercase tracking-tight">2 Exams</span>
                               <span className="text-[8px] font-bold uppercase opacity-80">Scheduled</span>
                            </div>
                         </div>
                      </div>
                   </SmartphoneFrame>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <FeatureCard 
                     icon={Clock} 
                     title="Digital Timetable" 
                     desc="View daily class schedules and upcoming periods." 
                   />
                   <FeatureCard 
                     icon={CreditCard} 
                     title="Fee Payments Dashboard" 
                     desc="Pay fees securely and access payment receipts instantly." 
                   />
                   <FeatureCard 
                     icon={Globe} 
                     title="Online Live Classes" 
                     desc="Join virtual classrooms directly from the app." 
                   />
                   <FeatureCard 
                     icon={BookOpen} 
                     title="Homework & Assignment Hub" 
                     desc="Submit assignments and track evaluation status." 
                   />
                </div>

                <AICard 
                  title="AI Student Assistant"
                  badge="AI Powered Learning"
                  features={['Ask Subject Questions', 'Generate Revision Notes', 'Practice MCQs', 'Concept Explanations']}
                />
              </div>
            )}

            {activeTab === 'staff' && (
              <div className="space-y-20">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-8">
                      <div className="space-y-4">
                         <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                           Empowering Educators <br/> <span className="text-teal-600 font-black">On The Go</span>
                         </h2>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                           Manage attendance, grading, schedules, communications, and academic operations from anywhere.
                         </p>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                         <BenefitItem text="Zero Paperwork" />
                         <BenefitItem text="Automated Attendance Processing" />
                         <BenefitItem text="Schedule Synchronization" />
                         <BenefitItem text="Digital Academic Workflow" />
                      </div>
                   </div>

                   <SmartphoneFrame>
                      <div className="p-6 pt-12 bg-teal-600 text-white rounded-b-[2rem]">
                         <div className="flex justify-between items-start mb-6">
                            <div>
                               <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Faculty Access</p>
                               <h3 className="text-lg font-black">Priya Sharma</h3>
                               <p className="text-[10px] font-medium text-teal-100">Senior Faculty • Mathematics</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-teal-500/50 border border-white/20 flex items-center justify-center">
                               <Users className="w-5 h-5" />
                            </div>
                         </div>
                         <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/10 p-2 rounded-xl  text-center">
                               <span className="text-sm font-black">6</span>
                               <span className="text-[8px] font-bold block uppercase opacity-70">Classes</span>
                            </div>
                            <div className="bg-white/10 p-2 rounded-xl  text-center">
                               <span className="text-sm font-black">14</span>
                               <span className="text-[8px] font-bold block uppercase opacity-70">To Review</span>
                            </div>
                            <div className="bg-white/10 p-2 rounded-xl  text-center">
                               <span className="text-sm font-black text-emerald-300">Active</span>
                               <span className="text-[8px] font-bold block uppercase opacity-70">Status</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 space-y-6">
                         <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Action Items</h4>
                            <div className="space-y-3">
                               <div className="p-4 border border-rose-100 rounded-2xl bg-rose-50/50 flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                     <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                                        <Bell className="w-4 h-4" />
                                     </div>
                                     <div>
                                        <span className="text-[10px] font-black text-slate-900 block">Attendance Pending</span>
                                        <span className="text-[8px] font-bold text-rose-500 uppercase">Grade XI-B</span>
                                     </div>
                                  </div>
                               </div>
                               <div className="p-4 border border-blue-100 rounded-2xl bg-blue-50/50 flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                     <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <FileText className="w-4 h-4" />
                                     </div>
                                     <div>
                                        <span className="text-[10px] font-black text-slate-900 block">Leave Application</span>
                                        <span className="text-[8px] font-bold text-blue-500 uppercase">Approved</span>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-center">
                             <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3">
                                <MapPin className="w-6 h-6 text-teal-600" />
                             </div>
                             <h5 className="text-[10px] font-black text-slate-900 uppercase">Class Room Radar</h5>
                             <p className="text-[8px] font-medium text-slate-400 uppercase mt-1">Next: Room 204 • Grade IX-A</p>
                         </div>
                      </div>
                   </SmartphoneFrame>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <FeatureCard 
                     icon={CheckCircle2} 
                     title="One-Click Attendance" 
                     desc="Efficiently mark student attendance with instant sync." 
                   />
                   <FeatureCard 
                     icon={ClipboardList} 
                     title="Digital Leave Portal" 
                     desc="Apply and track leaves with direct HOD approval." 
                   />
                   <FeatureCard 
                     icon={TrendingUp} 
                     title="Instant Grade Entry" 
                     desc="Input marks directly from classroom walk-ins." 
                   />
                   <FeatureCard 
                     icon={MessageSquare} 
                     title="Parent Comms Broadcast" 
                     desc="Send bulk announcements to specific class parents." 
                   />
                </div>

                <AICard 
                  title="AI Teacher Copilot"
                  badge="AI Teaching Assistant"
                  features={['Generate Lesson Plans', 'Create Worksheets', 'Generate MCQs', 'Assignment Suggestions']}
                />
              </div>
            )}

            {activeTab === 'management' && (
              <div className="space-y-20">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-8">
                      <div className="space-y-4">
                         <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                           Institutional Control <br/> <span className="text-amber-600 font-black">In Real-Time</span>
                         </h2>
                         <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                           Monitor finances, attendance, admissions, operations, and institutional performance from your smartphone.
                         </p>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                         <BenefitItem text="Data-Driven Decisions" />
                         <BenefitItem text="Emergency Alerts" />
                         <BenefitItem text="Financial Oversight" />
                         <BenefitItem text="Operational Visibility" />
                      </div>
                   </div>

                   <SmartphoneFrame>
                      <div className="p-6 pt-12 bg-amber-600 text-white rounded-b-[2rem]">
                         <div className="flex justify-between items-start mb-6">
                            <div>
                               <p className="text-[10px] font-bold text-amber-100 uppercase tracking-widest">Executive Dashboard</p>
                               <h3 className="text-lg font-black">Management View</h3>
                               <p className="text-[10px] font-medium text-amber-100">Across 3 Campuses</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-amber-500/50 border border-white/20 flex items-center justify-center">
                               <LayoutDashboard className="w-5 h-5" />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <div className="bg-white/10 p-3 rounded-2xl  flex justify-between items-baseline">
                               <span className="text-[9px] font-bold text-amber-100 uppercase">Daily Revenue</span>
                               <span className="text-lg font-black">₹4.8 Lakhs</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 space-y-4">
                         <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                               <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Admissions</span>
                               <span className="text-sm font-black text-slate-900">27</span>
                               <span className="text-[7px] font-bold text-emerald-500 block uppercase">+12% Wow</span>
                            </div>
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                               <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Attendance</span>
                               <span className="text-sm font-black text-slate-900">96.4%</span>
                               <span className="text-[7px] font-bold text-slate-400 block uppercase">Normal</span>
                            </div>
                         </div>

                         <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Approvals</h4>
                            {[
                              { label: 'Purchase Order #82', dept: 'Accounts', status: 'Priority' },
                              { label: 'Faculty Recruitment', dept: 'HR Dept', status: 'Review' },
                            ].map((app, i) => (
                              <div key={i} className="p-3 border border-slate-100 rounded-2xl flex justify-between items-center">
                                 <div>
                                    <span className="text-[9px] font-black text-slate-900 block">{app.label}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase">{app.dept}</span>
                                 </div>
                                 <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center">
                                    <ChevronRight className="w-4 h-4 text-amber-600" />
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="p-4 bg-indigo-900 rounded-2xl text-white">
                             <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-[10px] font-black uppercase tracking-tight">Transport Sync</span>
                             </div>
                             <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold text-slate-400 uppercase">Routes Active</span>
                                <span className="text-sm font-black font-mono">18/18</span>
                             </div>
                         </div>
                      </div>
                   </SmartphoneFrame>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <FeatureCard 
                     icon={BarChart3} 
                     title="Fee Collection Analytics" 
                     desc="Track cash flows and dues in real-time across campuses." 
                   />
                   <FeatureCard 
                     icon={TrendingUp} 
                     title="Attendance Intelligence" 
                     desc="Analyze student and staff heatmaps across departments." 
                   />
                   <FeatureCard 
                     icon={Globe} 
                     title="Multi-Campus Monitor" 
                     desc="Switch between branches to view consolidated reports." 
                   />
                   <FeatureCard 
                     icon={ShieldCheck} 
                     title="Critical Approvals Desk" 
                     desc="Approve leaves, budgets, and recruits instantly." 
                   />
                </div>

                <AICard 
                  title="AI Institutional Insights"
                  badge="AI Executive Intelligence"
                  features={['Anomalous Attendance Detection', 'Admission Trend Prediction', 'Expected Fee Forecasts', 'Transport Efficiency Analysis']}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* COMPARISON SECTION */}
        <section className="mt-40 space-y-12">
           <div className="text-center space-y-4">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">App Ecosystem Matrix</h3>
              <p className="text-slate-500 font-medium">Detailed feature comparison across native stakeholder applications.</p>
           </div>

           <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
              <table className="w-full">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                       <th className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Capabilities</th>
                       <th className="px-8 py-6 text-center text-[11px] font-black text-slate-900 uppercase tracking-widest">Student</th>
                       <th className="px-8 py-6 text-center text-[11px] font-black text-slate-900 uppercase tracking-widest">Staff</th>
                       <th className="px-8 py-6 text-center text-[11px] font-black text-slate-900 uppercase tracking-widest">Management</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {[
                      { feat: 'Attendance Tracking', s: true, t: true, m: true },
                      { feat: 'Daily Timetable', s: true, t: true, m: false },
                      { feat: 'Fee Management', s: true, t: false, m: true },
                      { feat: 'Academic Grading', s: true, t: true, m: true },
                      { feat: 'Leave Applications', s: true, t: true, m: true },
                      { feat: 'Operational Analytics', s: false, t: false, m: true },
                      { feat: 'Critical Approvals', s: false, t: false, m: true },
                      { feat: 'AI Features', s: 'Learning', t: 'Teaching', m: 'Insight' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-8 py-5 text-sm font-black text-slate-800">{row.feat}</td>
                         <td className="px-8 py-5 text-center">
                            {typeof row.s === 'boolean' ? (
                              row.s ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />
                            ) : <span className="text-[9px] font-black uppercase text-blue-600">{row.s}</span>}
                         </td>
                         <td className="px-8 py-5 text-center">
                            {typeof row.t === 'boolean' ? (
                              row.t ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />
                            ) : <span className="text-[9px] font-black uppercase text-blue-600">{row.t}</span>}
                         </td>
                         <td className="px-8 py-5 text-center">
                            {typeof row.m === 'boolean' ? (
                              row.m ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />
                            ) : <span className="text-[9px] font-black uppercase text-blue-600">{row.m}</span>}
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>

        {/* ECOSYSTEM ANALYTICS */}
        <section className="mt-40">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Student Users', value: '3,248', desc: 'Active Installs' },
                { label: 'Staff Users', value: '184', desc: 'Verified Faculty' },
                { label: 'Executive Users', value: '27', desc: 'Management Team' },
                { label: 'Daily Activity', value: '2,914', desc: 'Avg. Daily Users' },
                { label: 'Push Delivered', value: '18,624', desc: 'In Last 24 Hours' },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{stat.label}</span>
                   <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</div>
                   <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tight">{stat.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* GLOBAL CTA */}
        <section className="mt-40 p-12 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[60px] text-white text-center relative overflow-hidden">
           <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                 <h2 className="text-4xl font-black uppercase tracking-tight">Experience Next-Gen School Mobility</h2>
                 <p className="text-blue-100 font-medium max-w-xl mx-auto">Stay connected with your institution anytime, anywhere with multi-stakeholder native applications.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                 <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-blue-50 transition-all shadow-2xl cursor-pointer">
                    <Apple className="w-5 h-5" />
                    <span>Download on App Store</span>
                 </button>
                 <button className="px-8 py-4 bg-slate-900 text-white border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all shadow-2xl cursor-pointer">
                    <Play className="w-4 h-4 ml-1" />
                    <span>Get it on Google Play</span>
                 </button>
                 <button className="px-8 py-4 bg-white/10  text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer">
                    Request Enterprise Demo
                 </button>
              </div>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 p-12 opacity-10">
              <Globe className="w-64 h-64 -rotate-12" />
           </div>
           <div className="absolute bottom-0 left-0 p-12 opacity-10">
              <Zap className="w-48 h-48 rotate-12" />
           </div>
        </section>

      </main>

    </div>
  );
};
