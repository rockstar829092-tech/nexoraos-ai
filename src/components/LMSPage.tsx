import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  Video, 
  Laptop, 
  FileText, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ChevronRight,
  Plus,
  Play,
  Calendar,
  Award,
  BarChart3,
  MessageSquare,
  Star,
  Layers,
  GraduationCap,
  Sparkles,
  Brain,
  Bot
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// --- MOCK DATA ---
const COURSE_ENGAGEMENT = [
  { day: 'Mon', active: 1200, completion: 450 },
  { day: 'Tue', active: 1500, completion: 520 },
  { day: 'Wed', active: 1100, completion: 480 },
  { day: 'Thu', active: 1800, completion: 600 },
  { day: 'Fri', active: 1600, completion: 580 },
  { day: 'Sat', active: 900, completion: 300 },
  { day: 'Sun', active: 700, completion: 250 },
];

const CONTENT_DISTRIBUTION = [
  { name: 'Videos', value: 45, color: '#6366F1' },
  { name: 'Assignments', value: 25, color: '#10B981' },
  { name: 'Documents', value: 20, color: '#3B82F6' },
  { name: 'Quizzes', value: 10, color: '#F59E0B' },
];

const COURSES = [
  { 
    id: 'LMS-101', 
    title: 'Advanced Quantum Physics', 
    instructor: 'Dr. Sarah Mitchell', 
    enrolled: 124, 
    progress: 68, 
    status: 'In Progress',
    image: 'bg-indigo-100'
  },
  { 
    id: 'LMS-102', 
    title: 'Modern World History', 
    instructor: 'Prof. Robert James', 
    enrolled: 86, 
    progress: 42, 
    status: 'Paused',
    image: 'bg-amber-100'
  },
  { 
    id: 'LMS-103', 
    title: 'Abstract Algebra', 
    instructor: 'Dr. Alan Turing', 
    enrolled: 210, 
    progress: 95, 
    status: 'Completing Soon',
    image: 'bg-emerald-100'
  }
];

interface LMSPageProps {
  onBack: () => void;
}

