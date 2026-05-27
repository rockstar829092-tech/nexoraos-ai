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
  Cpu, 
  FileText, 
  Clock, 
  DollarSign, 
  Lock, 
  Fingerprint,
  Activity,
  RefreshCw
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
    <section id="autopilot-control" className="py-24 border-b border-slate-200 bg-white text-slate-900 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* SECTION HEADER BLOCK */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#2563EB] bg-blue-50 border border-blue-100 py-1.5 px-4 rounded-full inline-block">
            ADMINISTRATIVE COMMAND CENTRE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-sans uppercase">
            NexoraOS AI Workforce Multiplier
          </h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
            Your School Leadership Remains in Control. AI Handles the Repetitive Work.
          </p>
        </div>

        {/* HIGHLIGHTED OWNER STATEMENT */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
            <p className="text-slate-700 text-sm sm:text-base md:text-lg font-bold leading-relaxed max-w-3xl mx-auto">
              "NexoraOS AI automates approximately <span className="text-blue-600 font-black text-lg sm:text-xl">75% of repetitive administrative operations</span>, allowing school leadership to focus on academics, growth, student outcomes, and strategic decision-making."
            </p>
          </div>
        </div>

        {/* SPLIT DASHBOARD - AI VS HUMAN RESPONSIBILITY MODEL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT SIDE - AI AUTOMATION */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-blue-200 transition-colors shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-slate-900">AI Automation</h3>
                </div>
                <span className="text-3xl font-black text-blue-600 font-sans">75%</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-bold">
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
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 font-bold">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-black text-[10px]">✓</span>
                    <span className="tracking-tight uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3.5 mt-4">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-[11px] text-blue-800 leading-snug font-medium">
                <strong>Autonomous Preparation Engine:</strong> AI engine scans scheduling conflicts hourly and aggregates parent notifications instantly for review.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - HUMAN DECISIONS */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-indigo-200 transition-colors shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-slate-900">Human Decisions</h3>
                </div>
                <span className="text-3xl font-black text-indigo-600 font-sans">25%</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-bold">
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
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 font-bold">
                    <span className="w-4 h-4 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-black text-[10px]">✓</span>
                    <span className="tracking-tight uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl flex items-center gap-3.5 mt-4">
              <Fingerprint className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-[11px] text-indigo-800 leading-snug font-medium">
                <strong>Sovereign Approval Safeguard:</strong> No automated action triggers externally unless approved by authorized credentials. Complete data peace of mind.
              </p>
            </div>
          </div>

        </div>

        {/* SCHOOL OWNER CONTROL CENTER (AI COMMAND PANEL) */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* SUBSECTION TITLE & STATUS */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2.5">
                <Settings className="w-5.5 h-5.5 text-blue-600" />
                School Owner AI Command Panel
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-bold">Review, tweak, or deploy automated calculations queued by secondary modules.</p>
            </div>
            
            <div className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
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
                className="bg-blue-600 text-white p-4 rounded-2xl text-xs font-black flex items-center justify-between shadow-lg shadow-blue-200"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>{toastMessage}</span>
                </div>
                <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80 font-mono px-2 text-sm leading-none">×</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CARDS LIST GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvalCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between hover:border-blue-300 transition-all shadow-sm group relative h-fit"
              >
                <div className="space-y-4">
                  
                  {/* Card category and badge */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">{card.category}</span>
                    {card.status === 'approved' ? (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-emerald-200">
                        ✓ APPROVED
                      </span>
                    ) : card.status === 'reviewing' ? (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-amber-200">
                        ● UNDER REVIEW
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                        AWAITING ADMIN
                      </span>
                    )}
                  </div>

                  {/* Info details */}
                  <div className="space-y-1">
                    <h4 className="font-black text-base text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{card.title}</h4>
                    <p className="text-[11px] font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg inline-block border border-slate-100">
                      <strong>{card.countKey}:</strong> <span className="text-blue-600 font-black">{card.countVal}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    {card.desc}
                  </p>

                </div>

                {/* Card Action Buttons */}
                <div className="flex gap-2.5 pt-6 mt-6 border-t border-slate-100">
                  {card.status === 'pending' ? (
                    <>
                      <button 
                        disabled={isProcessing === card.id}
                        onClick={() => handleReview(card.id)}
                        className="py-2.5 px-3 flex-1 text-center bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-black transition-all cursor-pointer uppercase tracking-wider"
                      >
                        Review Policy
                      </button>
                      
                      <button 
                        disabled={isProcessing === card.id}
                        onClick={() => handleApprove(card.id, card.title)}
                        className="py-2.5 px-3 flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md shadow-blue-100 transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                      >
                        {isProcessing === card.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5" />
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
                      className="w-full py-2.5 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 uppercase tracking-wider"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve Overrides</span>
                    </button>
                  ) : (
                    <div className="w-full py-2 bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center justify-center gap-2 text-[11px] font-black text-emerald-600 leading-none uppercase">
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
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">OPERATIONAL RESILIENCE</span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 leading-tight tracking-tight">
              Your Dedicated 24/7 Digital Operations Manager
            </h3>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">
              While leadership rests, NexoraOS AI works in the background: monitoring examination rules stability, checking transportation timing trends, mapping leave applications, and running automated compliance audits.
            </p>
          </div>

          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-[32px] p-5 sm:p-6 flex flex-col justify-between h-72 shadow-sm">
            
            {/* Log Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                AI Active Operations Live Log
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black border border-indigo-200 text-indigo-600 bg-indigo-50">STREAMING</span>
            </div>

            {/* Logs Body */}
            <div className="flex-1 overflow-y-auto py-3.5 space-y-3 font-mono text-[10.5px] text-slate-600 scrollbar-thin select-none">
              {activeLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2 border-b border-slate-100 pb-2.5 last:border-b-0">
                  <span className="text-blue-600 shrink-0 select-text">●</span>
                  <span className="leading-snug font-bold">{log}</span>
                </div>
              ))}
            </div>

            {/* Footer details */}
            <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 flex justify-between items-center font-bold">
              <span>Active Daemon processes: <strong>Scheduler d.8</strong>, <strong>Billing b.12</strong>, <strong>Telemetry t.6</strong></span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                Live Cloud Synchronizer Ready
              </span>
            </div>

          </div>

        </div>

        {/* REAL BUSINESS IMPACT KPI CARDS Grid */}
        <div className="max-w-6xl mx-auto space-y-8 pt-6">
          <div className="border-b border-slate-200 pb-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#2563EB]">Real Business Impact</h4>
            <p className="text-xs text-slate-500 font-bold">Clear performance indices representing verified school administrative efficiency audits.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Administrative Workload', value: '-75% Reduction', desc: 'Saves 30+ average weekly hours per officer', icon: Clock, color: 'text-blue-600 bg-blue-50 border border-blue-100' },
              { label: 'Human Error Rate', value: '<0.5% Fault Rate', desc: 'Avoids timetable clash & billing slip anomalies', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border border-emerald-100' },
              { label: 'Operational Savings', value: '$4,200/Mo', desc: 'Aggregated printing, paper, and manual labor hours', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50 border border-indigo-100' },
              { label: 'Regulatory Compliance Score', value: '100% Perfect Audit', desc: 'Guarantees RFID check-ins & ledger audit trails', icon: FileText, color: 'text-cyan-600 bg-cyan-50 border border-cyan-100' }
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-blue-300 hover:shadow-md transition-all space-y-4 group shadow-sm">
                  <div className={`p-2.5 w-fit rounded-xl ${kpi.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{kpi.label}</p>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight leading-none pt-1">{kpi.value}</p>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-snug border-t border-slate-100 pt-2">{kpi.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM TRUST BANNER */}
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0 mt-0.5 border border-blue-100">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h5 className="text-sm font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                <span>Absolute Corporate Sovereignty Guaranteed</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </h5>
              <p className="text-[11.5px] text-slate-500 font-bold leading-relaxed">
                NexoraOS AI has zero standalone execution capability for critical operations. Our architecture ensures that AI can only suggest and prepare, but a trusted human must authorize prior to any external action or notification delivery. Absolute corporate sovereignty.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
