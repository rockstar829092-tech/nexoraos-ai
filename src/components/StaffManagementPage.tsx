/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  ArrowLeft, 
  UserSquare2, 
  FolderGit2, 
  ShieldCheck, 
  CalendarMinus, 
  Award, 
  Search, 
  Plus, 
  Check, 
  Mail, 
  Phone, 
  MessageSquare,
  Building2, 
  ShieldAlert, 
  Users2,
  LockIcon,
  Clock,
  Sparkles,
  ChevronRight,
  Music,
  Trash2,
  GraduationCap,
  Wrench,
  MapPin,
  AlertTriangle,
  ClipboardList,
  Shield,
  Activity,
  FileText,
  CheckCircle,
  Download,
  Coins,
  Receipt
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from './PageLayout';

interface Staff {
  id: string;
  name: string;
  designation: string;
  department: string;
  avatar: string;
  avatarBg: string;
  email: string;
  phone: string;
  experience: string;
  attendance: string;
  rating: number;
  status: 'active' | 'on-leave';
  subjects: string[];
  roleType: 'teaching' | 'administrative' | 'support';
  // Driver Sync & Transport Linking
  dlNumber?: string;
  dlExpiryAlert?: string;
  assignedRoute?: string;
  // Security Guard Shift Roster
  shiftType?: 'Day Shift' | 'Night Shift';
  gateAllocation?: string;
  shiftSchedule?: string;
  // Peon / Attendant Task Manager
  assignedBlock?: string;
  dailyDutyLogs?: string[];
}

const SAMPLE_STAFF: Staff[] = [
  {
    id: "FAC-2026-64",
    name: "Dr. Ananya Rao",
    designation: "HOD Physics",
    department: "Science Department",
    avatar: "AR",
    avatarBg: "bg-blue-600",
    email: "ananya.rao@nexora.edu",
    phone: "+91 94455 12345",
    experience: "12 Years",
    attendance: "98.5%",
    rating: 4.9,
    status: 'active',
    subjects: ["Quantum Mechanics", "Electromagnetism", "Astrophysics"],
    roleType: "teaching"
  },
  {
    id: "FAC-2026-11",
    name: "Prof. Arvind Shastri",
    designation: "Senior Mathematics Lecturer",
    department: "Mathematics Department",
    avatar: "AS",
    avatarBg: "bg-indigo-600",
    email: "arvind.shastri@nexora.edu",
    phone: "+91 93322 56789",
    experience: "15 Years",
    attendance: "97.2%",
    rating: 4.8,
    status: 'active',
    subjects: ["Calculus III", "Linear Algebra", "Probability Theory"],
    roleType: "teaching"
  },
  {
    id: "FAC-2026-78",
    name: "Dr. Catherine Dupond",
    designation: "Lead English Professor",
    department: "Humanities Department",
    avatar: "CD",
    avatarBg: "bg-violet-600",
    email: "catherine.d@nexora.edu",
    phone: "+91 92211 98765",
    experience: "8 Years",
    attendance: "95.4%",
    rating: 4.7,
    status: 'on-leave',
    subjects: ["English Literature", "Creative Writing", "Academic Discourse"],
    roleType: "teaching"
  },
  {
    id: "ADM-2026-03",
    name: "Sh. Rajesh Varma",
    designation: "Principal Coordinator",
    department: "Administrative Office",
    avatar: "RV",
    avatarBg: "bg-emerald-600",
    email: "rajesh.varma@nexora.edu",
    phone: "+91 98877 66554",
    experience: "18 Years",
    attendance: "99.1%",
    rating: 4.9,
    status: 'active',
    subjects: ["Institutional Policy", "Resource Operations"],
    roleType: "administrative"
  },
  {
    id: "ADM-2026-09",
    name: "Smt. Meenakshi Sen",
    designation: "Academic Registrar & HR Executive",
    department: "Administration",
    avatar: "MS",
    avatarBg: "bg-cyan-600",
    email: "meenakshi.sen@nexora.edu",
    phone: "+91 97766 55443",
    experience: "10 Years",
    attendance: "96.8%",
    rating: 4.6,
    status: 'active',
    subjects: ["Compliance Guidelines", "Staff Allocation Plans"],
    roleType: "administrative"
  },
  {
    id: "DRV-2026-21",
    name: "Sardar Gurpreet Singh",
    designation: "Senior Driver (Heavy Vehicle)",
    department: "Transport Division",
    avatar: "GS",
    avatarBg: "bg-amber-600",
    email: "gurpreet.s@nexora.edu",
    phone: "+91 96655 44332",
    experience: "14 Years",
    attendance: "98.0%",
    rating: 4.8,
    status: 'active',
    subjects: ["Safe Operations", "Defensive Driving Standards"],
    roleType: "support",
    dlNumber: "DL-14ATC3402 (Commercial Heavy)",
    dlExpiryAlert: "Jun 10, 2026 (Expiring Soon!)",
    assignedRoute: "Bus Route No. 12 (North Campus Express)"
  },
  {
    id: "DRV-2026-22",
    name: "Sh. Vikram Mandloi",
    designation: "Staff Shuttle Driver",
    department: "Transport Division",
    avatar: "VM",
    avatarBg: "bg-orange-600",
    email: "vikram.m@nexora.edu",
    phone: "+91 95544 33221",
    experience: "9 Years",
    attendance: "97.5%",
    rating: 4.7,
    status: 'active',
    subjects: ["Route Navigation", "Routine Vehicle Checklists"],
    roleType: "support",
    dlNumber: "DL-12CHY8491 (Commercial Light)",
    dlExpiryAlert: "Dec 15, 2028",
    assignedRoute: "Staff Shuttle B (South Suburban Route)"
  },
  {
    id: "GRD-2026-44",
    name: "Sh. Ram Naresh",
    designation: "Head Security Guard",
    department: "Security Force",
    avatar: "RN",
    avatarBg: "bg-slate-700",
    email: "ram.naresh@nexora.edu",
    phone: "+91 94433 22110",
    experience: "11 Years",
    attendance: "99.4%",
    rating: 4.9,
    status: 'active',
    subjects: ["First Aid Responses", "Property Shield Mandates"],
    roleType: "support",
    shiftType: "Night Shift",
    gateAllocation: "Main Gate No. 1",
    shiftSchedule: "08:00 PM - 08:00 AM"
  },
  {
    id: "GRD-2026-45",
    name: "Sh. Baldev Prasad",
    designation: "Campus Patrolling Guard",
    department: "Security Force",
    avatar: "BP",
    avatarBg: "bg-slate-600",
    email: "baldev.p@nexora.edu",
    phone: "+91 93322 11009",
    experience: "6 Years",
    attendance: "96.2%",
    rating: 4.5,
    status: 'active',
    subjects: ["Campus Surveillance", "Emergency Fire Preparedness"],
    roleType: "support",
    shiftType: "Day Shift",
    gateAllocation: "Academic Block 'C' Gate",
    shiftSchedule: "08:00 AM - 08:00 PM"
  },
  {
    id: "PEO-2026-81",
    name: "Sh. Hari Prasad",
    designation: "Science Lab Attendant",
    department: "Science Department",
    avatar: "HP",
    avatarBg: "bg-rose-600",
    email: "hari.p@nexora.edu",
    phone: "+91 92211 00998",
    experience: "13 Years",
    attendance: "98.9%",
    rating: 4.9,
    status: 'active',
    subjects: ["Lab Safety Norms", "Chemical Inventory Care"],
    roleType: "support",
    assignedBlock: "Science Block B - Physics & Chemistry Wings",
    dailyDutyLogs: [
      "08:30 AM - Unlocked Physics and Chemistry Laboratories",
      "09:15 AM - Sanitized glassware apparatus & arranged board kits",
      "12:00 PM - Logged reactant chemicals consumption for general exam profiles",
      "04:00 PM - Packaged optical components safely and shut down power mains"
    ]
  },
  {
    id: "PEO-2026-82",
    name: "Sh. Vijay Kumar",
    designation: "Senior Office Peon",
    department: "Administrative Office",
    avatar: "VK",
    avatarBg: "bg-pink-600",
    email: "vijay.k@nexora.edu",
    phone: "+91 91100 99887",
    experience: "16 Years",
    attendance: "97.8%",
    rating: 4.8,
    status: 'active',
    subjects: ["Document Despatches", "Filing & Archival Methods"],
    roleType: "support",
    assignedBlock: "Central Admin Block - Ground Floor",
    dailyDutyLogs: [
      "09:00 AM - Sorted physical incoming mail despatches",
      "11:30 AM - Bound academic coordinator's physical file proposals",
      "02:00 PM - Hand-delivered dispatch notes to Registrar wing",
      "05:15 PM - Audited lighting shut-downs and locked general office lockers"
    ]
  }
];

