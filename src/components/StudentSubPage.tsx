/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentIDCard } from './StudentIDCard';
import { 
  ArrowLeft, 
  UserCheck, 
  FileCheck2, 
  CalendarCheck, 
  TrendingUp, 
  Shield, 
  Printer, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Database,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Mail,
  RefreshCw,
  Eye,
  Check,
  Send,
  CloudLightning,
  Apple,
  Play,
  QrCode
} from 'lucide-react';

interface StudentProfile {
  id: string;
  name: string;
  class: string;
  avatar: string;
  attendance: string;
  gradeAvg: string;
  status: 'PAID' | 'PENDING';
  blood: string;
  guardian: string;
  phone: string;
  tagId: string;
  address: string;
  altPhone: string;
  allergies: string;
  fullAddress: string;
  officePhone: string;
  officeEmail: string;
  securityExt: string;
  securityType: string;
}

const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: "NEX-2026-98",
    name: "Aarav Sharma",
    class: "Class XI - A",
    avatar: "AS",
    attendance: "94.2%",
    gradeAvg: "A+",
    status: "PAID",
    blood: "O +ve",
    guardian: "Rajesh Sharma",
    phone: "+91 98765 43210",
    tagId: "#98829F-A",
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
    class: "Class XII - B",
    avatar: "PP",
    attendance: "97.8%",
    gradeAvg: "O (Outstanding)",
    status: "PAID",
    blood: "AB +ve",
    guardian: "Vipul Patel",
    phone: "+91 91234 56789",
    tagId: "#91223F-B",
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
    class: "Class X - C",
    avatar: "KS",
    attendance: "89.5%",
    gradeAvg: "B+",
    status: "PENDING",
    blood: "A -ve",
    guardian: "Harpal Singh",
    phone: "+91 98112 23344",
    tagId: "#90429F-C",
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

interface StudentSubPageProps {
  onBack: () => void;
}

