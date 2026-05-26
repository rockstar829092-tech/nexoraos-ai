/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Settings, 
  CheckCircle, 
  UserCheck, 
  TrendingUp, 
  Cpu, 
  FileText, 
  Clock, 
  DollarSign, 
  Lock, 
  AlertTriangle, 
  Briefcase, 
  ArrowRight,
  RefreshCw,
  Bell,
  Fingerprint,
  Activity
} from 'lucide-react';

interface ApprovalCard {
  id: string;
  title: string;
  countKey: string;
  countVal: string;
  desc: string;
  category: string;
  status: 'pending' | 'approved' | 'reviewing';
}

export const AiAutopilotControlCenter: React.FC = () => {
  const [approvalCards, setApprovalCards] = useState<ApprovalCard[]>([
    {
      id: 'card-a',
      title: 'Timetable Generation',
      countKey: 'Proposed Substitutions',
      countVal: '12 Slots Mapped',
      desc: 'AI generated class reallocations due to 2 faculty leaves. Mapped secondary science teaching staff based on expert parameters.',
      category: 'Scheduling Solver',
      status: 'pending'
    },
    {
      id: 'card-b',
      title: 'Overdue Fee Reminders',
      countKey: 'Target Guardians',
      countVal: '142 Notices Prepared',
      desc: 'Drafted professional, localized invoice alerts for accounts overdue by 15+ days. Waiting for approval before batch delivery.',
      category: 'Financial Ledger',
      status: 'pending'
    },
    {
      id: 'card-c',
      title: 'Early Student Dropout Risks',
      countKey: 'High Advisory List',
      countVal: '8 Pupils Registered',
      desc: 'Compiled automated counseling files and remedial action proposals based on micro-attendance dip signals.',
      category: 'Predictive Intel',
      status: 'pending'
    }
  ]);

  const [activeLogs, setActiveLogs] = useState<string[]>([
    'Initializing background audit calculations...',
    'Performing real-time ledger compliance scan...',
    'Analyzing student behavioral engagement arrays...',
    'Checking state educational regulation directives...'
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Dynamic log simulation
  useEffect(() => {
    const logPool = [
      'Scanning teacher workload capacity thresholds...',
      'Mapping transportation optimal fuel boundaries...',
      'Compiling grade telemetry curve summaries...',
      'Auditing RFID gate registration network latency...',
      'Preparing draft parent-teacher booking tables...',
      'Securing payment tokenization routes with bank partners...',
      'Verifying regional data center encryption standards...'
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setActiveLogs(prev => [`[${currentTime}] ${randomLog}`, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleApprove = (id: string, name: string) => {
    setIsProcessing(id);
    setTimeout(() => {
      setApprovalCards(prev => prev.map(card => {
        if (card.id === id) {
          return { ...card, status: 'approved' };
        }
        return card;
      }));
      setIsProcessing(null);
      setToastMessage(`SUCCESS: "${name}" proposal has been approved and deployed to production systems.`);
    }, 1200);
  };

  const handleReview = (id: string) => {
    setApprovalCards(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, status: 'reviewing' };
      }
      return card;
    }));
    setToastMessage(`Redirecting to full compliance policy editor for manual review.`);
  };

  return (
    <section id="autopilot-control" className="py-24 border-b border-slate-200 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* SECTION HEADER BLOCK */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 py-1.5 px-4 rounded-full inline-block">
            ADMINISTRATIVE COMMAND CENTRE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans uppercase">
            NexoraOS AI Workforce Multiplier
          </h2>
          <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
            Your School Leadership Remains in Control. AI Handles the Repetitive Work.
          </p>
        </div>

        {/* HIGHLIGHTED OWNER STATEMENT */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
            <p className="text-slate-200 text-sm sm:text-base md:text-lg font-semibold leading-relaxed max-w-3xl mx-auto">
              "NexoraOS AI automates approximately <span className="text-blue-400 font-extrabold text-lg sm:text-xl">75% of repetitive administrative operations</span>, allowing school leadership to focus on academics, growth, student outcomes, and strategic decision-making."
            </p>
          </div>
        </div>

        {/* SPLIT DASHBOARD - AI VS HUMAN RESPONSIBILITY MODEL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT SIDE - AI AUTOMATION */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-[32px] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-slate-100">AI Automation</h3>
                </div>
                <span className="text-3xl font-black text-blue-400 font-sans">75%</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Delegated to NexoraOS AI core engines. Automatically prepared, optimized, drafts scheduled, and awaiting operational review.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Timetable Generation',
                  'Attendance Processing',
                  'Fee Reminder Automation',
                  'Parent Notifications',
                  'Event Scheduling Assistance',
                  'Report Generation'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-slate-950/50 border border-slate-800/80 rounded-xl text-xs text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-extrabold text-[10px]">✓</span>
                    <span className="font-bold tracking-tight uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-950/20 border border-blue-500/10 p-4 rounded-2xl flex items-center gap-3.5 mt-4">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-[11px] text-blue-200/80 leading-snug">
                <strong>Autonomous Preparation Engine:</strong> AI engine scans scheduling conflicts hourly and aggregates parent notifications instantly for review.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - HUMAN DECISIONS */}
          <div className="bg-slate-900/60 border border-slate-850 rounded-[32px] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-slate-800 transition-colors">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-slate-100">Human Decisions</h3>
                </div>
                <span className="text-3xl font-black text-indigo-400 font-sans">25%</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Retained exclusively by administrators, principals, and department heads. Absolute corporate sovereignty over execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Staff Recruitment',
                  'Strategic Admissions',
                  'Final Budget Allocations',
                  'Disciplinary Decisions',
                  'Visionary Policy Making',
                  'Individual Student Interventions'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-slate-950/30 border border-slate-900 rounded-xl text-xs text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-extrabold text-[10px]">✓</span>
                    <span className="font-bold tracking-tight uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-950/20 border border-indigo-500/10 p-4 rounded-2xl flex items-center gap-3.5 mt-4">
              <Fingerprint className="w-5 h-5 text-indigo-400 shrink-0" />
              <p className="text-[11px] text-indigo-200/80 leading-snug">
                <strong>Sovereign Approval Safeguard:</strong> No automated action triggers externally unless approved by authorized credentials. Complete data peace of mind.
              </p>
            </div>
          </div>

        </div>

        {/* SCHOOL OWNER CONTROL CENTER (AI COMMAND PANEL) */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* SUBSECTION TITLE & STATUS */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2.5">
                <Settings className="w-5.5 h-5.5 text-blue-500" />
                School Owner AI Command Panel
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Review, tweak, or deploy automated calculations queued by secondary modules.</p>
            </div>
            
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Status: WAITING FOR HUMAN AUTHORIZATION
            </div>
          </div>

          {/* Toast Updates inside panel */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-950 border border-blue-500/30 text-blue-350 p-4 rounded-2xl text-xs font-bold flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-blue-300">{toastMessage}</span>
                </div>
                <button onClick={() => setToastMessage(null)} className="text-slate-500 hover:text-white font-mono px-2 text-sm leading-none">×</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CARDS LIST GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvalCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md group relative h-fit"
              >
                <div className="space-y-4">
                  
                  {/* Card category and badge */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-550 text-slate-400">{card.category}</span>
                    {card.status === 'approved' ? (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-black uppercase tracking-widest rounded-md border border-emerald-500/30">
                        ✓ APPROVED
                      </span>
                    ) : card.status === 'reviewing' ? (
                      <span className="px-2 py-0.5 bg-amber-500/25 text-amber-300 text-[9px] font-black uppercase tracking-widest rounded-md border border-amber-500/30">
                        ● UNDER REVIEW
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-500/20 animate-pulse">
                        AWAITING ADMIN
                      </span>
                    )}
                  </div>

                  {/* Info details */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-slate-100 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{card.title}</h4>
                    <p className="text-[11px] font-medium text-slate-300 bg-slate-950 px-2.5 py-1 rounded inline-block">
                      <strong>{card.countKey}:</strong> <span className="text-blue-450 text-blue-400 font-bold">{card.countVal}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {card.desc}
                  </p>

                </div>

                {/* Card Action Buttons */}
                <div className="flex gap-2.5 pt-6 mt-6 border-t border-slate-800/50">
                  {card.status === 'pending' ? (
                    <>
                      <button 
                        disabled={isProcessing === card.id}
                        onClick={() => handleReview(card.id)}
                        className="py-2.5 px-3 flex-1 text-center bg-slate-800 hover:bg-slate-755 hover:bg-slate-750 border border-slate-700 hover:border-slate-650 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Review Policy
                      </button>
                      
                      <button 
                        disabled={isProcessing === card.id}
                        onClick={() => handleApprove(card.id, card.title)}
                        className="py-2.5 px-3 flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-900/10 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {isProcessing === card.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Approving...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve & Send</span>
                          </>
                        )}
                      </button>
                    </>
                  ) : card.status === 'reviewing' ? (
                    <button 
                      onClick={() => handleApprove(card.id, card.title)}
                      className="w-full py-2.5 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve Overrides</span>
                    </button>
                  ) : (
                    <div className="w-full py-2 bg-emerald-950/20 border border-emerald-500/15 p-3 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-400 leading-none">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Operational Draft Sent Successfully</span>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* AI DIGITAL MANAGER SECTION */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">OPERATIONAL RESILIENCE</span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight tracking-tight">
              Your Dedicated 24/7 Digital Operations Manager
            </h3>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              While leadership rests, NexoraOS AI works in the background: monitoring examination rules stability, checking transportation timing trends, mapping leave applications, and running automated compliance audits.
            </p>
          </div>

          <div className="lg:col-span-8 bg-slate-950 border border-slate-850 rounded-[32px] p-5 sm:p-6 flex flex-col justify-between h-72">
            
            {/* Log Header */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-500 animate-pulse" />
                AI Active Operations Live Log
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black border border-indigo-500/20 text-indigo-400 bg-indigo-500/10">STREAMING</span>
            </div>

            {/* Logs Body */}
            <div className="flex-1 overflow-y-auto py-3.5 space-y-3 font-mono text-[10.5px] text-slate-450 text-slate-400 scrollbar-thin select-none">
              {activeLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2 border-b border-slate-900/50 pb-2.5 last:border-b-0">
                  <span className="text-blue-500/80 shrink-0 select-text">●</span>
                  <span className="leading-relaxed leading-snug">{log}</span>
                </div>
              ))}
            </div>

            {/* Footer details */}
            <div className="border-t border-slate-900 pt-3 text-[10px] text-slate-500 flex justify-between items-center">
              <span>Active Daemon processes: <strong>Scheduler d.8</strong>, <strong>Billing b.12</strong>, <strong>Telemetry t.6</strong></span>
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                Live Cloud Synchronizer Ready
              </span>
            </div>

          </div>

        </div>

        {/* REAL BUSINESS IMPACT KPI CARDS Grid */}
        <div className="max-w-6xl mx-auto space-y-8 pt-6">
          <div className="border-b border-slate-800 pb-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#2563EB]">Real Business Impact</h4>
            <p className="text-xs text-slate-400 font-medium">Clear performance indices representing verified school administrative efficiency audits.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Administrative Workload', value: '-75% Reduction', desc: 'Saves 30+ average weekly hours per officer', icon: Clock, color: 'text-blue-400 bg-blue-500/10' },
              { label: 'Human Error Rate', value: '<0.5% Fault Rate', desc: 'Avoids timetable clash & billing slip anomalies', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10' },
              { label: 'Operational Savings', value: '$4,200/Mo', desc: 'Aggregated printing, paper, and manual labor hours', icon: DollarSign, color: 'text-indigo-400 bg-indigo-500/10' },
              { label: 'Regulatory Compliance Score', value: '100% Perfect Audit', desc: 'Guarantees RFID check-ins & ledger audit trails', icon: FileText, color: 'text-cyan-400 bg-cyan-500/10' }
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 hover:shadow-md transition-all space-y-4 group">
                  <div className={`p-2.5 w-fit rounded-xl ${kpi.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-450 text-slate-400">{kpi.label}</p>
                    <p className="text-xl sm:text-2xl font-black text-slate-100 font-sans tracking-tight leading-none pt-1">{kpi.value}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed leading-snug border-t border-slate-850 pt-2">{kpi.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM TRUST BANNER */}
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-blue-500/15 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-xl">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl shrink-0 mt-0.5">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h5 className="text-sm font-black uppercase text-slate-200 tracking-wider flex items-center gap-2">
                <span>Absolute Corporate Sovereignty Guaranteed</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </h5>
              <p className="text-[11.5px] text-slate-400 font-semibold leading-relaxed">
                NexoraOS AI has zero standalone execution capability for critical operations. Our architecture ensures that AI can only suggest and prepare, but a trusted human must authorize prior to any external action or notification delivery. Absolute corporate sovereignty.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
