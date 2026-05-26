import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft,
  DollarSign, 
  CreditCard, 
  Download, 
  Settings, 
  Layers, 
  FileText, 
  Calendar, 
  Users, 
  ShieldCheck, 
  RefreshCw,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  Code,
  Sliders,
  Sparkles,
  Info,
  Check,
  Printer
} from 'lucide-react';

interface StaffSalaryRecord {
  id: string;
  name: string;
  role: string;
  department: string;
  grade: string;
  basicPay: number;
  hra: number; // House Rent Allowance
  ta: number;  // Travel Allowance
  da: number;  // Dearness Allowance
  pf: number;  // Provident Fund contribution
  tds: number; // Tax Deducted at Source
  lopDays: number; // Loss of pay days
  lopAmount: number; // Loss of pay deduction
  attendanceSync: string; // "24 / 24 Days" etc
  attendancePercentage: number;
  status: 'Processed' | 'Pending Sync' | 'Draft';
}

const INITIAL_STAFF_PAYROLL_DATA: StaffSalaryRecord[] = [
  {
    id: "EMP-2026-01",
    name: "Dr. Rajesh Mukherji",
    role: "Director & Principal",
    department: "Executive Branch",
    grade: "Senior Ex-1",
    basicPay: 150000,
    hra: 30000,
    ta: 10000,
    da: 15000,
    pf: 12000,
    tds: 18000,
    lopDays: 0,
    lopAmount: 0,
    attendanceSync: "24 of 24 Working Days",
    attendancePercentage: 100,
    status: "Processed"
  },
  {
    id: "EMP-2026-03",
    name: "Prof. Amrita Sen",
    role: "HOD Computer Science",
    department: "Science & Engineering",
    grade: "Senior Faculty-3",
    basicPay: 95000,
    hra: 19000,
    ta: 6000,
    da: 9500,
    pf: 9500,
    tds: 7500,
    lopDays: 0,
    lopAmount: 0,
    attendanceSync: "23 of 24 Working Days",
    attendancePercentage: 95.8,
    status: "Processed"
  },
  {
    id: "EMP-2026-04",
    name: "Ms. Sarah Jenkins",
    role: "Senior English Lecturer",
    department: "Humanities & Writing",
    grade: "Lecturer-2",
    basicPay: 72000,
    hra: 14400,
    ta: 5000,
    da: 7200,
    pf: 7200,
    tds: 4500,
    lopDays: 1,
    lopAmount: 3000,
    attendanceSync: "22 of 24 Working Days",
    attendancePercentage: 91.6,
    status: "Processed"
  },
  {
    id: "EMP-2026-08",
    name: "Mr. Vikrant Patil",
    role: "Physics Lab Coordinator",
    department: "Science & Physics",
    grade: "Technical-1",
    basicPay: 55000,
    hra: 11000,
    ta: 4000,
    da: 5500,
    pf: 5500,
    tds: 2200,
    lopDays: 0,
    lopAmount: 0,
    attendanceSync: "24 of 24 Working Days",
    attendancePercentage: 100,
    status: "Pending Sync"
  },
  {
    id: "EMP-2026-11",
    name: "Mrs. Lalitha Sridhar",
    role: "Senior Accounts Administrator",
    department: "Administration",
    grade: "Admin-2",
    basicPay: 65000,
    hra: 13000,
    ta: 4500,
    da: 6500,
    pf: 6500,
    tds: 3000,
    lopDays: 0,
    lopAmount: 0,
    attendanceSync: "24 of 24 Working Days",
    attendancePercentage: 100,
    status: "Processed"
  }
];

interface StaffPayrollPageProps {
  onBack: () => void;
}

