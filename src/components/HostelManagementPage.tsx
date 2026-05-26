import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Home, 
  Building, 
  Users, 
  ShieldCheck, 
  ClipboardList, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Phone, 
  AlertCircle, 
  CheckCircle, 
  MoreVertical, 
  Download, 
  Printer, 
  Bed, 
  Coffee, 
  Shield, 
  Zap,
  TrendingUp,
  History,
  DoorOpen
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

// --- MOCK DATA ---
const HOSTEL_OCCUPANCY = [
  { name: 'Occupied', value: 342, fill: '#2563EB' },
  { name: 'Vacant', value: 58, fill: '#E2E8F0' },
  { name: 'Under Maintenance', value: 12, fill: '#F59E0B' },
];

const ROOM_STATUS = [
  { room: '101-A', type: 'Triple/AC', occupant: 'Rahul Verma', status: 'In' },
  { room: '101-B', type: 'Triple/AC', occupant: 'Aman Deep', status: 'Out' },
  { room: '102', type: 'Double/Non-AC', occupant: 'Siddharth Roy', status: 'In' },
  { room: '105', type: 'Single/VIP', occupant: 'Kabir Vohra', status: 'In' },
];

const RECENT_VISITORS = [
  { name: 'Rajesh Gupta', student: 'Ananya Gupta', timeIn: '02:30 PM', timeOut: '-', purpose: 'Personal' },
  { name: 'Anita Sharma', student: 'Priya Sharma', timeIn: '10:15 AM', timeOut: '11:45 AM', purpose: 'Materials' },
];

interface HostelManagementPageProps {
  onBack: () => void;
}

