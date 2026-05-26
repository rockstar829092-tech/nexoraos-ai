import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  Mail, 
  Phone, 
  Bell, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  Smartphone, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  Activity, 
  Globe, 
  Bot, 
  FileText, 
  Hash, 
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  RefreshCw,
  XCircle,
  Clock3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  Legend,
  ComposedChart
} from 'recharts';

// --- MOCK DATA ---
const DELIVERY_DATA = [
  { time: '08:00', sms: 98, email: 82, wa: 97, push: 75 },
  { time: '09:00', sms: 99, email: 85, wa: 99, push: 78 },
  { time: '10:00', sms: 97, email: 88, wa: 98, push: 82 },
  { time: '11:00', sms: 99, email: 84, wa: 99, push: 80 },
  { time: '12:00', sms: 99, email: 86, wa: 99, push: 83 },
];

const CHANNEL_PERFORMANCE = [
  { name: 'SMS', sent: 12846, rate: 99.2, color: '#3B82F6' },
  { name: 'Email', sent: 8213, rate: 84.5, color: '#6366F1' },
  { name: 'WhatsApp', sent: 6742, rate: 98.8, color: '#10B981' },
  { name: 'Push', sent: 14092, rate: 78.3, color: '#F59E0B' },
];

interface InfoCardProps {
  title: string;
  desc: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, desc }) => (
  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 mt-4">
    <Info className="w-5 h-5 text-blue-600 shrink-0" />
    <div>
      <h5 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">{title}</h5>
      <p className="text-[11px] text-blue-700/80 leading-relaxed">{desc}</p>
    </div>
  </div>
);

interface AlertsManagementPageProps {
  onBack: () => void;
}

