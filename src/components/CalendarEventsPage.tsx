import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, Search, MapPin, Clock, Tag, ChevronLeft, ChevronRight, Plus, Filter, Users, Sparkles, AlertTriangle, CheckCircle2, MessageSquare, LineChart, Bell, Zap, Trophy, ShieldCheck, PieChart, Activity, UserPlus, FileText, Bot, Mail, Smartphone, ArrowDown, Wand2, ArrowRight, Settings, RefreshCw } from 'lucide-react';

interface CalendarEventsPageProps {
  onBack: () => void;
}

export const CalendarEventsPage: React.FC<CalendarEventsPageProps> = ({ onBack }) => {
  const [selectedConf, setSelectedConf] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState<string | null>(null);
  const [showConflictsPanel, setShowConflictsPanel] = useState<boolean>(false);
  
  // Dynamic events list corresponding to timeline
  const [eventsTimeline, setEventsTimeline] = useState([
    { id: "ev-1", title: "Annual Science Exhibition", venue: "Main Auditorium", coordinator: "Dr. S. Jenkins", budget: "Allocated", approval: "Approved", date: "Oct 15, 2026", color: "bg-blue-500", conflict: true, resource: "Main Auditorium", conflictDesc: "Double-booked with Grade XII Physics Lab Seminar" },
    { id: "ev-2", title: "Inter-House Sports Day", venue: "Athletics Ground", coordinator: "Mr. M. Sharma", budget: "Pending Review", approval: "In Progress", date: "Nov 05, 2026", color: "bg-amber-500", conflict: true, resource: "Athletics Ground", conflictDesc: "Ground turf scheduled annual seeding maintenance" },
    { id: "ev-3", title: "State Debate Competition", venue: "Seminar Hall B", coordinator: "Ms. A. Desai", budget: "Allocated", approval: "Approved", date: "Nov 18, 2026", color: "bg-purple-500", conflict: true, resource: "Seminar Hall B", conflictDesc: "Scheduled HVAC retrofitting repair window" }
  ]);

  const [infraConflicts, setInfraConflicts] = useState([
    {
      id: "ev-1",
      event: "Annual Science Exhibition",
      resource: "Main Auditorium",
      conflict: "School infrastructure conflict: Custom audio-visual stack and physical deck double-booked with Class XII Physics Lab Seminar.",
      originalDate: "Oct 15, 2026",
      suggestedDate: "Oct 19, 2026",
      status: "pending"
    },
    {
      id: "ev-2",
      event: "Inter-House Sports Day",
      resource: "Athletics Ground",
      conflict: "School infrastructure conflict: Athletics field closed due to mandatory turf grass overseeding operations.",
      originalDate: "Nov 05, 2026",
      suggestedDate: "Nov 09, 2026",
      status: "pending"
    },
    {
      id: "ev-3",
      event: "State Debate Competition",
      resource: "Seminar Hall B",
      conflict: "School infrastructure conflict: Main ceiling air conditioner compressor scheduled for repair.",
      originalDate: "Nov 18, 2026",
      suggestedDate: "Nov 23, 2026",
      status: "pending"
    }
  ]);

  const handleResolveConflict = (eventId: string, suggestedDate: string) => {
    setIsResolving(eventId);
    setTimeout(() => {
      // Update the main timeline event parameters
      setEventsTimeline(prev => prev.map(ev => {
        if (ev.id === eventId) {
          return {
            ...ev,
            date: suggestedDate,
            approval: "Approved",
            conflict: false,
            conflictDesc: ""
          };
        }
        return ev;
      }));

      // Update the conflict status itself
      setInfraConflicts(prev => prev.map(conf => {
        if (conf.id === eventId) {
          return { ...conf, status: "resolved" };
        }
        return conf;
      }));

      setIsResolving(null);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAFC] min-h-screen relative font-sans">
      
      {/* Decorative top background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/80 to-[#F8FAFC] pointer-events-none z-0" />
      
      {/* Navbar Integration Area */}
      <div className="sticky top-0 z-50 bg-white/80  border-b border-slate-200 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-all hover:shadow-md">
              <Plus className="w-4 h-4" />
              New Activity
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 flex flex-col gap-10">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 tracking-wide uppercase">Module 14 Active</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              AI-Powered Academic Calendar & Event Intelligence Center
            </h1>
            <p className="text-slate-500 font-medium max-w-3xl text-sm md:text-base leading-relaxed">
              Transform institutional planning with AI-driven scheduling, conflict detection, event coordination, and automated communications.
            </p>
          </div>
        </div>

        {/* Owner Value Proposition Banner */}
        <div className="bg-blue-600 rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border border-blue-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          
          <div className="w-16 h-16 bg-white/20 rounded-2xl border border-white/30 flex flex-col items-center justify-center shrink-0  relative z-10 shadow-sm">
            <Calendar className="w-8 h-8 text-white mb-0.5" />
          </div>
          
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">More Than Just a Calendar</h2>
              <span className="px-2.5 py-1 rounded-full bg-blue-400/30 border border-blue-300/40 text-white text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3" />
                NexoraOS AI
              </span>
            </div>
            <p className="text-blue-50 text-sm md:text-base leading-relaxed font-medium max-w-4xl">
              NexoraOS AI's Calendar Module does more than store dates. It uses Artificial Intelligence to detect exam conflicts, automatically generate academic calendars, send parent notifications, automate event planning, and transform every academic activity into a centralized intelligent planning system.
            </p>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN - Main Features (Takes up 2/3 space) */}
          <div className="xl:col-span-2 flex flex-col gap-8">
            
            {/* SECTION 1: Shared Academic Calendar */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Shared Academic Calendar</h3>
                  <p className="text-sm text-slate-500 font-medium">Synced across all stakeholder portals.</p>
                </div>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold whitespace-nowrap">Academic</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold whitespace-nowrap">Holiday</span>
                  <span className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold whitespace-nowrap">Examination</span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold whitespace-nowrap">Event</span>
                </div>
              </div>
              <div className="p-6 min-h-[300px] flex items-center justify-center bg-slate-50/50">
                 {/* Visual representation of calendar instead of a full complex calendar component */}
                 <div className="w-full max-w-md">
                   <div className="flex items-center justify-between mb-4">
                     <h4 className="font-bold text-slate-800">October 2026</h4>
                     <div className="flex gap-2">
                       <button className="p-1 hover:bg-slate-200 rounded"><ChevronLeft className="w-4 h-4 text-slate-600"/></button>
                       <button className="p-1 hover:bg-slate-200 rounded"><ChevronRight className="w-4 h-4 text-slate-600"/></button>
                     </div>
                   </div>
                   <div className="grid grid-cols-7 gap-2 mb-2">
                     {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <div key={d} className="text-center text-xs font-bold text-slate-400">{d}</div>)}
                   </div>
                   <div className="grid grid-cols-7 gap-2">
                     {/* Just a mockup grid for visual representation */}
                     {Array.from({length: 31}).map((_, i) => {
                       let colorClass = "hover:bg-slate-100 text-slate-600";
                       let badge = null;
                       if (i === 14) { colorClass = "bg-green-100 text-green-700 font-bold border border-green-200"; }
                       if (i === 20 || i === 21) { colorClass = "bg-red-100 text-red-700 font-bold border border-red-200"; }
                       if (i === 25) { colorClass = "bg-amber-100 text-amber-700 font-bold border border-amber-200"; }
                       if (i === 5 || i === 6) { colorClass = "bg-blue-100 text-blue-700 font-bold border border-blue-200"; }
                       
                       return (
                         <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-colors cursor-pointer ${colorClass}`}>
                           {i + 1}
                         </div>
                       )
                     })}
                   </div>
                 </div>
              </div>
            </div>

            {/* SECTION 2: Examination Schedule Publisher */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    Examination Schedule Publisher
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">Manage and distribute hall tickets automatically.</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors">Generate Hall Tickets</button>
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors">Publish Schedule</button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="pb-3 text-xs font-bold text-slate-400 tracking-wider uppercase">Class</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 tracking-wider uppercase">Subject</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 tracking-wider uppercase">Date & Time</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 tracking-wider uppercase text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { cls: "Grade X", sub: "Mathematics", date: "Oct 21, 2026", time: "09:00 AM", status: "Published", parentSent: true },
                      { cls: "Grade X", sub: "Science", date: "Oct 22, 2026", time: "09:00 AM", status: "Published", parentSent: true },
                      { cls: "Grade XII", sub: "Physics", date: "Oct 24, 2026", time: "10:30 AM", status: "Draft", parentSent: false }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 text-sm font-bold text-slate-800">{row.cls}</td>
                        <td className="py-3 text-sm font-semibold text-slate-600">{row.sub}</td>
                        <td className="py-3 text-sm text-slate-500 whitespace-nowrap">{row.date} <span className="text-slate-400 mx-1">•</span> {row.time}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {row.parentSent && <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider">Parents Notified</span>}
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${row.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{row.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 3: Parent Teacher Meeting Management */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Parent Teacher Meeting Management</h3>
                  <p className="text-sm text-slate-500 font-medium">Coordinate slots and send automated invitations.</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors">Send Invitations</button>
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"><Plus className="w-3 h-3"/> Schedule PTM</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Dr. Sarah Jenkins", slots: "14/15", queue: 2, status: "Active" },
                  { name: "Mr. Robert Chen", slots: "15/15", queue: 4, status: "Fully Booked" },
                  { name: "Ms. Anita Desai", slots: "8/15", queue: 0, status: "Available" }
                ].map((ptm, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all group bg-slate-50/50">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-slate-800 text-sm">{ptm.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ptm.status === 'Fully Booked' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{ptm.status}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">Booked Slots</p>
                        <p className="font-bold text-slate-900 text-lg">{ptm.slots}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 font-medium mb-1">Parent Queue</p>
                        <p className="font-bold text-amber-600 text-sm bg-amber-50 px-2 py-0.5 rounded inline-block">{ptm.queue} Waiting</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: Campus Events Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
              <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Campus Events Timeline</h3>
                  <p className="text-sm text-slate-500 font-medium">Log annual events and track planning lifecycle.</p>
                </div>
                <div className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs rounded-lg uppercase tracking-wider">
                  {eventsTimeline.filter(ev => ev.conflict).length} Conflicts Active
                </div>
              </div>
              
              <div className="space-y-6">
                {eventsTimeline.map((ev, idx) => (
                  <div key={ev.id} className="relative pl-6 sm:pl-8 group">
                    <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${ev.color} ring-4 ring-white shadow-sm z-10`} />
                    {idx !== eventsTimeline.length - 1 && <div className="absolute left-1.5 top-3 w-0.5 h-full bg-slate-200 -z-0" />}
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 group-hover:shadow-md group-hover:border-slate-200 transition-all flex flex-col justify-between gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-400 block">{ev.date}</span>
                            {ev.conflict ? (
                              <span className="px-1.5 py-0.5 rounded bg-rose-50 border border-rose-100 text-[9px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-1 text-xs shrink-0">
                                <AlertTriangle className="w-2.5 h-2.5" /> Resource Conflict
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-150 text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 text-xs shrink-0">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Safe
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-900 text-base">{ev.title}</h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {ev.venue}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {ev.coordinator}</span>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2 justify-end sm:text-right shrink-0">
                           <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${ev.approval === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>Approval: {ev.approval}</span>
                           <span className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{ev.budget}</span>
                        </div>
                      </div>

                      {/* Explicit infrastructure conflict visual alert inside timeline list */}
                      {ev.conflict && (
                        <div className="bg-rose-50/50 border border-rose-100/60 p-3.5 rounded-xl flex items-start gap-2.5 mt-2">
                          <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                          <div className="space-y-1">
                            <p className="text-xs font-extrabold text-rose-800 uppercase tracking-wider leading-none">AI Critical Infrastructure Flag</p>
                            <p className="text-[11px] text-rose-700 font-semibold leading-relaxed leading-snug">
                              Double-booking conflict detected with resource booking systems: <strong>{ev.conflictDesc}</strong>. Resolve using schedule balancer suggest tools in the AI Planning Engine below.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI PLANNING ENGINE */}
            <div className="bg-slate-50 rounded-3xl p-8 relative overflow-hidden shadow-sm border-2 border-slate-200 text-slate-900">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold flex items-center gap-3 text-slate-900">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    AI Planning Engine
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Autonomous orchestration of institutional schedules.</p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Status: Active
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* Feature 1 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase border border-emerald-100">Generated Successfully</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 text-slate-900">AI Academic Calendar Generator</h4>
                  <p className="text-xs text-slate-500 font-medium mb-3">Defines session dates, maps academic patterns, and automatically populates unit tests, PTMs, sports events, and vacations.</p>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer">View Parameters <ArrowLeft className="w-3 h-3 rotate-180" /></button>
                </div>

                {/* Feature 2: Highly Interactive Infrastructure Conflict Safeguard */}
                <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition-all relative overflow-hidden md:col-span-2 shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl opacity-50" />
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg leading-tight text-slate-900">AI Infrastructure Conflict Safeguard</h4>
                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Infrastructure & General Conflicts Detected</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-100">
                      {infraConflicts.filter(c => c.status === 'pending').length} Active
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-500 font-medium mb-4 max-w-3xl leading-relaxed">
                    AI automatically scans physical asset booking systems, room logs, sport areas, and scheduled equipment repairs, flagging overlapping events and proposing conflict-free, optimal alternative dates.
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowConflictsPanel(!showConflictsPanel)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-amber-200 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <span>{showConflictsPanel ? "Hide Infrastructure Conflicts Panel" : "Open Conflict Resolution Desk"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showConflictsPanel ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {/* INLINE COLLAPSIBLE INTERACTIVE CONFLICTS EDITOR */}
                  <AnimatePresence>
                    {showConflictsPanel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-6 pt-6 border-t border-slate-200 space-y-4"
                      >
                        <h5 className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-1.5">
                          <Settings className="w-3.5 h-3.5" />
                          AI Suggested Rescheduling Recommendations
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {infraConflicts.map(conf => (
                            <div 
                              key={conf.id} 
                              className={`rounded-xl p-4 transition-all relative border-2 ${conf.status === 'resolved' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}
                            >
                              <div className="space-y-3">
                                <div className="flex justify-between items-start gap-2">
                                  <span className="text-[9px] font-mono tracking-wider uppercase text-slate-500 bg-white border border-slate-100 py-0.5 px-2 rounded shadow-sm">{conf.resource}</span>
                                  {conf.status === 'resolved' ? (
                                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[9px] font-black uppercase tracking-wider">Resolved</span>
                                  ) : (
                                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[9px] font-black uppercase tracking-wider font-mono">Unresolved</span>
                                  )}
                                </div>

                                <div className="space-y-1">
                                  <h6 className="font-bold text-xs uppercase text-slate-900">{conf.event}</h6>
                                  <p className="text-[10px] text-slate-600 leading-snug font-semibold">
                                    {conf.conflict}
                                  </p>
                                </div>

                                <div className="bg-white border-2 border-slate-100 rounded-xl p-2.5 space-y-2 shadow-inner">
                                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                                    <span>Original:</span>
                                    <span className="line-through text-rose-500">{conf.originalDate}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold">
                                    <span className="text-blue-600">Suggested:</span>
                                    <span className="text-emerald-600 font-black">{conf.suggestedDate}</span>
                                  </div>
                                </div>

                                {conf.status === 'pending' ? (
                                  <button
                                    onClick={() => handleResolveConflict(conf.id, conf.suggestedDate)}
                                    disabled={isResolving === conf.id}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md"
                                  >
                                    {isResolving === conf.id ? (
                                      <>
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        <span>Applying...</span>
                                      </>
                                    ) : (
                                      <span>Apply AI Reschedule Suggestion</span>
                                    )}
                                  </button>
                                ) : (
                                  <div className="w-full py-2 bg-emerald-50 border-2 border-emerald-200 text-emerald-600 text-[10px] rounded-lg font-black text-center shadow-sm">
                                    ✓ Event Moved to {conf.suggestedDate}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Feature 3 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors ">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-400/20">
                      <MessageSquare className="w-5 h-5 text-purple-300" />
                    </div>
                    <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 rounded text-[10px] font-bold uppercase">Notification Ready</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">AI Notification Generator</h4>
                  <p className="text-xs text-blue-100/70 mb-3">Automatically creates tailored Parent SMS, WhatsApp Notices, Email Circulars, and Staff Announcements based on calendar events.</p>
                  <button className="text-xs font-bold text-purple-300 hover:text-white transition-colors flex items-center gap-1">Review Drafts <ArrowLeft className="w-3 h-3 rotate-180" /></button>
                </div>

                {/* Feature 4 & 5 Combined visual */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors  flex flex-col justify-between">
                   <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-400/20">
                        <LineChart className="w-5 h-5 text-teal-300" />
                      </div>
                      <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded text-[10px] font-bold uppercase">Forecast Active</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Attendance Forecast & Analytics</h4>
                    <p className="text-xs text-blue-100/70 mb-3">Predicts event participation. Analyzes budget utilization, parent engagement, and provides an Event Success Score post-completion.</p>
                   </div>
                   <div className="flex gap-2">
                     <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 flex-1">
                       <p className="text-[10px] text-teal-200 font-medium uppercase tracking-wider">Expected Audience</p>
                       <p className="font-bold text-lg text-white">85%</p>
                     </div>
                     <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 flex-1">
                       <p className="text-[10px] text-teal-200 font-medium uppercase tracking-wider">Success Score</p>
                       <p className="font-bold text-lg text-white">92/100</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* AI ADMINISTRATIVE ASSISTANT */}
            <div className="mt-4 border-t border-slate-200 pt-8" />
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Administrative Assistant</h2>
                  <p className="text-sm font-medium text-slate-500">Intelligent scheduling and automated communications.</p>
                </div>
              </div>

              {/* AI Appointment Management */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                   <div>
                     <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                       AI-Powered Appointment & Scheduling Assistant
                     </h3>
                     <p className="text-sm text-slate-500 font-medium max-w-xl pr-4 mt-1">
                       The AI assistant continuously monitors the institutional calendar, academic schedules, examinations, holidays, meetings, events, and staff availability.
                     </p>
                   </div>
                   <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 shrink-0 self-start sm:self-center border border-emerald-100">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> AI Scheduling Assistant Active
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Conflict Checking Criteria</p>
                     <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                       {['School Holidays', 'Examination Dates', 'Teacher Availability', 'Staff Meetings', 'Campus Events', 'PTM Schedules', 'Academic Calendar Conflicts'].map((item, i) => (
                         <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                           <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                           <span className="truncate">{item}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 relative mt-4 md:mt-0">
                     <div className="absolute left-6 -top-3 w-0 h-0 border-r-8 border-l-8 border-b-8 border-transparent border-b-indigo-100 md:block hidden md:-left-3 md:top-6 md:border-b-0 md:border-l-0 md:border-t-8 md:border-b-[8px] md:border-r-[8px] md:border-transparent md:border-r-indigo-100" />
                     <div className="absolute left-[1.56rem] -top-2.5 w-0 h-0 border-r-[7px] border-l-[7px] border-b-[7px] border-transparent border-b-indigo-50 md:block hidden md:-left-2.5 md:top-[1.6rem] md:border-b-0 md:border-l-0 md:border-t-[7px] md:border-b-[7px] md:border-r-[7px] md:border-transparent md:border-r-indigo-50" />
                     <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">AI Assistant Response</span>
                     </div>
                     <p className="text-sm font-medium text-indigo-900 leading-relaxed italic">
                       "Requested meeting conflicts with Mid-Term Examination Week. Suggested alternatives: 18 September 2026 at 11:00 AM or 19 September 2026 at 02:00 PM."
                     </p>
                   </div>
                </div>
              </div>

              {/* Workflow & Notice Generator Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* AI Meeting Coordinator */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">AI Meeting Coordinator</h3>
                    <p className="text-sm text-slate-500 font-medium">End-to-end intelligent orchestration.</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full gap-3 relative py-4">
                    <div className="absolute inset-y-8 left-[1.35rem] w-0.5 bg-blue-100" />
                    
                    {[
                      { step: "Step 1", text: "Meeting Request Received", active: true },
                      { step: "Step 2", text: "AI Checks Institutional Calendar", active: true },
                      { step: "Step 3", text: "AI Detects Conflicts", active: true },
                      { step: "Step 4", text: "AI Suggests Available Slots", active: true },
                      { step: "Step 5", text: "Admin Approval", active: false },
                      { step: "Step 6", text: "Automatic Notifications Sent", active: false },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-4 relative z-10 w-full group">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border-2 font-bold text-xs shadow-sm bg-white transition-all ${step.active ? 'border-blue-500 text-blue-600 group-hover:scale-110 group-hover:shadow-md' : 'border-slate-200 text-slate-400'}`}>
                          {i + 1}
                        </div>
                        <div className={`text-sm font-bold bg-white px-4 py-2 rounded-xl flex-1 border shadow-sm ${step.active ? 'border-blue-100 text-slate-800' : 'border-slate-100 text-slate-400'}`}>
                          {step.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Smart Notice Generator */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">AI Smart Notice Generator</h3>
                      <p className="text-sm text-slate-500 font-medium">Automatic content generation.</p>
                    </div>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Wand2 className="w-5 h-5" /></div>
                  </div>
                  
                  <div className="flex flex-col gap-6 flex-1 justify-center">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Artifacts</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Professional Notices', 'Event Invitations', 'Parent Circulars', 'Teacher Instructions', 'Meeting Agendas', 'Holiday Announcements'].map((type, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold shadow-sm hover:border-blue-300 transition-colors cursor-pointer">{type}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50/80 rounded-2xl border border-blue-200 p-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 relative z-10">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Example Operation</span>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase overflow-hidden self-start">Generated by NexoraOS AI</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-3 text-sm relative z-10">
                         <div className="bg-white p-3.5 rounded-xl border border-blue-200 flex-1 shadow-sm text-slate-500 w-full hover:shadow-md transition-shadow">
                           <div className="flex items-center gap-1.5 mb-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"/> <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Inputs</span></div>
                           <span className="font-medium text-slate-600">Science Fair, Oct 15, Parents</span>
                         </div>
                         <ArrowRight className="w-5 h-5 text-blue-400 shrink-0 hidden sm:block" />
                         <ArrowDown className="w-5 h-5 text-blue-400 shrink-0 sm:hidden" />
                         <div className="bg-blue-600 p-3.5 rounded-xl border border-blue-500 flex-1 shadow-md text-blue-100 w-full group relative overflow-hidden cursor-pointer">
                           <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="relative z-10">
                             <div className="flex items-center gap-1.5 mb-1.5"><span className="w-2 h-2 rounded-full bg-blue-300"/> <span className="font-bold text-white text-xs uppercase tracking-wider">Output</span></div>
                             <span className="font-semibold text-white">Ready-to-Send Communication</span>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Automated Communications Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Staff Notifications */}
                <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden text-slate-900 group shadow-sm">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-200/50 transition-all" />
                  
                  <div className="relative z-10 mb-6">
                    <h3 className="text-lg font-black tracking-tight mb-1 flex items-center gap-2 text-slate-900">
                      <Bell className="w-5 h-5 text-blue-600" /> 
                      Automated Staff Notifications
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">Automatic routing to internal stakeholders.</p>
                  </div>
                  
                  <div className="space-y-5 relative z-10">
                    <div className="flex flex-wrap gap-2 mb-2">
                       {['Teachers', 'Admin Staff', 'Coordinators', 'HODs'].map(target => (
                         <span key={target} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm">{target}</span>
                       ))}
                    </div>

                    <div className="flex gap-4 border-t border-slate-200 pt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-600"/> Email</span>
                       <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-green-600"/> SMS</span>
                       <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-emerald-600"/> WhatsApp</span>
                       <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-indigo-600"/> Push</span>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-xl p-4 italic text-sm text-slate-600 mt-2 hover:border-slate-300 transition-all shadow-inner">
                      "Monthly Staff Meeting scheduled for Friday, 10:00 AM. Attendance required."
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Delivery Status</span>
                      <span className="text-sm font-black text-blue-600 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> 98.7% Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Parent Communication */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 relative">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" /> Automated Student/Parent Comms</h3>
                      <p className="text-sm text-slate-500 font-medium">School branded external outreach.</p>
                    </div>
                    <div className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Notification Automation Active
                    </div>
                  </div>
                  
                  <div className="space-y-5 flex flex-col h-[calc(100%-60px)] justify-between">
                    <div className="grid grid-cols-2 gap-2">
                      {['Exam Notices', 'PTM Invitations', 'Holiday Announcements', 'Event Invitations', 'Schedule Changes', 'Emergency Alerts'].map((type, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-2 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transition-colors">
                          <Zap className="w-4 h-4 text-theme-600 shrink-0" /> {type}
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Notification Timing Engine</p>
                       <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase px-1">
                          <span className="px-2 py-1 bg-slate-100 rounded shadow-sm">7 Days</span> <ArrowRight className="w-3 h-3 text-slate-300 mx-1 shrink-0"/>
                          <span className="px-2 py-1 bg-slate-100 rounded shadow-sm">3 Days</span> <ArrowRight className="w-3 h-3 text-slate-300 mx-1 shrink-0"/>
                          <span className="px-2 py-1 bg-slate-100 rounded shadow-sm">1 Day</span> <ArrowRight className="w-3 h-3 text-blue-300 mx-1 shrink-0"/>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded border border-blue-200 shadow-sm text-center">Event<br/>Day</span>
                       </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 mt-auto relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-white/40 blur-xl rounded-full" />
                      <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 relative z-10" />
                      <div className="relative z-10">
                        <p className="text-sm font-bold text-slate-800">Official Institutional Branding</p>
                        <p className="text-[11px] font-medium text-slate-600 mt-0.5 max-w-[200px] leading-tight">Sent via School Administrator & Principal Identity</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* AI Calendar Intelligence (KPIs) */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-50/50 to-transparent pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3" />
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8 relative z-10">AI Calendar Intelligence Analytics</h3>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 divide-x divide-slate-100 relative z-10">
                    <div className="px-4 first:pl-0 text-center lg:text-left group">
                       <p className="text-4xl font-black text-slate-900 mb-2 group-hover:scale-105 transition-transform origin-left">26</p>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Conflicts<br/>Prevented/Mo</p>
                    </div>
                    <div className="px-4 text-center lg:text-left group">
                       <p className="text-4xl font-black text-slate-900 mb-2 group-hover:scale-105 transition-transform origin-left">84</p>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Meetings<br/>Scheduled Auto</p>
                    </div>
                    <div className="px-4 text-center lg:text-left group">
                       <p className="text-4xl font-black text-slate-900 mb-2 group-hover:scale-105 transition-transform origin-left">12,540</p>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Notifications<br/>Sent</p>
                    </div>
                    <div className="px-4 text-center lg:text-left group">
                       <p className="text-4xl font-black text-emerald-600 mb-2 group-hover:scale-105 transition-transform origin-left">97.8%</p>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Staff Availability<br/>Accuracy</p>
                    </div>
                 </div>
              </div>
              
            </div>
          </div>

          {/* RIGHT COLUMN - Sticky Hero Dashboard (Takes 1/3 space) */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              
              {/* Command Center */}
              <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden">
                <div className="bg-slate-50 p-6 text-slate-900 text-center border-b-2 border-slate-200 shadow-inner">
                  <h3 className="text-xl font-black tracking-tight uppercase">Planning Command Center</h3>
                </div>
                
                <div className="p-6 flex flex-col items-center justify-center border-b border-slate-100">
                  <div className="relative w-40 h-40 flex items-center justify-center mb-2">
                    {/* Radial Progress Visualization Mockup */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#2563EB" strokeWidth="10" strokeDasharray="283" strokeDashoffset="5.66" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-4xl font-black text-slate-900">98%</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Planning<br/>Completion</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium text-center">Academic Year 2026-2027 perfectly mapped.</p>
                </div>

                <div className="p-6 bg-slate-50 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Month-at-a-Glance Analytics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border text-center border-slate-200 p-3 rounded-xl shadow-sm">
                      <p className="text-2xl font-black text-blue-600">18</p>
                      <p className="text-xs font-bold text-slate-500">Upcoming<br/>Events</p>
                    </div>
                    <div className="bg-white border text-center border-slate-200 p-3 rounded-xl shadow-sm">
                      <p className="text-2xl font-black text-slate-900">12</p>
                      <p className="text-xs font-bold text-slate-500">Exams<br/>Scheduled</p>
                    </div>
                    <div className="bg-white border text-center border-slate-200 p-3 rounded-xl shadow-sm">
                      <p className="text-2xl font-black text-slate-900">9</p>
                      <p className="text-xs font-bold text-slate-500">Parent<br/>Meetings</p>
                    </div>
                     <div className="bg-white border text-center border-slate-200 p-3 rounded-xl shadow-sm">
                      <p className="text-2xl font-black text-slate-900">24</p>
                      <p className="text-xs font-bold text-slate-500">Holiday<br/>Entries</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Upcoming Activities Feed</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200"><MessageSquare className="w-5 h-5"/></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Inter School Debate</p>
                        <p className="text-xs font-semibold text-slate-500">Tomorrow - 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200"><Trophy className="w-5 h-5"/></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Science Exhibition</p>
                        <p className="text-xs font-semibold text-slate-500">3 Days Remaining</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200"><Users className="w-5 h-5"/></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">PTM Session</p>
                        <p className="text-xs font-semibold text-slate-500">Saturday - 09:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUTOMATION CENTER */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 uppercase">Automation Center</h3>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                  </div>
                </div>
                
                <div className="space-y-3">
                  {['Exam Alerts', 'Event Reminders', 'PTM Notifications', 'Holiday Announcements'].map((auto, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-sm font-bold text-slate-700">{auto}</span>
                      <div className="ml-auto w-8 h-4 bg-blue-600 rounded-full relative shadow-inner">
                         <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM VALUE STATEMENT */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-10 text-center relative overflow-hidden mb-10 shadow-sm">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight mb-6 leading-tight uppercase">Your Calendar Doesn't Just Store Dates.<br className="hidden md:block"/> It Manages Your Institution.</h2>
            <p className="text-slate-600 text-lg font-bold leading-relaxed max-w-3xl">
              NexoraOS AI transforms the traditional school calendar into an intelligent administrative assistant that automatically coordinates meetings, detects scheduling conflicts, manages notifications, generates notices, and keeps administrators, teachers, parents, and students synchronized without manual effort.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