export const LMSPage: React.FC<LMSPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'live' | 'assignments' | 'analytics'>('courses');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 pb-20">
      
      {/* 1. PREMIUM STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer group shadow-sm border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </motion.button>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#4F46E5] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md shadow-indigo-100">
                LMS HUB
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">Learning Management System</h1>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Host online classes, manage assignments, and track academic progress.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Create Course</span>
             </button>
             <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm relative">
               <Video className="w-5 h-5 text-rose-500" />
               <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TOP KPI ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {[
             { label: 'Courses Active', value: '24', sub: 'Across 6 Depts', icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
             { label: 'Student Users', value: '4,285', sub: '+12% this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Assigned Tasks', value: '1,120', sub: '85% Completion', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Live Sessions', value: '18', sub: 'Streaming now', icon: Video, color: 'text-rose-600', bg: 'bg-rose-50' },
           ].map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group overflow-hidden relative"
             >
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{stat.label}</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1 inline-block">{stat.sub}</span>
                  </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN - CORE LMS (65%) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* TABS ENGINE */}
            <div className="bg-white border border-slate-200 rounded-[40px] p-2 flex overflow-x-auto gap-2 shadow-sm">
               {[
                 { id: 'courses', label: 'Course Catalog', icon: BookOpen },
                 { id: 'live', label: 'Live Classrooms', icon: Video },
                 { id: 'assignments', label: 'Digital Lab', icon: FileText },
                 { id: 'analytics', label: 'E-Learning Insights', icon: BarChart3 },
               ].map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-[160px] flex items-center justify-center gap-3 py-4 px-6 rounded-3xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                      activeTab === tab.id 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                 >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                 </button>
               ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'courses' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                    <div className="relative w-full sm:w-96">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                       <input 
                        type="text" 
                        placeholder="Search courses, instructors, or topics..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                       />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                       <div className="flex-1 sm:flex-none flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 cursor-pointer hover:bg-white transition-all">
                          <Filter className="w-4 h-4" />
                          <span>Filter</span>
                       </div>
                       <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#4F46E5] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 cursor-pointer">
                          Apply Changes
                       </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COURSES.map((course, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -8 }}
                        className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm group hover:shadow-2xl hover:border-indigo-200 transition-all"
                      >
                         <div className={`h-40 ${course.image} relative overflow-hidden flex items-center justify-center`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <BookOpen className="w-12 h-12 text-slate-300 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white border border-slate-200 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900">
                                {course.id}
                            </div>
                         </div>
                         <div className="p-6 space-y-4">
                            <div>
                               <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-1">{course.title}</h4>
                               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{course.instructor}</p>
                            </div>
                            
                            <div className="space-y-2">
                               <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400 tracking-widest">
                                  <span>Course Progress</span>
                                  <span className="text-indigo-600">{course.progress}%</span>
                               </div>
                               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progress}%` }}
                                    className={`h-full rounded-full ${course.progress > 90 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                  />
                               </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                               <div className="flex items-center gap-1.5">
                                  <Users className="w-3.5 h-3.5 text-slate-400" />
                                  <span className="text-[10px] font-black text-slate-500">{course.enrolled} Students</span>
                               </div>
                               <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                                 course.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                 course.status === 'Paused' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                               }`}>
                                 {course.status}
                               </span>
                            </div>

                            <button className="w-full py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all cursor-pointer">
                               Manage Course
                            </button>
                         </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-slate-100 border-2 border-slate-200 rounded-[40px] p-8 text-slate-900 relative overflow-hidden shadow-sm">
                     <div className="absolute top-0 right-0 p-8 opacity-5">
                        <GraduationCap className="w-48 h-48" />
                     </div>
                     <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 max-w-md text-center md:text-left">
                           <div className="flex items-center justify-center md:justify-start gap-3">
                              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest">System Update</span>
                              <div className="w-2 h-2 rounded-full bg-emerald-500" />
                           </div>
                           <h3 className="text-2xl font-black tracking-tight leading-tight uppercase">Faculty Curated Resource Center</h3>
                           <p className="text-sm font-semibold text-slate-600 leading-relaxed">System-wide shared library of verified academic materials, interactive templates, and examination blue-prints now available for all departments.</p>
                           <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all cursor-pointer shadow-md">Explore Repository</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           {[
                             { label: 'E-Books', val: '450+', icon: BookOpen },
                             { label: 'Blueprints', val: '120+', icon: Layers },
                             { label: 'Templates', val: '85+', icon: FileText },
                             { label: 'Media Assets', val: '2.4k', icon: Laptop },
                           ].map((item, i) => (
                             <div key={i} className="p-4 bg-white border border-slate-200 rounded-3xl w-32 shadow-sm">
                                <item.icon className="w-5 h-5 text-indigo-600 mb-2" />
                                <span className="text-lg font-black block tracking-tighter text-slate-900">{item.val}</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'live' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                   <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-3">
                            <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                               <Video className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Live Classrooms</h3>
                               <p className="text-xs text-slate-500 font-medium">Real-time synchronized interactive teaching sessions.</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <span className="text-xs font-black text-rose-500 uppercase tracking-widest">Global Broadcast Online</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                         {[
                           { subject: 'Theoretical Astrophysics', instructor: 'Dr. Sarah Mitchell', users: 84, timeRemaining: '24m', status: 'Live' },
                           { subject: 'Organic Chemistry Lab', instructor: 'Prof. Marcus Chen', users: 42, timeRemaining: '1h 10m', status: 'Live' },
                           { subject: 'Introduction to Psychology', instructor: 'Dr. Helena Roy', users: 156, timeRemaining: '52m', status: 'Upcoming' },
                         ].map((room, i) => (
                           <div key={i} className="group p-6 border border-slate-100 bg-slate-50/50 rounded-[32px] hover:bg-white hover:border-rose-200 hover:shadow-xl transition-all cursor-pointer">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                 <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden">
                                       <Play className={`w-6 h-6 ${room.status === 'Live' ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
                                    </div>
                                    <div>
                                       <h4 className="text-base font-black text-slate-900 group-hover:text-rose-500 transition-colors uppercase tracking-tight uppercase">{room.subject}</h4>
                                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{room.instructor}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-8 px-6 border-l border-slate-200/50">
                                    <div className="text-right">
                                       <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">Viewers</span>
                                       <div className="flex items-center gap-1.5 justify-end">
                                          <Users className="w-3 h-3 text-slate-400" />
                                          <span className="text-xs font-black text-slate-800">{room.users}</span>
                                       </div>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">Time Left</span>
                                       <span className="text-xs font-black text-slate-800 font-mono">{room.timeRemaining}</span>
                                    </div>
                                    <button className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                      room.status === 'Live' 
                                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-100 hover:bg-rose-600' 
                                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                    }`}>
                                       {room.status === 'Live' ? 'Join Now' : 'Join later'}
                                    </button>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                   {/* NEW: AI ACADEMIC COPILOT CENTER */}
                   <section className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                         <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-600 shadow-xl shadow-blue-200 rounded-3xl text-white">
                               <Sparkles className="w-8 h-8" />
                            </div>
                            <div>
                               <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">AI Academic Copilot Center</h3>
                               <p className="text-xs text-slate-500 font-medium max-w-lg leading-relaxed">An intelligent AI-powered assistant helping teachers and students automate academic workflows and improve outcomes.</p>
                            </div>
                         </div>
                         <div className="px-5 py-2 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">AI Core Active</span>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                         {/* Card 1: AI Quiz Generator */}
                         <motion.div whileHover={{ y: -5 }} className="group p-6 border border-slate-100 rounded-[32px] bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:border-blue-200 transition-all">
                            <div className="flex justify-between items-start mb-6">
                               <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                  <Sparkles className="w-5 h-5" />
                               </div>
                               <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-black uppercase tracking-widest rounded-full">AI Powered</span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">AI Quiz Generator</h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">Generate complete quizzes automatically from any chapter. Example Topic: <span className="text-blue-600 font-bold">Newton's Laws of Motion</span></p>
                            <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-2">
                               {['Multiple Choice', 'True/False', 'Short/Long Answers'].map((q, i) => (
                                 <div key={i} className="flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-slate-700">{q} Questions</span>
                                 </div>
                               ))}
                            </div>
                            <button className="w-full mt-4 py-3 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Ready To Generate</button>
                         </motion.div>

                         {/* Card 2: AI Assignment Evaluator */}
                         <motion.div whileHover={{ y: -5 }} className="group p-6 border border-slate-100 rounded-[32px] bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:border-indigo-200 transition-all">
                            <div className="flex justify-between items-start mb-6">
                               <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                  <Brain className="w-5 h-5" />
                               </div>
                               <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[8px] font-black uppercase tracking-widest rounded-full">Smart Evaluation</span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">AI Assignment Evaluator</h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">Analyze submitted assignments and provide instant evaluation insights for educators.</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                               <div className="p-3 bg-white border border-slate-100 rounded-2xl flex flex-col items-center">
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Quality</span>
                                  <span className="text-lg font-black text-emerald-500">92%</span>
                               </div>
                               <div className="p-3 bg-white border border-slate-100 rounded-2xl flex flex-col items-center">
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Grammar</span>
                                  <span className="text-lg font-black text-blue-500">A+</span>
                               </div>
                            </div>
                            <button className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all underline decoration-2 underline-offset-4">Ready For Teacher Review</button>
                         </motion.div>

                         {/* Card 3: AI Student Performance Predictor */}
                         <motion.div whileHover={{ y: -5 }} className="group p-6 border border-slate-100 rounded-[32px] bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:border-emerald-200 transition-all">
                            <div className="flex justify-between items-start mb-6">
                               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                  <TrendingUp className="w-5 h-5" />
                               </div>
                               <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase tracking-widest rounded-full">Predictive Analytics</span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Academic Performance Predictor</h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">Predict final academic outcomes using attendance, assignments, and test pattern history.</p>
                            <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-100">
                               <div className="flex justify-between items-center">
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Predicted Final Score</span>
                                  <span className="text-sm font-black text-emerald-600">84%</span>
                               </div>
                               <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">At-Risk Level</span>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">Low</span>
                               </div>
                            </div>
                         </motion.div>

                         {/* Card 4: AI Study Assistant */}
                         <motion.div whileHover={{ y: -5 }} className="group p-6 border border-slate-100 rounded-[32px] bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:border-rose-200 transition-all">
                            <div className="flex justify-between items-start mb-6">
                               <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-all">
                                  <Bot className="w-5 h-5" />
                               </div>
                               <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[8px] font-black uppercase tracking-widest rounded-full">24/7 Available</span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">AI Personalized Study Assistant</h4>
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-3">
                               <div className="flex gap-2">
                                  <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
                                  <p className="text-[9px] font-medium text-slate-600 italic">"Explain Newton's Third Law."</p>
                               </div>
                               <div className="flex gap-2 border-t border-slate-50 pt-2">
                                  <div className="w-5 h-5 rounded-full bg-rose-500 shrink-0 flex items-center justify-center"><Bot className="w-3 h-3 text-white" /></div>
                                  <p className="text-[9px] font-bold text-slate-800">"For every action, there is an equal and opposite reaction."</p>
                               </div>
                            </div>
                         </motion.div>
                      </div>

                      {/* BOTTOM INSIGHT PANEL */}
                      <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-8 text-slate-900 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent)]" />
                         <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div>
                               <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">AI Impact Summary</h5>
                               <h3 className="text-xl font-black tracking-tight leading-none uppercase">Efficiency Metrics</h3>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
                               {[
                                 { label: 'Teacher Time Saved', val: '128 Hours' },
                                 { label: 'Assigned Reviewed', val: '1,248' },
                                 { label: 'Quizzes Generated', val: '342' },
                                 { label: 'Students Assisted', val: '3,814' },
                               ].map((m, i) => (
                                 <div key={i} className="text-center sm:text-left">
                                    <span className="text-[14px] font-black text-slate-900 block mb-0.5">{m.val}</span>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </section>

                   <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Global E-Learning Engagement</h3>
                         <div className="flex gap-2">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">Live Telemetry</span>
                         </div>
                      </div>
                      
                      <div className="h-80 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={COURSE_ENGAGEMENT}>
                               <defs>
                                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                                  </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                               <XAxis 
                                dataKey="day" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }}
                               />
                               <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }}
                               />
                               <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#1E293B', 
                                  border: 'none', 
                                  borderRadius: '16px', 
                                  padding: '12px',
                                  color: '#fff',
                                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                                }}
                                itemStyle={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px' }}
                                labelStyle={{ fontWeight: 'black', textTransform: 'uppercase', fontSize: '11px', marginBottom: '4px' }}
                               />
                               <Area 
                                type="monotone" 
                                dataKey="active" 
                                stroke="#4F46E5" 
                                strokeWidth={4} 
                                fillOpacity={1} 
                                fill="url(#colorActive)" 
                                dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                               />
                            </AreaChart>
                         </ResponsiveContainer>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-8 border-t border-slate-100">
                         {[
                           { label: 'Avg Daily Active', val: '1,420 Users', trend: '+14%' },
                           { label: 'Course Completion', val: '92.4%', trend: 'Optimal' },
                           { label: 'Avg Watch Time', val: '48m / Session', trend: 'Healthy' },
                           { label: 'Feedback Score', val: '4.8 / 5.0', trend: 'Excellent' },
                         ].map((kpi, i) => (
                           <div key={i} className="space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">{kpi.label}</span>
                              <h5 className="text-lg font-black text-slate-900 tracking-tighter">{kpi.val}</h5>
                              <span className="text-[9px] font-black uppercase text-emerald-500">{kpi.trend}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN - ANALYTICS HUD (35%) */}
          <div className="lg:col-span-4 space-y-8">
             
             <div className="sticky top-28 space-y-8">
                
                {/* CONTENT DISTRIBUTION CHART */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm flex flex-col items-center"
                >
                   <div className="w-full flex justify-between items-center mb-8">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Content Fingerprint</h4>
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                   </div>
                   
                   <div className="h-64 w-64 relative">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={CONTENT_DISTRIBUTION}
                               cx="50%"
                               cy="50%"
                               innerRadius={60}
                               outerRadius={85}
                               paddingAngle={8}
                               dataKey="value"
                               stroke="none"
                            >
                               {CONTENT_DISTRIBUTION.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                               ))}
                            </Pie>
                         </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-1">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Assets</span>
                         <span className="text-3xl font-black text-slate-900 font-mono tracking-tighter leading-none">4,210</span>
                         <span className="text-[10px] font-bold text-indigo-500 uppercase mt-1">Resource Index</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-8 border-t border-slate-50">
                      {CONTENT_DISTRIBUTION.map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 p-3 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-indigo-200 transition-all">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                             <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.name}</span>
                           </div>
                           <p className="text-sm font-black text-slate-800">{item.value}%</p>
                        </div>
                      ))}
                   </div>
                </motion.div>

                {/* ACTIVITY LOG */}
                <div className="bg-white border border-slate-200 rounded-[40px] p-8 text-slate-900 relative overflow-hidden shadow-sm">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <MessageSquare className="w-40 h-40" />
                   </div>
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      LMS Activity Stream
                   </h4>
                   <div className="space-y-6 relative overflow-hidden">
                      <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/5" />
                      {[
                        { text: 'Advanced Quantum Physics - Lecture 04 uploaded', time: '10m ago', icon: Video, color: 'text-rose-500' },
                        { text: 'Student Rahul Sharma achieved "Coding Pro" Award', time: '44m ago', icon: Award, color: 'text-amber-600' },
                        { text: 'Digital Lab: Biology Assignment updated', time: '2h ago', icon: FileText, color: 'text-blue-500' },
                        { text: 'New Batch Enrollment for Modern History open', time: 'Yesterday', icon: Users, color: 'text-emerald-500' },
                      ].map((act, i) => (
                        <div key={i} className="flex gap-5 group relative">
                           <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center relative z-10 group-hover:bg-indigo-50 transition-colors">
                              <act.icon className={`w-4 h-4 ${act.color}`} />
                           </div>
                           <div className="flex-1">
                              <p className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{act.text}</p>
                              <span className="text-[9px] text-slate-400 font-bold tracking-tighter block mt-1 uppercase">{act.time}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                   <button className="w-full py-4 mt-8 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer">
                      View System Audit Trail
                   </button>
                </div>

                {/* QUALITY METRIC */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <Star className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 rotate-12" />
                    <div className="relative z-10 space-y-6">
                       <div className="flex items-center gap-3">
                          <div className="p-3 bg-white/20  rounded-2xl">
                             <Award className="w-7 h-7 text-white" />
                          </div>
                          <div>
                             <h5 className="text-[10px] font-black uppercase tracking-widest text-white/60">Quality Compliance</h5>
                             <p className="text-xl font-black tracking-tight">System Gold Grade</p>
                          </div>
                       </div>
                       <p className="text-[11px] font-medium text-white/70 leading-relaxed italic border-l-2 border-white/20 pl-4">"The platform currently maintains a 99.9% uptime with 0.4s average page load globally, exceeding enterprise academic standards for 2026."</p>
                       <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Next Internal Audit</span>
                          <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500 rounded-full px-3 py-1 shadow-lg shadow-emerald-500/20">June 15</span>
                       </div>
                    </div>
                </div>

             </div>
          </div>
        </div>
      </main>

      {/* GLOBAL RESOURCE OVERLAY */}
      <div className="fixed bottom-8 right-8 z-50">
         <motion.button 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           whileHover={{ scale: 1.05, y: -5 }}
           whileTap={{ scale: 0.95 }}
           className="px-8 py-5 bg-[#0F172A] text-white rounded-[32px] shadow-2xl shadow-indigo-900/40 border border-white/10 flex items-center gap-4 font-bold cursor-pointer group"
         >
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl group-hover:rotate-12 transition-transform">
               <Download className="w-5 h-5" />
            </div>
            <div className="text-left">
               <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Global Assets Manager</p>
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Bulk Course Operations (SCORM / xAPI)</span>
            </div>
         </motion.button>
      </div>

    </div>
  );
};