export const AlertsManagementPage: React.FC<AlertsManagementPageProps> = ({ onBack }) => {
  const [selectedAudience, setSelectedAudience] = useState<string[]>(['All Staff']);
  const [selectedChannel, setSelectedChannel] = useState<string>('SMS');

  const audiences = [
    'All Staff', 'All Teachers', 'Grade X Parents', 'Grade XII Students', 'Hostel Residents', 'Transport Users'
  ];

  const channels = [
    { id: 'SMS', icon: Smartphone, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'Email', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'Push', icon: Bell, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const toggleAudience = (aud: string) => {
    setSelectedAudience(prev => 
      prev.includes(aud) ? prev.filter(a => a !== aud) : [...prev, aud]
    );
  };

  const [emailSearch, setEmailSearch] = useState('');
  const [emailStatusFilter, setEmailStatusFilter] = useState('All');
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);

  const mockEmailLogs = [
    { 
      id: 'em-1', 
      recipient: 'parent.sharma@gmail.com', 
      subject: 'Term II Outstanding Fee Reminder Notice', 
      time: '10:14 AM', 
      date: '26 May 2026', 
      status: 'Delivered', 
      trigger: 'Fee Automated Chrono Trigger', 
      size: '42 KB', 
      body: 'Dear Parent, this is an automated reminder that the Term II fee payment for your ward Aarav Sharma is outstanding. Please log in to your NexoraOS parent application to process the balance securely. Ignore if already paid.' 
    },
    { 
      id: 'em-2', 
      recipient: 'meenakshi.sundaram@psbbgroup.edu.in', 
      subject: 'Alert: Pending Substitution Class Allocation', 
      time: '09:41 AM', 
      date: '26 May 2026', 
      status: 'Opened', 
      trigger: 'Auto-Substitution Scheduler', 
      size: '18 KB', 
      body: 'Dear Dean, Please note that Grade X-B Mathematics class has been automatically rostered to Prof. S. Nathan, following leave validation for Mrs. Iyer. Confirmed in 45 seconds.' 
    },
    { 
      id: 'em-3', 
      recipient: 'admin.venkateshwara@dwarka.edu.in', 
      subject: 'Successful Daily Gateway Synchronization Log', 
      time: '08:00 AM', 
      date: '26 May 2026', 
      status: 'Delivered', 
      trigger: 'Gateway Heartbeat Daemon', 
      size: '124 KB', 
      body: 'Log status: Green. All 3 sub-campus RFID gateways synced successfully with the central cloud database at 08:00:02 AM. Sync count: 1,429 biometric profiles.' 
    },
    { 
      id: 'em-4', 
      recipient: 'arvind.kulkarni@sahyadritrust.org', 
      subject: 'Automated Multi-Campus Consolidated Revenue Report', 
      time: '07:30 AM', 
      date: '26 May 2026', 
      status: 'Opened', 
      trigger: 'Enterprise Financial Cron', 
      size: '312 KB', 
      body: 'Respected Trustee, The morning financial aggregation for Nariman Point campus and Pune campus is now compiled. Direct deficit margins: 0%. Net collection delta: +12.4% over benchmark.' 
    },
    { 
      id: 'em-5', 
      recipient: 'devika.rathore@mgda.jaipur.in', 
      subject: 'Urgent: Registration Application Security Audit', 
      time: '06:15 AM', 
      date: '26 May 2026', 
      status: 'Delivered', 
      trigger: 'Security Vault Monitor', 
      size: '54 KB', 
      body: 'Dear Principal Devika Rathore, We detected a successful registrar log-in from a new IP in Jaipur. Please verify status on your security panel. Security audit classification: Medium.' 
    },
    { 
      id: 'em-6', 
      recipient: 'parent.malhotra@yahoo.com', 
      subject: 'Academic Progress Report Card Narrative Draft - Karan', 
      time: '05:30 PM', 
      date: '25 May 2026', 
      status: 'Opened', 
      trigger: 'AI Progress Evaluator Engine', 
      size: '89 KB', 
      body: 'Dear Mr. Malhotra, Karan Malhotras personalized AI narrative progress sheet has been finalized. "Karan exhibits superb conceptual retention space but benefits from direct reminders." Click the link to review.' 
    },
    { 
      id: 'em-7', 
      recipient: 'transport.head@neonwoods.in', 
      subject: 'Route 12 RFID SmartGate Sync Timeout Incident', 
      time: '11:15 AM', 
      date: '25 May 2026', 
      status: 'Failed', 
      trigger: 'Hardware RFID Telemetry Hub', 
      size: '12 KB', 
      body: 'CRITICAL ERROR: Route 12 receiver fails to broadcast telemetry ping packet back to transit dispatch terminal. Automatic retry limit exceeded. Please investigate sensor node immediately.' 
    },
    { 
      id: 'em-8', 
      recipient: 'sandeep.narayanan@neonwoods.in', 
      subject: 'Hostel Nightly Curfew Attendance Discrepancy Log', 
      time: '09:45 PM', 
      date: '24 May 2026', 
      status: 'Pending', 
      trigger: 'Smart Hostel Curfew Daemon', 
      size: '36 KB', 
      body: 'Dear Captain Sandeep Narayanan, The automated bedtime biometric curfew sweep reported 3 unresolved leaves at midnight. Active query dispatched to the floor warden. Details attached.' 
    }
  ];

  const filteredEmailLogs = mockEmailLogs.filter(log => {
    const matchesSearch = 
      log.recipient.toLowerCase().includes(emailSearch.toLowerCase()) ||
      log.subject.toLowerCase().includes(emailSearch.toLowerCase()) ||
      log.trigger.toLowerCase().includes(emailSearch.toLowerCase());
    
    const matchesStatus = emailStatusFilter === 'All' ? true : log.status === emailStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 pb-20 mt-[1px]">
      
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
              <span className="px-3 py-1 bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-200">
                MODULE 12
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">Institutional Communications Hub</h1>
                <p className="text-xs text-slate-500 font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[400px] md:max-w-full">Centralize SMS, Email, WhatsApp, and Emergency Alerts from a single command center.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 cursor-pointer">
                <RefreshCw className="w-4 h-4" />
                <span>Sync Gateways</span>
             </button>
             <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
               <Globe className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* EXECUTIVE OVERVIEW STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 text-[1px]">
           {[
             { label: 'Sent Today', value: '12,846', sub: 'Total Messages', icon: Send, color: 'text-indigo-600', bg: 'bg-indigo-50' },
             { label: 'SMS Rate', value: '99.2%', sub: 'Delivery Success', icon: Smartphone, color: 'text-amber-600', bg: 'bg-amber-50' },
             { label: 'Email Open', value: '84.5%', sub: 'Avg Open Rate', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'WA Delivery', value: '98.8%', sub: 'WhatsApp Success', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Campaigns', value: '14', sub: 'Active Now', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
             { label: 'Credits', value: '48,500', sub: 'Remaining Units', icon: Hash, color: 'text-slate-600', bg: 'bg-slate-100' },
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
          
          {/* LEFT COLUMN - COMMUNICATION OPERATIONS (60%) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. BULK COMMUNICATION CENTER */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <Send className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Bulk Communication Center</h3>
                      <p className="text-xs text-slate-500 font-medium">Send announcements to specific audiences instantly.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Audience Selection</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                         {audiences.map((aud, i) => (
                           <button 
                             key={i}
                             onClick={() => toggleAudience(aud)}
                             className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                               selectedAudience.includes(aud) 
                               ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                               : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                             }`}
                           >
                             {aud}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Subject</label>
                         <input 
                           type="text" 
                           placeholder="Important Academic Update" 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                         />
                      </div>
                      <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Message Body</label>
                         <textarea 
                           rows={4}
                           placeholder="Dear Parents, Please note that the upcoming Parent-Teacher Meeting will be conducted on Saturday at 10:00 AM. Regards, School Administration"
                           className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                         />
                         <div className="flex justify-between mt-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">142 Characters · 1 SMS Segment</span>
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Est. Credits: {selectedAudience.length * 1.0}</span>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                      {channels.map((ch) => (
                        <button 
                          key={ch.id}
                          onClick={() => setSelectedChannel(ch.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                            selectedChannel === ch.id 
                            ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                           <ch.icon className={`w-5 h-5 mb-2 ${selectedChannel === ch.id ? ch.color : 'text-slate-300'}`} />
                           <span className="text-[9px] font-black uppercase tracking-widest">{ch.id}</span>
                        </button>
                      ))}
                   </div>

                   <button className="w-full py-4 bg-[#2563EB] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 mt-4">
                      <Send className="w-4 h-4" />
                      <span>Send Broadcast</span>
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                   <InfoCard title="What does this feature do?" desc="Allows administrators to filter specific groups and push multi-channel notifications instantly for announcements or schedule changes." />
                   <InfoCard title="How it improves operations?" desc="Replaces dozens of manual phone calls with a single broadcast, reducing staff workload by up to 90% during critical updates." />
                </div>
            </section>

            {/* 2. AI SMART REMINDER AUTOMATION */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Bot className="w-40 h-40" />
                </div>
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">AI Smart Reminder Automation</h3>
                      <p className="text-xs text-slate-500 font-medium tracking-tight">Automatically send triggers without manual intervention.</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-violet-200">AI Powered</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                     { title: 'Fee Reminder', trigger: 'Due Date Approaching', text: 'Dear {parent_name}, The fee payment of ₹{due_amount} is due on {due_date}.', status: 'Active', rate: '99.4%' },
                     { title: 'Attendance Alert', trigger: 'Student Marked Absent', text: 'Dear Parent, {student_name} was marked absent today in the morning assembly.', status: 'Active', rate: '100%' },
                     { title: 'Exam Reminder', trigger: '3 Days Before Exam', text: 'Important: The {subject} examination is scheduled for tomorrow at {time}. Hall ticket required.', status: 'Paused', rate: '98.2%' },
                   ].map((aut, i) => (
                     <div key={i} className="p-5 border border-slate-100 bg-slate-50/50 rounded-[24px] flex flex-col justify-between group hover:bg-white hover:border-violet-100 hover:shadow-xl transition-all">
                        <div className="space-y-4">
                           <div className="flex justify-between items-start">
                              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{aut.title}</h4>
                              <div className={`w-2 h-2 rounded-full ${aut.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                           </div>
                           <div className="space-y-1">
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Trigger Conditon</span>
                              <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg border border-violet-100">{aut.trigger}</span>
                           </div>
                           <p className="text-[10px] text-slate-500 font-medium leading-relaxed bg-white border border-slate-100 p-3 rounded-xl line-clamp-3">"{aut.text}"</p>
                        </div>
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                           <div>
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Success Rate</span>
                              <span className="text-xs font-black text-emerald-600">{aut.rate}</span>
                           </div>
                           <div className="text-right">
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Last Run</span>
                              <span className="text-[10px] font-black text-slate-800">2h ago</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                   <InfoCard title="How does this reduce workload?" desc="Removes the need for office staff to check registers and manually call parents, as system event hooks trigger these alerts instantly." />
                   <InfoCard title="Impact on Engagement?" desc="Parents appreciate the prompt transparency regarding their child's presence and deadlines, leading to better compliance and trust." />
                </div>
            </section>

            {/* 3. ATTENDANCE & SAFETY ALERTS */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Live Attendance & Safety Alerts</h3>
                      <p className="text-xs text-slate-500 font-medium">Real-time verification log of automated institutional triggers.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Log Status: Streaming</span>
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                   {[
                     { time: '08:30 AM', channel: 'SMS', status: 'Delivered', recipient: 'Parent of Aarav Sharma', msg: 'Student marked absent today.' },
                     { time: '08:31 AM', channel: 'SMS', status: 'Delivered', recipient: 'Parent of Ishita Gupta', msg: 'Student marked absent today.' },
                     { time: '09:12 AM', channel: 'WhatsApp', status: 'Delivered', recipient: 'Grade X Parents', msg: 'Transport route delayed due to traffic congestion on Airport Road.', priority: 'Emergency' },
                     { time: '09:45 AM', channel: 'Email', status: 'Sent', recipient: 'All Staff', msg: 'Faculty meeting scheduled at 02:00 PM in Conference Hall A.' },
                   ].map((log, i) => (
                     <div key={i} className={`p-5 border rounded-[24px] flex flex-col md:flex-row justify-between gap-4 transition-all group hover:shadow-lg ${log.priority === 'Emergency' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50/50 border-slate-50'}`}>
                        <div className="flex items-start gap-4">
                           <div className={`p-3 rounded-xl ${log.priority === 'Emergency' ? 'bg-amber-500 text-white' : 'bg-white text-slate-400 border border-slate-100'} group-hover:scale-110 transition-transform`}>
                              {log.priority === 'Emergency' ? <AlertTriangle className="w-5 h-5" /> : (log.channel === 'SMS' ? <Smartphone className="w-5 h-5" /> : (log.channel === 'WhatsApp' ? <MessageSquare className="w-5 h-5" /> : <Mail className="w-5 h-5" />))}
                           </div>
                           <div>
                              <div className="flex items-center gap-3">
                                 <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{log.recipient}</h5>
                                 {log.priority && <span className="px-2 py-0.5 bg-amber-600 text-white text-[8px] font-black uppercase tracking-widest rounded-md animate-pulse">Emergency</span>}
                              </div>
                              <p className="text-xs font-bold text-slate-600 mt-1">"{log.msg}"</p>
                              <div className="flex items-center gap-3 mt-2">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{log.channel}</span>
                                 <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                 <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{log.status}</span>
                              </div>
                           </div>
                        </div>
                        <div className="text-right flex flex-col justify-center min-w-[80px]">
                           <span className="text-sm font-black text-slate-900 font-mono tracking-tighter">{log.time}</span>
                           <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline mt-1">View Details</button>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                   <InfoCard title="Why is this important?" desc="Ensures critical safety information is never missed. High-priority triggers like absent alerts improve student safeguarding." />
                   <InfoCard title="How it improves engagement?" desc="Parents feel more secure knowing they will be notified instantly if their child does not arrive at school or if transport is delayed." />
                </div>
            </section>

            {/* 4. EXAM & ACADEMIC COMMUNICATION CENTER */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 bg-blue-50 text-blue-600 rounded-2xl`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Exam & Academic Communications</h3>
                    <p className="text-xs text-slate-500 font-medium">Verify delivery of hall tickets, timetables, and result narratives.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { type: 'Exam Schedule', audience: 'Grades VI - XII', date: '22 May', status: 'Delivered', channel: 'Email + Push' },
                     { type: 'Hall Tickets', audience: 'Grade XII', date: '24 May', status: 'Processing', channel: 'Portal + SMS' },
                     { type: 'Final Results', audience: 'All Students', date: 'Upcoming', status: 'Scheduled', channel: 'Mobile App' },
                     { type: 'Assignment Alert', audience: 'Grade IX-A', date: 'Today', status: 'Delivered', channel: 'Push' },
                   ].map((item, i) => (
                     <div key={i} className="p-5 border border-slate-100 rounded-[28px] bg-slate-50/50 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all h-32">
                        <div className="flex justify-between items-start">
                           <div>
                              <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{item.type}</h4>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{item.audience}</p>
                           </div>
                           <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                              item.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : (item.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-400')
                           }`}>{item.status}</span>
                        </div>
                        <div className="flex justify-between items-end">
                           <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item.date}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.channel}</span>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                   <InfoCard title="Institutional Communication?" desc="Standardizes academic notices across all branches, ensuring parents receive the same high-quality, professional updates." />
                   <InfoCard title="Administrative Workload?" desc="AI-driven scheduling means exam cell staff don't have to spend hours checking who received their hall tickets or results." />
                </div>
            </section>

            {/* 5. PARENT COMMUNICATION DESK */}
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 bg-emerald-50 text-emerald-600 rounded-2xl`}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Parent Communication Desk</h3>
                    <p className="text-xs text-slate-500 font-medium">Centralize two-way interactions and monitor parent engagement status.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                   {[
                     { label: 'Unread Queries', value: '14', color: 'text-blue-600', bg: 'bg-blue-50' },
                     { label: 'Recent Replies', value: '42', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                     { label: 'Pending Resp.', value: '08', color: 'text-amber-600', bg: 'bg-amber-50' },
                     { label: 'SLA Status', value: '98%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                   ].map((stat, i) => (
                     <div key={i} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">{stat.label}</span>
                        <div className="flex items-baseline gap-2">
                           <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="space-y-4">
                   {[
                     { parent: 'Dr. Manish Verma', student: 'Grade X-B', msg: 'Requested clarification regarding the new chemistry lab schedule.', time: '14m ago', status: 'Unread' },
                     { parent: 'Mrs. Suneeta Rao', student: 'Grade VI-A', msg: 'Confirmed receipt of the annual day invitation card.', time: '1h ago', status: 'Replied' },
                   ].map((item, i) => (
                     <div key={i} className="p-5 border border-slate-50 bg-slate-50/30 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center font-black text-slate-500 text-xs text-[10px]">
                              {item.parent.split(' ').map(n=>n[0]).join('')}
                           </div>
                           <div>
                              <div className="flex items-center gap-2">
                                 <h6 className="text-[11px] font-black text-slate-900">{item.parent}</h6>
                                 <span className="text-[9px] font-bold text-slate-400 uppercase">({item.student})</span>
                              </div>
                              <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">"{item.msg}"</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${item.status === 'Unread' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
                           <span className="text-[9px] font-bold text-slate-400 block mt-1 uppercase">{item.time}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <button className="w-full mt-6 py-3 border border-dashed border-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-blue-300 hover:text-blue-600 transition-all">
                   Open Full Engagement History
                 </button>
             </section>

             {/* 6. AUTOMATED EMAIL AUDIT & TRANSMISSION LOG */}
             <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm space-y-6">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex items-center gap-3">
                     <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                       <Mail className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Automated Email Dispatch Log</h3>
                       <p className="text-xs text-slate-500 font-medium whitespace-normal">Search, inspect and audit automated emails dispatched by system event triggers.</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-xl font-mono text-[10px] text-slate-500 font-extrabold pb-1 sm:pb-1.5 pt-1 sm:pt-1.5">
                      <span>SMTP Gateway: Online</span>
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   </div>
                 </div>

                 {/* Micro Metrics Strip */}
                 <div className="grid grid-cols-3 gap-3 bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
                   <div className="space-y-1">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block font-bold">Dispatched Today</span>
                     <span className="text-xs font-black text-slate-805">8,213 <span className="text-[10px] text-emerald-500 font-extrabold">+6.2%</span></span>
                   </div>
                   <div className="space-y-1 border-l border-slate-200/80 pr-1 pl-3">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block font-bold">Open Rate Avg</span>
                     <span className="text-xs font-black text-slate-805">84.5%</span>
                   </div>
                   <div className="space-y-1 border-l border-slate-200/80 pr-1 pl-3">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block font-bold">Active SMTPS</span>
                      <span className="text-xs font-black text-slate-805">AWS-SES-01</span>
                   </div>
                 </div>

                 {/* Search and Filters Controllers */}
                 <div className="flex flex-col sm:flex-row gap-3 pt-2">
                   {/* Search Bar */}
                   <div className="relative flex-1">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input
                       type="text"
                       value={emailSearch}
                       onChange={(e) => setEmailSearch(e.target.value)}
                       placeholder="Search recipient, subject or trigger daemon..."
                       className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-11 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400"
                     />
                     {emailSearch && (
                       <button 
                         onClick={() => setEmailSearch('')}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-mono text-[10px] font-bold"
                       >
                         Clear
                       </button>
                     )}
                   </div>

                   {/* Status filter pills */}
                   <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                     {['All', 'Opened', 'Delivered', 'Pending', 'Failed'].map((status) => {
                       const isActive = emailStatusFilter === status;
                       return (
                         <button
                           key={status}
                           onClick={() => {
                             setEmailStatusFilter(status);
                             setExpandedEmailId(null);
                           }}
                           className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer whitespace-nowrap ${
                             isActive 
                               ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-xs' 
                               : 'bg-white border-slate-200/60 text-slate-500 hover:border-slate-300'
                           }`}
                         >
                           {status}
                         </button>
                       );
                     })}
                   </div>
                 </div>

                 {/* Email Interactive Log Feed Grid */}
                 <div className="space-y-3">
                   <AnimatePresence mode="popLayout">
                     {filteredEmailLogs.length > 0 ? (
                       filteredEmailLogs.map((log) => {
                         const isExpanded = expandedEmailId === log.id;
                         
                         // Status styling
                         const statusColors: any = {
                           Delivered: 'bg-green-50 text-green-700 border-green-200',
                           Opened: 'bg-blue-50 text-blue-700 border-blue-200',
                           Pending: 'bg-amber-50 text-amber-700 border-amber-200',
                           Failed: 'bg-rose-50 text-rose-700 border-rose-200'
                         };

                         const indicatorBg: any = {
                           Delivered: 'bg-emerald-500',
                           Opened: 'bg-blue-500',
                           Pending: 'bg-amber-500',
                           Failed: 'bg-rose-500'
                         };

                         return (
                           <motion.div
                             key={log.id}
                             layout="position"
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, scale: 0.95 }}
                             transition={{ duration: 0.2 }}
                             className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-500 bg-blue-50/10 shadow-sm' : 'border-slate-100 bg-slate-50/20 hover:bg-slate-50/60'}`}
                           >
                             {/* Brief View Trigger Bar */}
                             <button
                               type="button"
                               onClick={() => setExpandedEmailId(isExpanded ? null : log.id)}
                               className="w-full p-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 focus:outline-none cursor-pointer"
                             >
                               <div className="flex items-start sm:items-center gap-3">
                                 {/* Visual Mail block with bullet point status */}
                                 <div className="relative shrink-0 p-2.5 rounded-xl bg-white border border-slate-150 shadow-3xs">
                                   <Mail className="w-4 h-4 text-slate-400" />
                                   <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${indicatorBg[log.status]} border-2 border-white`} />
                                 </div>
                                 <div className="space-y-0.5">
                                   <div className="flex flex-wrap items-center gap-2">
                                     <span className="text-[11.5px] font-black text-slate-800 leading-tight">{log.recipient}</span>
                                     <span className="font-mono text-[9px] text-[#0074E4] font-black px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-100/40 uppercase tracking-widest">{log.size}</span>
                                   </div>
                                   <p className="text-[11px] font-bold text-slate-600 line-clamp-1">{log.subject}</p>
                                   <div className="flex items-center gap-1.5 text-[8.5px] text-slate-400 font-mono uppercase tracking-widest">
                                     <span>Trigger:</span>
                                     <span className="text-purple-600 font-black">{log.trigger}</span>
                                   </div>
                                 </div>
                               </div>

                               <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                                 <div className="text-left sm:text-right font-mono">
                                   <span className="text-[10px] font-black text-slate-805 block leading-tight">{log.time}</span>
                                   <span className="text-[9px] font-semibold text-slate-400 block mt-0.5 uppercase">{log.date}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                   <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${statusColors[log.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                     {log.status}
                                   </span>
                                   <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                 </div>
                               </div>
                             </button>

                             {/* Detailed Body & Actions expansion */}
                             {isExpanded && (
                               <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 transition={{ duration: 0.2 }}
                                 className="px-5 pb-5 pt-0 border-t border-slate-100/80 space-y-4"
                               >
                                 <div className="space-y-2 pt-4">
                                   <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block animate-pulse">EMAIL PREVIEW CONTENT RAW</span>
                                   <div className="p-4 rounded-xl bg-white border border-slate-150/70 text-xs text-slate-605 font-medium leading-relaxed font-sans shadow-3xs max-w-full whitespace-pre-wrap">
                                     {log.body}
                                   </div>
                                 </div>

                                 {/* Custom simulation action controls */}
                                 <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                   <div className="flex items-center gap-1.5 text-[8.5px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                                     <span>SMTP Server Node: AWS-SES-EU-WEST-1</span>
                                   </div>
                                   
                                   <div className="flex items-center gap-2">
                                     <button 
                                       type="button"
                                       onClick={() => alert(`Raw SMTP delivery headers for transaction ${log.id} diagnostic info checks compiled.`)}
                                       className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[9px] font-black text-slate-600 uppercase tracking-widest transition-all"
                                     >
                                       SMTP Header Check
                                     </button>
                                     <button 
                                       type="button"
                                       onClick={() => alert(`Email dispatch re-queued for transmission to ${log.recipient}.`)}
                                       className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-[9px] font-black text-white uppercase tracking-widest shadow-xs shadow-blue-200 transition-all flex items-center gap-1.5"
                                     >
                                       <RefreshCw className="w-3 h-3 animate-spin" />
                                       <span>Resend Dispatch</span>
                                     </button>
                                   </div>
                                 </div>
                               </motion.div>
                             )}

                           </motion.div>
                         );
                       })
                     ) : (
                       <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="p-8 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl space-y-2"
                       >
                         <XCircle className="w-8 h-8 text-slate-300 mx-auto" />
                         <span className="text-xs font-black text-slate-800 uppercase tracking-tight block">No Dispatched Records Found</span>
                         <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-normal">
                           We couldn't locate any automated email logs matching "{emailSearch}" under status category "{emailStatusFilter}".
                         </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                  </div>
              </section>

          </div>

          {/* RIGHT COLUMN - COMMUNICATION ANALYTICS (40%) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="sticky top-28 space-y-8">
              
              {/* DELIVERY PERFORMANCE ANALYTICS */}
              <section className="bg-[#0F172A] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp className="w-48 h-48" />
                 </div>
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Delivery Performance</h4>
                       <div className="px-3 py-1 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Real-time Index</div>
                    </div>

                    <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={DELIVERY_DATA}>
                            <defs>
                               <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                               </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#ffffff40', fontSize: 10, fontWeight: 'bold'}} />
                            <Tooltip contentStyle={{backgroundColor: '#1E293B', border: 'none', borderRadius: '16px', color: '#fff', fontSize: '10px'}} />
                            <Area type="monotone" dataKey="sms" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorWave)" />
                            <Area type="monotone" dataKey="wa" stroke="#10B981" strokeWidth={2} fillOpacity={0} />
                         </AreaChart>
                       </ResponsiveContainer>
                    </div>

                    {/* COMMUNICATION CHANNEL PERFORMANCE */}
                    <div className="space-y-6 pt-8 border-t border-white/5">
                       <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-1">Channel Performance (Stacked)</span>
                       <div className="h-48 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={CHANNEL_PERFORMANCE} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#ffffff60', fontSize: 10, fontWeight: 'bold'}} width={80} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1E293B', border: 'none', borderRadius: '12px'}} />
                                <Bar dataKey="sent" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={20}>
                                   {CHANNEL_PERFORMANCE.map((entry, index) => (
                                     <Cell key={`cell-${index}`} fill={entry.color} />
                                   ))}
                                </Bar>
                             </BarChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    {/* LIVE DELIVERY QUEUE MONITOR */}
                    <div className="space-y-6 pt-8 border-t border-white/5">
                       <div className="flex justify-between items-center px-1">
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Delivery Queue Monitor</span>
                          <span className="text-[9px] font-black text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-md uppercase tracking-widest">Idle</span>
                       </div>
                       
                       <div className="grid grid-cols-3 gap-3">
                          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                             <h6 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Processing</h6>
                             <span className="text-xl font-black font-mono">0</span>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                             <h6 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Failed</h6>
                             <span className="text-xl font-black font-mono text-rose-500">12</span>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                             <h6 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Retry</h6>
                             <span className="text-xl font-black font-mono text-amber-500">4</span>
                          </div>
                       </div>
                    </div>

                    {/* AI COMMUNICATION INSIGHTS */}
                    <div className="p-6 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[32px] border border-white/10 space-y-6 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                           <Bot className="w-40 h-40" />
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                           <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-blue-600 rounded-xl">
                                 <Bot className="w-5 h-5" />
                              </div>
                              <h5 className="text-xs font-black uppercase tracking-widest">AI Comms Intel</h5>
                           </div>
                           <span className="px-2 py-0.5 bg-white/10 text-blue-300 text-[8px] font-black uppercase tracking-widest rounded-lg border border-white/10">Active Insight</span>
                        </div>
                        <div className="space-y-4 relative z-10">
                           <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                              <p className="text-[10px] font-medium text-slate-200 leading-relaxed italic border-l-2 border-blue-500 pl-4">"Engagement is 14% higher when fee reminders are scheduled 5 days before the due date on WhatsApp."</p>
                           </div>
                           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                              <span className="text-slate-500">Suggested Action</span>
                              <span className="text-emerald-400">Auto-Schedule Enable</span>
                           </div>
                        </div>
                    </div>

                    {/* EMERGENCY ALERT COMMAND CENTER */}
                    <div className="bg-rose-900/40 border border-rose-500/30 rounded-[32px] p-8 space-y-6 relative overflow-hidden">
                       <div className="absolute -bottom-10 -right-10 opacity-5">
                          <AlertTriangle className="w-32 h-32" />
                       </div>
                       <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest">Emergency Command Center</h4>
                       <div className="grid grid-cols-2 gap-3">
                          {[
                            'Transport Delay', 'Weather Alert', 'School Closure', 'Health Advisory'
                          ].map((t, i) => (
                            <button key={i} className="p-3 bg-rose-500/20 border border-rose-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-rose-200 hover:bg-rose-500 hover:text-white transition-all text-center">
                               {t}
                            </button>
                          ))}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-black text-rose-300/60 uppercase tracking-widest pt-2">
                          <Clock3 className="w-3 h-3" />
                          <span>Est. Delivery: 45 Seconds</span>
                       </div>
                    </div>

                 </div>
              </section>

              {/* LIVE COMMUNICATION ACTIVITY FEED */}
              <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Global Comms Activity
                 </h4>
                 <div className="space-y-4">
                    {[
                      { time: '09:02 AM', text: 'Fee Reminder Campaign Executed (428 Recipients)', color: 'text-indigo-400' },
                      { time: '09:14 AM', text: 'Attendance Alert Delivered to 86 Parents', color: 'text-emerald-400' },
                      { time: '09:21 AM', text: 'Exam Notification Sent for Grade XII', color: 'text-blue-400' },
                      { time: '09:32 AM', text: 'Incoming Parent Query via Portal App', color: 'text-rose-400' },
                    ].map((feed, i) => (
                      <div key={i} className="flex gap-4 group">
                         <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${feed.color} mt-1.5 shadow-sm`} />
                            {i !== 3 && <div className="w-px flex-1 bg-slate-100 my-1" />}
                         </div>
                         <div className="pb-4">
                            <p className="text-[11px] font-bold text-slate-900 leading-tight">{feed.text}</p>
                            <span className="text-[9px] font-black text-slate-400 block mt-1 tracking-widest uppercase">{feed.time}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* USER EDUCATION PANELS */}
              <section className="space-y-4">
                 {[
                   { q: "Why is it important?", a: "Centralizing communications ensures consistent brand voice and prevents parents from being overwhelmed by fragmented messages from different departments." },
                   { q: "How it improves engagement?", a: "By using AI-recommended timing and multi-channel delivery, institutions achieve near 100% read rates for critical safety and academic updates." }
                 ].map((edu, i) => (
                   <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-[28px] hover:bg-white hover:border-blue-100 transition-all">
                      <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                         <Info className="w-3 h-3" />
                         {edu.q}
                      </h5>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">"{edu.a}"</p>
                   </div>
                 ))}
              </section>

            </div>
          </div>

        </div>
      </main>

       {/* FLOATING QUICK ACTION */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="flex items-center gap-2 p-1.5 bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
          >
             <button className="px-6 py-3 bg-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Urgent Broadcast</span>
             </button>
             <div className="w-px h-6 bg-white/10 mx-1" />
             <button className="p-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
             </button>
             <button className="p-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Filter className="w-5 h-5" />
             </button>
          </motion.div>
       </div>

    </div>
  );
};