export const StaffManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const defaultToMusic = false; // Simplified for now or can be handled via location state
  const [selectedStaffId, setSelectedStaffId] = useState<string>("FAC-2026-64");

  useEffect(() => {
    if (defaultToMusic) {
      setTimeout(() => {
        const el = document.getElementById('arts-music-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }
  }, [defaultToMusic]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule' | 'payroll'>('profile');
  const [payrollMonth, setPayrollMonth] = useState<string>("May 2026");
  const [payrollWorkingDays, setPayrollWorkingDays] = useState<number>(26);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccessAlert, setExportSuccessAlert] = useState<boolean>(false);

  // Role permissions allocation state
  const [permissions, setPermissions] = useState([
    { role: "Administrator", read: true, write: true, delete: true, color: "border-blue-500 bg-blue-50 text-blue-700" },
    { role: "Faculty Members", read: true, write: true, delete: false, color: "border-indigo-500 bg-indigo-50 text-indigo-700" },
    { role: "Academic Coordinator", read: true, write: true, delete: true, color: "border-purple-500 bg-purple-50 text-purple-700" },
    { role: "Finance Officer", read: true, write: true, delete: false, color: "border-teal-500 bg-teal-50 text-teal-700" }
  ]);

  // Leave Logs state
  const [leaveLogs, setLeaveLogs] = useState([
    { name: "Dr. Catherine Dupond", type: "Medical Leave", dates: "May 24 - May 28", status: "Approved", balanceDays: 14 },
    { name: "Mr. Ramesh Kumar", type: "Casual Leave", dates: "May 30 - Jun 01", status: "Pending", balanceDays: 18 },
    { name: "Mrs. Shalini Iyer", type: "Maternity Leave", dates: "Jun 10 - Aug 10", status: "Approved", balanceDays: 0 }
  ]);

  // --- Departmental Arts & Music Management State Subsystem ---
  const [labAllocations, setLabAllocations] = useState([
    { id: "LAB-01", labName: "Vocal Harmony Studio", instructorName: "Dr. Catherine Dupond", timing: "Mon/Wed 2:30 PM", capacity: 15 },
    { id: "LAB-02", labName: "Acoustic & Rhythm Room", instructorName: "Prof. Arvind Shastri", timing: "Tue/Thu 4:00 PM", capacity: 12 },
    { id: "LAB-03", labName: "Digital Synthesis Suite", instructorName: "Dr. Ananya Rao", timing: "Friday 11:00 AM", capacity: 8 }
  ]);

  const [instruments, setInstruments] = useState([
    { id: "INST-01", name: "Steinway Grand Piano", category: "Keyboard", qty: 2, condition: "Pristine", status: "In Use" },
    { id: "INST-02", name: "Yamaha FG800 Acoustic Guitar", category: "String", qty: 12, condition: "Excellent", status: "Available" },
    { id: "INST-03", name: "Roland TD-17 Electronic Drums", category: "Percussion", qty: 4, condition: "Good", status: "In Use" },
    { id: "INST-04", name: "Orchestral Master Violin", category: "String", qty: 6, condition: "Needs Tuning", status: "In Storage" }
  ]);

  const [musicStudents, setMusicStudents] = useState([
    { id: "STUD-M01", name: "Aarav Sharma", instrument: "Steinway Grand Piano", lab: "Digital Synthesis Suite", grade: "Class XI-A", level: "Advanced" },
    { id: "STUD-M02", name: "Priya Patel", instrument: "Yamaha FG800 Acoustic Guitar", lab: "Acoustic & Rhythm Room", grade: "Class XII-B", level: "Intermediate" },
    { id: "STUD-M03", name: "Neil Roy", instrument: "Roland TD-17 Electronic Drums", lab: "Acoustic & Rhythm Room", grade: "Class X-C", level: "Beginner" }
  ]);

  // Sub-tabs of Arts & Music: 'labs' | 'inventory' | 'students'
  const [activeMusicSubTab, setActiveMusicSubTab] = useState<'labs' | 'inventory' | 'students'>('labs');

  // Input bindings
  const [newLabName, setNewLabName] = useState("Symphonic Hall");
  const [newLabInstructor, setNewLabInstructor] = useState("Dr. Ananya Rao");
  const [newLabTiming, setNewLabTiming] = useState("Wed/Fri 3:00 PM");
  const [newLabCapacity, setNewLabCapacity] = useState(15);

  const [newInstName, setNewInstName] = useState("");
  const [newInstCategory, setNewInstCategory] = useState("String");
  const [newInstQty, setNewInstQty] = useState(1);
  const [newInstCondition, setNewInstCondition] = useState("Pristine");

  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentInstrument, setNewStudentInstrument] = useState("Steinway Grand Piano");
  const [newStudentLab, setNewStudentLab] = useState("Digital Synthesis Suite");
  const [newStudentGrade, setNewStudentGrade] = useState("Class XI-A");
  const [newStudentLevel, setNewStudentLevel] = useState("Advanced");

  // State mutations
  const handleAddLabAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabName) return;
    const newAlloc = {
      id: `LAB-2026-${Date.now().toString().slice(-2)}`,
      labName: newLabName,
      instructorName: newLabInstructor,
      timing: newLabTiming,
      capacity: Number(newLabCapacity)
    };
    setLabAllocations(prev => [...prev, newAlloc]);
    setNewLabName("Symphonic Hall");
  };

  const handleDeleteLabAllocation = (id: string) => {
    setLabAllocations(prev => prev.filter(a => a.id !== id));
  };

  const handleAddInstrument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstName) return;
    const newInst = {
      id: `INST-2026-${Date.now().toString().slice(-2)}`,
      name: newInstName,
      category: newInstCategory,
      qty: Number(newInstQty),
      condition: newInstCondition,
      status: Number(newInstQty) > 0 ? "Available" : "OutOfStock"
    };
    setInstruments(prev => [...prev, newInst]);
    setNewInstName("");
    setNewInstQty(1);
  };

  const adjustInstrumentQty = (id: string, delta: number) => {
    setInstruments(prev => prev.map(inst => {
      if (inst.id === id) {
        const nextQty = Math.max(0, inst.qty + delta);
        return {
          ...inst,
          qty: nextQty,
          status: nextQty > 0 ? "Available" : "OutOfStock"
        };
      }
      return inst;
    }));
  };

  const handleDeleteInstrument = (id: string) => {
    setInstruments(prev => prev.filter(inst => inst.id !== id));
  };

  const handleAddMusicStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName) return;
    const newStud = {
      id: `STUD-M-${Date.now().toString().slice(-2)}`,
      name: newStudentName,
      instrument: newStudentInstrument,
      lab: newStudentLab,
      grade: newStudentGrade,
      level: newStudentLevel
    };
    setMusicStudents(prev => [...prev, newStud]);
    setNewStudentName("");
  };

  const handleDeleteMusicStudent = (id: string) => {
    setMusicStudents(prev => prev.filter(stud => stud.id !== id));
  };

  // Handle toggling permission levels
  const togglePermission = (roleIndex: number, level: 'read' | 'write' | 'delete') => {
    setPermissions(prev => prev.map((item, idx) => {
      if (idx === roleIndex) {
        return {
          ...item,
          [level]: !item[level]
        };
      }
      return item;
    }));
  };

  const [selectedRoleFilter, setSelectedRoleFilter] = useState<'all' | 'teaching' | 'administrative' | 'support'>('all');

  const activeStaff = SAMPLE_STAFF.find(s => s.id === selectedStaffId) || SAMPLE_STAFF[0];

  const filteredStaff = SAMPLE_STAFF.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRoleFilter === 'all' || s.roleType === selectedRoleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <PageLayout theme="light" setTheme={() => {}}>
    <div className="min-h-screen bg-white dark:bg-black font-sans pb-24 text-slate-800 dark:text-[#F5F5F7] select-text transition-colors">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-14 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-100/30 to-indigo-100/30 dark:from-blue-500/5 dark:to-indigo-500/5 opacity-60 pointer-events-none blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-black text-blue-700 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400 py-1 px-3 rounded-md uppercase tracking-wider border border-blue-200/50 dark:border-blue-500/20 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Faculty Management Core
            </span>
            <h1 className="text-3xl sm:text-4.5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight uppercase">
              Staff & Faculty Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm sm:text-base leading-relaxed">
              Supervise institution-wide employee lifecycle. Configure department assignments, track leaves, verify active biometric directories, and manage access parameters effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Core 2-Column Working Area */}
      <main className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: 5 Core Capability Sections with Visual Mockups */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Faculty Records */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <UserSquare2 className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Comprehensive Digital Faculty Records</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Multi-tier credential logs cataloging experience & qualifications</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Empower your human resources backend. Access comprehensive digital indexes that connect core credentials, academic publications, direct email tags, and certified contact profiles without manual paper lookup.
              </p>

              {/* Dynamic Employee Profile Cards Loop Mockup */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Quick Register Index Preview:</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_STAFF.map(st => (
                    <div 
                      key={st.id} 
                      onClick={() => setSelectedStaffId(st.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${selectedStaffId === st.id ? 'bg-white border-blue-600 shadow-xs' : 'bg-white/70 border-slate-200/80 hover:bg-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${st.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-3xs`}>
                          {st.avatar}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-slate-800 leading-none truncate">{st.name}</h4>
                          <span className="text-[9px] text-slate-400 font-bold block mt-1 leading-none">{st.designation}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 mb-2 gap-1">
                          <div className="min-w-0 flex-1">
                            <span className="block text-[8px] text-slate-400 uppercase tracking-wider mb-0.5">Quick Contact</span>
                            <span className="block truncate text-slate-700">{st.phone}</span>
                          </div>
                          <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-sm font-semibold whitespace-nowrap">
                            Rating: {st.rating || "4.5"} ★
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-1.5 mt-2">
                          <a
                            href={`tel:${st.phone.replace(/\s+/g, '')}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 text-slate-700 text-[9px] font-extrabold transition-all group"
                            title={`Call ${st.name}: ${st.phone}`}
                          >
                            <Phone className="h-3 w-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                            <span>Call</span>
                          </a>
                          <a
                            href={`sms:${st.phone.replace(/\s+/g, '')}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-slate-700 text-[9px] font-extrabold transition-all group"
                            title={`Message ${st.name}: ${st.phone}`}
                          >
                            <MessageSquare className="h-3 w-3 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                            <span>Msg</span>
                          </a>
                          <a
                            href={`mailto:${st.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-rose-500 hover:bg-rose-50/20 text-slate-700 text-[9px] font-extrabold transition-all group"
                            title={`Email ${st.name}: ${st.email}`}
                          >
                            <Mail className="h-3 w-3 text-slate-400 group-hover:text-rose-600 shrink-0" />
                            <span>Email</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Department Management */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <FolderGit2 className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Dynamic Department Allocation</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Syllabus streams and curriculum department distribution tags</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Organize professional streams cleanly. Define specific faculties for sciences, advanced humanities, business streams, computer technologies, and language development instantly under customized badges.
              </p>

              {/* Department tags UI display mockup */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-150 space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Active Institutional Departments:</span>
                
                <div className="flex flex-wrap gap-2.5">
                  <div className="px-3.5 py-2 rounded-xl bg-blue-100 text-blue-800 border border-blue-200/50 text-xs font-black flex items-center gap-1.5 shadow-3xs">
                    <Building2 className="h-3.5 w-3.5" />
                    Science Dept (24 Faculty)
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-indigo-100 text-indigo-800 border border-indigo-200/50 text-xs font-black flex items-center gap-1.5 shadow-3xs">
                    <Building2 className="h-3.5 w-3.5" />
                    Mathematics (18 Faculty)
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-violet-100 text-violet-800 border border-violet-200/50 text-xs font-black flex items-center gap-1.5 shadow-3xs">
                    <Building2 className="h-3.5 w-3.5" />
                    Humanities Dept (12 Faculty)
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-teal-100 text-teal-800 border border-teal-200/50 text-xs font-black flex items-center gap-1.5 shadow-3xs">
                    <Building2 className="h-3.5 w-3.5" />
                    Computer Science (15 Faculty)
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-rose-100 text-rose-800 border border-rose-200/50 text-xs font-black flex items-center gap-1.5 shadow-3xs">
                    <Music className="h-3.5 w-3.5" />
                    Music & Performing Arts (6 Faculty)
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-200/50 text-xs font-black flex items-center gap-1.5 shadow-3xs">
                    <Building2 className="h-3.5 w-3.5" />
                    Administration (9 Staff)
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200/60 rounded-xl text-slate-600 text-[11px] font-semibold leading-relaxed">
                  💡 NexoraOS allows multi-department delegation. For instance, a mathematics tutor can also lead specialized logic courses under the Computer Science department parameters.
                </div>
              </div>
            </div>

            {/* 3. Role Permissions */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <ShieldCheck className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Granular Role Permissions Grid</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Multi-level data shielding and user-role access controls</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Audit system privilege states directly. Tailor write, print, and deletion access levels across different modules to protect student registers and compliance data flawlessly.
              </p>

              {/* Interactive security permissions matrix */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-150 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Control Matrix:</span>
                  <span className="text-[9px] font-black text-emerald-600 flex items-center gap-1">
                    <LockIcon className="h-3 w-3" /> SECURE HANDSHAKE ENABLED
                  </span>
                </div>

                <div className="space-y-2.5">
                  {permissions.map((p, rIdx) => (
                    <div key={p.role} className="bg-white border border-slate-200 p-3 rounded-xl shadow-3xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full border border-current shrink-0`} style={{ borderColor: 'transparent' }} />
                        <span className="text-xs font-black text-slate-800">{p.role}</span>
                      </div>
                      
                      <div className="flex gap-2.5 self-end sm:self-auto">
                        {/* Read Toggle */}
                        <button 
                          onClick={() => togglePermission(rIdx, 'read')}
                          className={`px-2 py-1 rounded text-[9.5px] font-black transition-all border ${p.read ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                        >
                          READ
                        </button>
                        {/* Write Toggle */}
                        <button 
                          onClick={() => togglePermission(rIdx, 'write')}
                          className={`px-2 py-1 rounded text-[9.5px] font-black transition-all border ${p.write ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                        >
                          WRITE
                        </button>
                        {/* Delete Toggle */}
                        <button 
                          onClick={() => togglePermission(rIdx, 'delete')}
                          className={`px-2 py-1 rounded text-[9.5px] font-black transition-all border ${p.delete ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Leave Tracking */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <CalendarMinus className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Automated Leave & Attendance Tracking</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Calendar absences, balance allowances, and daily compliance indices</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Streamline employee absences transparently. Instantly verify vacation histories, check remaining medical limits, and approve critical substitutions during ongoing semesters.
              </p>

              {/* Leave records table */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Vacation & Absence Log:</span>
                
                <div className="overflow-x-auto scrollbar-none">
                  <table className="w-full text-left text-xs font-semibold">
                    <thead>
                      <tr className="border-b border-slate-200/80 text-[10px] text-slate-400 uppercase font-black">
                        <th className="pb-2">APPLICANT</th>
                        <th className="pb-2">ABSENCE TYPE</th>
                        <th className="pb-2">TIMELINE</th>
                        <th className="pb-2">STATUS</th>
                        <th className="pb-2 text-right">BALANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leaveLogs.map((log, index) => (
                        <tr key={index} className="text-[11px] text-slate-700">
                          <td className="py-2.5 font-black text-slate-800">{log.name}</td>
                          <td className="py-2.5 text-slate-500">{log.type}</td>
                          <td className="py-2.5 text-slate-500">{log.dates}</td>
                          <td className="py-2.5">
                            <span className={`px-2 py-0.5 rounded text-[8.5px] font-black ${log.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-right font-black text-slate-800">{log.balanceDays} Days</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dynamic Mini-Bar Chart representing Weekly Attendance Trends */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-150 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Weekly Faculty Attendance Trends:</span>
                  <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    +1.2% this week
                  </div>
                </div>

                <div className="flex items-end justify-between h-24 pt-4 px-2">
                  {[
                    { day: "Mon", rate: 96.5, height: "96.5%" },
                    { day: "Tue", rate: 98.2, height: "98.2%" },
                    { day: "Wed", rate: 97.4, height: "97.4%" },
                    { day: "Thu", rate: 99.0, height: "99.0%" },
                    { day: "Fri", rate: 98.0, height: "98.0%" }
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1 group">
                      <div className="relative w-full flex justify-center items-end h-16">
                        {/* Tooltip on hover */}
                        <span className="absolute -top-7 bg-blue-600 text-white text-[9px] font-black py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm whitespace-nowrap z-10">
                          {bar.rate}%
                        </span>
                        
                        <div 
                          className="w-8 sm:w-10 rounded-t-lg bg-gradient-to-t from-blue-500 to-indigo-600 transition-all duration-300 hover:from-blue-650 hover:to-indigo-500 shadow-3xs cursor-pointer"
                          style={{ height: bar.height }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-550">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Performance Monitoring */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-2xs">
                  <Award className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none">Performance Monitoring & Ratings</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-1">Syllabus compliance scales & scholastic feedback indexes</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Leverage verified qualitative insights. Monitor syllabus progress indexes, access students feedback ratings, and record annual training records directly on teacher portfolios.
              </p>

              {/* Graphical performance metrics block */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-[#0066b3]/10 space-y-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Aggregate Faculty Scorecards:</span>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center space-y-1 shadow-3xs">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Student Rating</span>
                    <span className="text-sm font-black text-blue-600 block">4.85 / 5.0</span>
                    <span className="text-[8.5px] text-emerald-600 font-extrabold block">Outstanding</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center space-y-1 shadow-3xs">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Curriculum Sync</span>
                    <span className="text-sm font-black text-indigo-600 block">96.8%</span>
                    <span className="text-[8.5px] text-emerald-600 font-extrabold block">On Track</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center space-y-1 shadow-3xs">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Audit Index</span>
                    <span className="text-sm font-black text-purple-600 block">98.1%</span>
                    <span className="text-[8.5px] text-emerald-600 font-extrabold block">A+ Tier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Departmental Arts & Music Management */}
            <div id="arts-music-section" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-50 rounded-xl text-rose-600 border border-rose-100 shadow-2xs">
                    <Music className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-none">Arts & Music Studio Management</h3>
                    <span className="text-xs text-slate-400 font-bold block mt-1">Supervise music labs, instrument stocks, and trainee registers</span>
                  </div>
                </div>
                
                {/* Visual tabs to toggle subdivisions */}
                <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto shrink-0 border border-slate-200/50">
                  <button
                    type="button"
                    onClick={() => setActiveMusicSubTab('labs')}
                    className={`px-3 py-1.5 text-[10.5px] font-black rounded-lg transition-all ${activeMusicSubTab === 'labs' ? 'bg-white text-slate-900 shadow-3xs border border-slate-200/30' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Lab Allocations
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMusicSubTab('inventory')}
                    className={`px-3 py-1.5 text-[10.5px] font-black rounded-lg transition-all ${activeMusicSubTab === 'inventory' ? 'bg-white text-slate-900 shadow-3xs border border-slate-200/30' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Inventory
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMusicSubTab('students')}
                    className={`px-3 py-1.5 text-[10.5px] font-black rounded-lg transition-all ${activeMusicSubTab === 'students' ? 'bg-white text-slate-900 shadow-3xs border border-slate-200/30' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Students
                  </button>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                Coordinated workspace for physical and artistic infrastructure. Control specialized laboratory schedules, maintain status records for classical & electronic instruments, and keep track of student practice hours.
              </p>

              {/* TAB 1: LAB ALLOCATIONS */}
              {activeMusicSubTab === 'labs' && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Active Lab & Classroom Allocations:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {labAllocations.map((lab) => (
                        <div key={lab.id} className="bg-slate-50 border border-slate-150 p-4 rounded-2xl relative group hover:border-[#2563EB]/40 hover:bg-slate-50/60 transition-all">
                          <button 
                            type="button"
                            onClick={() => handleDeleteLabAllocation(lab.id)}
                            className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                            title="Remove Allocation"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <div className="space-y-2">
                            <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase font-black">{lab.id}</span>
                            <h4 className="text-xs font-black text-slate-900">{lab.labName}</h4>
                            
                            <div className="space-y-1 pt-1.5 border-t border-slate-200/50 text-[11px] font-bold text-slate-600">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                <span>Tutor: <strong className="text-slate-800">{lab.instructorName}</strong></span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-650" />
                                <span>Schedule: <strong className="text-slate-800">{lab.timing}</strong></span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                                <span>Capacity limit: <strong className="text-slate-800">{lab.capacity} Students</strong></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add allocation form */}
                  <form onSubmit={handleAddLabAllocation} className="bg-slate-50 p-4 rounded-2xl border border-slate-151 space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Allocate Instructor to Music Lab:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Studio/Lab Name</label>
                        <select 
                          value={newLabName} 
                          onChange={(e) => setNewLabName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Vocal Harmony Studio">Vocal Harmony Studio</option>
                          <option value="Acoustic & Rhythm Room">Acoustic & Rhythm Room</option>
                          <option value="Digital Synthesis Suite">Digital Synthesis Suite</option>
                          <option value="Grand Orchestral Suite">Grand Orchestral Suite</option>
                          <option value="Symphonic Brass Hall">Symphonic Brass Hall</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Assign Instructor</label>
                        <select 
                          value={newLabInstructor} 
                          onChange={(e) => setNewLabInstructor(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {SAMPLE_STAFF.map(s => (
                            <option key={s.id} value={s.name}>{s.name} ({s.designation})</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Timing Slots</label>
                        <input 
                          type="text" 
                          value={newLabTiming}
                          onChange={(e) => setNewLabTiming(e.target.value)}
                          placeholder="e.g. Mon/Wed 4:00 PM"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Max Student Capacity</label>
                        <input 
                          type="number" 
                          value={newLabCapacity}
                          onChange={(e) => setNewLabCapacity(Number(e.target.value))}
                          min="5"
                          max="40"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Plus className="h-4 w-4 stroke-[2.5]" /> Create Lab Allocation Schedule
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: INSTRUMENT INVENTORY */}
              {activeMusicSubTab === 'inventory' && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Instrument locker stock registry:</span>
                    <div className="space-y-2">
                      {instruments.map((inst) => (
                        <div key={inst.id} className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between gap-4 group hover:border-[#2563EB]/25 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 shadow-3xs">
                              <Wrench className="h-4 w-4 text-slate-500" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-slate-800 leading-tight">{inst.name}</h4>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[9px] font-black text-slate-405 bg-slate-200/80 py-0.5 px-1.5 rounded uppercase tracking-wider">{inst.category}</span>
                                <span className={`text-[9.5px] font-black py-0.5 px-2 rounded uppercase ${
                                  inst.condition === 'Pristine' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/30' :
                                  inst.condition === 'Excellent' ? 'bg-blue-50 text-blue-800 border border-blue-100/30' :
                                  inst.condition === 'Good' ? 'bg-violet-50 text-violet-800 border border-violet-100/30' :
                                  'bg-rose-50 text-rose-800 border border-rose-100/30'
                                }`}>{inst.condition}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3.5 shrink-0">
                            <div className="flex items-center bg-white border border-slate-250 rounded-lg p-0.5 shadow-3xs">
                              <button 
                                type="button"
                                onClick={() => adjustInstrumentQty(inst.id, -1)}
                                className="w-5 h-5 flex items-center justify-center text-xs font-extrabold text-slate-500 hover:bg-slate-100 rounded cursor-pointer"
                              >-</button>
                              <span className="px-2 text-xs font-black text-slate-800">{inst.qty}</span>
                              <button 
                                type="button"
                                onClick={() => adjustInstrumentQty(inst.id, 1)}
                                className="w-5 h-5 flex items-center justify-center text-xs font-extrabold text-slate-500 hover:bg-slate-100 rounded cursor-pointer"
                              >+</button>
                            </div>

                            <button 
                              type="button"
                              onClick={() => handleDeleteInstrument(inst.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Delete Instrument"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add instrument form */}
                  <form onSubmit={handleAddInstrument} className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Rapid Register New Instrument Model:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1 col-span-1 sm:col-span-2">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Instrument Model / Name</label>
                        <input 
                          type="text" 
                          value={newInstName}
                          onChange={(e) => setNewInstName(e.target.value)}
                          placeholder="e.g. Steinway grand piano, Fender acoustic guitar..."
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Category Type</label>
                        <select 
                          value={newInstCategory} 
                          onChange={(e) => setNewInstCategory(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Keyboard">Keyboard (Keys)</option>
                          <option value="String">String (Guitars/Violins)</option>
                          <option value="Percussion">Percussion (Drums)</option>
                          <option value="Woodwind">Woodwind & Brass</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Physical Condition</label>
                        <select 
                          value={newInstCondition} 
                          onChange={(e) => setNewInstCondition(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Pristine">Pristine (Brand New)</option>
                          <option value="Excellent">Excellent</option>
                          <option value="Good">Good</option>
                          <option value="Needs Tuning">Needs Tuning & Service</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Plus className="h-4 w-4 stroke-[2.5]" /> Register Instrument Into System
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: STUDENT PARTICIPATION */}
              {activeMusicSubTab === 'students' && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Active Student Music Trainees:</span>
                    <div className="space-y-2">
                      {musicStudents.map((stud) => (
                        <div key={stud.id} className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between gap-4 group hover:border-[#2563EB]/25 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 shadow-3xs">
                              <GraduationCap className="h-4 w-4 text-slate-500" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-slate-800 leading-tight">{stud.name} <span className="text-[10px] text-slate-400 ml-1">({stud.grade})</span></h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10.5px] font-bold text-slate-500">
                                <span className="bg-slate-200/70 text-slate-700 px-1 py-0.5 rounded text-[9px] font-black">{stud.level}</span>
                                <span className="text-slate-300">•</span>
                                <span>Instrument: <strong className="text-slate-800">{stud.instrument}</strong></span>
                                <span className="text-slate-300">•</span>
                                <span>Lab Class: <strong className="text-slate-800">{stud.lab}</strong></span>
                              </div>
                            </div>
                          </div>

                          <button 
                            type="button"
                            onClick={() => handleDeleteMusicStudent(stud.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer"
                            title="Unenroll Trainee"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enroll student form */}
                  <form onSubmit={handleAddMusicStudent} className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Enroll Music Student Trainee:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Student Full Name</label>
                        <input 
                          type="text" 
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          placeholder="e.g. Sanya Sharma"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Grade/Class</label>
                        <input 
                          type="text" 
                          value={newStudentGrade}
                          onChange={(e) => setNewStudentGrade(e.target.value)}
                          placeholder="e.g. Class XI-A, XII-C"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Assigned Lab Class</label>
                        <select 
                          value={newStudentLab} 
                          onChange={(e) => setNewStudentLab(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {labAllocations.map(lab => (
                            <option key={lab.id} value={lab.labName}>{lab.labName}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Primary Instrument</label>
                        <select 
                          value={newStudentInstrument} 
                          onChange={(e) => setNewStudentInstrument(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {instruments.map(inst => (
                            <option key={inst.id} value={inst.name}>{inst.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1 col-span-1 sm:col-span-2">
                        <label className="text-[10px] text-slate-400 font-black uppercase">Skill Practice Level</label>
                        <select 
                          value={newStudentLevel} 
                          onChange={(e) => setNewStudentLevel(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Beginner">Beginner (Introductory syllabus)</option>
                          <option value="Intermediate">Intermediate (Developing cadence)</option>
                          <option value="Advanced">Advanced (Symphonic performances)</option>
                          <option value="Professional">Professional (Solo recitals & showcases)</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Plus className="h-4 w-4 stroke-[2.5]" /> Enroll Music Student into Lab
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Control Panel Center Mockup */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden flex flex-col">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Users2 className="h-4.5 w-4.5 text-blue-600" />
                  <span className="text-xs font-black text-slate-800">Faculty Control Panel Center</span>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`px-2 py-1 text-[9.5px] font-extrabold rounded-lg transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-3xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    Staff Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('schedule')}
                    className={`px-2 py-1 text-[9.5px] font-extrabold rounded-lg transition-all cursor-pointer ${activeTab === 'schedule' ? 'bg-blue-600 text-white shadow-3xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    Assignments
                  </button>
                  <button 
                    onClick={() => setActiveTab('payroll')}
                    className={`px-2 py-1 text-[9.5px] font-extrabold rounded-lg transition-all cursor-pointer ${activeTab === 'payroll' ? 'bg-blue-600 text-white shadow-3xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    Payroll
                  </button>
                </div>
              </div>

              {/* Active Staff Directory with designation classification */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Designation & Role Allocation Matrix:</span>
                </div>

                {/* Pill filters for dynamic role division with active item counts */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/50">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoleFilter('all');
                      // Reset selecting to first available matching staff if applicable
                      const firstMatched = SAMPLE_STAFF[0];
                      if (firstMatched) setSelectedStaffId(firstMatched.id);
                    }}
                    className={`text-[10px] py-1.5 text-center font-bold rounded-lg transition-all ${selectedRoleFilter === 'all' ? 'bg-white text-slate-900 shadow-3xs font-black border border-slate-150' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    All ({SAMPLE_STAFF.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoleFilter('teaching');
                      const firstMatched = SAMPLE_STAFF.find(s => s.roleType === 'teaching');
                      if (firstMatched) setSelectedStaffId(firstMatched.id);
                    }}
                    className={`text-[10px] py-1.5 text-center font-bold rounded-lg transition-all ${selectedRoleFilter === 'teaching' ? 'bg-white text-slate-900 shadow-3xs font-black border border-slate-150' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Teaching ({SAMPLE_STAFF.filter(s => s.roleType === 'teaching').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoleFilter('administrative');
                      const firstMatched = SAMPLE_STAFF.find(s => s.roleType === 'administrative');
                      if (firstMatched) setSelectedStaffId(firstMatched.id);
                    }}
                    className={`text-[10px] py-1.5 text-center font-bold rounded-lg transition-all ${selectedRoleFilter === 'administrative' ? 'bg-white text-slate-900 shadow-3xs font-black border border-slate-150' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Admin ({SAMPLE_STAFF.filter(s => s.roleType === 'administrative').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoleFilter('support');
                      const firstMatched = SAMPLE_STAFF.find(s => s.roleType === 'support');
                      if (firstMatched) setSelectedStaffId(firstMatched.id);
                    }}
                    className={`text-[10px] py-1.5 text-center font-bold rounded-lg transition-all ${selectedRoleFilter === 'support' ? 'bg-white text-slate-900 shadow-3xs font-black border border-slate-150' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Support ({SAMPLE_STAFF.filter(s => s.roleType === 'support').length})
                  </button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, stream or designation..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {filteredStaff.map(st => (
                    <div 
                      key={st.id}
                      onClick={() => setSelectedStaffId(st.id)}
                      className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${selectedStaffId === st.id ? 'bg-blue-50/50 border-blue-400 shadow-3xs' : 'bg-transparent border-transparent hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${st.avatarBg} text-white font-black text-[10px] flex items-center justify-center shrink-0`}>
                          {st.avatar}
                        </div>
                        <div className="text-left">
                          <h5 className="text-xs font-extrabold text-slate-800 leading-none">{st.name}</h5>
                          <span className="text-[9px] text-slate-400 font-bold block mt-1 leading-none">
                            {st.roleType === 'support' ? `Support • ${st.department}` : st.department}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-black ${
                          st.roleType === 'support' ? 'bg-amber-100 text-amber-850' :
                          st.roleType === 'administrative' ? 'bg-emerald-100 text-emerald-850' :
                          'bg-blue-100 text-blue-850'
                        }`}>
                          {st.roleType}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${st.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      </div>
                    </div>
                  ))}
                  {filteredStaff.length === 0 && (
                    <div className="py-6 text-center text-xs text-slate-400 font-semibold">
                      No matching records found for this dynamic role type.
                    </div>
                  )}
                </div>
              </div>

              {/* Core Staff Profile Feature card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4 text-center flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full ${activeStaff.avatarBg} text-white font-extrabold text-base flex items-center justify-center relative shadow-sm`}>
                  {activeStaff.avatar}
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-100 ${activeStaff.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">{activeStaff.name}</h4>
                  <span className="inline-block bg-white border border-slate-200 text-slate-600 text-[10px] font-black py-0.5 px-2 rounded-md mt-1 shadow-3xs">
                    {activeStaff.designation}
                  </span>
                </div>

                {/* Quick Action Contact Row */}
                <div className="grid grid-cols-3 gap-2 w-full pt-1">
                  <a
                    href={`tel:${activeStaff.phone.replace(/\s+/g, '')}`}
                    className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 text-slate-700 text-[10px] font-extrabold transition-all shadow-3xs group cursor-pointer"
                    title={`Call Phone: ${activeStaff.phone}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-all mb-1" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`sms:${activeStaff.phone.replace(/\s+/g, '')}`}
                    className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-slate-700 text-[10px] font-extrabold transition-all shadow-3xs group cursor-pointer"
                    title={`Message: ${activeStaff.phone}`}
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 transition-all mb-1" />
                    <span>Message</span>
                  </a>
                  <a
                    href={`mailto:${activeStaff.email}`}
                    className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white border border-slate-200 hover:border-rose-500 hover:bg-rose-50/20 text-slate-700 text-[10px] font-extrabold transition-all shadow-3xs group cursor-pointer"
                    title={`Email: ${activeStaff.email}`}
                  >
                    <Mail className="h-3.5 w-3.5 text-slate-400 group-hover:text-rose-600 transition-all mb-1" />
                    <span>Email</span>
                  </a>
                </div>

                <div className="w-full grid grid-cols-2 gap-2 text-left pt-3 border-t border-slate-200/50">
                  <div className="p-2 bg-white rounded-lg border border-slate-150 shadow-3xs">
                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Employee ID</span>
                    <span className="text-xs font-black text-slate-700 block mt-0.5 font-mono">{activeStaff.id}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-150 shadow-3xs">
                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Experience</span>
                    <span className="text-xs font-black text-slate-700 block mt-0.5">{activeStaff.experience}</span>
                  </div>
                </div>

                {activeTab === 'profile' && (
                  <div className="w-full text-left space-y-3">
                    {activeStaff.roleType === 'teaching' && (
                      <div className="space-y-1.5">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Assigned Syllabus Streams:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeStaff.subjects.map(sub => (
                            <span key={sub} className="bg-blue-50 text-blue-700 text-[9px] font-black py-1 px-2 rounded border border-blue-100/50 shadow-3xs">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeStaff.roleType === 'administrative' && (
                      <div className="space-y-2">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block font-sans">Corporate Assignment Jurisdiction:</span>
                        <div className="p-3 bg-emerald-50/50 border border-emerald-100/60 rounded-xl space-y-1.5 text-[11px] font-semibold text-slate-700">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                            <span>Dept: <strong className="text-slate-800">{activeStaff.department}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                            <span>Core Authority: <strong className="text-slate-800">HR, Scheduling, Compliance</strong></span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStaff.roleType === 'support' && activeStaff.id.startsWith("DRV-") && (
                      <div className="space-y-2.5 border-t border-slate-150 pt-3">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block font-sans">Driver Sync & Transport Linking:</span>
                        
                        <div className="p-3 bg-amber-50/30 border border-amber-200 rounded-xl space-y-2.5 text-[11px] text-slate-700 font-semibold">
                          <div className="flex items-center justify-between bg-white px-2 py-1.5 border border-slate-150 rounded-lg">
                            <span className="text-[8.5px] font-black text-amber-800 uppercase bg-amber-100 py-0.5 px-1.5 rounded">DL Number</span>
                            <span className="font-mono text-slate-800 font-extrabold">{activeStaff.dlNumber}</span>
                          </div>

                          {activeStaff.dlExpiryAlert?.includes("Soon!") ? (
                            <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2 font-bold text-[10px]">
                              <AlertTriangle className="w-4.5 h-4.5 text-red-650 shrink-0" />
                              <div>
                                <span className="block text-[8px] uppercase tracking-wider">LICENSE EXPIRY ACTION REQUIRED</span>
                                <span>Expiry: {activeStaff.dlExpiryAlert}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 bg-slate-100/50 border border-slate-200 rounded-lg text-slate-600 flex items-center gap-2 text-[10.5px]">
                              <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                              <span>DL Expiry: <strong className="text-slate-800">{activeStaff.dlExpiryAlert}</strong></span>
                            </div>
                          )}

                          <div className="p-2.5 bg-white border border-slate-200/80 rounded-lg space-y-1">
                            <span className="text-[8.5px] text-slate-400 uppercase tracking-wider block font-bold">Live Bus Route Mapping:</span>
                            <div className="flex items-center gap-1.5 font-bold text-slate-800">
                              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                              <span className="text-[11px]">{activeStaff.assignedRoute}</span>
                            </div>
                            <span className="block text-[8px] text-emerald-600 font-black tracking-wider uppercase bg-emerald-50 px-1 py-0.5 rounded text-center mt-1">📡 GPS Tracking Link • ONLINE</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStaff.roleType === 'support' && activeStaff.id.startsWith("GRD-") && (
                      <div className="space-y-2.5 border-t border-slate-200/55 pt-3">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block font-sans">Security Guard Shift Roster:</span>
                        
                        <div className="p-3 bg-slate-100/80 border border-slate-200 rounded-xl space-y-3.5 text-[11px] text-slate-700 font-semibold">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500 font-bold">Shift Timing Stream:</span>
                            <span className={`px-2 py-0.5 text-[9.5px] font-black rounded uppercase ${activeStaff.shiftType === 'Night Shift' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-amber-100 text-amber-800'}`}>
                              {activeStaff.shiftType}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-white rounded-lg border border-slate-150">
                              <span className="text-[8px] text-slate-400 block uppercase font-bold">CLOCK HOURS</span>
                              <span className="text-[10.5px] font-mono text-slate-800 font-black block mt-1">{activeStaff.shiftSchedule}</span>
                            </div>
                            
                            <div className="p-2 bg-white rounded-lg border border-slate-150">
                              <span className="text-[8px] text-slate-400 block uppercase font-bold">POST ASSIGNMENT</span>
                              <span className="text-[10.5px] text-slate-800 font-black block mt-1">{activeStaff.gateAllocation}</span>
                            </div>
                          </div>

                          <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-[9.5px] text-emerald-800 flex items-center justify-center gap-2 font-black tracking-wide uppercase">
                            <Activity className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>GATE TRANSIT LOGGER: CONNECTED</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStaff.roleType === 'support' && activeStaff.id.startsWith("PEO-") && (
                      <div className="space-y-3 border-t border-slate-200/55 pt-3">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block font-sans">Peon / Attendant Duty Task Manager:</span>
                        
                        <div className="p-3 bg-rose-50/30 border border-rose-100/60 rounded-xl space-y-2.5 text-[11px] text-slate-700">
                          <div className="bg-white p-2 border border-rose-200 rounded-lg">
                            <span className="text-[8px] text-rose-500 block font-black uppercase tracking-wider">ASSIGNED DEPARTMENT / BLOCK</span>
                            <span className="text-[11px] text-slate-800 font-black">{activeStaff.assignedBlock}</span>
                          </div>

                          <div className="space-y-1.5 bg-white border border-slate-200 rounded-lg p-3">
                            <span className="text-[8.5px] text-slate-400 font-black uppercase tracking-widest block border-b border-slate-100 pb-1">DAILY LOGGED DUTY TASKS:</span>
                            <div className="space-y-2 pt-1">
                              {activeStaff.dailyDutyLogs?.map((log, lIdx) => (
                                <div key={lIdx} className="flex items-start gap-1.5 text-[10px] text-slate-650 font-semibold leading-tight">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{log}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="w-full text-left bg-white p-2.5 rounded-xl border border-slate-150 shadow-2xs space-y-1.5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-slate-400 font-bold uppercase block">Current Week Target</span>
                      <span className="text-xs font-extrabold text-slate-700 block mt-0.5">
                        {activeStaff.roleType === 'teaching' && "18 Lectures / Assignments Completed"}
                        {activeStaff.roleType === 'administrative' && "Administrative Reports Dispatched"}
                        {activeStaff.roleType === 'support' && activeStaff.id.startsWith("DRV-") && "Live-Mapped GPS Route Checklist Logs"}
                        {activeStaff.roleType === 'support' && activeStaff.id.startsWith("GRD-") && "Shift Patrol Logs & Guard Post Report"}
                        {activeStaff.roleType === 'support' && activeStaff.id.startsWith("PEO-") && "Daily Duty Tasks Completed (4 / 4)"}
                      </span>
                    </div>
                    <span className="text-[9.5px] bg-emerald-50 text-emerald-800 font-black py-1 px-2 rounded border border-emerald-100/50 font-sans">
                      100% DONE
                    </span>
                  </div>
                )}

                {activeTab === 'payroll' && (() => {
                  const attPercentForMath = parseFloat(activeStaff.attendance) || 100;
                  
                  // Base Pay Determination
                  let theoreticalBase = 30000;
                  if (activeStaff.roleType === 'teaching') {
                    theoreticalBase = 85000;
                  } else if (activeStaff.roleType === 'administrative') {
                    theoreticalBase = 75000;
                  } else if (activeStaff.roleType === 'support') {
                    if (activeStaff.id.startsWith("DRV-")) theoreticalBase = 38000;
                    else if (activeStaff.id.startsWith("GRD-")) theoreticalBase = 32000;
                    else if (activeStaff.id.startsWith("PEO-")) theoreticalBase = 28000;
                  }

                  // Paid, Absent Days based on attendance metrics
                  const absentDays = Number(((1 - (attPercentForMath / 100)) * payrollWorkingDays).toFixed(1));
                  const paidDays = Number((payrollWorkingDays - absentDays).toFixed(1));
                  
                  // Pro-rated base Salary earned
                  const baseSalaryEarned = Math.round(theoreticalBase * (paidDays / payrollWorkingDays));

                  // Allowances Determination depending on roles
                  let allowanceLabel1 = "Performance Bonus";
                  let allowanceVal1 = 0;
                  let allowanceLabel2 = "Dept/Special Allowance";
                  let allowanceVal2 = 0;

                  if (activeStaff.roleType === 'teaching') {
                    allowanceLabel1 = "Syllabus Streams Incentive";
                    allowanceVal1 = activeStaff.subjects.length * 2500;
                    allowanceLabel2 = "Academic Performance Bonus";
                    allowanceVal2 = Math.round((activeStaff.rating || 4.5) * 2000);
                  } else if (activeStaff.roleType === 'administrative') {
                    allowanceLabel1 = "Corporate Coord. Allowance";
                    allowanceVal1 = 12500;
                    allowanceLabel2 = "Feedback Performance Bonus";
                    allowanceVal2 = Math.round((activeStaff.rating || 4.5) * 1500);
                  } else if (activeStaff.roleType === 'support') {
                    if (activeStaff.id.startsWith("DRV-")) {
                      allowanceLabel1 = "Route Navigation Allowance";
                      allowanceVal1 = 4500;
                      allowanceLabel2 = "Vehicle Upkeep Bonus";
                      allowanceVal2 = Math.round((activeStaff.rating || 4.5) * 1000);
                    } else if (activeStaff.id.startsWith("GRD-")) {
                      allowanceLabel1 = `${activeStaff.shiftType || "General"} Shift Allowance`;
                      allowanceVal1 = activeStaff.shiftType === 'Night Shift' ? 5000 : 2500;
                      allowanceLabel2 = "Gate Vigilance Reward";
                      allowanceVal2 = Math.round((activeStaff.rating || 4.5) * 1200);
                    } else if (activeStaff.id.startsWith("PEO-")) {
                      allowanceLabel1 = "Lab/Office Duty Allowance";
                      allowanceVal1 = 2000;
                      allowanceLabel2 = "Services Rating Incentive";
                      allowanceVal2 = Math.round((activeStaff.rating || 4.5) * 1100);
                    }
                  }

                  // Deductions: PF (12% of theoretical base), PT (Rs. 200), Unpaid Leaves deduction
                  const epfDeduction = Math.round(theoreticalBase * 0.12);
                  const professionalTax = 200;

                  const grossEarnings = baseSalaryEarned + allowanceVal1 + allowanceVal2;
                  const totalDeductions = epfDeduction + professionalTax;
                  const netPayable = Math.max(0, grossEarnings - totalDeductions);

                  const handleExportPDF = () => {
                    setIsExporting(true);
                    try {
                      const doc = new jsPDF({
                        orientation: 'p',
                        unit: 'mm',
                        format: 'a4'
                      });

                      const leftMargin = 15;
                      let currentY = 15;

                      // School Branding Header with beautiful background
                      doc.setFillColor(15, 23, 42); // slate 900
                      doc.rect(0, 0, 210, 32, 'F');

                      doc.setTextColor(255, 255, 255);
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(18);
                      doc.text("NEXORA ACADEMIC INSTITUTION", leftMargin, 12);

                      doc.setFont("Helvetica", "normal");
                      doc.setFontSize(8);
                      doc.setTextColor(200, 200, 200);
                      doc.text("Autonomous Campus Management System • NexoraOS Integration Unit", leftMargin, 17);
                      doc.text("Email: accounts@nexora.edu | Web: portal.nexora.edu", leftMargin, 21);

                      // Payslip for Month
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(10);
                      doc.setTextColor(244, 63, 94); // rose-500
                      doc.text(`CONFIDENTIAL MONTHLY SALARY SLIP - ${payrollMonth.toUpperCase()}`, leftMargin, 28);

                      currentY = 42;

                      // Employee Information Block
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(11);
                      doc.setTextColor(15, 23, 42);
                      doc.text("EMPLOYEE GENERAL PROFILE", leftMargin, currentY);

                      // Line separation
                      doc.setDrawColor(226, 232, 240); // slate-200
                      doc.setLineWidth(0.5);
                      doc.line(leftMargin, currentY + 2, 195, currentY + 2);

                      currentY += 8;

                      // Double Column Info Block
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(9);
                      doc.setTextColor(100, 116, 139); // slate-500
                      
                      const col1X = leftMargin;
                      const col2X = 110;

                      // Column 1
                      doc.text("Employee Name:", col1X, currentY);
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(30, 41, 59);
                      doc.text(activeStaff.name, col1X + 32, currentY);

                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(100, 116, 139);
                      doc.text("Employee ID:", col1X, currentY + 6);
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(30, 41, 59);
                      doc.text(activeStaff.id, col1X + 32, currentY + 6);

                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(100, 116, 139);
                      doc.text("Designation:", col1X, currentY + 12);
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(30, 41, 59);
                      doc.text(activeStaff.designation, col1X + 32, currentY + 12);

                      // Column 2
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(100, 116, 139);
                      doc.text("Department:", col2X, currentY);
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(30, 41, 59);
                      doc.text(activeStaff.department, col2X + 32, currentY);

                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(100, 116, 139);
                      doc.text("Bank Account:", col2X, currentY + 6);
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(30, 41, 59);
                      doc.text(`HDFC Bank — A/C *******${activeStaff.id.split('-').pop() || '1234'}`, col2X + 32, currentY + 6);

                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(100, 116, 139);
                      doc.text("Email Status:", col2X, currentY + 12);
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(100, 116, 139);
                      doc.text(activeStaff.email, col2X + 32, currentY + 12);

                      currentY += 22;

                      // Attendance calculation factors
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(11);
                      doc.setTextColor(15, 23, 42);
                      doc.text("ATTENDANCE CALCULATION FACTOR", leftMargin, currentY);
                      doc.line(leftMargin, currentY + 2, 195, currentY + 2);

                      currentY += 8;

                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(9);
                      doc.setTextColor(100, 116, 139);
                      doc.text("Avg Attendance Metric:", col1X, currentY);
                      doc.setTextColor(30, 41, 59);
                      doc.text(activeStaff.attendance, col1X + 42, currentY);

                      doc.setTextColor(100, 116, 139);
                      doc.text("Base Working Days:", col1X, currentY + 6);
                      doc.setTextColor(30, 41, 59);
                      doc.text(`${payrollWorkingDays} Days`, col1X + 42, currentY + 6);

                      doc.setTextColor(100, 116, 139);
                      doc.text("Paid Days:", col2X, currentY);
                      doc.setTextColor(16, 185, 129); // emerald-500
                      doc.text(`${paidDays} Days`, col2X + 42, currentY);

                      doc.setTextColor(100, 116, 139);
                      doc.text("Unpaid Leave Days:", col2X, currentY + 6);
                      doc.setTextColor(239, 68, 68); // red-500
                      doc.text(`${absentDays} Days`, col2X + 42, currentY + 6);

                      currentY += 18;

                      // Salary Breakup spreadsheet details
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(11);
                      doc.setTextColor(15, 23, 42);
                      doc.text("EARNINGS & PAY STRUCTURE DETAILS", leftMargin, currentY);
                      doc.line(leftMargin, currentY + 2, 195, currentY + 2);

                      currentY += 8;

                      // Header row for breakups
                      doc.setFillColor(248, 250, 252); // slate 50
                      doc.rect(leftMargin, currentY - 5, 180, 7, 'F');
                      doc.setFontSize(8.5);
                      doc.setTextColor(15, 23, 42);
                      doc.text("SALARY ELEMENT TYPE", leftMargin + 2, currentY - 0.5);
                      doc.text("THEORETICAL RATE", leftMargin + 85, currentY - 0.5);
                      doc.text("NET AMOUNT EARNED / DEPOSITED", leftMargin + 130, currentY - 0.5);

                      currentY += 7;

                      // Row 1: Basic Pay
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(71, 85, 105);
                      doc.text("Basic Salary Structure", leftMargin + 2, currentY);
                      doc.text(`INR ${theoreticalBase.toLocaleString()}`, leftMargin + 85, currentY);
                      doc.text(`INR ${baseSalaryEarned.toLocaleString()}`, leftMargin + 130, currentY);

                      // Row 2: Allowance 1
                      currentY += 6;
                      doc.text(allowanceLabel1, leftMargin + 2, currentY);
                      doc.text(`INR ${allowanceVal1.toLocaleString()}`, leftMargin + 85, currentY);
                      doc.text(`INR ${allowanceVal1.toLocaleString()}`, leftMargin + 130, currentY);

                      // Row 3: Allowance 2
                      currentY += 6;
                      doc.text(allowanceLabel2, leftMargin + 2, currentY);
                      doc.text(`INR ${allowanceVal2.toLocaleString()}`, leftMargin + 85, currentY);
                      doc.text(`INR ${allowanceVal2.toLocaleString()}`, leftMargin + 130, currentY);

                      // Row 4: PF Deduction
                      currentY += 6;
                      doc.setTextColor(185, 28, 28);
                      doc.text("Employee Provident Fund (EPF - 12%)", leftMargin + 2, currentY);
                      doc.text(`INR ${epfDeduction.toLocaleString()}`, leftMargin + 85, currentY);
                      doc.text(`- INR ${epfDeduction.toLocaleString()}`, leftMargin + 130, currentY);

                      // Row 5: Prof Tax Deduction
                      currentY += 6;
                      doc.text("Professional Tax (PT)", leftMargin + 2, currentY);
                      doc.text("INR 200", leftMargin + 85, currentY);
                      doc.text("- INR 200", leftMargin + 130, currentY);

                      // Line separating totals
                      currentY += 5;
                      doc.setDrawColor(203, 213, 225); // slate-300
                      doc.line(leftMargin, currentY, 195, currentY);

                      currentY += 6;

                      // Calculations final output text
                      doc.setFontSize(9.5);
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(15, 23, 42);
                      doc.text("GROSS EARNINGS:", leftMargin + 2, currentY);
                      doc.text(`INR ${grossEarnings.toLocaleString()}`, leftMargin + 130, currentY);

                      currentY += 6;
                      doc.setTextColor(185, 28, 28);
                      doc.text("TOTAL STATUTORY DEDUCTIONS:", leftMargin + 2, currentY);
                      doc.text(`INR ${totalDeductions.toLocaleString()}`, leftMargin + 130, currentY);

                      currentY += 6;
                      doc.setLineWidth(0.8);
                      doc.line(leftMargin, currentY, 195, currentY);

                      currentY += 7;
                      
                      // Net Salary display panel box
                      doc.setFillColor(240, 253, 250); // teal-50
                      doc.rect(leftMargin, currentY - 5, 180, 10, 'F');
                      doc.setDrawColor(45, 212, 191); // teal-400
                      doc.setLineWidth(0.5);
                      doc.rect(leftMargin, currentY - 5, 180, 10, 'D');

                      doc.setFontSize(10.5);
                      doc.setTextColor(13, 148, 136); // teal-600
                      doc.text("NET DISBURSED PAY FOR THE PERIOD:", leftMargin + 4, currentY + 1.5);
                      doc.text(`INR ${netPayable.toLocaleString()} /-`, leftMargin + 130, currentY + 1.5);

                      currentY += 18;

                      // System verification details stamp
                      doc.setFontSize(7.5);
                      doc.setFont("Helvetica", "normal");
                      doc.setTextColor(148, 163, 184); // slate-400
                      doc.text("This document is generated digitally through NexoraOS Payroll Automation Hub.", leftMargin, currentY);
                      doc.text("Signatures are registered under biometric approval protocols and verified using secure API handshakes.", leftMargin, currentY + 3.5);
                      doc.text(`Verification Timestamp: ${new Date().toISOString()}`, leftMargin, currentY + 7);

                      // Approved Stamp Box
                      doc.setDrawColor(13, 148, 136);
                      doc.setLineWidth(0.5);
                      doc.rect(145, currentY - 2, 40, 9, 'D');
                      doc.setFont("Helvetica", "bold");
                      doc.setTextColor(13, 148, 136);
                      doc.text("APPROVED & REGISTERED", 147.5, currentY + 4);

                      // Trigger download of official PDF
                      doc.save(`Payslip_${activeStaff.id}_${activeStaff.name.replace(/\s+/g, '_')}_${payrollMonth.replace(/\s+/g, '')}.pdf`);
                      
                      setExportSuccessAlert(true);
                      setTimeout(() => setExportSuccessAlert(false), 3500);
                    } catch (err) {
                      console.error("PDF generation error: ", err);
                    } finally {
                      setIsExporting(false);
                    }
                  };

                  return (
                    <div className="w-full text-left space-y-4 animate-fade-in font-sans">
                      
                      {/* Interactive Configuration Header */}
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[8px] tracking-wider text-slate-400 font-extrabold uppercase">Payroll Month</label>
                            <select 
                              value={payrollMonth}
                              onChange={(e) => setPayrollMonth(e.target.value)}
                              className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg p-1.5 text-[11px] font-bold focus:outline-none"
                            >
                              <option value="May 2026">May 2026 (Current)</option>
                              <option value="April 2026">April 2026</option>
                              <option value="March 2026">March 2026</option>
                            </select>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[8px] tracking-wider text-slate-400 font-extrabold uppercase">Base Working Days</label>
                            <div className="flex items-center gap-1.5">
                              <input 
                                type="number"
                                min="15"
                                max="31"
                                value={payrollWorkingDays}
                                onChange={(e) => setPayrollWorkingDays(Math.min(31, Math.max(15, parseInt(e.target.value) || 26)))}
                                className="w-12 bg-white border border-slate-200 text-center text-slate-800 rounded-lg p-1 text-[11px] font-black focus:outline-none"
                              />
                              <span className="text-[10px] text-slate-400 font-bold">Days</span>
                            </div>
                          </div>
                        </div>

                        {/* Slide adjust label */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] font-extrabold uppercase text-slate-400">
                            <span>Adjust Month Calendar Base</span>
                            <span className="text-blue-600 font-black">{payrollWorkingDays} Base Days</span>
                          </div>
                          <input 
                            type="range"
                            min="20"
                            max="31"
                            value={payrollWorkingDays}
                            onChange={(e) => setPayrollWorkingDays(parseInt(e.target.value))}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>
                      </div>

                      {/* Interactive Payroll Slip display panel */}
                      <div className="bg-[#1E293B] text-slate-100 rounded-2xl border border-slate-800 p-4 shadow-md space-y-3 relative overflow-hidden">
                        
                        {/* Background coins icon visual watermark */}
                        <div className="absolute right-2 top-2 opacity-5 pointer-events-none">
                          <Coins className="w-24 h-24" />
                        </div>

                        {/* Header details */}
                        <div className="border-b border-slate-700/65 pb-2.5 flex justify-between items-start">
                          <div>
                            <span className="text-[7.5px] font-black tracking-widest text-[#F43F5E] uppercase block">OFFICIAL PAYSLIP SLIP</span>
                            <h4 className="text-[11px] font-black text-slate-200 uppercase tracking-tight">{activeStaff.name}</h4>
                            <span className="text-[8px] text-slate-400 font-semibold block">{activeStaff.id} • {activeStaff.designation}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[8.5px] font-black text-slate-300 block">{payrollMonth.toUpperCase()}</span>
                            <span className="text-[7.5px] text-emerald-400 font-black tracking-wider uppercase block mt-0.5">Approved Bio-Sync</span>
                          </div>
                        </div>

                        {/* Days breakdown summary row */}
                        <div className="grid grid-cols-3 gap-1.5 bg-[#0F172A]/85 p-2 rounded-xl border border-slate-800/80 text-center">
                          <div>
                            <span className="text-[7px] text-slate-400 font-black uppercase block">ATTENDANCE</span>
                            <span className="text-[11px] font-black text-blue-400">{activeStaff.attendance}</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-slate-400 font-black uppercase block">PAID DAYS</span>
                            <span className="text-[11px] font-black text-emerald-400">{paidDays} Days</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-slate-400 font-black uppercase block">ABSENT/LEAVE</span>
                            <span className="text-[11px] font-black text-rose-400">{absentDays} Days</span>
                          </div>
                        </div>

                        {/* Payslip spreadsheet items */}
                        <div className="space-y-1 text-[10px] font-semibold text-slate-300">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Base Salary (Assigned Base):</span>
                            <span className="font-mono text-slate-200">₹{theoreticalBase.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-bold text-emerald-400 border-b border-slate-700/40 pb-1">
                            <span>Base Salary Earned (Pro-rated):</span>
                            <span className="font-mono">₹{baseSalaryEarned.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{allowanceLabel1}:</span>
                            <span className="font-mono text-slate-200">₹{allowanceVal1.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-700/40 pb-1">
                            <span>{allowanceLabel2}:</span>
                            <span className="font-mono text-slate-200">₹{allowanceVal2.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-rose-300">
                            <span>EPF Contribution Deduction (12%):</span>
                            <span className="font-mono">- ₹{epfDeduction.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-rose-300 border-b border-slate-700/50 pb-1">
                            <span>Professional Tax (PT):</span>
                            <span className="font-mono">- ₹200</span>
                          </div>

                          <div className="flex justify-between text-[11px] font-black text-slate-900 pt-1">
                            <span className="uppercase tracking-wide font-sans">Net Disbursed Payable:</span>
                            <span className="font-mono text-emerald-600 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shadow-sm">
                              ₹{netPayable.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Note disclaimer */}
                        <p className="text-[8px] text-slate-400 font-semibold leading-relaxed text-center px-1">
                          Calculated instantly using Biometric logs and Role-based structures.
                        </p>
                      </div>

                      {/* Export button */}
                      <button
                        type="button"
                        onClick={handleExportPDF}
                        disabled={isExporting}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer disabled:bg-blue-450 disabled:cursor-not-allowed"
                      >
                        {isExporting ? (
                          <>
                            <div className="rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                            <span>Exporting PDF Document...</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 shrink-0" />
                            <span>Export Month Payslip to PDF</span>
                          </>
                        )}
                      </button>

                      {/* Toast Banner display */}
                      {exportSuccessAlert && (
                        <div className="p-2.5 bg-emerald-600 rounded-xl text-white text-[10px] font-bold text-center flex items-center justify-center gap-1.5 leading-tight">
                          <CheckCircle className="w-4 h-4" />
                          <span>PDF Disbursed Payslip exported and downloaded successfully!</span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Integrated Statistics / Radial Attendance progress box */}
              <div className="bg-blue-600 text-white p-4.5 rounded-2xl border border-blue-500 flex justify-between items-center shadow-lg shadow-blue-200">
                <div className="space-y-1.5 text-left">
                  <span className="text-[9px] font-black text-blue-100 uppercase tracking-wider block">INSTITUTION COMPLIANCE RATE</span>
                  <h4 className="text-xl font-black text-white leading-none">97.8% Overall</h4>
                  <p className="text-[10px] text-blue-50 font-bold leading-relaxed max-w-[170px]">
                    Average biometric gate attendance cataloged for this current academic semester.
                  </p>
                </div>

                {/* Micro graphical visual attendance progress box representing 97.8% */}
                <div className="w-18 h-18 relative flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-blue-500"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-white"
                      strokeWidth="3.2"
                      strokeDasharray="97.8, 100"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[10.5px] font-black text-white">
                    97.8%
                  </span>
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
