/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Bell, 
  Sparkles, 
  Calendar, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface TelemetryLog {
  id: string;
  time: string;
  category: 'attendance' | 'finance' | 'scheduling' | 'ai';
  message: string;
  type: 'info' | 'warning' | 'success';
}

export const TelemetrySimulator: React.FC = () => {
  // Simulator States
  const [attendancePercent, setAttendancePercent] = useState<number>(96.4);
  const [feeCollectionRate, setFeeCollectionRate] = useState<number>(88.2);
  const [operatingBudget, setOperatingBudget] = useState<number>(124000); // monthly budget state
  const [timetableStability, setTimetableStability] = useState<number>(98.5);

  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      id: "log-1",
      time: "11:22 AM",
      category: "attendance",
      message: "RFID Gate Entrance #3: 140 student registers clocked within 15 seconds.",
      type: "success"
    },
    {
      id: "log-2",
      time: "10:45 AM",
      category: "finance",
      message: "Automated billing remark: Installment reminders successfully delivered to 42 guardians.",
      type: "info"
    },
    {
      id: "log-3",
      time: "09:30 AM",
      category: "scheduling",
      message: "Class reschedule solver active: Substituted Room 402 with Chemistry Lab for Grade 11-B.",
      type: "success"
    },
    {
      id: "log-4",
      time: "08:15 AM",
      category: "ai",
      message: "Predictive Analytics: Flagged 7 pupils at risk of math grade drops due to attendance anomalies.",
      type: "warning"
    }
  ]);

  // Derived calculations based on sliders
  const totalStudentsCount = 1450;
  const activeAttendees = Math.round(totalStudentsCount * (attendancePercent / 100));
  const absentees = totalStudentsCount - activeAttendees;
  const projectedRevenue = Math.round(445200 * (feeCollectionRate / 100));
  const efficiencyIndex = Math.min(
    100, 
    Math.round((attendancePercent * 0.4) + (feeCollectionRate * 0.4) + ((timetableStability) * 0.2))
  );

  const handleReset = () => {
    setAttendancePercent(96.4);
    setFeeCollectionRate(88.2);
    setOperatingBudget(124000);
    setTimetableStability(98.5);
  };

  const addCustomLog = (category: 'attendance' | 'finance' | 'scheduling' | 'ai' | 'action') => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let newLog: TelemetryLog;

    if (category === 'attendance') {
      const names = ["Aaliyah", "James", "Kaito", "Fatima", "Maximilian", "Siddharth"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      newLog = {
        id: `log-${Date.now()}`,
        time: timeString,
        category: "attendance",
        message: `Direct Scan: Parent of ${randomName} notified automatically via SMS of tardy arrivals.`,
        type: "info"
      };
    } else if (category === 'finance') {
      const amounts = [150, 240, 450, 750];
      const randomAmt = amounts[Math.floor(Math.random() * amounts.length)];
      newLog = {
        id: `log-${Date.now()}`,
        time: timeString,
        category: "finance",
        message: `Stripe Ledger Sync: Real-time term payment voucher of $${randomAmt} verified securely.`,
        type: "success"
      };
    } else if (category === 'scheduling') {
      newLog = {
        id: `log-${Date.now()}`,
        time: timeString,
        category: "scheduling",
        message: `Optimizer Core: Resolved timetable classroom collision in chemistry faculty in 0.44 seconds.`,
        type: "success"
      };
    } else {
      newLog = {
        id: `log-${Date.now()}`,
        time: timeString,
        category: "ai",
        message: `Nexora NLP Core generated automated school performance summaries for regional authorities.`,
        type: "info"
      };
    }

    setLogs(prev => [newLog, ...prev.slice(0, 7)]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      {/* Top Banner introducing simulator */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Platform Simulation</span>
          </div>
          <h3 className="text-xl font-bold font-sans text-slate-900 tracking-tight">
            Real-Time School Operations Telemetry
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
            Adjust student, scheduling, and billing variables below to simulate how NexoraOS AI instantly processes compliance updates, triggers alerts, and logs unified records.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl transition hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Controls & Sliders */}
        <div className="lg:col-span-4 bg-slate-50/70 rounded-2xl border border-slate-100 p-6 space-y-6">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest bg-slate-100/50 py-1 px-2.5 rounded inline-block">
            Simulation Inputs
          </h4>

          {/* Slider 1: Attendance */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                Student Attendance Index
              </span>
              <span className="font-mono font-bold text-blue-600 text-sm">{attendancePercent.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="100"
              step="0.1"
              value={attendancePercent}
              onChange={(e) => setAttendancePercent(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>70% (Anomalous)</span>
              <span>100% (Perfect)</span>
            </div>
          </div>

          {/* Slider 2: Fee Collections */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Ledger Collection Rate
              </span>
              <span className="font-mono font-bold text-emerald-600 text-sm">{feeCollectionRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="0.5"
              value={feeCollectionRate}
              onChange={(e) => setFeeCollectionRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>50% (High Delinquency)</span>
              <span>100% (Debt-Free)</span>
            </div>
          </div>

          {/* Slider 3: Timetable Efficiency */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-violet-600" />
                Timetable Resource Stability
              </span>
              <span className="font-mono font-bold text-violet-600 text-sm">{timetableStability.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="85"
              max="100"
              step="0.5"
              value={timetableStability}
              onChange={(e) => setTimetableStability(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>85% (High Conflicts)</span>
              <span>100% (Optimal Sync)</span>
            </div>
          </div>

          {/* Quick-Fire Event Generator buttons */}
          <div className="pt-4 border-t border-slate-200/60">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Trigger Operational Incidents
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addCustomLog('attendance')}
                className="py-2 px-2.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg text-left transition hover:bg-slate-50 flex flex-col justify-between h-14"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mb-1" />
                <span>Pupil Tardy SMS</span>
              </button>
              <button
                onClick={() => addCustomLog('finance')}
                className="py-2 px-2.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg text-left transition hover:bg-slate-50 flex flex-col justify-between h-14"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-1" />
                <span>Term payment sync</span>
              </button>
              <button
                onClick={() => addCustomLog('scheduling')}
                className="py-2 px-2.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg text-left transition hover:bg-slate-50 flex flex-col justify-between h-14"
              >
                <div className="w-2 h-2 rounded-full bg-violet-500 mb-1" />
                <span>Solve Timetable Conflict</span>
              </button>
              <button
                onClick={() => addCustomLog('ai')}
                className="py-2 px-2.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg text-left transition hover:bg-slate-50 flex flex-col justify-between h-14"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 mb-1" />
                <span>Trigger AI Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center / Right Columns - Output Metrics & Stream Log */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform" />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Attendees</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                    {activeAttendees}
                  </span>
                  <span className="text-xs text-slate-500">/ {totalStudentsCount} pupils</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-4 pt-4 border-t border-slate-100">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                <span>{absentees} absentees logged</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform" />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projected Receipts</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                    ${projectedRevenue.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500">of $445k</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-4 pt-4 border-t border-slate-100">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{feeCollectionRate < 80 ? "Reminders required" : "Collection is strong"}</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform" />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operations Index</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-slate-900 font-sans tracking-tight">
                    {efficiencyIndex}%
                  </span>
                  <span className="text-xs text-slate-500">Efficiency</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold mt-4 pt-4 border-t border-slate-100 text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>All core systems healthy</span>
              </div>
            </div>
          </div>

          {/* Unified Compliance Logs Container */}
          <div className="border border-slate-200 rounded-2xl flex-1 flex flex-col overflow-hidden min-h-[280px]">
            {/* Logs Header */}
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-blue-600" />
                Real-Time Compliance Audit Logs
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                Live Feed
              </span>
            </div>

            {/* Log Rows */}
            <div className="p-4 space-y-3.5 overflow-y-auto max-h-[300px] flex-1">
              {logs.map((log) => {
                let badgeColor = "bg-slate-100 text-slate-600 border-slate-200";
                if (log.type === 'success') badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
                if (log.type === 'warning') badgeColor = "bg-amber-50 text-amber-700 border-amber-100";

                return (
                  <div 
                    key={log.id} 
                    className="flex text-xs border-b border-slate-100 last:border-b-0 pb-3 last:pb-0 items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300"
                  >
                    <span className="text-[11px] font-medium text-slate-400 font-mono mt-0.5">{log.time}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wider uppercase inline-block ${badgeColor}`}>
                      {log.category}
                    </span>
                    <span className="text-slate-700 leading-relaxed font-sans flex-1">
                      {log.message}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Visual simulation status footer */}
            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-150 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Solvers Active: <strong>Timetable Solver 4.1a</strong> • <strong>SMS Telemetry Hub</strong></span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Connection Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
