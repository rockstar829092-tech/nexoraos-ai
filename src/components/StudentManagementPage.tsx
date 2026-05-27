/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { StudentIDCard } from './StudentIDCard';
import { PageLayout } from './PageLayout';
import { 
  ArrowLeft, 
  UserCheck, 
  FileSpreadsheet, 
  CalendarDays, 
  LineChart, 
  Users, 
  IdCard, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Send, 
  Bell, 
  Database,
  QrCode,
  Shield,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define Interface for selected student representation
interface Student {
  id: string;
  name: string;
  class: string;
  avatar: string;
  avatarBg: string;
  attendance: string;
  grade: string;
  guardian: string;
  phone: string;
  blood: string;
  tagId: string;
  email: string;
  address: string;
  altPhone: string;
  allergies: string;
  fullAddress: string;
  officePhone: string;
  officeEmail: string;
  securityExt: string;
  securityType: string;
}

const SAMPLE_STUDENTS: Student[] = [
  {
    id: "NEX-2026-98",
    name: "Aarav Sharma",
    class: "Grade XI - A",
    avatar: "AS",
    avatarBg: "bg-blue-600",
    attendance: "96.4%",
    grade: "A+ (94.2%)",
    guardian: "Rajesh Sharma",
    phone: "+91 98765 43210",
    blood: "O +ve",
    tagId: "#98829F-A",
    email: "rajesh.sharma@gmail.com",
    address: "Flat 405, Block B, Silver Oak Residency, Sector 62",
    altPhone: "+91 98765 43211",
    allergies: "None Reported",
    fullAddress: "Flat 405, Block B, Silver Oak Residency, Sector 62, Near Blossom Park, Jaipur, Rajasthan — 302012",
    officePhone: "0141-2X76543, +91 99999 88888",
    officeEmail: "admin@nexoraosacademy.edu.in",
    securityExt: "Ext. 104 (24/7 Helpline)",
    securityType: "EMV CHIP PROTECTED"
  },
  {
    id: "NEX-2026-42",
    name: "Priya Patel",
    class: "Grade XII - B",
    avatar: "PP",
    avatarBg: "bg-indigo-600",
    attendance: "98.1%",
    grade: "Outstanding (97.8%)",
    guardian: "Vipul Patel",
    phone: "+91 91234 56789",
    blood: "AB +ve",
    tagId: "#91223F-B",
    email: "vipul.patel@hotmail.com",
    address: "102, Gauri Apartments, Vasant Kunj, South Zone-2",
    altPhone: "+91 91234 56780",
    allergies: "Peanuts (Mild)",
    fullAddress: "102, Gauri Apartments, Vasant Kunj, South Zone-2, New Delhi — 110070",
    officePhone: "011-4X556677, +91 99999 88888",
    officeEmail: "admin@nexoraosacademy.edu.in",
    securityExt: "Ext. 104 (24/7 Helpline)",
    securityType: "EMV CHIP PROTECTED"
  },
  {
    id: "NEX-2026-15",
    name: "Kabir Singh",
    class: "Grade X - C",
    avatar: "KS",
    avatarBg: "bg-violet-600",
    attendance: "91.5%",
    grade: "B+ (84.5%)",
    guardian: "Harpal Singh",
    phone: "+91 98112 23344",
    blood: "A -ve",
    tagId: "#90429F-C",
    email: "harpal.singh@yahoo.com",
    address: "House 24, G Block, Preet Vihar, East Zone-4",
    altPhone: "+91 98112 23345",
    allergies: "None Reported",
    fullAddress: "House 24, G Block, Preet Vihar, East Zone-4, Delhi — 115091",
    officePhone: "011-2X98765, +91 99999 88888",
    officeEmail: "admin@nexoraosacademy.edu.in",
    securityExt: "Ext. 104 (24/7 Helpline)",
    securityType: "EMV CHIP PROTECTED"
  }
];

export const StudentManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStudentId, setSelectedStudentId] = useState<string>("NEX-2026-98");
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');
  const [isHovered, setIsHovered] = useState(false);
  const [biometricSyncActive, setBiometricSyncActive] = useState<boolean>(true);
  
  // Real logs state for attendance tracker
  const [attendanceLogs, setAttendanceLogs] = useState<Array<{ time: string, action: string, method: string }>>([
    { time: "08:14:10 AM", action: "Aarav Sharma Check-In Approved", method: "RFID Gate 1 Entry" },
    { time: "08:09:45 AM", action: "Priya Patel Check-In Approved", method: "Biometric Portal B" },
    { time: "08:05:12 AM", action: "Kabir Singh Check-In Approved", method: "RFID Gate 2 Entry" },
  ]);

  // Form enrollment lead state
  const [newLeadName, setNewLeadName] = useState("");
  const [leads, setLeads] = useState([
    { name: "R Rohan Varma", status: "Documents Pending", badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400" },
    { name: "Sanya Sen", status: "Verified & Complete", badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400" },
  ]);

  // Alert transmission simulator
  const [smsText, setSmsText] = useState("Alert: Aarav Sharma has reached the main computer lab at 11:30 AM.");
  const [sentAlerts, setSentAlerts] = useState<string[]>([]);

  const activeStudent = SAMPLE_STUDENTS.find(s => s.id === selectedStudentId) || SAMPLE_STUDENTS[0];

  const handleAddNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;
    setLeads(prev => [
      ...prev,
      { name: newLeadName, status: "Submitted / Awaiting Review", badge: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400" }
    ]);
    setNewLeadName("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsText.trim()) return;
    setSentAlerts(prev => [smsText, ...prev]);
    setSmsText("");
  };

  const triggerSimulatedCheckIn = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = {
      time: timestamp,
      action: `${activeStudent.name} Check-In Approved`,
      method: `Simulated Reader (${activeStudent.tagId})`
    };
    setAttendanceLogs(prev => [newLog, ...prev]);
  };

  return (
    <PageLayout theme="light" setTheme={() => {}}>
    <div className="min-h-screen bg-white dark:bg-black font-sans pb-24 text-slate-800 dark:text-[#F5F5F7] select-text transition-colors">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-14 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-100/30 to-indigo-100/30 dark:from-blue-500/5 dark:to-indigo-500/5 opacity-60 pointer-events-none blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-black text-blue-700 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400 py-1 px-3 rounded-md uppercase tracking-wider border border-blue-200/50 dark:border-blue-500/20 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> School Management Architecture
            </span>
            <h1 className="text-3xl sm:text-4.5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
              Student Management System
            </h1>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-base leading-relaxed">
              Explore NexoraOS's top-tier enterprise platform ecosystem. Toggle between different student models to see instantaneous syncing across cloud databases and biometric ID card generation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Core 2-Column Working Area */}
      <main className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. 360° Student Records Profiles */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 shadow-2xs">
                  <UserCheck className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">360° Unified Student Profiles</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">SaaS cloud biometric record system mapping student attributes</span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed">
                NexoraOS unifies general registers, medical allergies, emergency family branches, disciplinary catalogs, transport channels, and credential tags.
              </p>

              {/* Live Interactive Profile Browser Box */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 dark:bg-white/2 p-3 rounded-2xl border border-slate-100 dark:border-white/5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Student Reference:</span>
                  <div className="flex gap-1.5 scrollbar-none overflow-x-auto">
                    {SAMPLE_STUDENTS.map(st => (
                      <button 
                        key={st.id}
                        onClick={() => setSelectedStudentId(st.id)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-extrabold transition-all shrink-0 ${selectedStudentId === st.id ? 'bg-[#0071E3] text-white shadow-xs' : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-700'}`}
                      >
                        {st.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick details dashboard visual rendering */}
                <div className="p-4 bg-slate-50/50 dark:bg-white/2 rounded-2xl border border-slate-200/50 dark:border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Database UID</span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white block font-mono">{activeStudent.id}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Current Attendance</span>
                    <span className="text-xs font-black text-emerald-600 block">{activeStudent.attendance} Presence</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Grade Ledger GPA</span>
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block">{activeStudent.grade}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Guardian Name</span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white block">{activeStudent.guardian}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Smart Admission Records */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 shadow-2xs">
                  <FileSpreadsheet className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">Smart Admission Records Flow</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Automatic digital admission ledgers and workflow tracker</span>
                </div>
              </div>

              <div className="space-y-3.5 bg-slate-50 dark:bg-white/2 p-4 rounded-2xl border border-slate-150 dark:border-white/5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Add Prospective Lead Pipeline Record:</span>
                <form onSubmit={handleAddNewLead} className="flex gap-2">
                  <input 
                    type="text"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="Enter Student Lead Name..."
                    className="flex-1 bg-white dark:bg-zinc-800 border border-slate-250 dark:border-white/10 p-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold dark:text-white"
                  />
                  <button 
                    type="submit"
                    className="bg-[#0071E3] hover:bg-blue-700 text-white px-4 py-2 text-xs font-black rounded-xl transition-all active:scale-95"
                  >
                    Enroll Lead
                  </button>
                </form>

                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {leads.map((l, index) => (
                    <div key={index} className="bg-white dark:bg-zinc-800 border border-slate-150 dark:border-white/5 p-2 text-xs rounded-xl flex items-center justify-between font-semibold shadow-2xs">
                      <span className="text-slate-800 dark:text-white">{l.name}</span>
                      <span className={`text-[10px] py-0.5 px-2 rounded-md font-black ${l.badge}`}>
                        {l.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Real-Time Attendance Tracking */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 shadow-2xs">
                  <CalendarDays className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">Live Telemetry</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Biometric clock-in telemetry mapping matching signals in under 320ms</span>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 text-slate-900 dark:text-white p-4 rounded-2xl border border-slate-200 dark:border-white/10 font-mono text-xs space-y-3.5 shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-2 max-h-[120px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-slate-200">
                  {attendanceLogs.map((log, i) => (
                    <div key={i} className="flex flex-col gap-0.5 border-l-2 border-blue-100 dark:border-blue-500/20 pl-3.5 group hover:border-blue-500 transition-colors">
                      <span className="text-[10px] text-slate-400 font-bold tracking-tight">{log.time}</span>
                      <span className="text-slate-900 dark:text-white font-black tracking-tight">{log.action}</span>
                      <span className="text-[9px] text-slate-500 font-medium">Mapped via {log.method}</span>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 pt-2">
                  <button 
                    type="button"
                    onClick={triggerSimulatedCheckIn}
                    className="w-full bg-[#0071E3] hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
                  >
                    📡 Trigger Live Check-In Tap for {activeStudent.name}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm text-center relative overflow-hidden flex flex-col items-center">
              <div className="w-full border-b border-slate-100 dark:border-white/5 pb-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IdCard className="h-4.5 w-4.5 text-[#0071E3]" />
                  <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">Digital Credential</span>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setActiveTab('front')} className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all ${activeTab === 'front' ? 'bg-[#0071E3] text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>Front</button>
                  <button onClick={() => setActiveTab('back')} className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all ${activeTab === 'back' ? 'bg-[#0071E3] text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>Back</button>
                </div>
              </div>

              <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="w-full flex justify-center">
                <StudentIDCard 
                  student={activeStudent}
                  activeTab={activeTab}
                  isHovered={isHovered}
                  biometricSyncActive={biometricSyncActive}
                  onCardClick={() => setActiveTab(activeTab === 'front' ? 'back' : 'front')}
                />
              </div>

              <div className="w-full mt-6 space-y-2 border-t border-slate-100 dark:border-white/5 pt-5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block text-left">Credential Security Protocol:</span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 text-left">
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /><span>EMV Chip Protected</span></div>
                  <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /><span>RFID Secure Link</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </PageLayout>
  );
};
