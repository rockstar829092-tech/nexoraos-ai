import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Bus, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  Search, 
  Filter, 
  Map as MapIcon, 
  Zap, 
  MessageSquare, 
  Bell, 
  AlertTriangle, 
  Wrench, 
  User, 
  CheckCircle,
  ChevronRight,
  MoreVertical,
  Signal,
  Fuel,
  Gauge,
  Smartphone,
  Phone,
  BarChart3,
  Bot,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';

// --- MOCK DATA ---
const PERFORMANCE_DATA = [
  { time: '07:00', punctuality: 98, delays: 2 },
  { time: '07:15', punctuality: 96, delays: 4 },
  { time: '07:30', punctuality: 94, delays: 6 },
  { time: '07:45', punctuality: 97, delays: 3 },
  { time: '08:00', punctuality: 99, delays: 1 },
];

const OCCUPANCY_DATA = [
  { name: 'Occupied', value: 641, fill: '#2563EB' },
  { name: 'Available', value: 79, fill: '#E2E8F0' },
];

const FLEET_STATUS = [
  { label: 'On Route', count: 12, color: 'bg-emerald-500' },
  { label: 'Maintenance', count: 2, color: 'bg-amber-500' },
  { label: 'Inactive', count: 1, color: 'bg-slate-400' },
];

const ROUTES = [
  { 
    id: '10A', 
    path: 'Sector 4 → Green Park → Campus', 
    dist: '18.6 KM', 
    students: 42, 
    bus: 'BUS-07', 
    driver: 'Rajesh Kumar', 
    status: 'Active',
    optimization: '92%'
  },
  { 
    id: '12B', 
    path: 'Civil Lines → Airport Road → Campus', 
    dist: '23.4 KM', 
    students: 58, 
    bus: 'BUS-12', 
    driver: 'Anita Singh', 
    status: 'Morning Active',
    optimization: '88%'
  },
];

interface InfoPanelProps {
  title: string;
  desc: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ title, desc }) => (
  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 mt-4">
    <Info className="w-5 h-5 text-blue-600 shrink-0" />
    <div>
      <h5 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">{title}</h5>
      <p className="text-[11px] text-blue-700/80 leading-relaxed">{desc}</p>
    </div>
  </div>
);

interface TransportManagementPageProps {
  onBack: () => void;
}

