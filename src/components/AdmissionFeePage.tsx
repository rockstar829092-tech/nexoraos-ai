/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { 
  ArrowLeft, 
  UserPlus, 
  FileText, 
  Layers, 
  Search, 
  Filter, 
  Download, 
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  CreditCard,
  PieChart as LucidePieChart,
  BarChart3,
  Users,
  Briefcase,
  History,
  MoreVertical,
  Printer,
  Calendar,
  DollarSign,
  Zap,
  ShieldCheck,
  Globe,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Target,
  LayoutDashboard,
  PieChart as PieChartIcon,
  Activity,
  Award,
  ZapOff,
  Upload,
  X,
  FileSpreadsheet,
  FileJson,
  Lock,
  Eye,
  EyeOff,
  Trophy,
  GraduationCap,
  Building,
  CheckCircle2,
  Sliders,
  Settings
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  Legend
} from 'recharts';

// import modernCampusImg from '../assets/images/modern_campus_1779782861501.png';
// import roboticsLabImg from '../assets/images/robotics_lab_1779782885932.png';
// import biologyLabImg from '../assets/images/biology_lab_1779782920985.png';
// import avionicsHangarImg from '../assets/images/avionics_hangar_1779782942054.png';
const modernCampusImg = "https://images.unsplash.com/photo-1523050853064-8504f2f40077?q=80&w=2070&auto=format&fit=crop";
const roboticsLabImg = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop";
const biologyLabImg = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop";
const avionicsHangarImg = "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=2070&auto=format&fit=crop";

// --- MOCK DATA ---
const ADMISSION_FUNNEL = [
  { stage: 'Enquiries', count: 450, color: '#2563EB' },
  { stage: 'Applications', count: 180, color: '#3B82F6' },
  { stage: 'Selected', count: 75, color: '#60A5FA' },
  { stage: 'Enrolled', count: 50, color: '#10B981' },
];

const OCCUPANCY_DATA = [
  { name: 'Filled', value: 176, fill: '#10B981' },
  { name: 'Reserved', value: 41, fill: '#F59E0B' },
  { name: 'Available', value: 84, fill: '#E2E8F0' },
];

const PIPELINE_LEADS = [
  { 
    id: 'ENQ-2024-001',
    name: 'Siddharth Roy', 
    program: 'Class XI Commerce', 
    source: 'Website', 
    status: 'Hot Lead', 
    counselor: 'Priya Sharma', 
    nextFollowUp: 'Tomorrow 11:00 AM',
    score: 85
  },
  { 
    id: 'ENQ-2024-005',
    name: 'Ananya Gupta', 
    program: 'Class IX', 
    source: 'Walk-In Visit', 
    status: 'Documents Pending', 
    counselor: 'Rahul Verma', 
    nextFollowUp: 'Today 04:30 PM',
    score: 62
  },
];

const WORKFLOW_STEPS = [
  { title: 'Enquiry', dept: 'Front Office', status: 'Completed', time: '0.5 Days' },
  { title: 'Application Submitted', dept: 'Admissions', status: 'Completed', time: '1.2 Days' },
  { title: 'Document Verification', dept: 'Registrar', status: 'Completed', time: '0.8 Days' },
  { title: 'Counseling Session', dept: 'Academics', status: 'Completed', time: '1.0 Days' },
  { title: 'Interview Assessment', dept: 'Principal Office', status: 'In Progress', time: 'Pending' },
  { title: 'Seat Allocation', dept: 'Admissions', status: 'Upcoming', time: '-' },
  { title: 'Admission Approved', dept: 'Management', status: 'Upcoming', time: '-' },
  { title: 'Enrolled', dept: 'IT/Accounts', status: 'Upcoming', time: '-' },
];

interface AdmissionFeePageProps {
  onBack: () => void;
}