export const HostelManagementPage: React.FC<HostelManagementPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-700 pb-20">
      
      {/* PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-2xl font-bold text-sm hover:bg-amber-100 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </motion.button>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#F59E0B] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-200">
                MODULE 10
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase tracking-tighter">Hostel & Residential Management Console</h1>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Manage room allocation, hostel attendance, residential operations, fee collections, visitor approvals, and student safety from a centralized command center.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Quick Allocate</span>
             </button>
             <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
               <Shield className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI OVERVIEW GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {[
             { label: 'Total Capacity', value: '412', sub: 'Beds available', icon: Bed, color: 'text-amber-600', bg: 'bg-amber-50' },
             { label: 'Current Residents', value: '342', sub: '83% Occupancy', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Pending Complaints', value: '8', sub: '2 High Priority', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
             { label: 'In-Hostel Count', value: '256', sub: 'Current Attendance', icon: DoorOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           ].map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:border-amber-100 transition-all group"
             >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{stat.label}</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
                  </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: CORE HOSTEL OPERATIONS (65%) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* ROOM ALLOCATION REGISTRY */}
            <section className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                        <Building className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Room Allocation Registry</h3>
                        <p className="text-xs text-slate-500 font-medium tracking-tight">Monitor real-time room occupancy and resident status.</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search room or resident..." className="bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 transition-all" />
                     </div>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead>
                        <tr className="border-b border-slate-100">
                           <th className="pb-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Room No</th>
                           <th className="pb-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                           <th className="pb-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Occupant Name</th>
                           <th className="pb-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Attendance</th>
                           <th className="pb-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {ROOM_STATUS.map((room, i) => (
                           <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                              <td className="py-4">
                                 <span className="text-sm font-black text-slate-900">{room.room}</span>
                              </td>
                              <td className="py-4">
                                 <span className="text-xs font-bold text-slate-500">{room.type}</span>
                              </td>
                              <td className="py-4">
                                 <span className="text-xs font-black text-slate-800">{room.occupant}</span>
                              </td>
                              <td className="py-4">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    room.status === 'In' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                 }`}>
                                    {room.status} Hostel
                                 </span>
                              </td>
                              <td className="py-4 text-right">
                                 <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* WARDEN LOGS & ATTENDANCE TRACKER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <section className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <ClipboardList className="w-6 h-6" />
                     </div>
                     <h3 className="text-lg font-black text-slate-900 tracking-tight">Visitor Management</h3>
                  </div>
                  <div className="space-y-4">
                     {RECENT_VISITORS.map((v, i) => (
                        <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                           <div className="flex justify-between items-start">
                              <div>
                                 <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{v.name}</h4>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visiting: {v.student}</p>
                              </div>
                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">{v.purpose}</span>
                           </div>
                           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-200/50 pt-2">
                              <span className="text-emerald-500">In: {v.timeIn}</span>
                              <span className="text-rose-500">Out: {v.timeOut}</span>
                           </div>
                        </div>
                     ))}
                     <button className="w-full py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">New Visitor Entry</button>
                  </div>
               </section>

               <section className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <Zap className="w-6 h-6" />
                     </div>
                     <h3 className="text-lg font-black text-slate-900 tracking-tight">Facility Complaints</h3>
                  </div>
                  <div className="space-y-4">
                     {[
                        { title: 'AC Cooling Leakage', room: '101', priority: 'High', date: '2h ago' },
                        { title: 'Fan Making Noise', room: '204', priority: 'Medium', date: 'Yesterday' },
                     ].map((c, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border border-slate-50 rounded-2xl">
                           <div className={`p-2 rounded-xl ${c.priority === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'}`}>
                              <AlertCircle className="w-4 h-4" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{c.title}</h4>
                              <p className="text-[10px] font-bold text-slate-400 tracking-widest">RM-{c.room} · {c.date}</p>
                           </div>
                           <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:text-emerald-500"><CheckCircle className="w-4 h-4" /></button>
                        </div>
                     ))}
                  </div>
               </section>
            </div>
          </div>

          {/* RIGHT: ANALYTICS & INSIGHTS (35%) */}
          <div className="lg:col-span-4 space-y-8">
             <div className="sticky top-28 space-y-8">
                
                {/* OCCUPANCY DONUT CHART */}
                <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm flex flex-col items-center">
                   <h4 className="w-full text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Capacity Distribution</h4>
                   <div className="h-64 w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={HOSTEL_OCCUPANCY}
                               cx="50%"
                               cy="50%"
                               innerRadius={60}
                               outerRadius={85}
                               paddingAngle={5}
                               dataKey="value"
                            >
                               {HOSTEL_OCCUPANCY.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                               ))}
                            </Pie>
                            <Tooltip />
                         </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-1">
                         <span className="text-3xl font-black text-slate-900 font-mono tracking-tighter">83%</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 uppercase">Filled</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 gap-2 w-full mt-8">
                      {HOSTEL_OCCUPANCY.map((item, i) => (
                        <div key={i} className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-xl">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.name}</span>
                           </div>
                           <span className="text-xs font-black text-slate-900">{item.value}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* HOSTEL MESS TRACKER */}
                <div className="bg-[#1E293B] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Coffee className="w-48 h-48" />
                   </div>
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400 mb-6">Hostel Mess Activity</h4>
                   <div className="space-y-6 relative z-10">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                            <Clock className="w-5 h-5 text-amber-500" />
                         </div>
                         <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Current Meal</span>
                            <h5 className="text-sm font-black text-white uppercase tracking-tight">Afternoon Lunch Buffet</h5>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <span className="text-[9px] font-black uppercase text-slate-500 block mb-1">Served today</span>
                            <span className="text-xl font-black text-white font-mono">312</span>
                         </div>
                         <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <span className="text-[9px] font-black uppercase text-slate-500 block mb-1">Satisfaction</span>
                            <span className="text-xl font-black text-emerald-400 font-mono">94%</span>
                         </div>
                      </div>
                      <button className="w-full py-4 bg-amber-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-amber-700 transition-all flex items-center justify-center gap-2">
                         <ClipboardList className="w-4 h-4" />
                         Weekly Menu Planner
                      </button>
                   </div>
                </div>

                {/* SECURITY LOGS */}
                <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Warden Security Feed</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   </div>
                   <div className="space-y-4">
                      {[
                        { time: '09:00 PM', log: 'All residents checked in for Roll-call' },
                        { time: '07:45 PM', log: 'Warden Routine Patrol - Wing B' },
                        { time: '06:30 PM', log: 'Main Gate Secure & Locked' },
                      ].map((log, i) => (
                        <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                           <span className="text-[10px] font-black text-amber-600 font-mono bg-amber-50 px-2 py-0.5 rounded-lg h-fit">{log.time}</span>
                           <p className="text-[10px] font-bold text-slate-600 leading-tight group-hover:text-amber-600 transition-colors">{log.log}</p>
                        </div>
                      ))}
                   </div>
                </div>

             </div>
          </div>

        </div>
      </main>

      {/* FLOATING ACTION OVERLAY */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="flex items-center gap-2 p-1.5 bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
          >
             <button className="px-6 py-3 bg-amber-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-600/30">
                <Printer className="w-3.5 h-3.5" />
                <span>Export Occupancy Summary</span>
             </button>
             <button className="p-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
             </button>
          </motion.div>
       </div>

    </div>
  );
};