function safeParse(value: string | null, fallback: any = {}) {
  try {
    if (value === undefined || value === null || value === "" || value === "undefined") {
      return fallback;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    return fallback;
  }
}

export const StaffPayrollPage: React.FC<StaffPayrollPageProps> = ({ onBack }) => {
  const [staffList, setStaffList] = useState<StaffSalaryRecord[]>(() => {
    const cached = localStorage.getItem('nexora_staff_payroll');
    const parsed = safeParse(cached, INITIAL_STAFF_PAYROLL_DATA);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_STAFF_PAYROLL_DATA;
  });

  // Batch states
  const [payrollMonth, setPayrollMonth] = useState("May 2026");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState(80); // Starts at 80% due to EMP-2026-08 being Pending Sync

  // Allowance configuration factors
  const [hraPercentage, setHraPercentage] = useState(20); // 20% of Basic Pay default
  const [pfPercentage, setPfPercentage] = useState(10);  // 10% of Basic Pay default

  // Active sync spinner state
  const [isSyncingBiometrics, setIsSyncingBiometrics] = useState(false);

  // Modal print preview payslip state
  const [selectedPayslipStaff, setSelectedPayslipStaff] = useState<StaffSalaryRecord | null>(null);

  // Quick notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'alert'>('success');

  useEffect(() => {
    localStorage.setItem('nexora_staff_payroll', JSON.stringify(staffList));
  }, [staffList]);

  const triggerToast = (message: string, type: 'success' | 'alert' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Run the May 2026 batch process simulation
  const handleRunPayrollBatch = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setProcessProgress(80);
    
    triggerToast("Initiating secure statutory compliance checks for May 2026...");
    
    const interval = setInterval(() => {
      setProcessProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          // Complete the sync for any pending staff
          setStaffList(prevList => prevList.map(emp => {
            if (emp.status === 'Pending Sync') {
              return { ...emp, status: 'Processed' };
            }
            return emp;
          }));

          triggerToast("May 2026 Payroll Batch successfully processed and logged!", 'success');
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  // Recalculate salary parameters when Allowance Factor Sliders change
  const handleAllowanceChange = (newHraPercent: number) => {
    setHraPercentage(newHraPercent);
    setStaffList(prev => prev.map(emp => {
      const calculatedHra = Math.round(emp.basicPay * (newHraPercent / 100));
      return {
        ...emp,
        hra: calculatedHra
      };
    }));
    triggerToast(`Adjusted House Rent Allowance scaling factor to ${newHraPercent}%`);
  };

  const handlePfChange = (newPfPercent: number) => {
    setPfPercentage(newPfPercent);
    setStaffList(prev => prev.map(emp => {
      const calculatedPf = Math.round(emp.basicPay * (newPfPercent / 100));
      return {
        ...emp,
        pf: calculatedPf
      };
    }));
    triggerToast(`Provident Fund (PF) auto-withholding set at ${newPfPercent}% basic scale`);
  };

  // Sync with biometric logs
  const handleSyncBiometricAttendance = () => {
    if (isSyncingBiometrics) return;
    setIsSyncingBiometrics(true);
    
    triggerToast("Connecting to biometrics terminal array over secure API gateway...");

    setTimeout(() => {
      setIsSyncingBiometrics(false);
      // Promote Mr. Vikrant Patil to "Processed" status from "Pending Sync"
      setStaffList(prev => prev.map(emp => {
        if (emp.id === "EMP-2026-08") {
          return {
            ...emp, 
            status: "Processed",
            attendanceSync: "24 of 24 Working Days (Synced)"
          };
        }
        return emp;
      }));
      setProcessProgress(100);
      triggerToast("Biometric logs retrieved. Staff working day calendars matching.");
    }, 1800);
  };

  // Helper calculation functions
  const calculateGrossEarnings = (emp: StaffSalaryRecord) => {
    return emp.basicPay + emp.hra + emp.ta + emp.da;
  };

  const calculateTotalDeductions = (emp: StaffSalaryRecord) => {
    return emp.pf + emp.tds + emp.lopAmount;
  };

  const calculateNetSalary = (emp: StaffSalaryRecord) => {
    return calculateGrossEarnings(emp) - calculateTotalDeductions(emp);
  };

  // Aggregated calculations for the dashboard Hero block
  const totalPayrollCost = staffList.reduce((sum, emp) => sum + calculateNetSalary(emp), 0);
  const activePaidStaff = staffList.filter(emp => emp.status === 'Processed').length;
  const staffCountText = `${activePaidStaff} / ${staffList.length} Staff Synced`;

  // Average deductions to render
  const totalPFContributions = staffList.reduce((sum, emp) => sum + emp.pf, 0);
  const totalTaxWithholding = staffList.reduce((sum, emp) => sum + emp.tds, 0);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] select-text text-slate-800 font-sans flex flex-col relative overflow-hidden pb-12">
      {/* Decorative enterprise high-intensity grid lines */}
      <div className="absolute top-0 right-0 w-[45rem] h-[35rem] bg-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main SaaS Platform Sticky Header */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur sticky top-0 z-40 shadow-3xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-605 hover:text-blue-600 hover:border-blue-300 rounded-lg text-xs font-bold transition-all shadow-3xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>← Back to Main Dashboard</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="px-2 py-0.5 bg-blue-50 border border-blue-105 text-[#2563EB] text-[9px] font-black uppercase tracking-widest rounded-md">
              MODULE 04
            </span>
            <div className="w-full md:w-auto">
              <h1 className="text-sm font-black text-[#0F172A] uppercase tracking-tight leading-none font-sans">
                Automated Staff & Payroll Management
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Institutional Faculty Ledger, Statutory Allowance & Disbursal Matrix</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Statutory Server: Secured & Compliant</span>
          </div>
        </div>
      </div>

      {/* Embedded Real-Time Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 max-w-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              className={`p-3.5 rounded-xl text-white text-[11px] font-bold shadow-lg flex items-center gap-2.5 border ${
                toastType === 'success' ? 'bg-emerald-600 border-emerald-500' : 'bg-red-600 border-red-500'
              }`}
            >
              <CheckCircle className="w-4.5 h-4.5 shrink-0" />
              <div>
                <p className="leading-snug">{toastMessage}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Interactive Main Split Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ==================== LEFT COLUMN: 5 CORE FEATURES ==================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* FEATURE 1: PAYROLL PROCESSING BATCH MONITOR */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs">
              <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-blue-650 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Payroll Processing Hub</h3>
                    <p className="text-[9.5px] text-slate-405 font-semibold">Consolidated batch processing schedule for the current financial cycle</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#2563EB] font-sans block">{payrollMonth}</span>
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase block mt-0.5">CURRENT INTERVAL</span>
                </div>
              </div>

              {/* Progress Bar and Stats Grid */}
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>Statutory Disbursal Queue:</span>
                      <strong className="text-slate-900">{processProgress === 100 ? "100% Locked & Complete" : "80% Complete - Waiting Verification"}</strong>
                    </span>
                    <span className="font-mono">{processProgress}%</span>
                  </div>
                  
                  {/* Status Bar Track */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-linear-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                      initial={{ width: "80%" }}
                      animate={{ width: `${processProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRunPayrollBatch}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 disabled:bg-slate-400 text-white text-[10.5px] font-black uppercase tracking-wider transition-all rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-3xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                    <span>{isProcessing ? "Executing Bank Disbursal Ledger..." : "Run Payroll for May 2026"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setProcessProgress(80);
                      // Restore pending sync employee
                      setStaffList(prev => prev.map(emp => {
                        if (emp.id === "EMP-2026-08") {
                          return { ...emp, status: "Pending Sync", attendanceSync: "24 of 24 Working Days" };
                        }
                        return emp;
                      }));
                      triggerToast("Current interval state reset to unverified logs.", "alert");
                    }}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-650 text-[10.5px] font-bold uppercase transition-all rounded-xl cursor-pointer"
                  >
                    Reset Frame
                  </button>
                </div>
              </div>
            </div>

            {/* FEATURE 2: SALARY STRUCTURES & ALLOWANCES DYNAMIC CONFIG */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Allowance & Scaling Coefficient Config</h3>
                    <p className="text-[9.5px] text-slate-400 font-semibold">Change global factors to recalculate Allowances dynamically</p>
                  </div>
                </div>
                <span className="text-[8.5px] font-mono font-black py-0.5 px-2 bg-indigo-50 text-indigo-700 rounded-md">LIVE RECOMPUTATION MODE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Slider HRA */}
                <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-600">House Rent Allowance (HRA)</span>
                    <span className="text-blue-600">{hraPercentage}% of Basic</span>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="45"
                    step="5"
                    value={hraPercentage}
                    onChange={(e) => handleAllowanceChange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-[8px] text-slate-405 block font-semibold">Applies index correction to metro and suburban campus staff</span>
                </div>

                {/* Slider PF */}
                <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-600">Provident Fund (PF) Contribution</span>
                    <span className="text-indigo-600">{pfPercentage}% of Basic</span>
                  </div>
                  <input 
                    type="range"
                    min="5"
                    max="15"
                    step="1"
                    value={pfPercentage}
                    onChange={(e) => handlePfChange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[8px] text-slate-405 block font-semibold">Statutory default employee reserve account allocation multiplier</span>
                </div>
              </div>
            </div>

            {/* FEATURE 3: PAYSLIP GENERATION CENTER */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-3xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  <span>Payslip Generation & Audit Center</span>
                </h3>
                <p className="text-[9.5px] text-slate-400 font-semibold mt-0.5">Publish, sign digitally, or download detailed PDF payslips for audited faculty profiles</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200 text-[8px] font-extrabold tracking-wider text-slate-400 uppercase">
                      <th className="py-2.5 px-4">Faculty Member</th>
                      <th className="py-2.5 px-4 font-sans">Role / Department</th>
                      <th className="py-2.5 px-4 text-right">Computed Net Earnings</th>
                      <th className="py-2.5 px-4 text-center">Verification Badge</th>
                      <th className="py-2.5 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-705">
                    {staffList.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50/30 transition-all">
                        <td className="py-3 px-4">
                          <div className="font-black text-slate-900 leading-tight">{emp.name}</div>
                          <div className="text-[9px] text-slate-400 font-mono mt-0.5">{emp.id}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-800 font-bold block">{emp.role}</span>
                          <span className="text-[9px] text-slate-400 block">{emp.department}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono text-slate-950 font-black">₹{calculateNetSalary(emp).toLocaleString('en-IN')}</span>
                          <span className="text-[8px] text-slate-405 block font-medium">After withholdings</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                            emp.status === 'Processed' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' 
                              : 'bg-amber-50 text-amber-700 border border-amber-150 animate-pulse'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setSelectedPayslipStaff(emp)}
                            className="py-1 px-3 bg-emerald-600 hover:bg-emerald-700 hover:shadow-2xs active:scale-95 text-white rounded-lg text-[9px] font-black uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-1.5 mx-auto"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download Payslip</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FEATURE 4: DEDUCTIONS MATRIX & LOSS-OF-PAY LOGS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-rose-500" />
                  <span className="text-xs font-black uppercase text-slate-800 tracking-wider">Withholding Tax & Deductions Panel</span>
                </div>
                <span className="px-2 py-0.5 text-[8.5px] font-sans font-black bg-rose-50 border border-rose-100 text-rose-700 rounded-md">
                  PF, TDS, LOP RECONCILIATION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Deduction calculations details */}
                <div className="bg-rose-50/25 p-3.5 border border-rose-100/60 rounded-xl space-y-2">
                  <span className="text-[9.5px] font-extrabold text-rose-700 uppercase tracking-widest block">May 1961 PF statutory scale</span>
                  <p className="text-[10.5px] text-slate-500 font-semibold leading-relaxed">
                    Under central EPF rules, active institution matches the 10-12% employee withholding. Deducted values route safely to authorized EPF server indexes on dispatch checkouts.
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-rose-100/50">
                    <span className="text-[10px] text-slate-500 font-bold">Total Dispersed PF Pool:</span>
                    <span className="text-xs font-black text-rose-650 font-mono">₹{totalPFContributions.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Loss-of-pay logs */}
                <div className="bg-amber-50/25 p-3.5 border border-amber-100/60 rounded-xl space-y-2">
                  <span className="text-[9.5px] font-extrabold text-amber-700 uppercase tracking-widest block">Biometric Loss-of-Pay (LOP) Registers</span>
                  
                  <div className="space-y-1.5">
                    {staffList.map(emp => (
                      <div key={emp.id} className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-600">{emp.name}</span>
                        {emp.lopDays > 0 ? (
                          <span className="text-amber-700 font-extrabold">{emp.lopDays} Day LOP (-₹{emp.lopAmount})</span>
                        ) : (
                          <span className="text-emerald-700">0 Deductions (100% Days)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* FEATURE 5: BIOMETRIC ATTENDANCE INTEGRATION LOG */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-blue-600" />
                  <span className="text-xs font-black uppercase text-slate-800 tracking-wider">Biometric Attendance Integration API</span>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8.5px] font-bold rounded">GIGA-GATEWAY SYNC</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-8 space-y-1">
                  <h4 className="text-[11px] font-black uppercase text-slate-805">Active Sync Terminal Array Connection</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Direct handshakes executed directly with smart biometric scanner gates. Automates absolute loss-of-pay and hourly rate allocations. Last synchronization event: May 25, 14:42.
                  </p>
                </div>
                
                <div className="md:col-span-4 select-none">
                  <button
                    type="button"
                    onClick={handleSyncBiometricAttendance}
                    disabled={isSyncingBiometrics}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-850 hover:bg-black text-white text-[10px] font-extrabold uppercase rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-3xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isSyncingBiometrics ? 'animate-spin' : ''}`} />
                    <span>{isSyncingBiometrics ? "Syncing Gate IP..." : "Sync Attnd. Logs"}</span>
                  </button>
                </div>
              </div>

              {/* Attendance quick display status list */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mt-4 pt-4 border-t border-slate-100">
                {staffList.map(emp => (
                  <div key={emp.id} className="p-2 bg-slate-50 border border-slate-150 rounded-lg text-center">
                    <span className="text-[9px] font-black text-slate-900 truncate block">{emp.name.split(' ')[1] || emp.name}</span>
                    <span className="text-[8.5px] text-slate-400 font-mono block mt-0.5">{emp.attendancePercentage}% Days</span>
                    <span className="text-[7.5px] px-1 bg-blue-100/50 text-[#2563EB] font-bold rounded inline-block mt-1 uppercase">
                      Matched
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: FINANCIAL / PAYROLL ANALYTICS CENTER HERO ==================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* HERO RESOURCE BLOCK: PAYROLL ANALYTICS CENTER */}
            <div className="bg-slate-905 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-5 relative overflow-hidden bg-slate-900">
              
              {/* Radial ambiance grids */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#2563EB]/15 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-505/10 rounded-full blur-2xl" />

              <div className="space-y-1.5 border-b border-white/10 pb-3">
                <span className="text-[9px] uppercase tracking-widest text-[#2563EB] font-black">Executive Command Analytics</span>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Payroll Analytics Centre</h3>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">Financial aggregates, monthly budget trends & central statutory compliance reporting tool</p>
              </div>

              {/* EXECUTIVE STRATEGIC METRIC BOX */}
              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-3.5 text-left">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[8.5px] uppercase text-slate-400 font-black tracking-wider">Total Monthly Payroll Cost</span>
                  <span className="text-[8px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">STATUTORY COMPLIANT</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-2xl font-black text-white font-mono leading-none block">
                    ₹{totalPayrollCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">{staffCountText} current intervals processed</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-[8px] uppercase text-slate-400 font-bold block">Central Tax TDS Pool</span>
                    <span className="text-xs font-black text-slate-205 font-mono">₹{totalTaxWithholding.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase text-slate-400 font-bold block">PF Reserves Blocked</span>
                    <span className="text-xs font-black text-slate-205 font-mono">₹{totalPFContributions.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* MONTHLY SALARY EXPENSE TRENDS (Visual Bar Chart) */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[8.5px] uppercase text-slate-400 font-extrabold tracking-wider">Monthly Salary Expense Trends</span>
                  <span className="text-[8px] text-[#2563EB] font-bold">FY 2025-26</span>
                </div>

                {/* Highly structured interactive CSS flex/bar chart grid representing six months */}
                <div className="h-28 bg-slate-800/20 rounded-xl p-3 flex items-end justify-between gap-2.5 border border-slate-800/50">
                  
                  {/* Dec 25 */}
                  <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="w-full bg-slate-800 group-hover:bg-slate-700 h-[68%] rounded-sm transition-all duration-300 relative">
                      {/* Tooltip */}
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[7.5px] font-mono p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                        ₹3.85L
                      </span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 font-mono mt-2 block">Dec</span>
                  </div>

                  {/* Jan 26 */}
                  <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="w-full bg-slate-800 group-hover:bg-slate-705 h-[72%] rounded-sm transition-all duration-300 relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[7.5px] font-mono p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                        ₹4.05L
                      </span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 font-mono mt-2 block">Jan</span>
                  </div>

                  {/* Feb 26 */}
                  <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="w-full bg-slate-800 group-hover:bg-slate-700 h-[70%] rounded-sm transition-all duration-300 relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[7.5px] font-mono p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                        ₹3.95L
                      </span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 font-mono mt-2 block">Feb</span>
                  </div>

                  {/* Mar 26 */}
                  <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="w-full bg-slate-800 group-hover:bg-slate-700 h-[85%] rounded-sm transition-all duration-300 relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[7.5px] font-mono p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                        ₹4.60L
                      </span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 font-mono mt-2 block">Mar</span>
                  </div>

                  {/* Apr 26 */}
                  <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="w-full bg-slate-800 group-hover:bg-slate-700 h-[92%] rounded-sm transition-all duration-300 relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[7.5px] font-mono p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                        ₹4.90L
                      </span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 font-mono mt-2 block">Apr</span>
                  </div>

                  {/* May 26 */}
                  <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="w-full bg-[#2563EB] hover:bg-blue-500 h-[98%] rounded-sm transition-all duration-300 relative">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[rgba(37,99,235,0.95)] px-1 py-0.5 text-white text-[7.5px] font-mono rounded opacity-100 transition-opacity whitespace-nowrap z-30 font-black">
                        ₹{Math.round(totalPayrollCost / 1000)}k (Active)
                      </span>
                    </div>
                    <span className="text-[7.5px] text-blue-400 font-bold mt-2 block">May</span>
                  </div>

                </div>
              </div>

              {/* STATUTORY COMPLIANCE PANEL LIST */}
              <div className="pt-2.5 border-t border-white/10 text-[10px] text-slate-400 font-semibold space-y-2.5">
                <span className="text-[8.5px] uppercase text-white font-extrabold tracking-wider block">Compliance Health Checklist</span>
                
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>EPF Form 5 & 10 auto-computed records complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Professional Tax withholding indexed securely</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Biometric work records matching ledger scales</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* MODAL LIGHTBOX: DETAILED PRINT-READY PAYSLIP MOCKUP VIEW */}
      {selectedPayslipStaff && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1">
                <Printer className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">SECURE DIGITAL PAYSLIP EMULATOR</h3>
              </div>
              <button 
                onClick={() => setSelectedPayslipStaff(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                <span className="text-xs font-black p-1">Close</span>
              </button>
            </div>

            {/* Simulated Printed Payslip Frame */}
            <div className="p-4 border-2 border-slate-100 rounded-xl bg-slate-50/50 space-y-3.5 text-left text-xs text-slate-805 select-text font-serif">
              <div className="text-center font-sans">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#2563EB] block">NEXORAOS ACADEMY CENTRAL CORP</span>
                <span className="text-[8px] text-slate-400 block uppercase mt-0.5">Statutory Central Salary Slip • {payrollMonth}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10.5px] py-2 border-y border-dashed border-slate-200 font-sans">
                <div>
                  <span className="text-slate-400 text-[8px] uppercase block font-bold">Faculty Member</span>
                  <strong className="text-slate-900 font-extrabold font-sans text-[11px] block">{selectedPayslipStaff.name}</strong>
                  <span className="text-slate-600">{selectedPayslipStaff.role}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[8px] uppercase block font-bold">Unique Register ID</span>
                  <code className="text-slate-900 font-bold block">{selectedPayslipStaff.id}</code>
                  <span className="text-slate-500">{selectedPayslipStaff.department}</span>
                </div>
              </div>

              {/* Earnings & Deductions Table */}
              <div className="grid grid-cols-2 gap-4 text-[10px] font-sans">
                {/* Earnings List */}
                <div className="space-y-1.5">
                  <span className="text-[8px] uppercase text-emerald-700 font-black block border-b border-slate-200 pb-1">Credited Earnings</span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Basic Pay Scale</span>
                    <span className="font-mono text-slate-950 font-bold">₹{selectedPayslipStaff.basicPay.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">House Rent (HRA)</span>
                    <span className="font-mono text-slate-950 font-bold">₹{selectedPayslipStaff.hra.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Travel Scale (TA)</span>
                    <span className="font-mono text-slate-950 font-bold">₹{selectedPayslipStaff.ta.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Allowance (DA)</span>
                    <span className="font-mono text-slate-950 font-bold">₹{selectedPayslipStaff.da.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-black border-t border-slate-250 pt-1 text-emerald-700">
                    <span>Gross Earnings</span>
                    <span className="font-mono">₹{calculateGrossEarnings(selectedPayslipStaff).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Deductions List */}
                <div className="space-y-1.5">
                  <span className="text-[8px] uppercase text-rose-700 font-black block border-b border-slate-200 pb-1">Withheld Deductions</span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provident Fund (PF)</span>
                    <span className="font-mono text-slate-950 font-bold">₹{selectedPayslipStaff.pf.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Income Tax TDS</span>
                    <span className="font-mono text-slate-950 font-bold">₹{selectedPayslipStaff.tds.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Loss of Pay (LOP)</span>
                    <span className="font-mono text-slate-950 font-bold">₹{selectedPayslipStaff.lopAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-black border-t border-slate-250 pt-1 text-rose-700">
                    <span>Total Deductions</span>
                    <span className="font-mono">₹{calculateTotalDeductions(selectedPayslipStaff).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Net Take-home payscale summary label */}
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center font-sans mt-3">
                <div>
                  <span className="text-[8px] uppercase text-blue-700 font-black block leading-none">Net Disbursed Take-home Pay</span>
                  <span className="text-[8.5px] text-slate-400 block mt-1">Transferred via central clearing network</span>
                </div>
                <span className="text-base font-black text-blue-650 font-mono">
                  ₹{calculateNetSalary(selectedPayslipStaff).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-[8px] text-slate-400 font-sans italic text-center pt-2">
                This is an system-generated statutory record. No signature required. Synchronized with Biometric Logs.
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button 
                type="button" 
                onClick={() => setSelectedPayslipStaff(null)}
                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-705 font-bold rounded-lg transition-all cursor-pointer uppercase text-[10px]"
              >
                Dismiss Form
              </button>
              <button 
                type="button" 
                onClick={() => {
                  triggerToast(`Triggered direct download for ${selectedPayslipStaff.name}'s payslip! PDF rendered securely.`);
                  setSelectedPayslipStaff(null);
                }}
                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all cursor-pointer uppercase text-[10px]"
              >
                Confirm PDF Download
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
};