export const AdmissionFeePage: React.FC<AdmissionFeePageProps> = ({ onBack }) => {
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- ADMISSION & TRANSPARENCY HUB STATE ---
  const [currentMode, setCurrentMode] = useState<'admin' | 'public'>('admin');
  
  // Public Verification Management Controls
  const [verifyShowcase, setVerifyShowcase] = useState(true);
  const [verifyFaculty, setVerifyFaculty] = useState(true);
  const [verifyBoardResults, setVerifyBoardResults] = useState(true);
  const [publicVerificationEnabled, setPublicVerificationEnabled] = useState(true);

  // Board results ledger state
  const [boardResults, setBoardResults] = useState([
    { year: '2022', class10: 97.4, class12: 96.2, distinctions: 112 },
    { year: '2023', class10: 98.2, class12: 97.5, distinctions: 124 },
    { year: '2024', class10: 99.1, class12: 98.4, distinctions: 138 },
    { year: '2025', class10: 99.5, class12: 98.9, distinctions: 145 },
    { year: '2026', class10: 100.0, class12: 99.6, distinctions: 162 },
  ]);

  // For Direct Ledger Updates form
  const [ledgerYear, setLedgerYear] = useState('2027');
  const [ledgerClass10, setLedgerClass10] = useState('100.0');
  const [ledgerClass12, setLedgerClass12] = useState('99.8');
  const [ledgerDistinctions, setLedgerDistinctions] = useState('178');
  const [ledgerToast, setLedgerToast] = useState<string | null>(null);

  // Faculty Database
  const [teachers, setTeachers] = useState([
    { name: 'Dr. Michael Vance', qualification: 'Ph.D in Physics & Chemistry (Stanford)', experience: 14, successRate: 100, subject: 'Senior Physics', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { name: 'Prof. Sarah Jenkins', qualification: 'M.Sc, B.Ed Computer Science (IIT)', experience: 11, successRate: 98.6, subject: 'Computer Science', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { name: 'Mrs. Ananya Desai', qualification: 'M.A in English Literature, B.Ed (Oxford)', experience: 9, successRate: 99.2, subject: 'English Tech-Writing', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
    { name: 'Mr. David Miller', qualification: 'M.Sc in Applied Mathematics (MIT)', experience: 16, successRate: 100, subject: 'Advanced Calculus', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Dr. Evelyn Carter', qualification: 'Ph.D in Bio-Tech & Genetics (Cambridge)', experience: 12, successRate: 97.4, subject: 'Biology Research Lab', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
  ]);
  const [facultySearch, setFacultySearch] = useState('');

  // Sincere School Showcase elements (Editable or togglable)
  const [showcaseFields, setShowcaseFields] = useState({
    vision: "To cultivate computational minds and high-integrity leaders powered by real-time academic precision, experiential learning, and digital fluency.",
    labs: [
      { name: "Digital Smart Lab Block A", info: "Fully loaded with Raspberry Pi arrays, 3D printers, VR workstations, and high-performance quantum computing simulators.", img: roboticsLabImg },
      { name: "Biomedical Genetics Suite", info: "High-spec bio-safety laminar hoods, automated autoclaves, and PCR genetic thermal cyclers for hands-on research.", img: biologyLabImg },
      { name: "Robotics & Avionics Hangar", info: "Unmanned aerial systems (UAS), drone testing corridors, and dynamic autonomous navigation chassis sensors.", img: avionicsHangarImg }
    ],
    achievements: [
      { year: "2025", title: "National Science Championship", rank: "1st Place Gold", desc: "For pioneering local autonomous drone irrigation system built entirely by Grade XI and XII teams." },
      { year: "2026", title: "State Mathematics Olympiad", rank: "Perfect Score Sweep", desc: "12 students achieved perfect scores in Advanced Combinatorics & Calculus categories." }
    ]
  });

  const handleUpdateLedger = (e: React.FormEvent) => {
    e.preventDefault();
    const yr = ledgerYear.trim();
    const c10 = parseFloat(ledgerClass10) || 0;
    const c12 = parseFloat(ledgerClass12) || 0;
    const dist = parseInt(ledgerDistinctions) || 0;

    if (!yr) return;

    // Check if year already exists
    setBoardResults(prev => {
      const exists = prev.some(r => r.year === yr);
      if (exists) {
        return prev.map(r => r.year === yr ? { ...r, class10: c10, class12: c12, distinctions: dist } : r);
      } else {
        return [...prev, { year: yr, class10: c10, class12: c12, distinctions: dist }].sort((a,b) => a.year.localeCompare(b.year));
      }
    });

    setLedgerToast(`Successfully committed ${yr} academic board ledger updates of Class 10th (${c10}%) and Class 12th (${c12}%) with ${dist} distinctions.`);
    setTimeout(() => {
      setLedgerToast(null);
    }, 4500);
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
    t.subject.toLowerCase().includes(facultySearch.toLowerCase()) || 
    t.qualification.toLowerCase().includes(facultySearch.toLowerCase())
  );

  const handleExport = (format: 'pdf' | 'excel') => {
    setShowExportMenu(false);
    
    const date = new Date().toLocaleString();
    const schoolName = "Nexora International Academy";
    
    if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235);
      doc.text("EXECUTIVE INTAKE SUMMARY REPORT", 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(schoolName, 105, 28, { align: 'center' });
      doc.text(`Generated on: ${date}`, 105, 33, { align: 'center' });
      
      // Divider
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 40, 190, 40);
      
      // Admission Overview
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("1. ADMISSION OVERVIEW", 20, 50);
      
      doc.setFontSize(10);
      const overview = [
        ["Total Enquiries", "450"],
        ["Applications Received", "180"],
        ["Documents Verified", "165"],
        ["Admissions Approved", "150"],
        ["Admissions Confirmed", "176 (Current Session)"]
      ];
      
      let y = 60;
      overview.forEach(([label, val]) => {
        doc.text(label, 25, y);
        doc.text(val, 150, y);
        y += 7;
      });
      
      // Conversion Metrics
      y += 10;
      doc.setFontSize(14);
      doc.text("2. CONVERSION METRICS", 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.text("Enquiry to Application Rate:", 25, y); doc.text("40%", 150, y); y += 7;
      doc.text("Application to Enrollment Rate:", 25, y); doc.text("27.8%", 150, y); y += 7;
      
      // Revenue Metrics
      y += 10;
      doc.setFontSize(14);
      doc.text("3. REVENUE METRICS", 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.text("Registration Fees Collected:", 25, y); doc.text("INR 1,26,000", 150, y); y += 7;
      doc.text("Admission Fees Collected:", 25, y); doc.text("INR 8,40,000", 150, y); y += 7;
      doc.text("Outstanding Payments:", 25, y); doc.text("INR 24,500", 150, y); y += 7;
      
      // Seat Utilization
      y += 10;
      doc.setFontSize(14);
      doc.text("4. SEAT UTILIZATION", 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.text("Total Seats:", 25, y); doc.text("301", 150, y); y += 7;
      doc.text("Occupied Seats:", 25, y); doc.text("176", 150, y); y += 7;
      doc.text("Available Seats:", 25, y); doc.text("84", 150, y); y += 7;
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Internal Document - Prepared by Admissions Intelligence Hub`, 105, 280, { align: 'center' });
      
      doc.save(`Executive_Intake_Summary_${new Date().toISOString().split('T')[0]}.pdf`);
    } else {
      const reportData = [
        ["EXECUTIVE INTAKE SUMMARY REPORT"],
        [schoolName],
        [`Generated on: ${date}`],
        [],
        ["SECTION", "METRIC", "VALUE"],
        ["Overview", "Total Enquiries", "450"],
        ["Overview", "Applications Received", "180"],
        ["Overview", "Documents Verified", "165"],
        ["Overview", "Admissions Approved", "150"],
        ["Overview", "Admissions Confirmed", "176"],
        ["Conversion", "Enquiry to App Rate", "40%"],
        ["Conversion", "App to Enrollment Rate", "27.8%"],
        ["Revenue", "Registration Fees", "126000"],
        ["Revenue", "Admission Fees", "840000"],
        ["Revenue", "Outstanding", "24500"],
        ["Utilization", "Total Seats", "301"],
        ["Utilization", "Occupied Seats", "176"],
        ["Utilization", "Available Seats", "84"],
        ["Performance", "Top Source", "Website"],
        ["Performance", "Top Counselor", "Priya Sharma"]
      ];
      
      const ws = XLSX.utils.aoa_to_sheet(reportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Intake Report");
      XLSX.writeFile(wb, `Executive_Intake_Summary_${new Date().toISOString().split('T')[0]}.xlsx`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAdmissionForm(false);
      setShowSuccessToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 pb-20">
      
      {/* 1. PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/70  border-b border-slate-200/60 transition-all duration-300">
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
                MODULE 08
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">Admission & Transparency Hub</h1>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Direct ledger board outputs & prospective parent trust verification matrix.</p>
              </div>
            </div>
          </div>
          
          {/* Dual Toggle for Admin Registry vs Public Verified Dashboard */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
            <button 
              onClick={() => setCurrentMode('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 ${currentMode === 'admin' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Registrar Panel</span>
            </button>
            <button 
              onClick={() => setCurrentMode('public')}
              id="click-to-open-public-dashboard"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 ${currentMode === 'public' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-blue-600 font-extrabold'}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="relative">
                Public Dashboard
                <span className="absolute -top-1 -right-2 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* RENDER DUAL MODE VIEWS */}
      
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: REGISTRAR ADMINISTRATIVE SYSTEM */}
        {currentMode === 'admin' && (
          <motion.main 
            key="admin-mode"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            {/* PUBLIC PORTAL HERO ACTION BANNER */}
            <div className="bg-blue-600 rounded-[32px] p-6 mb-8 border border-blue-500 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-2 relative z-10">
                <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-md border border-white/30">
                  Transparency Accelerator
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                  Foster Trust with prospective Parents
                </h3>
                <p className="text-xs text-blue-50 font-medium max-w-2xl leading-relaxed">
                  Avoid static PDFs and hidden pricing. NexoraOS AI creates a dynamically synced, 100% verified public portal that showcases certified teachers, world-class smart labs, and direct board results directly to parents.
                </p>
              </div>
              <button
                onClick={() => setCurrentMode('public')}
                className="px-6 py-3 bg-white text-blue-600 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shrink-0 group shadow-xl relative z-10 cursor-pointer hover:bg-blue-50"
              >
                <span>Click to Open Public Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* ADMISSION OVERVIEW CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
               {[
                 { label: 'Active Cycle', value: '2026-27', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                 { label: 'Total Enquiries', value: '450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                 { label: 'Applications', value: '180', icon: FileText, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                 { label: 'Seats Filled', value: '176', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                 { label: 'Seats Left', value: '84', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
                 { label: 'Conversion', value: '27.8%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
               ].map((stat, i) => (
                 <div 
                   key={i} 
                   className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                 >
                   <div className={`p-2 w-fit rounded-xl ${stat.bg} ${stat.color} mb-3`}>
                     <stat.icon className="w-4 h-4" />
                   </div>
                   <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">{stat.label}</span>
                      <span className="text-lg font-black text-slate-900 tracking-tight">{stat.value}</span>
                   </div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN - CORE MODULE & TRUST CONTROLS (65%) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* MANAGEMENT CONTROLS PANEL (School Owner Command Center) */}
                <section className="bg-slate-50 text-slate-900 border border-slate-200 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white border border-slate-200 text-indigo-600 rounded-2xl shadow-sm">
                        <Settings className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Trust Verification Controls</h3>
                        <p className="text-xs text-slate-500 font-medium">Verify credentials and manage public portal exposure configuration.</p>
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      AUTOPILOT LOCK ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT CELL - TOGGLES */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#2563EB]">Visibility Config</h4>
                      
                      {/* Control 1 */}
                      <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-tight block">Global Verification Portal</span>
                          <span className="text-[10px] text-slate-500 block font-semibold">Enable parent-facing dashboards</span>
                        </div>
                        <button 
                          onClick={() => setPublicVerificationEnabled(!publicVerificationEnabled)}
                          className={`w-11 h-6 rounded-full transition-all relative ${publicVerificationEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${publicVerificationEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* Control 2 */}
                      <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-tight block">World-Class Showcase</span>
                          <span className="text-[10px] text-slate-500 block font-semibold">Display smart labs & vision systems</span>
                        </div>
                        <button 
                          disabled={!publicVerificationEnabled}
                          onClick={() => setVerifyShowcase(!verifyShowcase)}
                          className={`w-11 h-6 rounded-full transition-all relative ${!publicVerificationEnabled ? 'opacity-40 cursor-not-allowed' : ''} ${verifyShowcase && publicVerificationEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${verifyShowcase && publicVerificationEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* Control 3 */}
                      <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-tight block">Faculty Credentials</span>
                          <span className="text-[10px] text-slate-500 block font-semibold">Publish teacher success index rates</span>
                        </div>
                        <button 
                          disabled={!publicVerificationEnabled}
                          onClick={() => setVerifyFaculty(!verifyFaculty)}
                          className={`w-11 h-6 rounded-full transition-all relative ${!publicVerificationEnabled ? 'opacity-40 cursor-not-allowed' : ''} ${verifyFaculty && publicVerificationEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${verifyFaculty && publicVerificationEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* Control 4 */}
                      <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-tight block">5-Year Board Results</span>
                          <span className="text-[10px] text-slate-500 block font-semibold">Display passing success trajectories</span>
                        </div>
                        <button 
                          disabled={!publicVerificationEnabled}
                          onClick={() => setVerifyBoardResults(!verifyBoardResults)}
                          className={`w-11 h-6 rounded-full transition-all relative ${!publicVerificationEnabled ? 'opacity-40 cursor-not-allowed' : ''} ${verifyBoardResults && publicVerificationEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${verifyBoardResults && publicVerificationEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>

                    {/* RIGHT CELL - DIRECT LEDGER STAT UPDATOR */}
                    <div className="space-y-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-1.5 text-amber-600">
                        <Sliders className="w-3.5 h-3.5" />
                        <h4 className="text-xs font-black uppercase tracking-widest">Direct Ledger Updates</h4>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                        Input yearly Class 10th and 12th state exam pass rates and distinction numbers directly to append to our public trust chart reactively.
                      </p>

                      <form onSubmit={handleUpdateLedger} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Session Year</label>
                            <input 
                              required 
                              type="text" 
                              value={ledgerYear} 
                              onChange={(e) => setLedgerYear(e.target.value)}
                              placeholder="2027" 
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none font-mono text-slate-900 focus:border-blue-300 transition-colors" 
                            />
                          </div>
                          <div>
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Distinctions</label>
                            <input 
                              required 
                              type="number" 
                              value={ledgerDistinctions} 
                              onChange={(e) => setLedgerDistinctions(e.target.value)}
                              placeholder="175" 
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none font-mono text-slate-900 focus:border-blue-300 transition-colors" 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Class X Pass %</label>
                            <input 
                              required 
                              type="text" 
                              value={ledgerClass10} 
                              onChange={(e) => setLedgerClass10(e.target.value)}
                              placeholder="100.0" 
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none font-mono text-slate-900 focus:border-blue-300 transition-colors" 
                            />
                          </div>
                          <div>
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Class XII Pass %</label>
                            <input 
                              required 
                              type="text" 
                              value={ledgerClass12} 
                              onChange={(e) => setLedgerClass12(e.target.value)}
                              placeholder="99.8" 
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none font-mono text-slate-900 focus:border-blue-300 transition-colors" 
                            />
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-blue-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Commit to Public Trust Layout</span>
                        </button>
                      </form>
                      
                      {ledgerToast && (
                        <div className="text-[9px] text-[#10B981] font-bold mt-1 bg-emerald-50 border border-emerald-100 p-2 rounded-lg leading-snug">
                          {ledgerToast}
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* SECTION 1: ADMISSION ENQUIRY CENTER */}
                <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm overflow-hidden relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                        <Search className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Admission Enquiry CRM</h3>
                        <p className="text-xs text-slate-500 font-medium">Manage and track every prospective student lead in real-time.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 select-none">
                          <Filter className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Filter Leads2</span>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {PIPELINE_LEADS.map((lead, i) => (
                       <motion.div 
                        key={i} 
                        whileHover={{ y: -4 }}
                        className="p-6 border border-slate-100 bg-slate-50/50 rounded-[28px] hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all flex flex-col gap-5 border-l-4 border-l-blue-500"
                       >
                         <div className="flex justify-between items-start">
                            <div className="space-y-1">
                               <div className="flex items-center gap-2">
                                  <h4 className="text-base font-black text-slate-900">{lead.name}</h4>
                                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-blue-100">{lead.status}</span>
                               </div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lead.id}</p>
                            </div>
                            <div className="text-right">
                               <div className="text-[10px] font-black text-blue-600 uppercase">Lead Score</div>
                               <div className="text-xl font-black text-slate-900">{lead.score}%</div>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200/50">
                            <div className="space-y-1">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Program</span>
                               <p className="text-xs font-bold text-slate-700">{lead.program}</p>
                            </div>
                            <div className="space-y-1">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Counselor</span>
                               <p className="text-xs font-bold text-slate-700">{lead.counselor}</p>
                            </div>
                         </div>

                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-rose-500">
                               <Clock className="w-3.5 h-3.5" />
                               <span className="text-[10px] font-black uppercase tracking-tight">Next: {lead.nextFollowUp}</span>
                            </div>
                            <div className="flex gap-2">
                               <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-500 shadow-sm transition-all"><Phone className="w-3.5 h-3.5" /></button>
                               <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-500 shadow-sm transition-all"><Mail className="w-3.5 h-3.5" /></button>
                            </div>
                         </div>
                       </motion.div>
                     ))}
                     <button className="md:col-span-2 py-4 border-2 border-dashed border-slate-100 rounded-[28px] text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-blue-600 hover:border-blue-200 transition-all">
                        Expand Pipeline Registry (140+ Leads)
                     </button>
                  </div>
                </section>

                {/* SECTION 2: ONLINE APPLICATION MANAGEMENT */}
                <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Digital Application Review</h3>
                        <p className="text-xs text-slate-500 font-medium">Verify credentials and oversee the electronic submission workflow.</p>
                      </div>
                    </div>
                    <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                       Active Review
                    </div>
                  </div>

                  <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] space-y-8">
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-[24px] bg-white shadow-xl shadow-slate-200 border border-slate-100 flex items-center justify-center text-2xl font-black text-slate-800">KV</div>
                           <div>
                              <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">Kabir Vohra</h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Application ID: #APP-2026-9021</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="text-[10px] font-black uppercase text-slate-400 mb-1 block tracking-widest">Global Status</span>
                           <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-100">Ready for Review</span>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                           <span>Application Completion Progress</span>
                           <span className="text-blue-600">85% Completed</span>
                        </div>
                        <div className="h-3 w-full bg-white border border-slate-200 rounded-full overflow-hidden shadow-inner font-bold">
                           <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                           {['Personal Info', 'Academic Stats', 'Docs Upload', 'Parent Data', 'Final Review'].map((step, i) => (
                             <div key={i} className="flex flex-col items-center gap-1.5 opacity-80">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-sm ${i < 4 ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-200 text-slate-300'}`}>
                                   {i < 4 ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                </div>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight text-center">{step}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm space-y-4">
                        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                           Intelligence Insights
                        </h5>
                        <div className="flex items-start gap-4">
                           <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                              <ZapOff className="w-5 h-5" />
                           </div>
                           <div className="flex-1">
                              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                 Missing Documents: <span className="text-rose-500 font-bold">Migration Certificate (Original)</span> and <span className="text-rose-500 font-bold">Medical Fitness Card</span> are required for final approval committee review.
                              </p>
                           </div>
                        </div>
                     </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                         <button className="flex-1 py-3 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                            <CheckCircle className="w-4 h-4" />
                            Recommend for Approval
                         </button>
                         <button className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer">
                            Flag Missing Documents
                         </button>
                      </div>
                  </div>
                </section>

                {/* SECTION 3: ADMISSION WORKFLOW TRACKER */}
                <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">Institutional Admission Pipeline</h3>
                      <p className="text-xs text-slate-500 font-medium">Visualization of the multi-stage student verification and enrollment journey.</p>
                    </div>
                  </div>

                  <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                     {WORKFLOW_STEPS.map((step, i) => (
                       <div key={i} className="relative group">
                          <div className={`absolute -left-[24px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-all ${
                            step.status === 'Completed' ? 'bg-emerald-500' : 
                            step.status === 'In Progress' ? 'bg-blue-500 ring-4 ring-blue-100' : 'bg-slate-100'
                          }`} />
                          <div className={`p-5 rounded-[24px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            step.status === 'Completed' ? 'bg-emerald-50/20 border-emerald-100/50' : 
                            step.status === 'In Progress' ? 'bg-blue-50/30 border-blue-100 shadow-md translate-x-1' : 'bg-slate-50/30 border-slate-100'
                          }`}>
                             <div className="space-y-1">
                                <h5 className={`text-sm font-black ${step.status === 'Upcoming' ? 'text-slate-400' : 'text-slate-900'} uppercase tracking-tight`}>{step.title}</h5>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.dept} Office</span>
                             </div>
                             <div className="flex items-center gap-6">
                                <div className="text-right">
                                   <span className="text-[9px] font-black uppercase text-slate-400 block tracking-widest">Status</span>
                                   <span className={`text-[10px] font-black uppercase ${
                                      step.status === 'Completed' ? 'text-emerald-600' : 
                                      step.status === 'In Progress' ? 'text-blue-600 font-mono' : 'text-slate-400'
                                   }`}>{step.status}</span>
                                </div>
                                <div className="text-right border-l border-slate-200/50 pl-6 min-w-[80px]">
                                   <span className="text-[9px] font-black uppercase text-slate-400 block tracking-widest">Duration</span>
                                   <span className="text-[10px] font-black text-slate-800">{step.time}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN - ADMISSION INTELLIGENCE DASHBOARD (35%) */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-28 space-y-8">
                  
                  {/* ADMISSION INTELLIGENCE DASHBOARD CONTAINER */}
                  <div className="bg-[#0F172A] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                     
                     <div className="relative z-10 space-y-8">
                        <div className="flex justify-between items-start">
                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Executive Overview</h4>
                              <h2 className="text-xl font-black tracking-tight leading-tight uppercase">Admission<br />Intelligence</h2>
                           </div>
                           <div className="p-4 bg-white/5  border border-white/10 rounded-2xl shadow-2xl">
                              <Activity className="w-6 h-6 text-blue-400" />
                           </div>
                        </div>

                        {/* ADMISSION FUNNEL */}
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Intake Funnel Efficiency</span>
                              <Target className="w-4 h-4 text-blue-400" />
                           </div>
                           <div className="h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={ADMISSION_FUNNEL} layout="vertical" margin={{ left: -10, right: 30 }}>
                                    <XAxis type="number" hide />
                                    <YAxis 
                                      dataKey="stage" 
                                      type="category" 
                                      axisLine={false} 
                                      tickLine={false} 
                                      tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }}
                                      width={100}
                                    />
                                    <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={25}>
                                       {ADMISSION_FUNNEL.map((entry, index) => (
                                         <Cell key={`cell-${index}`} fill={entry.color} />
                                       ))}
                                    </Bar>
                                 </BarChart>
                              </ResponsiveContainer>
                           </div>
                        </div>

                        {/* SEAT OCCUPANCY ANALYTICS */}
                        <div className="space-y-6 pt-4 border-t border-white/5">
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block px-1">Capacity Statistics</span>
                            
                            <div className="flex items-center gap-8 px-2">
                               <div className="w-32 h-32 relative">
                                  <ResponsiveContainer width="100%" height="100%">
                                     <PieChart>
                                        <Pie 
                                          data={OCCUPANCY_DATA} 
                                          innerRadius={45} 
                                          outerRadius={60} 
                                          dataKey="value" 
                                          stroke="none"
                                          paddingAngle={5}
                                        >
                                           {OCCUPANCY_DATA.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                                        </Pie>
                                     </PieChart>
                                  </ResponsiveContainer>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-1">
                                     <span className="text-xl font-black font-mono">67%</span>
                                     <span className="text-[7px] font-bold uppercase tracking-widest text-slate-500">Filled</span>
                                  </div>
                               </div>
                               <div className="flex-1 space-y-3">
                                  {OCCUPANCY_DATA.map((d, i) => (
                                    <div key={i} className="flex justify-between items-center group">
                                       <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                                          <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{d.name}</span>
                                       </div>
                                       <span className="text-[11px] font-black font-mono">{d.value}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                        </div>

                     </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.main>
        )}

        {/* VIEW 2: PARENT-FACING TRANSPARENCY PORTAL */}
        {currentMode === 'public' && (
          <motion.main 
            key="public-mode"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"
          >
            {/* PARENT INTRO HEADER */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Verified Parent Trust Portal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
                Verified School Performance Ledger
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
                Explore real, non-fabricated metrics. Here, credentials, world-class smart labs infrastructure, and historic 5-year board results are transparently presented.
              </p>
            </div>

            {/* ERROR / EXPOSURE BANNER IF DEACTIVATED */}
            {!publicVerificationEnabled && (
              <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-3xl p-6 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <h4 className="text-base font-black uppercase text-amber-900">Transparency Dashboard Hidden</h4>
                <p className="text-xs text-amber-700 font-semibold max-w-md mx-auto">
                  The School Administration has currently disabled public verification access inside the Control Panel. Re-enable "Global Verification Portal" in the Registrar Panel to render these credentials.
                </p>
                <button 
                  onClick={() => setCurrentMode('admin')} 
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold leading-none cursor-pointer"
                >
                  Return and Enable
                </button>
              </div>
            )}

            {publicVerificationEnabled && (
              <div className="space-y-16">
                
                {/* PART 1: SMART SCHOOL SHOWCASE (ABOUT LAYOUT) */}
                {verifyShowcase && (
                  <section className="bg-white border border-slate-200/80 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">About Our Vision</span>
                        <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                          <Building className="w-6 h-6 text-blue-500" />
                          Smart School Showcase
                        </h3>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 border border-blue-105 text-blue-700 rounded-full text-xs font-bold font-mono">
                        Infrastructure & Vision Audited ✓
                      </span>
                    </div>

                    {/* Visual Campus Banner */}
                    <div className="relative rounded-[32px] overflow-hidden h-[340px] shadow-lg border border-slate-200 bg-slate-950">
                      <img 
                        src={modernCampusImg} 
                        alt="Nexora International Academy Campus" 
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex items-end p-6 sm:p-10">
                        <div className="text-white space-y-2">
                          <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                            PRESTIGIOUS INFRASTRUCTURE
                          </span>
                          <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Nexora International Academy</h4>
                          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
                            A world-class environment of interactive learning corridors, clean labs, and computer research hubs designed to foster high-integrity minds.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vision block */}
                    <div className="bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-[32px] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2.5 h-full bg-blue-600" />
                      <p className="text-slate-850 text-sm sm:text-base md:text-lg font-black leading-relaxed italic max-w-4xl text-slate-800">
                        "{showcaseFields.vision}"
                      </p>
                    </div>

                    {/* Labs and Infrastructure Cards */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 pl-1 font-mono">World-Class Smart Labs & Research Suites</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {showcaseFields.labs.map((lab: any, i: number) => (
                          <div 
                            key={i} 
                            className="bg-slate-50 border border-slate-150 rounded-[28px] overflow-hidden flex flex-col justify-between hover:border-blue-300 hover:shadow-xl transition-all group bg-white border"
                          >
                            <div className="relative h-44 overflow-hidden border-b border-slate-100 bg-slate-900">
                              <img 
                                src={lab.img} 
                                alt={lab.name} 
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-black/60  text-white flex items-center justify-center font-bold text-xs font-mono">
                                0{i+1}
                              </div>
                            </div>
                            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                              <div className="space-y-2">
                                <h5 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors uppercase leading-tight">{lab.name}</h5>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed leading-snug">{lab.info}</p>
                              </div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-5 border-t border-slate-100 pt-3 flex items-center gap-1.5 leading-none">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Physical Spec Verified
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements Display */}
                    <div className="space-y-4 mt-8">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 pl-1">Annual Sports & Academic Achievements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {showcaseFields.achievements.map((ach, i) => (
                          <div 
                            key={i}
                            className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-[32px] p-6 sm:p-8 flex items-start gap-4 border border-slate-850"
                          >
                            <div className="p-3 bg-amber-500/15 text-amber-400 rounded-2xl shrink-0 mt-1">
                              <Trophy className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2.5">
                                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest rounded border border-amber-500/30 font-mono">{ach.year}</span>
                                <span className="text-xs font-extrabold text-[#111827] text-white/90 bg-white/5 px-2 py-0.5 rounded font-mono uppercase tracking-wide leading-none">{ach.rank}</span>
                              </div>
                              <h5 className="text-base font-extrabold tracking-tight uppercase">{ach.title}</h5>
                              <p className="text-xs text-slate-400 font-semibold leading-relaxed">{ach.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* PART 2: VERIFIED FACULTY BIO-DATA DIRECTORY */}
                {verifyFaculty && (
                  <section className="bg-white border border-slate-200/80 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">Core Competencies</span>
                        <h3 className="text-2xl font-black text-slate-905 uppercase tracking-tight flex items-center gap-2 text-slate-900">
                          <GraduationCap className="w-6 h-6 text-indigo-500" />
                          Verified Faculty Bio-Data Explorer
                        </h3>
                      </div>
                      
                      {/* Search Bar */}
                      <div className="w-full md:w-80 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search teachers or specialties..."
                          value={facultySearch}
                          onChange={(e) => setFacultySearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-bold"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 max-w-4xl font-medium leading-relaxed">
                      NexoraOS AI dynamically verifies and aggregates educator qualification credentials, university origins, and class achievement records. Personal metrics such as cell numbers and private emails are strictly restricted for digital security protection.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTeachers.map((t, i) => (
                        <div 
                          key={i}
                          className="bg-slate-50 border border-slate-200/70 hover:border-indigo-400 hover:shadow-xl hover:bg-white transition-all rounded-[32px] p-6 flex flex-col justify-between group"
                        >
                          <div className="space-y-5">
                            <div className="flex items-center gap-4">
                              <img 
                                src={t.img} 
                                alt={t.name} 
                                loading="lazy"
                                className="w-14 h-14 rounded-full object-cover shadow-inner shrink-0 border border-slate-300"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-all uppercase leading-tight">{t.name}</h4>
                                <span className="text-[10.5px] font-mono tracking-wide uppercase text-indigo-600 font-extrabold block mt-0.5">{t.subject}</span>
                              </div>
                            </div>

                            <div className="space-y-2.5 pt-3 border-t border-slate-200/50">
                              <div className="flex justify-between text-xs font-semibold text-slate-500">
                                <span className="uppercase text-[9px] tracking-widest text-slate-400">Verifiable Qualification:</span>
                                <span className="text-slate-800 text-right font-bold font-sans max-w-[150px]">{t.qualification}</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold text-slate-500">
                                <span className="uppercase text-[9px] tracking-widest text-slate-400">Teaching Tenure:</span>
                                <span className="text-slate-800 text-right font-black font-mono">{t.experience} Years</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold text-slate-500">
                                <span className="uppercase text-[9px] tracking-widest text-slate-400">Board Exam Success Rate:</span>
                                <span className="text-emerald-650 text-emerald-600 font-black font-mono bg-emerald-50 px-2 py-0.5 rounded text-xs">{t.successRate}% Distinctions</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-100/80 border border-slate-200/40 p-2.5 rounded-2xl flex items-center gap-2 mt-6 justify-center">
                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">CELL & EMAIL SECURED</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredTeachers.length === 0 && (
                      <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase tracking-widest border border-dashed border-slate-200 rounded-3xl">
                        No teachers found matching search parameters.
                      </div>
                    )}
                  </section>
                )}

                {/* PART 3: 5-YEAR BOARD RESULT ANALYTICS TRACKER */}
                {verifyBoardResults && (
                  <section className="bg-white border border-slate-200/80 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-10">
                    <div className="flex flex-col md:flex-row items-add-center md:items-center justify-between gap-4 border-b border-slate-101 pb-6 border-slate-100">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Academic Excellence Ledger</span>
                        <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                          <BarChart3 className="w-6 h-6 text-emerald-500" />
                          5-Year Board Result Analytics Tracker
                        </h3>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 border border-emerald-110 text-emerald-700 rounded-full text-xs font-bold font-mono uppercase tracking-wider">
                        Direct Registrar Ledger Synced ✓
                      </span>
                    </div>

                    {/* Chart Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Interactive Recharts Graph */}
                      <div className="lg:col-span-8 space-y-3">
                        <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Passing & Success Trajectories (%)</span>
                        
                        <div className="h-80 w-full bg-slate-50/50 border border-slate-100 rounded-3xl p-4 sm:p-6 shadow-inner">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={boardResults} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis 
                                dataKey="year" 
                                tickLine={false} 
                                axisLine={false}
                                tick={{ fill: '#64748B', fontWeight: 900, fontSize: 10 }}
                              />
                              <YAxis 
                                domain={[90, 100]} 
                                tickLine={false} 
                                axisLine={false}
                                tick={{ fill: '#64748B', fontWeight: 900, fontSize: 10 }}
                              />
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#0F172A', color: 'white', borderRadius: '16px', border: 'none', fontSize: '11px', fontWeight: 'bold' }} 
                              />
                              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                              <Line 
                                type="monotone" 
                                dataKey="class10" 
                                name="Class 10th Pass Rate" 
                                stroke="#2563EB" 
                                strokeWidth={4} 
                                activeDot={{ r: 8 }} 
                                dot={{ stroke: '#2563EB', strokeWidth: 2, r: 4, fill: 'white' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="class12" 
                                name="Class 12th Pass Rate" 
                                stroke="#10B981" 
                                strokeWidth={4} 
                                activeDot={{ r: 8 }} 
                                dot={{ stroke: '#10B981', strokeWidth: 2, r: 4, fill: 'white' }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Side Analytics box & Hall of fame list */}
                      <div className="lg:col-span-4 space-y-5">
                        <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Subject Distinctions & Merit Hall</span>
                        
                        <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-5">
                          <div className="space-y-1">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#2563EB] text-blue-400">Total Distinctions</h4>
                            <p className="text-3xl font-black font-sans leading-none">
                              {boardResults.reduce((acc, curr) => acc + curr.distinctions, 0)}
                            </p>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase">Aggregated Class 10/12 Subject Distinctions</span>
                          </div>

                          <div className="space-y-3.5 border-t border-slate-800 pt-5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Dynamic passing metrics index</span>
                            
                            <div className="space-y-2.5">
                              {boardResults.slice(-3).map((r, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs">
                                  <span className="text-slate-350 text-slate-300 font-bold">Academic Session {r.year}:</span>
                                  <span className="text-emerald-450 text-emerald-400 font-black font-mono">{r.distinctions} Elite Certs</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Rankers List */}
                        <div className="bg-slate-50 border border-slate-150 rounded-3xl p-5 space-y-3">
                          <span className="text-[10px] font-black uppercase text-slate-450 text-slate-500 tracking-wider">Session 2026 Academic Top Rankers</span>
                          
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-3 bg-white p-2.5 border border-slate-100 rounded-xl">
                              <span className="w-5 h-5 bg-amber-500 text-white font-extrabold text-[10px] flex items-center justify-center rounded-full leading-none">1</span>
                              <div className="flex-1">
                                <h5 className="text-xs font-black text-slate-900 uppercase tracking-tight leading-none">Shreya Ghoshal</h5>
                                <p className="text-[9px] text-slate-400 uppercase font-semibold leading-none mt-1">Class XII Science</p>
                              </div>
                              <span className="text-xs font-black text-blue-600 font-mono">99.6%</span>
                            </div>

                            <div className="flex items-center gap-3 bg-white p-2.5 border border-slate-100 rounded-xl">
                              <span className="w-5 h-5 bg-slate-400 text-white font-extrabold text-[10px] flex items-center justify-center rounded-full leading-none">2</span>
                              <div className="flex-1">
                                <h5 className="text-xs font-black text-slate-900 uppercase tracking-tight leading-none">Rizwan Ahmed</h5>
                                <p className="text-[9px] text-slate-400 uppercase font-semibold leading-none mt-1">Class X General</p>
                              </div>
                              <span className="text-xs font-black text-blue-600 font-mono">99.1%</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </section>
                )}

              </div>
            )}
          </motion.main>
        )}

      </AnimatePresence>

      {/* FLOATING ACTION OVERLAY (Only visible block in registrar pane or when export menu triggers) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
         <div className="relative">
           <AnimatePresence>
             {showExportMenu && (
               <motion.div 
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
                 className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-[#0F172A] border border-white/10 rounded-3xl p-2 shadow-2xl overflow-hidden"
               >
                 <button 
                   onClick={() => handleExport('pdf')}
                   className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-white"
                 >
                   <div className="p-2 bg-rose-500/20 text-rose-500 rounded-xl">
                     <FileText className="w-4 h-4" />
                   </div>
                   <div className="text-left">
                      <span className="text-xs font-black uppercase tracking-tight block">PDF Document</span>
                      <span className="text-[8px] text-slate-400 uppercase font-bold">Standard Report</span>
                   </div>
                 </button>
                 <button 
                   onClick={() => handleExport('excel')}
                   className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-white"
                 >
                   <div className="p-2 bg-emerald-500/20 text-emerald-500 rounded-xl">
                     <FileSpreadsheet className="w-4 h-4" />
                   </div>
                   <div className="text-left">
                      <span className="text-xs font-black uppercase tracking-tight block">Excel Sheet</span>
                      <span className="text-[8px] text-slate-400 uppercase font-bold">Data Analysis</span>
                   </div>
                 </button>
               </motion.div>
             )}
           </AnimatePresence>

           <motion.div 
             initial={{ y: 100 }}
             animate={{ y: 0 }}
             className="flex items-center gap-2 p-1.5 bg-[#0F172A]/90  border border-white/10 rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
           >
             <button 
               onClick={() => setShowExportMenu(!showExportMenu)}
               className="px-6 py-3 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30 font-bold"
             >
                 <Printer className="w-3.5 h-3.5" />
                 <span>Export Executive Intake Summary</span>
             </button>
             {currentMode === 'admin' ? (
               <button 
                onClick={() => setShowAdmissionForm(true)}
                className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-colors cursor-pointer"
               >
                  <Plus className="w-5 h-5 flex items-center justify-center leading-none" />
               </button>
             ) : (
               <button 
                onClick={() => setCurrentMode('admin')}
                className="px-4 py-2 bg-slate-800 text-slate-200 text-[10px] font-black uppercase rounded-full border border-slate-700 hover:text-white transition-colors cursor-pointer"
               >
                  Admin View
               </button>
             )}
           </motion.div>
         </div>
      </div>

      {/* ADMISSION FORM MODAL - RESTORED FOR COMPLIANCE */}
      <AnimatePresence>
        {showAdmissionForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAdmissionForm(false)}
               className="absolute inset-0 bg-slate-900/60 "
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
             >
                {/* Modal Header */}
                <div className="p-8 border-b border-slate-101 flex items-center justify-between bg-slate-50/50">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-600 text-white rounded-2xl">
                         <UserPlus className="w-6 h-6" />
                      </div>
                      <div>
                         <h2 className="text-xl font-black text-slate-900 tracking-tight">New Student Admission</h2>
                         <p className="text-xs text-slate-500 font-medium">Stage 01: Application Registration & Documentation</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setShowAdmissionForm(false)}
                     className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-450"
                   >
                      <X className="w-6 h-6" />
                   </button>
                </div>

                {/* Modal Body - Scrollable Form */}
                <div className="flex-1 overflow-y-auto p-8">
                   <form id="admission-form" onSubmit={handleFormSubmit} className="space-y-12">
                      
                      {/* Section: Student Information */}
                      <div className="space-y-6">
                         <div className="flex items-center gap-3 border-l-4 border-blue-600 pl-4">
                            <h3 className="text-sm font-black text-slate-905 uppercase tracking-widest leading-none">Student Information</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Full Name</label>
                               <input required type="text" placeholder="John Doe" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                               <input required type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                               <select required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" defaultValue="">
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                               </select>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Aadhaar Number (Optional)</label>
                               <input type="text" placeholder="XXXX-XXXX-XXXX" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Previous School</label>
                               <input type="text" placeholder="Name of institution" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
                            </div>
                         </div>
                      </div>

                      {/* Section: Parent Information */}
                      <div className="space-y-6">
                         <div className="flex items-center gap-3 border-l-4 border-indigo-600 pl-4">
                            <h3 className="text-sm font-black text-slate-905 uppercase tracking-widest leading-none">Parent Information</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Father Name</label>
                               <input required type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mother Name</label>
                               <input required type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                               <input required type="tel" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                               <input required type="email" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" />
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Residential Address</label>
                               <textarea className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold min-h-[100px] outline-none" />
                            </div>
                         </div>
                      </div>

                      {/* Section: Academic Information */}
                      <div className="space-y-6">
                         <div className="flex items-center gap-3 border-l-4 border-emerald-600 pl-4">
                            <h3 className="text-sm font-black text-slate-905 uppercase tracking-widest leading-none">Academic Information</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class Applying For</label>
                               <select required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" defaultValue="">
                                  <option value="">Select Class</option>
                                  <option>Class IX</option>
                                  <option>Class X</option>
                                  <option>Class XI</option>
                                  <option>Class XII</option>
                               </select>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stream (If applicable)</label>
                               <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" defaultValue="">
                                  <option>None</option>
                                  <option>Science</option>
                                  <option>Commerce</option>
                                  <option>Humanities</option>
                               </select>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Previous Percentage</label>
                               <input type="number" placeholder="%" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" />
                            </div>
                         </div>
                      </div>

                      {/* Section: Document Upload */}
                      <div className="space-y-6">
                         <div className="flex items-center gap-3 border-l-4 border-rose-600 pl-4">
                            <h3 className="text-sm font-black text-slate-905 uppercase tracking-widest leading-none">Document Upload</h3>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                              { label: 'Student Photo', icon: UserPlus },
                              { label: 'Birth Certificate', icon: FileText },
                              { label: 'Transfer Cert (TC)', icon: History },
                              { label: 'Aadhaar Card', icon: ShieldCheck },
                            ].map((doc, i) => (
                              <div key={i} className="group relative p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all flex flex-col items-center gap-3 text-center">
                                 <div className="p-3 bg-white text-slate-400 rounded-2xl group-hover:text-blue-500 group-hover:scale-110 transition-all shadow-sm">
                                    <doc.icon className="w-5 h-5" />
                                 </div>
                                 <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-600">{doc.label}</span>
                                 <button type="button" className="text-[8px] font-black text-blue-600 uppercase tracking-widest underline underline-offset-4">Click to Upload</button>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* Section: Admission Details */}
                      <div className="space-y-6 pt-6 border-t border-slate-200">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admission Session</label>
                               <input disabled value="2026-27" className="w-full px-5 py-3.5 bg-slate-100 border border-slate-250 text-slate-500 cursor-not-allowed text-sm font-bold rounded-2xl" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admission Number</label>
                               <input disabled value="ADM/2026/0842" className="w-full px-5 py-3.5 bg-slate-100 border border-slate-250 text-slate-500 cursor-not-allowed text-sm font-bold rounded-2xl" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registration Date</label>
                               <input disabled value={new Date().toLocaleDateString()} className="w-full px-5 py-3.5 bg-slate-100 border border-slate-250 text-slate-500 cursor-not-allowed text-sm font-bold rounded-2xl" />
                            </div>
                         </div>
                      </div>
                   </form>
                </div>

                {/* Modal Footer */}
                <div className="p-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <button 
                       type="button"
                       onClick={() => setShowAdmissionForm(false)}
                       className="px-6 py-3 border border-slate-200 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-sm"
                      >
                         Cancel
                      </button>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                       type="button"
                       className="px-6 py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-705 transition-all shadow-sm flex items-center gap-2"
                      >
                         <History className="w-3.5 h-3.5" />
                         Save Draft
                      </button>
                      <button 
                       form="admission-form"
                       type="submit"
                       disabled={isSubmitting}
                       className={`px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                         {isSubmitting ? (
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                         ) : (
                           <CheckCircle className="w-4 h-4" />
                         )}
                         {isSubmitting ? 'Processing...' : 'Submit Application'}
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
           initial={{ opacity: 0, y: 50, x: '-50%' }}
           animate={{ opacity: 1, y: 0, x: '-50%' }}
           exit={{ opacity: 0, y: 50, x: '-50%' }}
           className="fixed bottom-12 left-1/2 z-[110] bg-emerald-500 text-white px-8 py-4 rounded-[20px] shadow-2xl flex items-center gap-4 border border-emerald-400"
          >
             <div className="p-2 bg-white/20 rounded-xl">
                <CheckCircle className="w-5 h-5" />
             </div>
             <div>
                <p className="text-xs font-black uppercase tracking-widest">Admission Application Created Successfully</p>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-tight">Student added to pipeline & tracking system</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
