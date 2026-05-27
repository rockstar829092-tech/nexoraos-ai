import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  UserCheck, 
  UserX, 
  FileText, 
  TrendingUp, 
  Search, 
  Filter, 
  Download, 
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Fingerprint,
  PieChart as LucidePieChart,
  BarChart3,
  Mail,
  Printer,
  Wifi,
  RefreshCw,
  Activity,
  Award,
  Users,
  ChevronDown,
  MailOpen,
  LayoutDashboard
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  AreaChart,
  Area
} from 'recharts';

// Mock Data
const ATTENDANCE_BREAKDOWN = [
  { name: 'Present', value: 2418, color: '#3B82F6' },
  { name: 'Absent', value: 64, color: '#EF4444' },
  { name: 'Approved Leave', value: 31, color: '#F59E0B' },
  { name: 'Late Arrival', value: 27, color: '#8B5CF6' },
];

const WORKFORCE_TRENDS = [
  { time: '08:00', teaching: 45, nonTeaching: 30 },
  { time: '09:00', teaching: 98, nonTeaching: 92 },
  { time: '10:00', teaching: 99, nonTeaching: 95 },
  { time: '11:00', teaching: 98, nonTeaching: 94 },
];

interface AttendanceLeavePageProps {
  onBack: () => void;
}