export const TransportManagementPage: React.FC<TransportManagementPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 pb-20">
      
      {/* 1. PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
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
              <span className="px-3 py-1 bg-[#1E293B] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-slate-200">
                MODULE 11
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">Fleet & Route Transport Management</h1>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Monitor buses, routes, drivers, and safety operations from a unified center.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 cursor-pointer">
                <Bus className="w-4 h-4" />
                <span>Add Vehicle</span>
             </button>
             <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
               <Navigation className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* EXECUTIVE OVERVIEW STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
           {[
             { label: 'Total Fleet', value: '15', sub: 'Vehicles', icon: Bus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
             { label: 'Transport Users', value: '1,248', sub: 'Students', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Active Routes', value: '32', sub: 'Daily Circuits', icon: MapIcon, color: 'text-cyan-600', bg: 'bg-cyan-50' },
             { label: 'Running Now', value: '12', sub: 'On Route', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Punctuality', value: '98.4%', sub: 'Avg Efficiency', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
             { label: 'Rev / Mo', value: '₹12.8L', sub: 'Total Billing', icon: DollarSign, color: 'text-rose-600', bg: 'bg-rose-50' },
           ].map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="bg-white border border-slate-200 p-4 rounded-[28px] shadow-sm hover:shadow-md transition-all group"
             >
               <div className={`p-3 w-fit rounded-xl ${stat.bg} ${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                 <stat.icon className="w-4 h-4" />
               </div>
               <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">{stat.label}</span>
                  <span className="text-lg font-black text-slate-900 tracking-tighter">{stat.value}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase block tracking-tight">{stat.sub}</span>
               </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN - TRANSPORT OPERATIONS (65%) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. ROUTE MANAGEMENT CENTER */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <MapIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Route Management Center</h3>
                      <p className="text-xs text-slate-500 font-medium">Coordinate institutional transport routes and circuit efficiency.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 select-none">
                        <Filter className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Filter Routes</span>
                     </div>
                  </div>
                </div>

                <div className="space-y-4">
                   {ROUTES.map((route, i) => (
                     <div key={i} className="p-6 border border-slate-100 bg-slate-50/30 rounded-[28px] hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                           <div className="space-y-3 flex-1">
                              <div className="flex items-center gap-3">
                                 <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase tracking-widest">Route {route.id}</span>
                                 <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                                    <span>{route.path}</span>
                                 </div>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                 <div>
                                    <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5 tracking-widest">Distance</span>
                                    <span className="text-xs font-black text-slate-700">{route.dist}</span>
                                 </div>
                                 <div>
                                    <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5 tracking-widest">Students</span>
                                    <span className="text-xs font-black text-slate-700">{route.students}</span>
                                 </div>
                                 <div>
                                    <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5 tracking-widest">Bus / Driver</span>
                                    <span className="text-xs font-black text-slate-700">{route.bus} / {route.driver}</span>
                                 </div>
                                 <div>
                                    <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5 tracking-widest">Route Health</span>
                                    <div className="flex items-center gap-1.5">
                                       <Activity className="w-3 h-3 text-emerald-500" />
                                       <span className="text-xs font-black text-emerald-600">Optimal</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-col items-end gap-3 min-w-[120px]">
                              <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                 route.status.includes('Active') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400'
                              }`}>{route.status}</span>
                              <div className="text-right">
                                 <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Optimization Score</span>
                                 <h5 className="text-lg font-black text-slate-900 font-mono tracking-tighter leading-none">{route.optimization}</h5>
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <InfoPanel 
                  title="What is Route Management?" 
                  desc="This system manages pickup sequences, route distances, and bus assignments to ensure maximum student coverage with minimum travel time." 
                />
            </section>

            {/* 2. LIVE VEHICLE TRACKING CENTER */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Signal className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Live Vehicle GPS Monitoring</h3>
                      <p className="text-xs text-slate-500 font-medium">Real-time telemetry and geographical positioning of the active fleet.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">GPS Link Stable</span>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden mb-6">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                       <div className="space-y-6 flex-1">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shadow-xl">
                                <Bus className="w-8 h-8" />
                             </div>
                             <div>
                                <h4 className="text-xl font-black tracking-tight uppercase">BUS-07 Tracking</h4>
                                <div className="flex items-center gap-4 mt-1">
                                   <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                      <Navigation className="w-3 h-3" />
                                      <span>On Route</span>
                                   </div>
                                   <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                      <Clock className="w-3 h-3" />
                                      <span>Last Sync: 12s ago</span>
                                   </div>
                                </div>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                             <div>
                                <span className="text-[9px] font-black uppercase text-slate-500 block mb-1 tracking-widest">Current Speed</span>
                                <div className="flex items-baseline gap-1">
                                   <span className="text-xl font-black font-mono">42</span>
                                   <span className="text-xs font-bold text-slate-400">KM/H</span>
                                </div>
                             </div>
                             <div>
                                <span className="text-[9px] font-black uppercase text-slate-500 block mb-1 tracking-widest">Fuel Level</span>
                                <div className="flex items-center gap-2">
                                   <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                      <div className="h-full w-[65%] bg-blue-500" />
                                   </div>
                                   <span className="text-xs font-black font-mono">65%</span>
                                </div>
                             </div>
                             <div>
                                <span className="text-[9px] font-black uppercase text-slate-500 block mb-1 tracking-widest">Passengers</span>
                                <span className="text-xl font-black font-mono">38 / 45</span>
                             </div>
                             <div>
                                <span className="text-[9px] font-black uppercase text-slate-500 block mb-1 tracking-widest">Next Stop ETA</span>
                                <span className="text-lg font-black text-amber-500 font-mono">07:18 AM</span>
                             </div>
                          </div>
                       </div>

                       <div className="w-full md:w-64 bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                          <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Stop Sequence</h5>
                          <div className="space-y-3">
                             {[
                               { label: 'Green Park', status: 'Passed', time: '07:11' },
                               { label: 'Rose Garden', status: 'Next', time: '07:18' },
                               { label: 'Sector 4 Junction', status: 'Pending', time: '07:26' },
                             ].map((stop, i) => (
                               <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                                  <span className={stop.status === 'Next' ? 'text-blue-400' : 'text-slate-400'}>{stop.label}</span>
                                  <span className={stop.status === 'Next' ? 'text-amber-500' : 'text-slate-600'}>{stop.time}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                </div>

                <InfoPanel 
                  title="Why Live Tracking?" 
                  desc="GPS telemetry helps school admins monitor speed violations, route deviations, and estimated arrival times for parents, ensuring unparalleled safety and punctuality." 
                />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* 3. PICKUP & PARENT NOTIFICATION CENTER */}
               <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Parent Notifications</h3>
                  </div>
                  
                  <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-1 before:bottom-1 before:w-px before:bg-slate-100">
                     {[
                       { stop: 'Green Park', time: '07:14 AM', status: 'Completed', note: 'Sent via SMS / WA' },
                       { stop: 'Rose Garden', time: '07:22 AM', status: 'Upcoming', note: 'Pending Trigger' },
                       { stop: 'Sector 4 Jct', time: '07:29 AM', status: 'Upcoming', note: 'Pending Trigger' },
                     ].map((item, i) => (
                       <div key={i} className="relative group">
                          <div className={`absolute -left-[22px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                             item.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-200'
                          }`} />
                          <div className="flex justify-between items-start">
                             <div>
                                <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{item.stop}</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.note}</p>
                             </div>
                             <div className="text-right">
                                <span className="text-[10px] font-black text-slate-800 font-mono block">{item.time}</span>
                                <span className={`text-[8px] font-black uppercase tracking-widest ${
                                   item.status === 'Completed' ? 'text-emerald-600' : 'text-slate-400'
                                }`}>{item.status}</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>

                  <InfoPanel 
                    title="Communication Impact" 
                    desc="Automated notifications reduce the inquiry load on the transport desk and keep parents informed of pickups and delays in real-time." 
                  />
               </section>

               {/* 4. DRIVER & COMPLIANCE CENTER */}
               <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Driver Compliance</h3>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                           <User className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Rajesh Kumar</h4>
                           <div className="flex items-center gap-2 mt-0.5">
                              <div className="flex gap-0.5">
                                 {[1,2,3,4,5].map(s => <span key={s} className="text-amber-500 text-[10px]">★</span>)}
                              </div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lic Valid '28</span>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                        <div className="p-3 bg-white rounded-xl border border-slate-100 text-center">
                           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Safety Score</span>
                           <span className="text-sm font-black text-emerald-600">98/100</span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-100 text-center">
                           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Experience</span>
                           <span className="text-sm font-black text-slate-800">11 Years</span>
                        </div>
                     </div>
                     <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all">
                        <CheckCircle className="w-4 h-4" />
                        Background Verified
                     </button>
                  </div>

                  <InfoPanel 
                    title="Safety First" 
                    desc="We track license validity, background checks, and driving scores to ensure the highest standards of student safety during daily transits." 
                  />
               </section>
            </div>

            {/* 5. VEHICLE MAINTENANCE CENTER */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Vehicle Maintenance Control</h3>
                      <p className="text-xs text-slate-500 font-medium">Prevent breakdowns and oversee fleet health indicators.</p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100">
                     2 Alerts Pending
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[
                     { id: 'BUS-03', last: '15d ago', next: '12d', health: '94%', alerts: 0 },
                     { id: 'BUS-07', last: '2d ago', next: '28d', health: '98%', alerts: 0 },
                     { id: 'BUS-09', last: '42d ago', next: 'Overdue', health: '78%', alerts: 2 },
                   ].map((veh, i) => (
                     <div key={i} className="p-6 border border-slate-100 rounded-[28px] bg-slate-50/50 space-y-4">
                        <div className="flex justify-between items-start">
                           <div className="p-3 bg-white rounded-2xl text-slate-400 font-black text-xs border border-slate-100 shadow-sm">{veh.id}</div>
                           <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                              veh.alerts > 0 ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                           }`}>
                              {veh.alerts > 0 ? 'Urgent Service' : 'System OK'}
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                              <span>Engine Health</span>
                              <span className={veh.alerts > 0 ? 'text-rose-500' : 'text-slate-800'}>{veh.health}</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${veh.alerts > 0 ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: veh.health }} />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-2 border-t border-slate-200/50">
                           <div>
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Last Check</span>
                              <span className="text-[10px] font-bold text-slate-700">{veh.last}</span>
                           </div>
                           <div className="text-right">
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Next Service</span>
                              <span className={`text-[10px] font-black ${veh.next === 'Overdue' ? 'text-rose-600' : 'text-slate-700'}`}>{veh.next}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <InfoPanel 
                  title="Maintenance and Lifespan" 
                  desc="Regular inspections and preventative maintenance reduce operational costs, extend vehicle life by up to 25%, and prevent dangerous road failure scenarios." 
                />
            </section>
          </div>

          {/* RIGHT COLUMN - FLEET CONTROL CENTER (35%) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              
              {/* LIVE BUS STATUS MATRIX */}
              <section className="bg-[#0F172A] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Bus className="w-48 h-48" />
                 </div>
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Fleet Control Center</h4>
                       <div className="px-3 py-1 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">15 Total</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       {FLEET_STATUS.map((st, i) => (
                         <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                            <div className={`w-2 h-2 rounded-full ${st.color} mb-3`} />
                            <h5 className="text-sm font-black text-white tracking-tight">{st.count} Buses</h5>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{st.label}</span>
                         </div>
                       ))}
                       <div className="p-4 bg-blue-600 rounded-2xl flex flex-col justify-center items-center gap-1 shadow-lg shadow-blue-900/50">
                          <h5 className="text-lg font-black text-white font-mono">12</h5>
                          <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Active Ops</span>
                       </div>
                    </div>

                    {/* FLEET OCCUPANCY ANALYTICS */}
                    <div className="space-y-6 pt-8 border-t border-white/5">
                       <div className="flex justify-between items-center px-1">
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Capacity Matrix</span>
                          <span className="text-xl font-black text-blue-400 font-mono">89%</span>
                       </div>
                       
                       <div className="h-64 w-full relative">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie 
                                  data={OCCUPANCY_DATA} 
                                  innerRadius={55} 
                                  outerRadius={75} 
                                  dataKey="value" 
                                  stroke="none"
                                  paddingAngle={8}
                                >
                                   {OCCUPANCY_DATA.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip />
                             </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-1">
                             <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Seats Taken</span>
                             <span className="text-2xl font-black text-white tracking-tighter">641</span>
                             <span className="text-[10px] font-bold text-slate-500 uppercase">of 720</span>
                          </div>
                       </div>
                    </div>

                    {/* TRANSPORT PERFORMANCE ANALYTICS */}
                    <div className="space-y-6 pt-8 border-t border-white/5">
                       <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-1">Performance Dynamics</span>
                       <div className="h-40 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={PERFORMANCE_DATA}>
                                <Area type="monotone" dataKey="punctuality" stroke="#2563EB" strokeWidth={3} fill="#2563EB" fillOpacity={0.15} />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: '#1E293B', 
                                    border: 'none', 
                                    borderRadius: '16px', 
                                    color: '#fff',
                                    fontSize: '10px',
                                    fontWeight: 'bold'
                                  }}
                                />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                             <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">Avg Delay</span>
                             <span className="text-sm font-black text-amber-500">2.1 Mins</span>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                             <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-1">Fuel Efficiency</span>
                             <span className="text-sm font-black text-blue-400">7.8 KM/L</span>
                          </div>
                       </div>
                    </div>

                    {/* AI TRANSPORT INSIGHTS */}
                    <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-[32px] border border-white/10 space-y-6 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                           <Bot className="w-40 h-40" />
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                           <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-blue-600 rounded-xl">
                                 <Bot className="w-5 h-5" />
                              </div>
                              <h5 className="text-xs font-black uppercase tracking-widest">AI Logistics Core</h5>
                           </div>
                           <span className="px-2 py-0.5 bg-white/10 text-blue-300 text-[8px] font-black uppercase tracking-widest rounded-lg border border-white/10">Active Insight</span>
                        </div>
                        <div className="space-y-4 relative z-10">
                           <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                              <p className="text-[10px] font-medium text-slate-200 leading-relaxed italic border-l-2 border-blue-500 pl-4">"Route 10A can reduce travel time by <span className="text-blue-400 font-black">8%</span> by adjusting the pickup sequence at Sector 4 Junction."</p>
                           </div>
                           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                              <span className="text-slate-500">Predicted Savings</span>
                              <span className="text-emerald-400">₹18,400 / Mo</span>
                           </div>
                        </div>
                    </div>

                    {/* LIVE TRANSPORT ACTIVITY FEED */}
                    <div className="space-y-4 pt-8 border-t border-white/5">
                       <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-1">Institutional Activity Feed</span>
                       <div className="space-y-3">
                          {[
                            { time: '07:02 AM', text: 'BUS-07 Started Morning Route 10A', icon: MapPin, color: 'text-blue-400' },
                            { time: '07:11 AM', text: 'Parent Notifications Sent for Stop: Green Park', icon: Bell, color: 'text-emerald-400' },
                            { time: '07:18 AM', text: 'Student Pickups Completed (38 Records Sync)', icon: CheckCircle, color: 'text-indigo-400' },
                            { time: '07:23 AM', text: 'Traffic Delay Alert Generated: Airport Road', icon: AlertTriangle, color: 'text-amber-400' },
                          ].map((feed, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex gap-4 group hover:bg-white/10 transition-colors cursor-pointer">
                               <div className={`p-2 h-fit rounded-lg bg-white/5 ${feed.color}`}>
                                  <feed.icon className="w-3.5 h-3.5" />
                               </div>
                               <div className="flex-1">
                                  <p className="text-[10px] font-bold text-slate-300 leading-tight group-hover:text-white transition-colors">{feed.text}</p>
                                  <span className="text-[8px] font-black text-slate-600 block mt-1 tracking-widest">{feed.time}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* PARENT COMMUNICATION CENTER */}
                    <div className="space-y-4 pt-8 border-t border-white/5">
                       <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-1">Comms Summary Today</span>
                       <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 bg-white/5 border border-white/10 rounded-[24px] text-center">
                             <span className="text-lg font-black text-white font-mono">1,842</span>
                             <span className="text-[8px] font-black text-slate-500 uppercase block tracking-widest mt-1">Alerts Dispatched</span>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/10 rounded-[24px] text-center">
                             <span className="text-lg font-black text-emerald-400 font-mono">99.1%</span>
                             <span className="text-[8px] font-black text-slate-500 uppercase block tracking-widest mt-1">Delivery Success</span>
                          </div>
                       </div>
                    </div>

                 </div>
              </section>
            </div>
          </div>

        </div>
      </main>

       {/* FLOATING ACTION OVERLAY */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="flex items-center gap-2 p-1.5 bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
          >
             <button className="px-6 py-3 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30">
                <Gauge className="w-3.5 h-3.5" />
                <span>Executive Fleet Report</span>
             </button>
             <button className="p-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
             </button>
          </motion.div>
       </div>

    </div>
  );
};