export const StudentSubPage: React.FC<StudentSubPageProps> = ({ onBack }) => {
  // Navigation trigger states
  const [selectedStudentId, setSelectedStudentId] = useState<string>("NEX-2026-98");
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');
  const [isHovered, setIsHovered] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [regStatus, setRegStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [biometricSyncActive, setBiometricSyncActive] = useState<boolean>(true);

  // Interactive Attendance Log Simulator
  const [attendanceLogs, setAttendanceLogs] = useState<Array<{ time: string, student: string, card: string, icon: string }>>([
    { time: "08:15:23 AM", student: "Aarav Sharma", card: "#98829F-A", icon: "Gate 1 Check-In" },
    { time: "08:12:11 AM", student: "Priya Patel", card: "#91223F-B", icon: "Main Lobby Sync" },
    { time: "08:08:45 AM", student: "Kabir Singh", card: "#90429F-C", icon: "Gate 2 Check-In" }
  ]);
  const [logCounter, setLogCounter] = useState(0);

  // Parent alert simulator
  const [parentMessage, setParentMessage] = useState("Dear Parent, your ward Aarav Sharma has entered the campus at 08:15 AM. - NexoraOS");
  const [sentAlerts, setSentAlerts] = useState<string[]>([]);
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  // Pipeline Kanban
  const [newEnquiryName, setNewEnquiryName] = useState("");
  const [enquiries, setEnquiries] = useState([
    { name: "Rohan Varma", grade: "Class XI", status: "Enquiry" },
    { name: "Sanya Sen", grade: "Class XII", status: "Document Review" },
    { name: "Meera Nair", grade: "Class X", status: "Fess Deposited" }
  ]);

  // Selected student details
  const currentStudent = SAMPLE_STUDENTS.find(s => s.id === selectedStudentId) || SAMPLE_STUDENTS[0];

  const handleCopyId = () => {
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleRegenerateId = () => {
    setRegStatus('generating');
    setTimeout(() => {
      setRegStatus('success');
      setTimeout(() => setRegStatus('idle'), 1800);
    }, 1200);
  };

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentMessage.trim()) return;
    setIsSendingAlert(true);
    setTimeout(() => {
      setSentAlerts(prev => [parentMessage, ...prev]);
      setIsSendingAlert(false);
      setParentMessage("");
    }, 800);
  };

  const handleAddEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnquiryName.trim()) return;
    setEnquiries(prev => [...prev, { name: newEnquiryName, grade: "Class XI", status: "Enquiry" }]);
    setNewEnquiryName("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-20 select-text">
      
      {/* Subpage Header Dashboard Utility Navigation */}
      <div className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-xl transition-all active:scale-95 group shadow-sm border border-slate-200/30"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100/70 text-blue-800 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full border border-blue-200/50">
              CORE MODULE DEEP DIVE
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-slate-400 font-mono">
              SESSION ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Hero Landing Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-slate-50 border-b border-slate-200/60">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-radial-at-c from-blue-100/40 via-transparent to-transparent opacity-60 pointer-events-none blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="text-[11px] font-black text-blue-700 bg-blue-100/80 py-1.5 px-4.5 rounded-full inline-flex items-center gap-1.5 tracking-wider border border-blue-200">
                <Sparkles className="h-3.5 w-3.5" />
                ENTERPRISE MANAGEMENT
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight font-sans">
                Student Management <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
                  Ecosystem Platform
                </span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-md leading-relaxed font-semibold max-w-2xl mx-auto lg:mx-0">
                Forget local directories and isolated spreadsheets. This sub-page delivers a premium operational console demonstrating live student metrics, biometric RFID logs, automatic ID generation, and multi-tier parental alerts. 
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <button 
                  onClick={() => {
                    const el = document.getElementById("profiles-deep-dive");
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl text-xs sm:text-sm tracking-tight transition-all active:scale-95 shadow-md shadow-blue-500/10"
                >
                  Explore Profile Console ↓
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById("analytics-chart");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm tracking-tight transition-all shadow-xs"
                >
                  Grade Performance Analytics
                </button>
              </div>
            </div>

            {/* Right Side Illustration Dashboard Mockup Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl p-5 relative">
                <div className="absolute top-3 right-3 flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                
                {/* Simulated quick analytics indicators */}
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest font-mono mb-3">
                  NEXORA_PORTAL_UPTIME
                </span>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                    <span className="font-extrabold text-slate-800">Telemetry Server Logs</span>
                    <span className="text-emerald-500 font-extrabold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                      SECURE CONNECTED
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                      <span className="font-bold text-slate-600">Total Enrolled Records</span>
                      <span className="font-black text-slate-800 font-mono">14,208</span>
                    </div>
                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                      <span className="font-bold text-slate-600">Dynamic QR/RFID Generation</span>
                      <span className="font-black text-blue-600 font-mono">Live Sync</span>
                    </div>
                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                      <span className="font-bold text-slate-600">Parent Notify Speed</span>
                      <span className="font-black text-indigo-600 font-mono">&lt; 320ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURE DEEP DIVES */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 mt-16 space-y-24">
        
        {/* SECTION 1: 360° Unified Student Profiles */}
        <div id="profiles-deep-dive" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#0066B3] bg-blue-50 py-1 px-3.5 rounded-md border border-blue-100">
              MODULE FUNCTIONALITY A
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              360° Unified Student Profiles
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Access every single metric belonging to details of a student academic lifespan. Look up health files, past marks, attendance records, emergency numbers, and RFID identity credentials on a single card interface.
            </p>
            
            {/* Mini Selection browser inside */}
            <div className="space-y-2 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Select Student Profile to Load:
              </span>
              <div className="flex gap-2">
                {SAMPLE_STUDENTS.map(student => (
                  <button 
                    key={student.id}
                    onClick={() => {
                      setSelectedStudentId(student.id);
                      setActiveTab('front');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-black transition-all ${selectedStudentId === student.id ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {student.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-100 p-4.5 rounded-xl border border-slate-200/50">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Database className="h-4 w-4 text-blue-600" />
                Selected Profile Registry Details
              </h4>
              <ul className="text-xs text-slate-500 font-semibold space-y-1">
                <li>• Unified Database UID: <strong className="text-slate-700 font-black">{currentStudent.id}</strong></li>
                <li>• Secondary Guardian Map Index: <strong className="text-slate-700 font-black">{currentStudent.guardian}</strong></li>
                <li>• Mapped RFID Hardware Tag: <strong className="text-slate-700 font-black font-mono">{currentStudent.tagId}</strong></li>
                <li>• Primary Address: <strong className="text-slate-700 font-black">{currentStudent.address}</strong></li>
              </ul>
            </div>
          </div>

          {/* Interactive Profile Browser Display Box on Right */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[500px] bg-white border border-slate-200 rounded-[24px] shadow-lg p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <span className="absolute top-0 right-0 w-32 h-32 bg-blue-50/70 rounded-full blur-2xl opacity-60 pointer-events-none" />
              
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center font-black text-lg select-none">
                  {currentStudent.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                    {currentStudent.name}
                  </h3>
                  <span className="text-xs font-extrabold text-slate-400 block mt-1">
                    {currentStudent.class} • Resident Sector Map
                  </span>
                </div>
              </div>

              {/* Grid breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">ATTENDANCE LEVEL</span>
                  <span className="text-base font-black text-rose-600">{currentStudent.attendance} Presence</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">GRADE LEDGER AVERAGE</span>
                  <span className="text-base font-black text-indigo-600">{currentStudent.gradeAvg}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">GUARDIAN PROFILE</span>
                  <span className="text-xs font-extrabold text-slate-800">{currentStudent.guardian}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">RFID GATE SECURITY LINK</span>
                  <span className="text-xs font-black text-emerald-600 font-mono mt-0.5 block">{currentStudent.tagId}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest block">FINANCIAL STATUS</span>
                  <span className="text-xs font-black text-blue-800 block mt-0.5">ACADEMIC BILLING LEDGER</span>
                </div>
                <span className={`py-1 px-3 text-[10px] font-black rounded-lg ${currentStudent.status === 'PAID' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'}`}>
                  {currentStudent.status} FOR CURRENT CYCLES
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 2: Smart Digital Admission Records */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-[22px] shadow-lg p-6 space-y-6">
              <div className="flex items-center justify-between font-bold text-xs border-b border-slate-100 pb-3">
                <span className="text-slate-800">Dynamic Pipeline Registrar</span>
                <span className="text-blue-600 font-extrabold">Active Submissions Queue</span>
              </div>

              {/* Micro form simulator */}
              <form onSubmit={handleAddEnquiry} className="flex gap-2">
                <input 
                  type="text" 
                  value={newEnquiryName}
                  onChange={(e) => setNewEnquiryName(e.target.value)}
                  placeholder="Enter Student Lead Name..."
                  className="flex-1 bg-slate-50 border border-slate-200 p-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-black rounded-xl transition-all active:scale-95"
                >
                  Add Lead
                </button>
              </form>

              {/* Dynamic Kanban List */}
              <div className="space-y-3.5">
                {enquiries.map((enq, index) => (
                  <div key={index} className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-xs text-slate-800 block">{enq.name}</span>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase">{enq.grade}</span>
                    </div>
                    <span className={`text-[9px] font-black py-1 px-2.5 rounded-md ${
                      enq.status === 'Enquiry' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      enq.status === 'Document Review' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#0066B3] bg-blue-50 py-1 px-3.5 rounded-md border border-blue-100">
              MODULE FUNCTIONALITY B
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Smart Digital Admission Records
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Eliminate physical registries. NexoraOS AI configures dynamic online self-service forms, allows automatic validation mapping, keeps safe cloud PDF storage backups for submitted documents, and logs continuous audit pipelines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                Forms Auto-population Filters
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                Ledger Syncing Payment Handlers
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                Digital Document Checker Slots
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                Time-stamped Activity Logs/Notes
              </span>
            </div>
          </div>

        </div>

        {/* SECTION 3: Real-Time Attendance & Biometric Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#0066B3] bg-blue-50 py-1 px-3.5 rounded-md border border-blue-100">
              MODULE FUNCTIONALITY C
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Real-Time Attendance Sync Tracker
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Live biometric hardware nodes map hardware entries to school databases synchronously. Gate readers report student presence instantaneously, trigger instant custom notifications to mapped parents, and compile clean monthly excel spreadsheets ready for audits.
            </p>
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs font-semibold flex gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <span>
                <strong>Hardware Integration Security:</strong> Gate telemetry terminals use secure local encryption, verifying matching RFID sensor signals before mapping attendance checks.
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[480px] bg-slate-50 text-slate-700 p-6 rounded-[22px] border border-slate-200 shadow-lg font-mono space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">GATEWAY RAW FEED CONTROLS</span>
                <span className="text-xs text-blue-600 font-black flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-600 block" />
                  GATEWAY NODE #08
                </span>
              </div>

              {/* Simulated Feed Terminals */}
              <div className="space-y-3.5 text-xs text-slate-500 select-all max-h-[180px] overflow-y-auto">
                {attendanceLogs.map((log, index) => (
                  <div key={index} className="flex flex-col gap-0.5 border-l-2 border-slate-200 pl-3">
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                    <span className="text-slate-800">
                      ID Tag: <strong className="text-indigo-600 font-bold">{log.card}</strong> (Presence mapped: <strong className="text-blue-600 font-bold">{log.student}</strong>)
                    </span>
                    <span className="text-[9px] text-slate-400">Node Signal Level: Mapped at {log.icon}</span>
                  </div>
                ))}
              </div>

              {/* Trigger local click log sync */}
              <button 
                onClick={() => {
                  const newTime = new Date().toLocaleTimeString();
                  const firstNames = ["Aarav Sharma", "Priya Patel", "Kabir Singh"];
                  const selectedName = firstNames[logCounter % 3];
                  const tags = ["#98829F-A", "#91223F-B", "#90429F-C"];
                  const selectedTag = tags[logCounter % 3];
                  setAttendanceLogs(prev => [
                    { time: `${newTime}`, student: selectedName, card: selectedTag, icon: "Main Lobby Gate" },
                    ...prev
                  ]);
                  setLogCounter(prev => prev + 1);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 text-xs rounded-xl transition-all active:scale-95 uppercase tracking-widest"
              >
                + Tap Simulated RFID Student Card Reference
              </button>
            </div>
          </div>

        </div>

        {/* SECTION 4: Advanced Performance Analytics - Subject-Wise Performance Trend */}
        <div id="analytics-chart" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-[22px] shadow-lg p-6 space-y-6">
              <div className="text-xs font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Subject-Wise Performance Trend</span>
                <span className="text-slate-400 font-mono">Scale 0-100</span>
              </div>

              {/* CUSTOM SVG PERFORMANCE TREND LINE CHART */}
              <div className="relative w-full h-[200px] flex items-end">
                {/* SVG Drawing of the beautiful bezier curve */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Under curve shading path */}
                  <path 
                    d="M 10 150 L 80 110 L 150 130 L 220 70 L 290 90 L 370 40 L 370 200 L 10 200 Z" 
                    fill="url(#grad)" 
                    opacity="0.25"
                  />
                  {/* Main Bezier path line */}
                  <path 
                    d="M 10 150 L 80 110 L 150 130 L 220 70 L 290 90 L 370 40" 
                    fill="none" 
                    stroke="#2563EB" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  {/* Decorative nodes */}
                  <circle cx="10" cy="150" r="4.5" fill="#2563EB" />
                  <circle cx="80" cy="110" r="4.5" fill="#2563EB" />
                  <circle cx="150" cy="130" r="4.5" fill="#2563EB" />
                  <circle cx="220" cy="70" r="6" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  <circle cx="290" cy="90" r="4.5" fill="#2563EB" />
                  <circle cx="370" cy="40" r="6" fill="#2563EB" stroke="white" strokeWidth="2" />

                  {/* SVG Gradient settings */}
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* X Axis indicators */}
                <span className="absolute bottom-1 left-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">UT-1</span>
                <span className="absolute bottom-1 left-16 text-[10px] font-bold text-slate-400 uppercase tracking-tight">Term 1</span>
                <span className="absolute bottom-1 left-32 text-[10px] font-bold text-slate-400 uppercase tracking-tight">UT-2</span>
                <span className="absolute bottom-1 left-[195px] text-[10px] font-bold text-slate-400 uppercase tracking-tight">Half Yearly</span>
                <span className="absolute bottom-1 left-[265px] text-[10px] font-bold text-slate-400 uppercase tracking-tight">UT-3</span>
                <span className="absolute bottom-1 right-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">Finals</span>
              </div>

              {/* qualitative descriptor box */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Final Academic grade predicted index:</span>
                <strong className="text-blue-600 font-extrabold text-sm">94.8% A+ Rating</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#0066B3] bg-blue-50 py-1 px-3.5 rounded-md border border-blue-100">
              MODULE FUNCTIONALITY D
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Advanced Performance Analytics
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Track student success curves over time. Digitize reporting cycles by monitoring continuous test trajectories, automatic qualitative narrative suggestions, and real-time subject-wise index compilations instantly.
            </p>
            <div className="bg-blue-50 text-blue-900 border border-blue-100 p-4.5 rounded-xl text-xs font-semibold">
              ✨ <strong>Fast Grade calculations:</strong> Automated checkouts predict final performance trajectories based on historical variables, assisting teachers in targeted academic interventions.
            </div>
          </div>

        </div>

        {/* SECTION 5: Verified Parent Details Mobile Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#0066B3] bg-blue-50 py-1 px-3.5 rounded-md border border-blue-100">
              MODULE FUNCTIONALITY E
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Verified Parent Communication
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Bridge the communication gap between family and class. NexoraOS AI maps students directly to authorized parent numbers, houses biometric emergency alerts, and facilitates instant broadcasts in seconds without exposing confidential emails.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 text-indigo-900 p-4 rounded-xl text-xs font-semibold">
              🛡️ <strong>OTP Gate Security:</strong> Supports one-time passcode (OTP) verification for secure guardian pickups, school bus handshakes, and immediate contact updates.
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-[22px] shadow-lg p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Smartphone className="h-4.5 w-4.5 text-blue-600" />
                <span className="text-xs font-extrabold text-slate-800">SMS Gateway Broadcast Simulator</span>
              </div>

              {/* Form container */}
              <form onSubmit={handleSendAlert} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Message Template</label>
                  <textarea 
                    value={parentMessage}
                    onChange={(e) => setParentMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 h-20 resize-none"
                    placeholder="Enter alert template..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSendingAlert}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSendingAlert ? 'Dispatched via Gateway...' : 'Send Broadcast to Rajesh Sharma'}
                </button>
              </form>

              {/* Feed logs container representing live notification statuses */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Sent Message Status logs</span>
                <div className="space-y-1.5 max-h-[105px] overflow-y-auto">
                  {sentAlerts.length === 0 ? (
                    <span className="text-xs text-slate-400 font-semibold block italic text-center py-2">No alerts sent in current session yet</span>
                  ) : (
                    sentAlerts.map((txt, i) => (
                      <div key={i} className="text-[10px] font-semibold text-slate-500 bg-emerald-50/50 block p-2 rounded-lg border border-emerald-100 flex items-center justify-between">
                        <span className="truncate max-w-[300px]">{txt}</span>
                        <span className="text-emerald-600 font-black shrink-0">DELIVERED</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 6: ID Card Generation featuring 3D Flipping Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col justify-center items-center relative w-full">
            {/* Background luxury decoration aura */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#3b82f6]/10 to-[#818cf8]/5 rounded-[40px] blur-3xl opacity-80 pointer-events-none" />
            
            {/* Control workstation casing */}
            <div className="relative w-full max-w-[420px] bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-100 overflow-hidden group/workstation transition-all duration-300">
              
              {/* Header bar controls representing real SaaS design */}
              <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                  <span className="text-[9px] font-bold text-slate-400/80 uppercase tracking-widest ml-3 font-mono">
                    ID-ENGINE-v1.2
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveTab('front')} 
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${activeTab === 'front' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                  >
                    Front
                  </button>
                  <button 
                    onClick={() => setActiveTab('back')} 
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${activeTab === 'back' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Workstation body */}
              <div className="p-6 bg-gradient-to-b from-slate-50/50 to-white flex flex-col items-center">
                
                {/* ID Badge Card Wrapper loaded with dynamic perspectives */}
                <div 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full flex justify-center"
                >
                  <StudentIDCard 
                    student={currentStudent}
                    activeTab={activeTab}
                    isHovered={isHovered}
                    biometricSyncActive={biometricSyncActive}
                    onCardClick={() => setActiveTab(activeTab === 'front' ? 'back' : 'front')}
                  />
                </div>

                {/* Legacy card wrapped for safety */}
                <div className="hidden">
                  <motion.div 
                    animate={{ rotateY: (activeTab === 'back' || isHovered) ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => setActiveTab(activeTab === 'front' ? 'back' : 'front')}
                  >
                    
                    {/* FRONT ID CARD */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-[24px] bg-white border border-slate-200/90 shadow-[0_12px_40px_rgba(30,41,59,0.06)] p-6 flex flex-col justify-between relative overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Premium card badge details */}
                      <span className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-50 to-transparent rounded-full opacity-60 pointer-events-none" />
                      
                      <div className="flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs tracking-tighter">
                            N
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-800 block tracking-tight leading-tight">NEXORAOS</span>
                            <span className="text-[8px] font-bold text-blue-600 uppercase tracking-widest leading-none block">ACADEMY</span>
                          </div>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold py-0.5 px-2 rounded-full border border-emerald-100 flex items-center gap-1 shrink-0">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
                          ACTIVE
                        </span>
                      </div>

                      {/* Main Center content representing user data */}
                      <div className="relative z-10 flex items-center gap-5 my-auto">
                        <div className="relative shrink-0">
                          {/* Beautiful gradient avatar halo outline */}
                          <div className="absolute inset-x-0 -top-1 -bottom-1 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full blur-xs opacity-50 scale-105" />
                          <div className="w-16 h-16 rounded-full border-2 border-white relative overflow-hidden bg-slate-150 flex items-center justify-center shadow-md select-none">
                            <svg className="w-12 h-12 text-slate-400 mt-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <span className="absolute bottom-0 right-0 bg-blue-600 text-[7px] font-bold text-white uppercase px-1 py-0.5 rounded shadow-xs border border-white">
                            A+
                          </span>
                        </div>

                        {/* Name & Class info */}
                        <div className="text-left space-y-1">
                          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block">STUDENT GUEST LAYER</span>
                          <h5 className="text-base font-extrabold text-slate-900 tracking-tight leading-none uppercase">
                            {currentStudent.name}
                          </h5>
                          <div className="flex gap-2 items-center">
                            <span className="inline-block bg-slate-100 text-slate-700 text-[9px] font-bold py-0.5 px-2 rounded">
                              {currentStudent.class}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-500">
                              UID: {currentStudent.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="relative z-10 border-t border-slate-100 pt-3 flex items-center justify-between gap-4 shrink-0">
                        <div className="flex gap-4">
                          <div>
                            <span className="text-[7.5px] font-bold text-slate-400 block uppercase tracking-wider leading-none">PRESENCE</span>
                            <span className="text-[10px] font-black text-slate-800 mt-0.5 block leading-none">{currentStudent.attendance}</span>
                          </div>
                          <div className="border-l border-slate-250 pl-4">
                            <span className="text-[7.5px] font-bold text-slate-400 block uppercase tracking-wider leading-none">GRADE AVG</span>
                            <span className="text-[10px] font-black text-indigo-600 mt-0.5 block leading-none">A+</span>
                          </div>
                          <div className="border-l border-slate-250 pl-4">
                            <span className="text-[7.5px] font-bold text-slate-400 block uppercase tracking-wider leading-none">STATUS</span>
                            <span className="text-[9px] font-black text-emerald-600 uppercase mt-0.5 block leading-none">PAID</span>
                          </div>
                        </div>

                        {/* Barcode details */}
                        <div className="flex gap-0.5 h-6 items-end shrink-0">
                          <span className="w-[1.5px] h-full bg-slate-800" />
                          <span className="w-[3px] h-full bg-slate-800" />
                          <span className="w-[1px] h-full bg-slate-800" />
                          <span className="w-[2px] h-full bg-slate-800" />
                          <span className="w-[4px] h-full bg-slate-800" />
                          <span className="w-[1px] h-full bg-slate-800" />
                          <span className="w-[1.5px] h-full bg-slate-800" />
                        </div>
                      </div>
                    </div>

                    {/* BACK CARD */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-[24px] bg-slate-950 text-white border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden shadow-[0_12px_45px_rgba(30,41,59,0.15)]"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      {/* Watermark security grid pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />
                      
                      {/* SECTION 1: Emergency Info */}
                      <div className="relative z-10 flex justify-between items-start w-full gap-4 shrink-0">
                        <div className="space-y-0.5 text-left">
                          <span className="text-[9px] font-black tracking-widest text-blue-500 block uppercase font-mono">NEXORAOS ACADEMY</span>
                          <h4 className="text-[10px] font-black tracking-tight text-white uppercase">PRIMARY GUARDIAN: {currentStudent.guardian}</h4>
                          <p className="text-[8px] text-slate-450 font-medium leading-normal max-w-[270px]">
                            {currentStudent.fullAddress}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest block leading-none">Emergency Contact</span>
                          <span className="text-[9px] font-black text-rose-500 font-mono tracking-tight mt-1 block">
                            {currentStudent.phone}
                          </span>
                          <span className="text-[7.5px] text-slate-450 mt-0.5 block font-mono">
                            Alt: {currentStudent.altPhone}
                          </span>
                        </div>
                      </div>

                      {/* SECTION 2: Security Features */}
                      <div className="relative z-10 w-full bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 shrink-0">
                        <div className="flex items-center justify-between gap-3">
                          {/* EMV Micro Chip */}
                          <div className="w-7 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm border border-amber-300 opacity-90 flex flex-col justify-between p-0.5 shrink-0">
                            <div className="flex justify-between"><div className="w-1.5 h-[1px] bg-amber-200" /><div className="w-1.5 h-[1px] bg-amber-200" /></div>
                            <div className="h-[2px] bg-slate-950/20" />
                            <div className="flex justify-between"><div className="w-1.5 h-[1px] bg-amber-200" /><div className="w-1.5 h-[1px] bg-amber-200" /></div>
                          </div>

                          <div className="flex-1 grid grid-cols-3 gap-2 text-left">
                            <div>
                              <span className="text-[6.5px] font-mono text-slate-500 uppercase block tracking-wider leading-none">HARDWARE TAG</span>
                              <span className="text-[8px] font-mono font-black text-indigo-450 block tracking-tight mt-0.5 leading-none">{currentStudent.tagId}</span>
                            </div>
                            <div>
                              <span className="text-[6.5px] font-mono text-slate-500 uppercase block tracking-wider leading-none">BLOOD GROUP</span>
                              <span className="text-[8px] font-black text-rose-500 block tracking-tight mt-0.5 leading-none">{currentStudent.blood}</span>
                            </div>
                            <div>
                              <span className="text-[6.5px] font-mono text-slate-500 uppercase block tracking-wider leading-none">ALLERGIES</span>
                              <span className="text-[7.5px] font-bold text-slate-350 block tracking-tight mt-0.5 leading-none truncate">{currentStudent.allergies}</span>
                            </div>
                          </div>
                        </div>

                        {/* RFID Secure Strip */}
                        <div className="mt-2 h-4 bg-slate-950 rounded border border-slate-800/85 flex items-center px-2 justify-between">
                          <span className="text-[6px] text-amber-500 tracking-widest font-mono font-black">RFID ENCRYPTED DATA STRIP</span>
                          <span className="text-[6px] text-slate-450 font-mono uppercase">{currentStudent.securityType}</span>
                        </div>
                      </div>

                      {/* SECTION 3: Stamp Seal & Footer */}
                      <div className="relative z-10 flex items-end justify-between w-full border-t border-slate-800/80 pt-2 shrink-0">
                        <div className="text-left space-y-0.5">
                          <p className="text-[6.5px] text-slate-500 font-semibold leading-normal max-w-[250px]">
                            * Property of NexoraOS Academy. Return to Admin. Email: {currentStudent.officeEmail}
                          </p>
                          <span className="text-[6.5px] font-black text-slate-500 font-mono tracking-widest uppercase block">
                            CAMPUS SECURITY SYSTEM LAYER
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right flex flex-col items-end leading-none">
                            <span className="font-serif text-[10px] italic text-slate-300 select-none pb-0.5 font-bold tracking-tight block">
                              S. Singhal
                            </span>
                            <span className="text-[5.5px] font-black text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-0.5 block">
                              Principal Seal
                            </span>
                          </div>
                          <div className="p-0.5 bg-white rounded shrink-0 flex items-center justify-center w-7 h-7">
                            <QrCode className="w-full h-full text-slate-950" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>

                {/* Verification row */}
                <div className="w-full max-w-[480px] mt-4 flex flex-col gap-2">
                  {/* Biometric Sync Toggle Option */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150 text-left mb-1 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono tracking-wider font-extrabold text-[#0066B3] block uppercase">HARDWARE COUPLING</span>
                      <h5 className="text-[11px] font-black text-slate-800 uppercase">Live Real-time Sync Status</h5>
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
                  <div className="flex gap-1.5">
                    <button 
                      onClick={handleCopyId}
                      className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-black py-2.5 px-3 rounded-xl transition-all text-[11px] flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      {copiedId ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-500" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 text-slate-400" />
                          <span>UID Code</span>
                        </>
                      )}
                    </button>

                    <button 
                      onClick={handleRegenerateId}
                      disabled={regStatus === 'generating'}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 px-3 rounded-xl transition-all text-[11px] flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-80 shadow-md shadow-blue-500/10"
                    >
                      <RefreshCw className={`h-4 w-4 ${regStatus === 'generating' ? '' : ''}`} />
                      <span>
                        {regStatus === 'idle' && 'Sync RF'}
                        {regStatus === 'generating' && 'Provisioning...'}
                        {regStatus === 'success' && 'Device Mapped!'}
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-extrabold text-[#0066B3] bg-blue-50 py-1 px-3.5 rounded-md border border-blue-100">
              MODULE FUNCTIONALITY F
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Instant ID Card PVC Generation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
              Generate and provision secure digital and physical student badges instantly with a single button press. Automatically maps high-resolution student records directly to contactless magnetic strip chips on PVC plastic cards.
            </p>
            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-start">
                <Printer className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.4} />
                <div>
                  <h4 className="text-slate-900 font-bold text-sm leading-tight">One-Click PVC Print Outputs</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Submit classes directly to automatic thermal signature systems seamlessly.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <Layers className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.4} />
                <div>
                  <h4 className="text-slate-900 font-bold text-sm leading-tight">Secured Contactless RFID Strips</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Embed instant authorization hashes securely into magnetic fields.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* PAGE 9: Administrative Efficiency Impact Section */}
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-12 shadow-[0_12px_36px_-6px_rgba(200,185,165,0.1)] space-y-10 relative overflow-hidden">
          <span className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-blue-50/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-sans">
              Administrative Efficiency Impact
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Traditional local school setups lose precious days updating registries manually. Our unified architecture optimizes operations instantly.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Admission Processing bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black">
                <span className="text-slate-800">Admission & Lead Processing Speed</span>
                <span className="text-blue-600">92% Faster (Instant Automation)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-8 overflow-hidden relative border border-slate-200/50 p-1 flex items-center">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-blue-600 h-full rounded-full flex items-center justify-end px-3"
                >
                  <span className="text-[10px] text-white font-black">92%</span>
                </motion.div>
              </div>
            </div>

            {/* Attendance reporting bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black">
                <span className="text-slate-800">Attendance Sync & Guardian Notifications</span>
                <span className="text-[#0066B3]">85% Automated in Cloud</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-8 overflow-hidden relative border border-slate-200/50 p-1 flex items-center">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  className="bg-[#0066B3] h-full rounded-full flex items-center justify-end px-3"
                >
                  <span className="text-[10px] text-white font-black">85%</span>
                </motion.div>
              </div>
            </div>

            {/* Data Retrieval bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black">
                <span className="text-slate-800">Student Profile Information Retrieval Speed</span>
                <span className="text-slate-950">Instant Verification (&lt; 320ms Sync)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-8 overflow-hidden relative border border-slate-200/50 p-1 flex items-center">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="bg-blue-600 h-full rounded-full flex items-center justify-end px-3"
                >
                  <span className="text-[10px] text-white font-black">Instant Uptime</span>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center max-w-2xl mx-auto italic font-semibold text-xs sm:text-sm text-slate-600 leading-relaxed shadow-xs">
            "Digitalizing student management has saved our admin team over 15 hours per week in manual paperwork."
          </div>

        </div>

        {/* PAGE 10: The Upgrade Advantage */}
        <div className="space-y-8">
          <div className="space-y-3.5 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight">
              The Upgrade Advantage
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Comparing legacy standalone setups to modern unified cloud ERP architectures.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs bg-white">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-slate-900 text-[10px] font-black leading-none tracking-widest uppercase">
                  <th className="p-5">Feature Capability</th>
                  <th className="p-5 border-l border-slate-200">Legacy Software</th>
                  <th className="p-5 border-l border-slate-200 text-blue-600">NEXORAOS AI</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-600 font-semibold divide-y divide-slate-200">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-bold text-slate-900">Student Data Storage</td>
                  <td className="p-5 border-l border-slate-100 italic">Siloed / Local Server (Data loss high)</td>
                  <td className="p-5 border-l border-slate-100 font-black text-blue-700">Unified / Encrypted Cloud Backup</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-bold text-slate-900">ID Card Creation</td>
                  <td className="p-5 border-l border-slate-100 italic">Manual CorelDraw Design / External Print</td>
                  <td className="p-5 border-l border-slate-100 font-black text-blue-700 font-sans">In-System Intelligent PVC Gen</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-bold text-slate-900">Attendance Sync Logs</td>
                  <td className="p-5 border-l border-slate-100 italic">Excel Spreadsheet Manual Uploads</td>
                  <td className="p-5 border-l border-slate-100 font-black text-blue-700">Live GATEWAY Biometric Hardwares</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-bold text-slate-900">Map Parent Access Paths</td>
                  <td className="p-5 border-l border-slate-100 italic">SMS text alerts only (Slow)</td>
                  <td className="p-5 border-l border-slate-100 font-black text-blue-700">Real-Time Secure Portal Interface App</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGE 11: Management On-The-Go */}
        <div className="bg-blue-600 text-white p-8 sm:p-12 rounded-[32px] border border-blue-500 text-center space-y-8 relative overflow-hidden shadow-xl shadow-blue-200">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight uppercase">
              Management On-The-Go
            </h3>
            <p className="text-sm text-blue-50 font-bold leading-relaxed">
              Every single detailed feature on the new student management page is mirrored on our high-contrast native mobile applications configured for principals and parents.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button className="bg-white hover:bg-blue-50 text-blue-600 font-extrabold py-3 px-6 rounded-xl text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-800/20">
              <Apple className="w-5 h-5 fill-current" />
              <span>Download on the App Store</span>
            </button>
            <button className="bg-white hover:bg-blue-50 text-blue-600 font-extrabold py-3 px-6 rounded-xl text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-800/20">
              <Play className="w-4 h-4 fill-current" />
              <span>Download for Play Store</span>
            </button>
          </div>
        </div>

        {/* PAGE 12: Question? Footer Card Contact */}
        <div className="pt-12 text-center space-y-4">
          <h4 className="text-2xl sm:text-3xl font-black text-slate-950">Questions?</h4>
          <p className="text-xs sm:text-sm text-blue-600 font-black font-sans uppercase tracking-widest">
            Ready to transform your school's structural future
          </p>
          <div className="pt-2 flex flex-col items-center justify-center text-xs font-semibold text-slate-500 space-y-1">
            <span>Website Portal: <a href="https://www.nexoraos.ai" className="text-slate-800 font-black hover:text-blue-600 transition-colors">www.nexoraos.ai</a></span>
            <span>Support Line: <a href="mailto:support@nexoraos.ai" className="text-slate-800 font-black hover:text-blue-600 transition-colors">support@nexoraos.ai</a></span>
          </div>
        </div>

      </div>

    </div>
  );
};
