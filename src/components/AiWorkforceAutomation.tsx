import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  Cpu, 
  BarChart3, 
  Clock, 
  Target, 
  Users, 
  ShieldCheck,
  Zap
} from 'lucide-react';

const roiData = [
  { name: 'Manual Effort (Before)', hours: 50 },
  { name: 'Manual Effort (With NexoraOS)', hours: 10 },
];

export const AiWorkforceAutomation: React.FC = () => {
  return (
    <section id="ai-workforce" className="py-24 bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            AI Workforce Automation
          </h2>
          <p className="text-xl text-blue-600 font-semibold">
            Reduce Repetitive Administrative Work Through Intelligent Automation
          </p>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            NexoraOS AI acts as a 24×7 Digital Operations Assistant that continuously handles repetitive school administration tasks, reduces staff workload, eliminates human errors, and improves institutional efficiency while keeping all critical decisions under management control.
          </p>
          <div className="flex justify-center gap-6 pt-4 text-sm font-bold uppercase tracking-wider">
            <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200">75% Administrative Automation</span>
            <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">100% Management Control</span>
          </div>
        </div>

        {/* Workload Comparison & Chart */}
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Administrative Workload Reduction</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a' }} />
                      <Bar dataKey="hours" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold mb-4 text-slate-900">Before NexoraOS AI</h4>
                    <ul className="space-y-2 text-sm">
                        {["Manual Attendance", "Manual Fee Follow-Ups", "WhatsApp Group Coordination", "Manual Reports"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-red-600">
                                <X className="w-4 h-4" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <h4 className="text-lg font-bold mb-4 text-blue-700">With NexoraOS AI</h4>
                    <ul className="space-y-2 text-sm">
                        {["Automated Attendance", "Smart Fee Automation", "Event Coordination", "One-Click Reports"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-emerald-600">
                                <CheckCircle2 className="w-4 h-4" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Workflows */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { title: "Attendance Automation", desc: "AI tracks attendance, detects absences, generates reports.", result: "90% Less Manual Work" },
                { title: "Fee Collection", desc: "AI detects pending dues, creates reminder schedules, tracks progress.", result: "Faster Fee Recovery" },
                { title: "Communication", desc: "Automates notices, exam alerts, PTM invitations via SMS, Email, WhatsApp.", result: "Omnichannel Efficiency" },
                { title: "Scheduling", desc: "AI detects conflicts, suggests alternative slots, coordinates meetings.", result: "Fewer Scheduling Errors" }
            ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">{f.title}</h4>
                    <p className="text-slate-600 text-xs mb-4">{f.desc}</p>
                    <span className="text-emerald-700 font-semibold text-xs">{f.result}</span>
                </div>
            ))}
        </div>

        {/* Human control */}
        <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">What Always Requires Human Approval</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-700">
                {['Fee Waivers', 'Disciplinary Actions', 'Staff Hiring/Firing', 'Payroll Approvals', 'Policy Changes', 'Emergency Decisions', 'Financial Authorizations'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2"><CheckCircle2 className="text-amber-500 w-4 h-4"/>{item}</div>
                ))}
            </div>
        </div>
        
      </div>
    </section>
  );
};
