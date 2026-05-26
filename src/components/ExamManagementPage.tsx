import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  GraduationCap, 
  Calendar, 
  Award, 
  ClipboardList, 
  Settings, 
  Search, 
  Download, 
  FileText, 
  Plus, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Clock,
  ChevronRight,
  Filter,
  BarChart3,
  MoreVertical,
  Printer,
  AlertTriangle,
  Save,
  UserCheck,
  Cloud,
  ChevronDown,
  Activity,
  History,
  Layout,
  PieChart as LucidePieChart,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ReferenceLine
} from 'recharts';

const ACADEMIC_TRENDS = [
  { semester: 'Sem 1', avg: 72, high: 94 },
  { semester: 'Sem 2', avg: 75, high: 96 },
  { semester: 'Sem 3', avg: 78, high: 95 },
  { semester: 'Sem 4', avg: 81, high: 98 },
];

const DISTRIBUTION_DATA = [
  { score: 0, count: 2 },
  { score: 10, count: 5 },
  { score: 20, count: 12 },
  { score: 30, count: 28 },
  { score: 40, count: 45 },
  { score: 50, count: 85 },
  { score: 60, count: 110 },
  { score: 70, count: 140 },
  { score: 80, count: 165 },
  { score: 90, count: 120 },
  { score: 100, count: 45 },
];

interface ExamManagementPageProps {
  onBack: () => void;
}