export const AttendanceLeavePage: React.FC<AttendanceLeavePageProps> = ({ onBack }) => {
  const [syncing, setSyncing] = useState(false);
  const [activeMonth] = useState('September 2026');

  // Simulate periodic syncing
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncing(true);
      setTimeout(() => setSyncing(false), 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 pb-20">
      {/* 1. PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Dashboard</span>
            </motion.button>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#1E293B] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-slate-200">
                MODULE 07
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">Real-Time Attendance & Leave Console</h1>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Centralized monitoring, biometric synchronization, and workforce analytics.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex flex-col items-end text-right">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${syncing ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biometric Cluster Active</span>
              </div>
              <span className="text-xs font-black text-slate-900">Last Sync: 12s ago</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-inner">
               <Fingerprint className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* LEFT COLUMN - 60% */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* 1. BIOMETRIC ATTENDANCE CENTER */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Biometric Device Monitoring</h3>
                    <p className="text-xs text-slate-500 font-medium">Real-time hardware status and live punch-in stream.</p>
                  </div>
                </div>
                <div className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 border transition-all ${syncing ? 'bg-blue-50 border-blue-100 text-blue-500' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                   <RefreshCw className="w-3 h-3" />
                   {syncing ? 'Synchronizing...' : 'Live Cloud Sync'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 relative z-10">
                {[
                  { id: 'BIO-01', status: 'Online', signal: 'Strong', active: true },
                  { id: 'BIO-02', status: 'Online', signal: 'Excellent', active: true },
                  { id: 'BIO-03', status: 'Syncing', signal: 'Waiting', active: false },
                ].map((device, i) => (
                  <div key={i} className="p-5 rounded-3xl border border-slate-200 bg-slate-50/30 flex flex-col gap-3 group hover:bg-white hover:shadow-md transition-all text-left">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        <Wifi className={`w-4 h-4 ${device.active ? 'text-emerald-500' : 'text-blue-500'}`} />
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase border ${device.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {device.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Device ID</h4>
                      <p className="text-sm font-black text-slate-800">{device.id}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* LIVE ATTENDANCE FEED PLACEHOLDER (Light Theme) */}
              <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-200 relative mt-4 shadow-inner">
                 <div className="flex items-center justify-between mb-4">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">LIVE ATTENDANCE FEED</h5>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                 </div>
                 <div className="space-y-4">
                   {[
                     { time: '08:02 AM', name: 'Aarav Sharma', action: 'Present', avatar: 'AS' },
                     { time: '08:05 AM', name: 'Priya Patel', action: 'Present', avatar: 'PP' },
                     { time: '08:11 AM', name: 'Rahul Singh', action: 'Present', avatar: 'RS' },
                     { time: '08:13 AM', name: 'Ananya Gupta', action: 'Absent', avatar: 'AG' },
                   ].map((feed, i) => (
                     <div key={i} className="flex items-center justify-between group py-2 border-b border-slate-200 last:border-0">
                        <div className="flex items-center gap-3 text-left">
                           <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">{feed.avatar}</div>
                           <div>
                              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{feed.name}</p>
                              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter">{feed.time}</span>
                           </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                          feed.action === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
                        }`}>{feed.action}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </motion.section>

            {/* 2. LEAVE APPLICATION CENTER */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                    <MailOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Leave Application Center</h3>
                    <p className="text-xs text-slate-500 font-medium">Digital leave request inbox with enterprise workflow.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl">
                   <Filter className="w-3.5 h-3.5 text-slate-400" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Filter</span>
                </div>
              </div>

              <div className="space-y-4">
                 {[
                   { name: 'Neha Sharma', role: 'Teacher (Faculty)', type: 'Medical Leave', duration: '2 Days', reason: 'Doctor-advised recovery period following seasonal viral infection.', priority: 'High', color: 'text-rose-500', bg: 'bg-rose-50' },
                   { name: 'Aditya Meena', role: 'Student (XII-A)', type: 'Family Function', duration: '1 Day', reason: 'Attending an important family event.', priority: 'Medium', color: 'text-blue-500', bg: 'bg-blue-50' },
                 ].map((req, i) => (
                    <div key={i} className="p-6 border border-slate-200 rounded-[28px] bg-white group hover:border-slate-300 hover:shadow-md transition-all text-left">
                       <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <div className="flex gap-4 flex-1">
                           <div className={`w-14 h-14 rounded-2xl ${req.bg} flex items-center justify-center text-xl font-black ${req.color} shadow-sm border border-slate-100 uppercase`}>
                             {req.name.charAt(0)}
                           </div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <h4 className="text-sm font-black text-slate-900">{req.name}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${req.priority === 'High' ? 'bg-rose-100 text-rose-600 border-rose-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>
                                  {req.priority} Priority
                                </span>
                              </div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.role}</p>
                              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] font-black text-amber-600">
                                 <Calendar className="w-3.5 h-3.5" />
                                 <span>{req.type} • {req.duration}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex sm:flex-col gap-2">
                           <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 cursor-pointer">Approve</button>
                           <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all cursor-pointer">Reject</button>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-slate-50 border border-slate-100 border-dashed rounded-2xl">
                         <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"{req.reason}"</p>
                      </div>
                    </div>
                 ))}
              </div>
            </section>

            {/* 3. ATTENDANCE REPORTING CENTER */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Institutional Attendance Reporting</h3>
                    <p className="text-xs text-slate-500 font-medium">Comparative analytics and attendance health tracking.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-400 cursor-pointer"><Download className="w-4 h-4" /></button>
                   <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-400 cursor-pointer"><Printer className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                 {[
                   { label: 'Class XII-A', val: 94.8, type: 'up' },
                   { label: 'Class XII-B', val: 92.3, type: 'down' },
                   { label: 'XI Science', val: 96.7, type: 'up' },
                   { label: 'XII Commerce', val: 95.1, type: 'stable' },
                 ].map((stat, i) => (
                   <div key={i} className="p-5 border border-slate-200 bg-white rounded-3xl shadow-sm hover:border-blue-400 transition-all text-left">
                      <div className="flex justify-between items-start mb-3">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                         {stat.type === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                      </div>
                      <div className="flex items-end gap-2">
                         <h4 className="text-xl font-black text-slate-900 leading-none">{stat.val}%</h4>
                         <span className={`text-[8px] font-black uppercase ${stat.type === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                           {stat.type === 'up' ? 'Healthy' : 'Monitor'}
                         </span>
                      </div>
                      <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          className={`h-full ${stat.val > 95 ? 'bg-emerald-500' : stat.val > 90 ? 'bg-blue-500' : 'bg-amber-500'}`}
                        />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                       <LayoutDashboard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                       <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Aggregate Compliance</h5>
                       <p className="text-[10px] text-slate-500 font-bold">Calculated across 4,200 unique records</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-xl font-black text-blue-600 font-mono tracking-tighter">95.4%</span>
                    <span className="text-[9px] text-slate-500 block font-bold uppercase">Consistency Index</span>
                 </div>
              </div>
            </section>

             {/* 4. MONTHLY ATTENDANCE TRACKER */}
             <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Monthly Attendance Tracker</h3>
                    <p className="text-xs text-slate-500 font-medium">Visual calendar performance for {activeMonth}.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-3">
                    {['Present', 'Absent', 'Leave', 'Holiday'].map((label, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          label === 'Present' ? 'bg-emerald-500' :
                          label === 'Absent' ? 'bg-rose-500' :
                          label === 'Leave' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-8 relative z-10">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="text-center py-2 text-[10px] font-black text-slate-300 tracking-[0.2em]">{day}</div>
                ))}
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const status = day === 6 || day === 13 || day === 20 || day === 27 ? 'holiday' :
                                day === 5 || day === 19 ? 'absent' :
                                day === 10 ? 'leave' : 'present';
                  return (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05 }}
                      className={`h-12 border border-slate-50 rounded-xl flex flex-col items-center justify-center gap-1 group relative transition-all cursor-pointer ${
                        status === 'present' ? 'bg-emerald-50/50' :
                        status === 'absent' ? 'bg-rose-50/50' :
                        status === 'leave' ? 'bg-amber-50/50' : 'bg-blue-50/50 font-bold opacity-40'
                      }`}
                    >
                      <span className="text-[10px] font-black text-slate-400">{day}</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        status === 'present' ? 'bg-emerald-500' :
                        status === 'absent' ? 'bg-rose-500' :
                        status === 'leave' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-6 relative z-10">
                 {[
                   { label: 'Working Days', val: '22', sub: 'Total Sessions', icon: Activity },
                   { label: 'Attendance Streak', val: '14 Days', sub: 'Current Continuous', icon: TrendingUp },
                   { label: 'Monthly Score', val: '98.2%', sub: 'Performance Rank', icon: Award },
                 ].map((stat, i) => (
                   <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4 text-left">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400">
                         <stat.icon className="w-4 h-4" />
                      </div>
                      <div>
                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">{stat.label}</span>
                         <h5 className="text-sm font-black text-slate-900 leading-none">{stat.val}</h5>
                         <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{stat.sub}</span>
                      </div>
                   </div>
                 ))}
              </div>
             </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            
            <div className="sticky top-28 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] p-8 text-slate-900 relative overflow-hidden shadow-xl border border-slate-200 text-left"
              >
                {/* Visual Decorations */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-[120px] -z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[size:30px_30px]" />

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Admin Dashboard</h4>
                      <h2 className="text-2xl font-black tracking-tight leading-tight">HR & Admin<br />Attendance Hub</h2>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                      <Activity className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>

                  {/* 1. ATTENDANCE DONUT CHART */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Today's Overall Attendance</span>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500" />
                         <span className="text-[9px] font-black text-emerald-600 uppercase">Live Stats</span>
                      </div>
                    </div>
                    
                    <div className="h-56 w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ATTENDANCE_BREAKDOWN}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={85}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                          >
                            {ATTENDANCE_BREAKDOWN.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                             contentStyle={{ 
                               backgroundColor: '#FFFFFF',
                               borderRadius: '16px', 
                               border: '1px solid #e2e8f0',
                               fontSize: '11px',
                               fontWeight: 'bold',
                               padding: '12px',
                               color: '#0f172a'
                             }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-1">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aggregate</span>
                         <span className="text-3xl font-black text-slate-900 font-mono tracking-tighter leading-none">96.2%</span>
                         <span className="text-[10px] font-bold text-blue-600 uppercase mt-1">Present</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {ATTENDANCE_BREAKDOWN.map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 p-3 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:shadow-md transition-all">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                             <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.name}</span>
                           </div>
                           <p className="text-sm font-black text-slate-900">{item.value.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. FLOATING KPI WIDGETS */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Pending Leave Requests", val: "18", color: "text-amber-600", icon: Mail },
                      { label: "Late Arrivals Detected", val: "27", color: "text-purple-600", icon: Clock },
                      { label: "Active Biometric Units", val: "12 / 12", color: "text-emerald-600", icon: Wifi },
                      { label: "Avg Attendance (Mo.)", val: "95.4%", color: "text-blue-600", icon: TrendingUp },
                    ].map((kpi, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5 }}
                        className="bg-slate-50 border border-slate-100 p-5 rounded-[28px] group hover:bg-white hover:shadow-md transition-all"
                      >
                         <div className={`p-2 bg-white w-fit rounded-xl mb-4 shadow-sm border border-slate-100 ${kpi.color}`}>
                           <kpi.icon className="w-4 h-4" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1 group-hover:text-slate-600 transition-colors text-left">{kpi.label}</span>
                         <h5 className="font-black text-xl tracking-tighter text-slate-900 text-left">{kpi.val}</h5>
                      </motion.div>
                    ))}
                  </div>

                  {/* 4. INSTITUTIONAL WORKFORCE INSIGHTS */}
                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Institutional Workforce Insights</span>
                    </div>

                    <div className="space-y-4">
                       {[
                         { label: 'Teaching Staff Present', val: '98.1%', trend: 'up' },
                         { label: 'Non-Teaching Presence', val: '94.6%', trend: 'stable' },
                         { label: 'Current Student Presence', val: '96.5%', trend: 'up' },
                         { label: 'Compliance Index', val: '97.2%', trend: 'up' },
                       ].map((insight, i) => (
                         <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                  <Users className="w-4 h-4 text-blue-600" />
                               </div>
                               <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tight text-left">{insight.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <span className="text-sm font-black text-slate-900 font-mono">{insight.val}</span>
                               <div className="h-8 w-12 pt-2">
                                  <ResponsiveContainer width="100%" height="100%">
                                     <AreaChart data={WORKFORCE_TRENDS}>
                                        <Area type="monotone" dataKey={i % 2 === 0 ? 'teaching' : 'nonTeaching'} stroke="#2563EB" fill="#2563EB" fillOpacity={0.1} />
                                     </AreaChart>
                                  </ResponsiveContainer>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* 3. LIVE ADMIN ACTIVITY FEED */}
                  <div className="space-y-5 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center px-1 text-left">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Admin Activity Stream</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>

                    <div className="space-y-3">
                      {[
                        { text: "Medical Leave Approved for Neha Sharma (Faculty)", time: "08:14 AM", status: "Approved" },
                        { text: "Biometric Device BIO-02 Data Successfully Synced", time: "08:17 AM", status: "Synced" },
                        { text: "Monthly Attendance Compliance Report Generated", time: "08:21 AM", status: "Generated" },
                        { text: "Late Arrival Alert Triggered for Class XII Batch B", time: "08:24 AM", status: "Alert" },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:shadow-md transition-all cursor-pointer text-left">
                           <div className="flex-1">
                              <p className="text-[11px] font-bold text-slate-700 leading-snug group-hover:text-blue-600 transition-colors">{activity.text}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${
                                   activity.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                                   activity.status === 'Synced' ? 'bg-blue-100 text-blue-600' :
                                   activity.status === 'Generated' ? 'bg-purple-100 text-purple-600' : 'bg-rose-100 text-rose-600'
                                }`}>{activity.status}</span>
                                <span className="text-[9px] text-slate-400 font-bold tracking-tight">• {activity.time}</span>
                              </div>
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-all" />
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

      {/* CUSTOM OVERLAY FOR DATA EXPORT */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
         <motion.button 
           initial={{ y: 100 }}
           animate={{ y: 0 }}
           whileHover={{ scale: 1.05, y: -2 }}
           whileTap={{ scale: 0.95 }}
           className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full shadow-2xl shadow-blue-100 border border-slate-200 cursor-pointer"
         >
            <div className="p-2 bg-blue-500 text-white rounded-full">
               <Download className="w-4 h-4" />
            </div>
            <div>
               <p className="text-xs font-black uppercase tracking-widest leading-none mb-0.5">Export Full Academic Muster</p>
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Ready for Review (CSV, PDF, XLSX)</span>
            </div>
         </motion.button>
      </div>

    </div>
  );
};
