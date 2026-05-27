import React from 'react';
import { Sparkles, Bot, Calendar, Users, Clock, Zap, ArrowRight, Settings, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SuggestionCardProps {
  title: string;
  msg: string;
  audience: string;
  time: string;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, msg, audience, time }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
        <Sparkles className="w-5 h-5" />
      </div>
      <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg uppercase tracking-widest">{time}</span>
    </div>
    <h4 className="text-sm font-black text-slate-900 mb-1">{title}</h4>
    <p className="text-xs text-slate-500 mb-4 font-medium line-clamp-2">"{msg}"</p>
    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
      <span>{audience}</span>
      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
        Review & Approve <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export const AiCommandCenter: React.FC = () => {
    const suggestions = [
        { title: '🎆 Diwali Greeting', msg: 'Wishing you a joyful and prosperous Diwali...', audience: 'All Parents', time: 'Tomorrow' },
        { title: '📅 PTM Reminder', msg: 'Gentle reminder for the PTM this Saturday...', audience: 'Grade X Parents', time: 'Today' },
        { title: '💰 Fees Alert', msg: 'Pending fee reminder for Quarter 2...', audience: 'Selected Parents', time: '3 Days' },
    ];

    const rules = [
        { title: 'Attendance Absence', desc: 'AI Generates -> WhatsApp Sent', icon: Users },
        { title: 'Fees Overdue', desc: 'AI Creates -> Broadcasted', icon: Zap },
        { title: 'Festival Detected', desc: 'AI Drafts -> Admin Approves', icon: Calendar },
    ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            AI Communication Command Center
        </h2>
        <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-1">
          <Settings className="w-3 h-3" /> Configure AI Engine
        </button>
      </div>

        {/* Suggestions */}
        <div className="space-y-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Upcoming AI Suggestions</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestions.map((s, i) => <SuggestionCard key={i} {...s} />)}
             </div>
        </div>

        {/* Rules */}
        <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Smart Automation Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rules.map((rule, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl items-center">
                        <div className="p-3 bg-white rounded-xl border border-slate-100">
                           <rule.icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                           <h5 className="text-[11px] font-black text-slate-900 uppercase">{rule.title}</h5>
                           <p className="text-[9px] font-bold text-slate-500">{rule.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