export const ExamManagementPage: React.FC<ExamManagementPageProps> = ({ onBack }) => {
  const [examProgress, setExamProgress] = useState(88);
  const [passingCriteria, setPassingCriteria] = useState(true);

  // Auto-increment progress for visual effect
  useEffect(() => {
    const interval = setInterval(() => {
      setExamProgress(prev => (prev < 99 ? prev + 0.1 : 99.5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-700 pb-20">
      {/* 1. PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ x: -4 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl font-bold text-sm hover:bg-purple-100 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Dashboard</span>
            </motion.button>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-purple-200">
                MODULE 06
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">Unified Examination & Evaluation Center</h1>
                <p className="text-xs text-slate-500 font-medium">Centralized examination planning, grading intelligence, academic analytics, and automated report generation.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Server Sync Active</span>
              <span className="text-xs font-black text-slate-900">Academic Year 2026-27</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <ClipboardList className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* LEFT COLUMN - 60% */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* 1. EXAM SCHEDULING */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Exam Scheduling</h3>
                    <p className="text-xs text-slate-500 font-medium">Strategic timetable management & conflict detection.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <Filter className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date & Time</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Subject / Class</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Session</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { date: 'May 28, 2026', time: '09:00 AM', sub: 'Mathematics', class: 'XII-A', session: 'Morning', status: 'Scheduled', type: 'success' },
                      { date: 'May 30, 2026', time: '10:30 AM', sub: 'Physics', class: 'XII-B', session: 'Mid-Day', status: 'Upcoming', type: 'info' },
                      { date: 'June 01, 2026', time: '09:00 AM', sub: 'Chemistry', class: 'XI-A', session: 'Morning', status: 'In Review', type: 'warning' },
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                        <td className="py-4">
                          <p className="text-sm font-black text-slate-800">{row.date}</p>
                          <span className="text-[10px] text-slate-400 font-bold">{row.time}</span>
                        </td>
                        <td className="py-4">
                          <p className="text-sm font-black text-slate-800">{row.sub}</p>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{row.class}</span>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-slate-100 rounded-lg text-[9px] font-black tracking-widest uppercase text-slate-500">{row.session}</span>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                            row.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            row.type === 'info' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3">
                <div className="p-1.5 bg-white rounded-lg shadow-sm border border-rose-100">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-[11px] font-bold text-rose-700">Conflict Detection Active: <span className="font-medium">Class XII-A Chemistry lab session overlaps with Physics mock test on June 1st.</span></p>
              </div>
            </motion.section>

            {/* 2. MARKS ENTRY SYSTEM */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Marks Entry System</h3>
                    <p className="text-xs text-slate-500 font-medium">Spreadsheet-style marks entry interface with validation.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <Cloud className="w-3.5 h-3.5 animate-pulse" />
                    <span>Auto-Save to Cloud</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
                <table className="w-full text-left">
                  <thead className="bg-[#0F172A] text-white">
                    <tr>
                      <th className="py-3 px-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Roll Number</th>
                      <th className="py-3 px-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Student Name</th>
                      <th className="py-3 px-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap w-24">Marks</th>
                      <th className="py-3 px-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap w-24">Grade Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { roll: '1001', name: 'Aarav Sharma', marks: '88', grade: 'A', status: 'valid' },
                      { roll: '1002', name: 'Maya Kapoor', marks: '92', grade: 'A+', status: 'valid' },
                      { roll: '1003', name: 'Rohan Verma', marks: '104', grade: 'ERR', status: 'error' },
                      { roll: '1004', name: 'Ishita Iyer', marks: '76', grade: 'B+', status: 'valid' },
                    ].map((row, i) => (
                      <tr key={i} className="bg-white">
                        <td className="py-3 px-6 font-mono text-xs font-bold text-slate-500">#{row.roll}</td>
                        <td className="py-3 px-6 text-sm font-black text-slate-800">{row.name}</td>
                        <td className="py-3 px-6">
                           <div className="relative">
                            <input 
                              type="text" 
                              defaultValue={row.marks}
                              className={`w-full py-1.5 px-3 rounded-lg text-xs font-black border transition-all ${
                                row.status === 'error' ? 'border-rose-400 bg-rose-50 text-rose-700 outline-none' : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none'
                              }`}
                            />
                            {row.status === 'error' && (
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 group">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                                <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-rose-600 text-white text-[9px] p-2 rounded-lg whitespace-nowrap shadow-xl z-50">Value exceeds max limit (100)</div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className={`text-[11px] font-black tracking-widest uppercase ${row.status === 'error' ? 'text-rose-600' : 'text-blue-600'}`}>{row.grade}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                  <span className="text-[10px] text-slate-400 font-bold italic">Teacher Activity: Processing Terminal 1 Marks for Class XII-A</span>
                </div>
                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer">
                  Bulk Upload CSV
                </button>
              </div>
            </section>

            {/* 3. GRADING SYSTEM CONFIGURATION */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Grading System Configuration</h3>
                    <p className="text-xs text-slate-500 font-medium">Smart grading metrics & assessment configurations.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Recommendation
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  {[
                    { grade: 'A+', range: '90 – 100%', color: 'from-emerald-500 to-emerald-600' },
                    { grade: 'A', range: '80 – 89%', color: 'from-emerald-400 to-emerald-500' },
                    { grade: 'B+', range: '70 – 79%', color: 'from-blue-500 to-blue-600' },
                    { grade: 'B', range: '60 – 69%', color: 'from-blue-400 to-blue-500' },
                    { grade: 'C', range: '50 – 59%', color: 'from-amber-400 to-amber-500' },
                    { grade: 'F', range: 'Below 50%', color: 'from-rose-500 to-rose-600' },
                  ].map((scale, i) => (
                    <div key={i} className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <div className={`w-12 h-10 bg-gradient-to-br ${scale.color} rounded-xl flex items-center justify-center font-black text-white shadow-sm text-sm`}>{scale.grade}</div>
                      <div className="flex-1 flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl border-dashed">
                        <span className="text-[11px] font-black text-slate-600 tracking-wider font-mono">{scale.range}</span>
                        <Settings className="w-3.5 h-3.5 text-slate-300 hover:text-slate-500 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-[28px] shadow-inner space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Passing Criteria</span>
                      <button 
                        onClick={() => setPassingCriteria(!passingCriteria)}
                        className={`w-10 h-5 rounded-full transition-all relative ${passingCriteria ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${passingCriteria ? 'left-5.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                    
                    <div className="space-y-5">
                       <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                           <span>Internal Weightage</span>
                           <span className="text-blue-600">30%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                           <div className="h-full w-[30%] bg-blue-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                           <span>Theory Weightage</span>
                           <span className="text-purple-600">70%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                           <div className="h-full w-[70%] bg-purple-600" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                       <button className="w-full py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all cursor-pointer">
                          Edit Boundary Logic
                       </button>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[28px] text-white shadow-xl shadow-blue-100">
                     <div className="flex items-center gap-3 mb-3">
                        <UserCheck className="w-5 h-5 text-blue-100" />
                        <h4 className="text-xs font-black uppercase tracking-widest leading-none">Assessment Sync</h4>
                     </div>
                     <p className="text-[10px] text-blue-50 font-medium leading-relaxed opacity-80">
                        Synchronizing grading benchmarks across all institutional sections for uniformity.
                     </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. RESULT GENERATION ENGINE */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm overflow-hidden relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Result Generation Engine</h3>
                  <p className="text-xs text-slate-500 font-medium">Automated result processing panel with real-time status.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-sm font-black text-slate-800">Processing Class X Board Results...</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 tracking-tight animate-pulse">Computing final percentiles & class ranks • 8 CPUs Active</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-600 font-mono tracking-tighter">{Math.floor(examProgress)}%</span>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Completed</span>
                  </div>
                </div>
                
                <div className="h-5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${examProgress}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:15px_15px] animate-[slide_1.5s_linear_infinite]" />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Validated Records', val: '4,102', sub: 'Success Units', icon: CheckCircle, color: 'text-emerald-500' },
                    { label: 'Queue Buffer', val: '152', sub: 'Calculations', icon: Clock, color: 'text-amber-500' },
                    { label: 'Est. Completion', val: '02m 45s', sub: 'Remaining Time', icon: History, color: 'text-blue-500' },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
                      <div className={`p-2.5 rounded-xl bg-white mb-3 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</span>
                      <h5 className="text-xl font-black text-slate-900 leading-none mb-1">{item.val}</h5>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. REPORT CARD GENERATOR */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Report Card Generator</h3>
                    <p className="text-xs text-slate-500 font-medium">Premium digital report card preview & generation engine.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all cursor-pointer">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer">
                    <Printer className="w-4 h-4" />
                    <span>Print Records</span>
                  </button>
                </div>
              </div>

              {/* REPORT CARD PREVIEW (CBSE/ICSE STYLE) */}
              <div className="border-4 border-double border-slate-100 rounded-[40px] p-6 lg:p-12 bg-slate-50/50 shadow-inner">
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full border-l border-b border-slate-100 flex items-center justify-center p-4">
                     <div className="w-16 h-16 border-2 border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center">
                        <span className="text-[8px] font-black text-slate-400 text-center uppercase leading-tight">Student<br/>Photograph</span>
                     </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-3 pb-8 border-b-2 border-slate-100 border-dashed">
                    <div className="w-20 h-20 bg-[#0F172A] text-white rounded-[24px] flex items-center justify-center shadow-xl rotate-3">
                       <GraduationCap className="w-12 h-12" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">NEXORA INTERNATIONAL ACADEMY</h2>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-1">Institutional Excellence Accreditation: CBSE-10294</p>
                      <p className="text-[9px] text-slate-400 font-bold mt-1">Sector 12, Education City • academic@nexora.edu.in</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                     <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Student Full Name</span>
                        <p className="text-sm font-black text-slate-800">Aarav Sharma</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enrollment No.</span>
                        <p className="text-sm font-black text-slate-800 font-mono">NX-2026-4402</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Class & Section</span>
                        <p className="text-sm font-black text-slate-800">XII-A (Science)</p>
                     </div>
                     <div className="space-y-1 text-right">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Rank</span>
                        <p className="text-sm font-black text-emerald-600">03 / 420</p>
                     </div>
                  </div>

                  <div className="overflow-hidden border-2 border-slate-100 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-xs">
                      <thead className="bg-[#F8FAFC] border-b border-slate-100">
                        <tr>
                          <th className="py-4 px-6 text-left font-black uppercase text-slate-500 tracking-wider">Academic Modules</th>
                          <th className="py-4 px-6 text-center font-black uppercase text-slate-500 tracking-wider">Theory (70)</th>
                          <th className="py-4 px-6 text-center font-black uppercase text-slate-500 tracking-wider">Pract (30)</th>
                          <th className="py-4 px-6 text-right font-black uppercase text-slate-500 tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { sub: 'Advanced Core Mathematics', th: '68', pr: '28', tot: '96' },
                          { sub: 'Theoretical Quantum Physics', th: '62', pr: '26', tot: '88' },
                          { sub: 'Analytical Organic Chemistry', th: '66', pr: '29', tot: '95' },
                          { sub: 'Genomic Biology Foundations', th: '65', pr: '27', tot: '92' },
                        ].map((item, i) => (
                          <tr key={i} className="font-bold text-slate-700 hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6">{item.sub}</td>
                            <td className="py-4 px-6 text-center font-mono">{item.th}</td>
                            <td className="py-4 px-6 text-center font-mono">{item.pr}</td>
                            <td className="py-4 px-6 text-right text-blue-600 font-black text-sm">{item.tot}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-[#0F172A] text-white">
                        <tr>
                          <td className="py-5 px-6 font-black uppercase text-sm rounded-bl-xl tracking-tighter">Aggregated Result (Term 1)</td>
                          <td colSpan={2} className="py-5 px-6 text-center font-black text-lg text-emerald-400">92.75 %</td>
                          <td className="py-5 px-6 text-right font-black text-xl text-blue-400 rounded-br-xl">Distinction</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <LucidePieChart className="w-5 h-5 text-slate-300" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sectional Performance Analysis</span>
                        </div>
                        <div className="space-y-3">
                           {[
                             { label: 'Quantitative Aptitude', val: '96%', color: 'w-[96%] bg-blue-500' },
                             { label: 'Scientific Logical Core', val: '92%', color: 'w-[92%] bg-purple-500' },
                             { label: 'Language Communication', val: '84%', color: 'w-[84%] bg-amber-500' },
                           ].map((bar, i) => (
                             <div key={i} className="space-y-1.5 text-right">
                               <div className="flex justify-between items-center text-[10px] font-black">
                                  <span className="text-slate-600">{bar.label}</span>
                                  <span className="text-slate-900">{bar.val}</span>
                               </div>
                               <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                 <div className={`h-full ${bar.color}`} />
                               </div>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl italic">
                           <div className="flex items-center gap-2 mb-2">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Educator Remarks</span>
                              <div className="flex-1 h-px bg-slate-200" />
                           </div>
                           <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                              "Aarav continues to define institutional excellence in mathematical reasoning. Strategic focus on linguistic precision will further augment overall profile."
                           </p>
                        </div>
                        <div className="flex items-end justify-between pt-4">
                           <div className="space-y-3 text-center">
                              <div className="h-10 border-b border-slate-200 min-w-[120px] mb-1 flex items-center justify-center opacity-30 italic text-[10px] text-slate-400">Class Teacher</div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Coordinator</span>
                           </div>
                           <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-blue-50 rounded-full border-2 border-blue-100 flex items-center justify-center group animate-pulse">
                                 <div className="w-12 h-12 rounded-full border-2 border-blue-200 border-dashed animate-spin-slow" />
                                 <Award className="absolute w-6 h-6 text-blue-600" />
                              </div>
                              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-2">Digital Stamp</span>
                           </div>
                           <div className="space-y-3 text-center">
                              <div className="h-10 border-b border-slate-200 min-w-[120px] mb-1 flex items-center justify-center opacity-30 italic text-[10px] text-slate-400 text-center">Registrar Signature</div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Head of Academy</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - 40% (HERO ANALYTICS AREA) */}
          <div className="lg:col-span-4 space-y-8">
            
            <div className="sticky top-28 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0F172A] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-purple-900/20"
              >
                {/* Visual Decorations */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] -z-0 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-purple-400 mb-2">Performance Center</h4>
                      <h2 className="text-2xl font-black tracking-tight leading-tight">Academic Performance<br />Analytics Dashboard</h2>
                    </div>
                    <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                      <TrendingUp className="w-7 h-7 text-purple-400" />
                    </div>
                  </div>

                  {/* 1. PERFORMANCE CHART (Line Chart) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class Avg vs Highest Score Trends</span>
                    </div>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ACADEMIC_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                          <XAxis 
                            dataKey="semester" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                          />
                          <YAxis 
                            domain={[0, 100]}
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1E293B',
                              borderRadius: '16px', 
                              border: '1px solid rgba(255,255,255,0.1)',
                              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              padding: '12px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="avg" 
                            stroke="#3B82F6" 
                            strokeWidth={4} 
                            dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#1E293B' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="high" 
                            stroke="#8B5CF6" 
                            strokeWidth={4} 
                            dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 2, stroke: '#1E293B' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 2. BELL CURVE ANALYSIS */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bell Curve Score Distribution</span>
                      <span className="text-[9px] font-black text-purple-400 uppercase">92nd Percentile Marker</span>
                    </div>
                    <div className="h-32 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DISTRIBUTION_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <Tooltip cursor={false} content={() => null} />
                          <Area 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#8B5CF6" 
                            fill="url(#colorCurve)" 
                            strokeWidth={3}
                          />
                          <defs>
                            <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <ReferenceLine x={80} stroke="#3B82F6" strokeDasharray="3 3" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 3. KPI WIDGETS */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Overall Passing Rate", val: "96.4%", icon: UserCheck, color: "text-emerald-400" },
                      { label: "Distinction Holders", val: "324", icon: Award, color: "text-amber-400" },
                      { label: "Exams Conducted", val: "148", icon: History, color: "text-blue-400" },
                      { label: "Average Class Score", val: "81.7%", icon: LucidePieChart, color: "text-purple-400" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-[28px] group hover:bg-white/10 transition-all flex flex-col justify-between h-28">
                        <div className={`p-2 bg-white/5 w-fit rounded-xl ${stat.color}`}>
                           <stat.icon className="w-4 h-4" />
                        </div>
                        <div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">{stat.label}</span>
                           <h5 className="font-black text-xl tracking-tighter leading-none">{stat.val}</h5>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 4. LIVE EXAM ACTIVITY FEED */}
                  <div className="space-y-5 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Exam Activity Feed</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="space-y-3">
                      {[
                        { text: "Results Generated for Class XII Science", time: "12m ago", status: "Success" },
                        { text: "Grade Configuration Updated for Batch B", time: "44m ago", status: "Updated" },
                        { text: "New Examination Scheduled: Unit Test IV", time: "2h ago", status: "Published" },
                        { text: "Report Cards Published to Portal", time: "Yesterday", status: "Archived" },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all cursor-pointer">
                           <div className="flex-1">
                              <p className="text-[11px] font-bold text-slate-100 leading-snug">{activity.text}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${
                                   activity.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' :
                                   activity.status === 'Updated' ? 'bg-amber-500/20 text-amber-400' :
                                   activity.status === 'Published' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                                }`}>{activity.status}</span>
                                <span className="text-[9px] text-slate-600 font-bold">• {activity.time}</span>
                              </div>
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-purple-400 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};
