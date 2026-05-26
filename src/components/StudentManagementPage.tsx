/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { StudentIDCard } from './StudentIDCard';
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

interface StudentManagementPageProps {
  onBack: () => void;
}

export const StudentManagementPage: React.FC<StudentManagementPageProps> = ({ onBack }) => {
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
    { name: "R Rohan Varma", status: "Documents Pending", badge: "bg-amber-100 text-amber-800" },
    { name: "Sanya Sen", status: "Verified & Complete", badge: "bg-emerald-100 text-emerald-800" },
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
      { name: newLeadName, status: "Submitted / Awaiting Review", badge: "bg-blue-100 text-blue-800" }
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 text-slate-800 select-text">
      
      {/* Sticky utility header */}
      <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4.5 py-2.5 text-xs sm:text-sm font-black text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50/80 rounded-xl transition-all active:scale-95 group shadow-xs border border-slate-200/40"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 stroke-[2.5]" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-2.5">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-200/50">
              PREMIUM MODULE PLATFORM
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-14 bg-gradient-to-b from-slate-100/60 to-slate-50 border-b border-slate-200/60">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-100/30 to-indigo-100/30 opacity-60 pointer-events-none blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-black text-blue-700 bg-blue-100 py-1 px-3 rounded-md uppercase tracking-wider border border-blue-200/50 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-pulse" /> School Management Architecture
            </span>
            <h1 className="text-3xl sm:text-4.5xl font-black text-slate-950 tracking-tight leading-tight">
              Advanced Student Management System
            </h1>
            <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
              Explore NexoraOS's top-tier enterprise platform ecosystem. Toggle between different student models to see instantaneous syncing across cloud databases, digital registration forms, secure emergency communications, dynamic grade analytics curves, and biometric ID card generation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Core 2-Column Working Area */}
      <main className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: 5 Core Feature Blocks with Real Content & Custom Mockups */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. 360° Student Records Profiles */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <UserCheck className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">360° Unified Student Profiles</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">SaaS cloud biometric record system mapping student attributes</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                NexoraOS unifies general registers, medical allergies, emergency family branches, disciplinary catalogs, transport channels, and credential tags in an accessible single-pane overview.
              </p>

              {/* Live Interactive Profile Browser Box */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Student Reference:</span>
                  <div className="flex gap-1.5 scrollbar-none overflow-x-auto">
                    {SAMPLE_STUDENTS.map(st => (
                      <button 
                        key={st.id}
                        onClick={() => setSelectedStudentId(st.id)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-extrabold transition-all shrink-0 ${selectedStudentId === st.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                      >
                        {st.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick details dashboard visual rendering */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Database UID</span>
                    <span className="text-xs font-extrabold text-slate-800 block font-mono">{activeStudent.id}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Current Attendance</span>
                    <span className="text-xs font-black text-emerald-600 block">{activeStudent.attendance} Presence</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Grade Ledger GPA</span>
                    <span className="text-xs font-extrabold text-indigo-600 block">{activeStudent.grade}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Guardian Name</span>
                    <span className="text-xs font-extrabold text-slate-800 block">{activeStudent.guardian}</span>
                  </div>
                  <div className="space-y-0.5 col-span-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Campus Address</span>
                    <span className="text-xs font-semibold text-slate-600 block leading-tight truncate">{activeStudent.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Smart Admission Records */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <FileSpreadsheet className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Smart Admission Records Flow</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Automatic digital admission ledgers and workflow tracker</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Capture prospective student leads via interactive portal links, verify physical documents, trigger registration billing sequences, and queue them for final administration stamps instantly.
              </p>

              {/* Micro form simulator */}
              <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Add Prospective Lead Pipeline Record:</span>
                <form onSubmit={handleAddNewLead} className="flex gap-2">
                  <input 
                    type="text"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="Enter Student Lead Name (e.g. Meera Iyer)..."
                    className="flex-1 bg-white border border-slate-250 p-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  />
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-black rounded-xl transition-all active:scale-95"
                  >
                    Enroll Lead
                  </button>
                </form>

                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {leads.map((l, index) => (
                    <div key={index} className="bg-white border border-slate-150 p-2 text-xs rounded-xl flex items-center justify-between font-semibold shadow-2xs">
                      <span className="text-slate-800">{l.name}</span>
                      <span className={`text-[10px] py-0.5 px-2 rounded-md font-black ${l.badge}`}>
                        {l.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Real-Time Attendance Tracking */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <CalendarDays className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Real-Time Attendance Tracking</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Biometric clock-in telemetry mapping matching signals in under 320ms</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Synchronize campus security nodes. RFID scanners and biometric gateways report checks instantly to administrators, automatically building complete monthly excel compliance sheets.
              </p>

              {/* Live terminal feed view */}
              <div className="bg-slate-950 text-slate-350 p-4 rounded-2xl border border-slate-900 font-mono text-xs space-y-3.5 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="text-[9px] text-slate-500 font-black tracking-wider uppercase">READER LOG GATEWAY #08</span>
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 block animate-pulse" />
                    SECURE ACTIVE
                  </span>
                </div>

                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-0.5">
                  {attendanceLogs.map((log, i) => (
                    <div key={i} className="flex flex-col gap-0.5 border-l border-slate-800 pl-3.5">
                      <span className="text-[10px] text-slate-500">{log.time}</span>
                      <span className="text-slate-200 font-semibold">{log.action}</span>
                      <span className="text-[9px] text-slate-400">Security Index: Mapped via {log.method}</span>
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={triggerSimulatedCheckIn}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-white font-black text-xs py-2 rounded-xl transition-all border border-slate-800 shadow-xs active:scale-95"
                >
                  📡 Trigger Live Check-In Tap for {activeStudent.name}
                </button>
              </div>
            </div>

            {/* 4. Academic Performance Analytics */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <LineChart className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Academic Performance Analytics</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Multi-term continuous scholastic progress trajectories</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Generate descriptive visual trend calculations. Chart continuous grades across Unit Tests, Half-Yearly reviews, and Finals, enabling educational directors to intervene with targeted support.
              </p>

              {/* Dynamic SVG/CSS Bar Chart representing Grade Trajectory */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Class XI - Subject Wise Performance Index:</span>
                
                <div className="space-y-3">
                  {/* Physics Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Physics Theory Index</span>
                      <span className="font-extrabold text-blue-600">92%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>

                  {/* Chemistry Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Chemistry Lab Portfolio</span>
                      <span className="font-extrabold text-blue-600">88%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  {/* Mathematics Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Mathematics & Logic Sequences</span>
                      <span className="font-extrabold text-blue-600">95%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/50 flex justify-between items-center text-[10px] font-bold text-slate-500">
                  <span>Class Average Standard: 82.5%</span>
                  <span className="text-emerald-600 font-extrabold flex items-center gap-1">• Active Student Performing Above Standard</span>
                </div>
              </div>
            </div>

            {/* 5. Verified Parent Details Emergency Broadcast */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <Users className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Verified Parent Details & Broadcasts</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Multi-channel emergency SMS alerts and mapped guardian profiles</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Securely store critical parent links, dispatch authorized OTP cards for pickup triggers, send real-time SMS broadcasts, and track delivered notifications.
              </p>

              {/* Live parent communicator layout */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-150 space-y-4">
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/50 shadow-2xs">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-600">
                    RS
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-800 leading-none">{activeStudent.guardian}</h5>
                    <span className="text-[10px] text-slate-400 block mt-1 uppercase tracking-wider font-extrabold font-mono">PRIMARY SMS LINKED: {activeStudent.phone}</span>
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Configure Simulated SMS Message:</label>
                    <textarea 
                      value={smsText}
                      onChange={(e) => setSmsText(e.target.value)}
                      className="w-full bg-white border border-slate-250 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 h-16 resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Dispatch Broadcast to {activeStudent.guardian}
                  </button>
                </form>

                {sentAlerts.length > 0 && (
                  <div className="space-y-1.5 pt-1 border-t border-slate-200/50">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Delivered Logs</span>
                    {sentAlerts.map((alt, index) => (
                      <div key={index} className="bg-slate-150 p-2 rounded-lg text-[11px] font-semibold text-slate-600 flex justify-between items-center border border-slate-200">
                        <span className="truncate max-w-[280px]">{alt}</span>
                        <span className="text-emerald-600 font-extrabold shrink-0 text-[9px]">SENT</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 1. 3D Flipping Student ID Card (FRONT & BACK with Hover/Click Flip) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-center relative overflow-hidden flex flex-col items-center">
              
              <div className="w-full border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IdCard className="h-4.5 w-4.5 text-blue-600" />
                  <span className="text-xs font-black text-slate-800">Dynamic 3D Flipping Student ID Card</span>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setActiveTab('front')}
                    className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all ${activeTab === 'front' ? 'bg-blue-600 text-white shadow-3xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    Front
                  </button>
                  <button 
                    onClick={() => setActiveTab('back')}
                    className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all ${activeTab === 'back' ? 'bg-blue-600 text-white shadow-3xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Decorative Perspective Area wrapping the 3D Flipping Card */}
              <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full flex justify-center"
              >
                <StudentIDCard 
                  student={activeStudent}
                  activeTab={activeTab}
                  isHovered={isHovered}
                  biometricSyncActive={biometricSyncActive}
                  onCardClick={() => setActiveTab(activeTab === 'front' ? 'back' : 'front')}
                />
              </div>

              {/* Biometric Sync Simulated Switch */}
              <div className="w-full mt-5 bg-slate-50 p-3.5 rounded-2xl border border-slate-150 text-left">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono tracking-wider font-extrabold text-blue-600 block uppercase">HARDWARE SIMULATION</span>
                    <h5 className="text-[11px] font-black text-slate-800 uppercase">Biometric Sync Server</h5>
                  </div>
                  <button
                    onClick={() => setBiometricSyncActive(!biometricSyncActive)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${biometricSyncActive ? 'bg-blue-600' : 'bg-slate-250'}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${biometricSyncActive ? 'translate-x-4' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-bold">Simulator Status:</span>
                  <span className={`font-black uppercase flex items-center gap-1 ${biometricSyncActive ? 'text-blue-600' : 'text-amber-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${biometricSyncActive ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} />
                    {biometricSyncActive ? 'RFID Chip Active' : 'Chip Sync Pending'}
                  </span>
                </div>
              </div>

              {/* ID action checklist */}
              <div className="w-full mt-6 space-y-2 border-t border-slate-100 pt-5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block text-left">Credential Security Protocol:</span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 text-left">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>EMV Chip Protected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>RFID Secure Link</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>NFC Compatible</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>Secure PDF Print</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
};
