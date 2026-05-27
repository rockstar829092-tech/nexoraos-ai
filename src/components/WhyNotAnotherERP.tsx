import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Bot, 
  Send, 
  CheckCircle2, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  Gauge, 
  ShieldCheck, 
  Activity, 
  MessageSquare,
  Zap,
  TrendingUp,
  Award,
  Users,
  ThumbsUp,
  HeartHandshake
} from 'lucide-react';

export const WhyNotAnotherERP: React.FC = () => {
  // --- Feature 01: AI Principal Copilot Interactive Chat State ---
  const presetQuestions = [
    {
      q: "Why are Class 10 results declining?",
      a: "Class 10 academic performance has decreased by 8% overall. Historical attendance dropped by 12% in science courses, and 23 students are currently flagged with early risk indicators. Suggested remedial tutoring plan has been auto-generated.",
      insights: ["Math & Science decline", "12% attendance dip", "23 risk signals"]
    },
    {
      q: "Which students need immediate intervention?",
      a: "Identified 5 student outliers in Grade XI-B with >15% drop-off rates in daily telemetry index. Recommended proactive parent advisory meet and subject-specialist tutoring logs.",
      insights: ["Grade XI-B priority", "Proactive advisory", "Targeted remedial list"]
    },
    {
      q: "Which teachers are overburdened this week?",
      a: "Prof. Anjali Mehta and Dr. S. Rao are scheduled for over 28 lecture hours due to active substitute logs. Faculty fatigue index is high (84%). Timetable auto-balancer is offering shift relief schedules.",
      insights: ["High fatigue index", "Timetable re-balance active", "Anjali & Rao relieved"]
    },
    {
      q: "Which department is affecting school performance?",
      a: "The Secondary Humanities sector reports a 7.5% drag in curriculum completion rate. Main bottleneck is identified as a 3-week backlog in manual worksheet grading workflows.",
      insights: ["Humanities department", "Worksheet backlog", "AI grading suggested"]
    }
  ];

  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'assistant'; text: string; insights?: string[] }>>([
    {
      sender: 'user',
      text: "Why are Class 10 results declining?"
    },
    {
      sender: 'assistant',
      text: "Class 10 academic performance has decreased by 8%. Attendance dropped by 12% and 23 students are showing risk indicators. Recommended intervention has been generated.",
      insights: ["Math & Science decline", "12% attendance dip", "23 risk signals"]
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleQuestionSelect = (idx: number) => {
    if (isTyping) return;
    setSelectedQuestionIdx(idx);
    const selected = presetQuestions[idx];

    // Put user question first
    setChatLog(prev => [
      ...prev,
      { sender: 'user', text: selected.q }
    ]);
    setIsTyping(true);

    // Simulate luxury API response lag
    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: selected.a,
          insights: selected.insights
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // --- Feature 02: Real-time School Health Score Active Indicators ---
  const [overallHealth, setOverallHealth] = useState<number>(85);
  const [isUpdatingHealth, setIsUpdatingHealth] = useState<boolean>(false);
  
  const subScores = [
    { name: "Academics", score: 94, color: "from-blue-500 to-indigo-600" },
    { name: "Staff Performance", score: 96, color: "from-emerald-500 to-teal-600" },
    { name: "Parent Satisfaction", score: 89, color: "from-amber-500 to-orange-600" },
    { name: "Discipline", score: 91, color: "from-rose-500 to-pink-600" },
    { name: "Operations", score: 93, color: "from-sky-500 to-cyan-600" }
  ];

  // Incremental real-time simulated counter animation to Overall Health (92)
  useEffect(() => {
    const interval = setTimeout(() => {
      setIsUpdatingHealth(true);
      const timer = setInterval(() => {
        setOverallHealth(prev => {
          if (prev >= 92) {
            clearInterval(timer);
            setIsUpdatingHealth(false);
            return 92;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(timer);
    }, 1500);
    return () => clearTimeout(interval);
  }, []);

  return (
    <section id="not-another-erp" className="py-24 border-b border-slate-200 bg-slate-50 relative overflow-hidden">
      {/* Decorative luxury gradient spots & meshes */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/10 to-indigo-400/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/10 to-pink-300/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#2563EB] bg-blue-100/70 border border-blue-200/50 py-1.5 px-4 rounded-full inline-block">
            THE NEW PARADIGM
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-none">
            Why NexoraOS AI Is Not Just Another School ERP
          </h2>
          <p className="text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            NexoraOS AI is structured differently from traditional static school storage systems. It acts as the world's first autonomous institutional operating intelligence.
          </p>
        </div>

        {/* Flagship Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FEATURE 1 CARD — AI PRINCIPAL COPILOT */}
          <div className="bg-white border border-slate-250 rounded-[2.5rem] p-8 hover:border-blue-400/50 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between group relative overflow-hidden">
            
            {/* Top Glowing Core Badge */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all duration-700" />
            
            <div className="space-y-6">
              {/* Badge & Meta Block */}
              <div className="flex justify-between items-center">
                <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl border border-blue-105">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-[#2563EB] text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>AI Copilot Active</span>
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#2563EB]">FEATURE 01 — INSTITUTIONAL INTEL</span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Your AI-Powered Vice Principal
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Unlike traditional ERPs that force principals to manually analyze reports, NexoraOS AI allows school leaders to simply ask questions in natural language.
                </p>
              </div>

              {/* INTERACTIVE COMPONENT - CHAT INTERFACE & NOTIFICATION SYSTEM */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm text-slate-800 relative">
                
                {/* Simulated AI Terminal Header */}
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                    <span className="text-[9px] font-mono tracking-widest text-[#2563EB] font-black uppercase">COGNITIVE ENGINE v2.0</span>
                  </div>
                  <span className="text-[8.5px] font-mono text-blue-600 uppercase font-black">Live Telemetry Sync</span>
                </div>

                {/* Question Picker */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Select a Live Query:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {presetQuestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuestionSelect(idx)}
                        disabled={isTyping}
                        className={`text-left text-[10px] p-2 rounded-xl transition-all cursor-pointer font-semibold border ${
                          selectedQuestionIdx === idx 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-white/80'
                        }`}
                      >
                        {item.q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Simulated Chat Window */}
                <div className="h-44 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin scrollbar-thumb-slate-200 bg-white p-3.5 rounded-xl border border-slate-200 shadow-3xs">
                  <AnimatePresence mode="popLayout">
                    {chatLog.map((chat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex flex-col gap-1 max-w-[85%] ${chat.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                          {chat.sender === 'user' ? 'Principal query' : 'AI Copilot'}
                        </span>
                        
                        <div className={`p-3 rounded-2xl text-[11px] leading-relaxed font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                          chat.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                        }`}>
                          {chat.text}
                        </div>

                        {chat.insights && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {chat.insights.map((ins, i) => (
                              <span key={i} className="text-[7.5px] font-extrabold uppercase bg-blue-50 border border-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md">
                                {ins}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 p-2 text-[10px] text-blue-600 rounded-xl max-w-xs transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="font-mono text-[9px] ml-1 uppercase tracking-wider font-extrabold text-blue-700">ANALYZING INSTITUTIONAL DATA...</span>
                    </div>
                  )}
                </div>

                {/* Chat Footer Mock Input */}
                <div className="flex gap-2 border-t border-slate-200 pt-3">
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] text-slate-400 font-mono font-semibold flex items-center justify-between">
                    <span>Ask Principal Copilot...</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  </div>
                  <div className="p-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>

              {/* Outlined Benefits */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">PROVEN OUTCOMES:</span>
                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    "Instant decision making",
                    "No manual report analysis",
                    "Faster school management",
                    "Data-driven leadership"
                  ].map((ben, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                      <div className="p-0.5 bg-blue-50 text-[#2563EB] rounded-md border border-blue-100 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* FEATURE 2 CARD — AI SCHOOL HEALTH SCORE */}
          <div className="bg-white border border-slate-250 rounded-[2.5rem] p-8 hover:border-blue-400/50 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between group relative overflow-hidden">
            
            {/* Top Glowing Core Badge */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-all duration-700" />

            <div className="space-y-6">
              {/* Badge & Meta Block */}
              <div className="flex justify-between items-center">
                <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl border border-blue-105">
                  <Gauge className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Real-Time Health Monitoring</span>
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#2563EB]">FEATURE 02 — HEURISTIC AUDITING</span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Know Your Entire School's Health In One Number
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  NexoraOS AI continuously evaluates every major operational area of the institution and generates a real-time School Health Score.
                </p>
              </div>

              {/* FUTURISTIC DASHBOARD WIDGET */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-4">
                
                {/* Score Summary Metrics Ring Block */}
                <div className="grid grid-cols-12 gap-4 items-center border-b border-slate-100 pb-4">
                  
                  {/* Big Number Circle */}
                  <div className="col-span-12 sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl relative">
                    <span className="text-[9px] font-mono leading-none tracking-wider text-slate-400 font-bold block mb-1">HEALTH SCORE</span>
                    <div className="relative flex items-baseline gap-0.5">
                      <motion.span className="text-4xl font-black text-slate-900 tracking-tight font-mono">
                        {overallHealth}
                      </motion.span>
                      <span className="text-sm font-semibold text-slate-400">/100</span>
                    </div>
                    {isUpdatingHealth ? (
                      <span className="text-[8px] font-black uppercase text-[#2563EB] tracking-widest mt-1.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#2563EB]" />
                        CALCULATING...
                      </span>
                    ) : (
                      <span className="text-[8px] font-black uppercase text-emerald-600 tracking-widest mt-1.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        Live Synced
                      </span>
                    )}
                  </div>

                  {/* Core Status Message */}
                  <div className="col-span-12 sm:col-span-7 space-y-2 text-center sm:text-left">
                    <span className="text-[9px] font-black text-[#2563EB] uppercase tracking-wider bg-blue-50/70 border border-blue-100 px-2.5 py-0.5 rounded-full inline-block">
                      OPTIMAL COMPLIANCE
                    </span>
                    <p className="text-[11px] text-slate-500 leading-normal font-semibold">
                      Excellent performance verified dynamically. Student retention risk is minimized; staff attendance quality stands in the 98th percentile.
                    </p>
                  </div>

                </div>

                {/* Sub Scores list with real bar weights */}
                <div className="space-y-2.5">
                  <span className="text-[8.5px] font-extrabold uppercase text-slate-400 tracking-wider block">KEY AREA HEURISTICS STATE:</span>
                  
                  <div className="space-y-2">
                    {subScores.map((sub, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            {sub.name}
                          </span>
                          <span className="font-mono text-[9px] font-black">{sub.score} / 100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${sub.score}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full bg-gradient-to-r ${sub.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Outlined Benefits */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">PROVEN OUTCOMES:</span>
                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    "Instant school-wide visibility",
                    "Easier management reviews",
                    "Faster strategic decisions",
                    "Better institutional performance"
                  ].map((ben, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                      <div className="p-0.5 bg-blue-50 text-[#2563EB] rounded-md border border-blue-100 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* PREMIUM ENTERPRISE COMPARATIVE DEEP BANNER SECTION */}
        <div className="relative rounded-[2.5rem] bg-white text-slate-900 p-8 sm:p-12 overflow-hidden shadow-sm border border-slate-200">
          
          {/* Decorative luxury gradient spots & meshes */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
            
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#2563EB] bg-blue-50 py-1.5 px-4 rounded-full inline-block border border-blue-100/50">
                ENTERPRISE STRATEGIC OUTLOOK
              </span>
              
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight uppercase font-sans">
                Traditional School ERP Shows What Happened Yesterday.
                <br />
                <span className="text-[#2563EB] block mt-1">NexoraOS AI Predicts What Happens Tomorrow.</span>
              </h3>
              
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-lg">
                Built for visionary principals who want intelligence, automation, prediction, and real-time operational control.
              </p>
            </div>

            {/* Micro Dashboard Analytics Widget Representation */}
            <div className="w-full lg:w-auto min-w-[320px] bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm relative">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-[8px] font-mono tracking-widest text-[#2563EB] uppercase font-black">SYSTEM OPERATIONS MATRIX</span>
                <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] text-[8px] font-black uppercase rounded-md border border-blue-100">
                  SECURE COMPONENT
                </span>
              </div>

              {/* Comparing ERP v/s NEXORA */}
              <div className="space-y-2.5">
                {[
                  { label: "Data Pipeline", erp: "Historical Records Only", next: "Continuous Predictive Scans" },
                  { label: "Operation Flow", erp: "Manual Worksheets & Forms", next: "Autonomous Event Triggers" },
                  { label: "Risk Management", erp: "Reactive Troubleshooting", next: "60-Day Proactive Interventions" }
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 text-[10px] items-center">
                    <div className="col-span-4 font-mono text-[9px] text-[#2563EB] uppercase font-bold">{item.label}</div>
                    <div className="col-span-4 text-slate-400 font-medium">{item.erp}</div>
                    <div className="col-span-4 font-black text-emerald-600 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-500 shrink-0" />
                      {item.next}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status footer with green blinker */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-3 text-[8.5px] font-mono font-black text-slate-400">
                <span>VER v4.95a</span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ONLINE SECURE PROTOCOL
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
