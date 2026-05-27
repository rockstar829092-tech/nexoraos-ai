import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Zap, 
  AlertTriangle,
  Clock,
  Navigation,
  Check
} from 'lucide-react';

export const WhyNexoraOS: React.FC = () => {
  const [selectedSub, setSelectedSub] = useState<number>(0);
  const [activeAlert, setActiveAlert] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Array<{ id: number; title: string; desc: string; type: 'warning' | 'success' }>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<number>(0);

  // Substitution state emulation
  const substitutions = [
    { time: "08:15 AM", event: "Absence Logged", desc: "Prof. S. Rao (Chemistry) reported medical leave.", status: "reported" },
    { time: "08:16 AM", event: "Timetable Audit", desc: "AI analyzed 24 current faculty workloads & expert matches.", status: "audit" },
    { time: "08:17 AM", event: "Auto Assigned", desc: "Dr. Mukherji allocated to Class XII-A Chemistry Lab.", status: "success" }
  ];

  const triggerPredictions = () => {
    const now = Date.now();
    if (now - lastTriggerRef.current < 12000) return; // 12 seconds cooldown
    lastTriggerRef.current = now;

    // Trigger prediction events sequentially
    setTimeout(() => {
      const id1 = Date.now();
      setToasts(prev => [
        ...prev,
        {
          id: id1,
          title: "Predictive Alert Generated",
          desc: "AI Risk Prediction: Student risk score threshold (72%) exceeded for Grade XII-A Chemistry Lab. Proactive advisory sent.",
          type: "warning"
        }
      ]);
    }, 800);

    setTimeout(() => {
      const id2 = Date.now() + 1;
      setToasts(prev => [
        ...prev,
        {
          id: id2,
          title: "Geo-Fence Scan Succeeded",
          desc: "Live Support Staff Geo-Audit passed. 9 drivers & campus guards verified active and on-route.",
          type: "success"
        }
      ]);
    }, 2400);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          triggerPredictions();
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return (
    <section ref={sectionRef} id="why-different" className="py-24 border-b border-slate-200 bg-white relative overflow-hidden">
      {/* Decorative premium layout grids */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-50/40 rounded-full blur-3xl -z-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#2563EB] bg-blue-50 border border-blue-100 py-1 px-4 rounded-full inline-block">
            ENTREPRISE ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
            Why NexoraOS AI Is Different
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Traditional School ERPs only look backward at logs and archives. NexoraOS AI is an autonomous, predictive platform designed to optimize schools on autopilot.
          </p>
        </div>

        {/* 3 Premium Enterprise Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          
          {/* CARD 1: AI PREDICTIVE EARLY WARNING ENGINE */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.98, y: 15 },
              show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 hover:border-blue-300 transition-all hover:shadow-sm flex flex-col justify-between group h-full"
          >
            <div className="space-y-5">
              
              {/* Card Meta Indicator */}
              <div className="flex justify-between items-center">
                <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-2xl group-hover:scale-105 transition-all">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 bg-red-100/70 text-red-700 text-[9px] font-black uppercase tracking-wider rounded-md border border-red-200/50">
                  PREDICTIVE ENGINE
                </span>
              </div>

              {/* Copy Block */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  Predict Student Risks Before They Happen
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  NexoraOS AI analyzes attendance trends, academic performance, behavior patterns, and engagement metrics to identify students at risk of academic decline or dropout up to 60 days in advance.
                </p>
              </div>

              {/* ADVANCED MINI CHART & RISK SCORE BADGE MOCKUP */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                
                {/* Risk Score Indicator */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">ACTIVE TELEMETRY</span>
                  </div>
                  {/* Badge */}
                  <div className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase rounded-md border border-rose-100">
                    High Risk: 72%
                  </div>
                </div>

                {/* Example AI Alert Box */}
                <div 
                  className="bg-rose-50/50 border border-thin border-rose-200/60 p-2.5 rounded-xl space-y-1 transition-colors duration-500"
                >
                  <span className="text-[9px] font-black text-rose-800 uppercase tracking-widest block">AI RISK PREDICTION</span>
                  <p className="text-[10px] text-slate-705 leading-snug">
                    "Student Risk Score: 72% probability of academic decline detected."
                  </p>
                </div>

                {/* Mini Line Chart simulation */}
                <div className="h-10 flex items-end gap-1 px-1 pt-1 justify-between select-none">
                  {[45, 48, 52, 60, 58, 62, 72].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group/bar cursor-pointer">
                      <div 
                        style={{ height: `${val}%` }} 
                        className={`w-full rounded-xs transition-all ${idx === 6 ? 'bg-red-500' : 'bg-slate-300 group-hover/bar:bg-blue-500'}`} 
                      />
                      <span className="text-[7px] text-slate-400 font-mono mt-1">{`D-${(7 - idx) * 10}`}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* BENEFITS CHECKLIST */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[8.5px] font-extrabold uppercase text-slate-400 tracking-wider block">PROVEN OUTCOMES:</span>
                <div className="grid grid-cols-2 gap-2 text-[10.5px] text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Improve academic focus</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Reduce dropout rates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Enable proactive action</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Increase parent trust</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* CARD 2: DYNAMIC AI AUTO-SUBSTITUTION ENGINE */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.98, y: 15 },
              show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
            }}
            className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 hover:border-blue-300 transition-all hover:shadow-sm flex flex-col justify-between group h-full"
          >
            <div className="space-y-5">
              
              {/* Card Meta Indicator */}
              <div className="flex justify-between items-center">
                <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-2xl group-hover:scale-105 transition-all">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] text-[9px] font-black uppercase tracking-wider rounded-md border border-blue-100">
                    1 HR SAVED DAILY
                  </span>
                </div>
              </div>

              {/* Copy Block */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  Teacher Absent? AI Handles Everything Automatically
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  When a teacher is absent, NexoraOS AI instantly analyzes timetable availability, subject expertise, and workload distribution to assign the best substitute teacher automatically.
                </p>
              </div>

              {/* INTERACTIVE TIMELINE AUTO ASSIGNMENT */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">SCHEDULER ENGINE v3.4</span>
                  <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase rounded">ACTIVE SYNC</span>
                </div>

                {/* Timeline display */}
                <div className="space-y-2.5">
                  {substitutions.map((sub, idx) => (
                    <motion.div 
                      key={idx}
                      className={`flex gap-2.5 text-[10px] leading-tight ${selectedSub === idx ? 'opacity-100' : 'opacity-70'}`}
                      onMouseEnter={() => setSelectedSub(idx)}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full ${idx === 2 ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                        {idx !== 2 && <div className="w-px h-6 bg-slate-200 flex-1 my-0.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-slate-800">{sub.event}</span>
                          <span className="text-[8px] text-slate-400 font-mono font-bold">{sub.time}</span>
                        </div>
                        <p className="text-[9.5px] text-slate-500 mt-0.5 font-semibold">{sub.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>

              {/* BENEFITS CHECKLIST */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[8.5px] font-extrabold uppercase text-slate-400 tracking-wider block">PROVEN OUTCOMES:</span>
                <div className="grid grid-cols-2 gap-2 text-[10.5px] text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>No manual schedules</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>No teaching gaps</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Faster daily workflows</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Reduced HOD fatigue</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* CARD 3: SUPPORT STAFF TELEMETRY & AI AUDIT */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.98, y: 15 },
              show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
            }}
            className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 hover:border-blue-300 transition-all hover:shadow-sm flex flex-col justify-between group h-full"
          >
            <div className="space-y-5">
              
              {/* Card Meta Indicator */}
              <div className="flex justify-between items-center">
                <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-2xl group-hover:scale-105 transition-all flex items-center">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 -ml-1.5 bg-white rounded-full p-0.5 shadow-xs" />
                </div>
                <div 
                  className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/55 px-2.5 py-1 rounded-full shadow-xs"
                >
                  <span className="h-2 w-2 relative">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-widest">Live Tracking Active</span>
                </div>
              </div>

              {/* Copy Block */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  Complete Visibility Across Campus Operations
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Live tracking for Drivers, Guards, and Peons. Uses Geo-fencing and AI photo-auditing to ensure 100% task compliance and campus safety.
                </p>
              </div>

              {/* LIVE GEOGRAPHIC AUDIT GRID */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">STAFF GEOLOCATION DEPLOYMENT</span>
                  <span className="text-[8px] text-emerald-600 font-black uppercase">0 CRITICAL FAULTS</span>
                </div>

                {/* Geo-Fence Visualization mock */}
                <div className="h-22 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-150 flex items-center justify-center p-2 select-none">
                  
                  {/* Radar grid ring accents */}
                  <div className="absolute inset-0 bg-[radial-gradient(#2563eb12_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <div className="absolute w-16 h-16 border border-blue-500/20 rounded-full" />
                  <div className="absolute w-28 h-28 border border-dashed border-indigo-400/20 rounded-full" />
                  
                  {/* Center Hub */}
                  <div className="absolute w-3 h-3 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  {/* Active staff markers */}
                  <div className="absolute top-4 left-6 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                    <span className="text-[7.5px] font-sans font-extrabold text-[#0F172A] p-0.5 bg-white border border-slate-200 rounded leading-none">Guard 01</span>
                  </div>

                  <div className="absolute bottom-4 right-8 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                    <span className="text-[7.5px] font-sans font-extrabold text-[#0F172A] p-0.5 bg-white border border-slate-200 rounded leading-none">Bus-2 Active</span>
                  </div>

                  {/* Geo-fence border area mockup */}
                  <div className="absolute inset-2 border-2 border-dashed border-[#2563EB]/15 rounded-lg" />
                </div>

                <div className="flex justify-between text-[8px] text-slate-400 font-mono font-black border-t border-slate-100 pt-2">
                  <span>9 ACTIVE LOCATIONS</span>
                  <span>SECURE GEO-FENCED</span>
                </div>

              </div>

              {/* BENEFITS CHECKLIST */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[8.5px] font-extrabold uppercase text-slate-400 tracking-wider block">PROVEN OUTCOMES:</span>
                <div className="grid grid-cols-2 gap-2 text-[10.5px] text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Better campus discipline</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Absolute staff accountability</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Improved student hazards safety</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Real-time geo-coordinates</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>

        {/* PREMIUM BANNER: Traditional ERPs vs NexoraOS AI */}
        <div className="bg-[#0F172A] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          
          {/* Neon lights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-505/10 rounded-full blur-3xl pointer-events-none" />

          {/* Banner content structure split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 py-1 px-3.5 rounded-full inline-block">
                THE PARADIGM SHIFT
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans">
                Traditional ERPs Record The Past.
                <br />
                <span className="text-blue-500 leading-tight">NexoraOS AI Predicts The Future.</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Unlock autonomous compliance checks, proactive risk warnings, and streamlined schedules without leaving details to manual errors.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Comparison Point 1 */}
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl flex items-start gap-3.5 hover:bg-slate-800/60 transition-colors">
                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg mt-0.5 font-bold text-xs font-mono shrink-0">01</div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-slate-350 tracking-wider">Reports → Predictions</h5>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      Convert static historical database sheets into active early predictive engines.
                    </p>
                  </div>
                </div>

                {/* Comparison Point 2 */}
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl flex items-start gap-3.5 hover:bg-slate-800/60 transition-colors">
                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg mt-0.5 font-bold text-xs font-mono shrink-0">02</div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-slate-350 tracking-wider">Manual Work → Automation</h5>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      Eliminate hours spent manually mapping substitute teacher timetables and schedules.
                    </p>
                  </div>
                </div>

                {/* Comparison Point 3 */}
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl flex items-start gap-3.5 hover:bg-slate-800/60 transition-colors">
                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg mt-0.5 font-bold text-xs font-mono shrink-0">03</div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-slate-350 tracking-wider">Attendance → Behavioral Intel</h5>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      Discover subtle active drop patterns before they cascade into academic declines.
                    </p>
                  </div>
                </div>

                {/* Comparison Point 4 */}
                <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl flex items-start gap-3.5 hover:bg-slate-805 hover:bg-slate-800/60 transition-colors">
                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg mt-0.5 font-bold text-xs font-mono shrink-0">04</div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-slate-350 tracking-wider">Monitoring → Autonomous Operations</h5>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      Empower operations with smart geo-fencing location sync over secure compliance channels.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Premium Enterprise Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pointer-events-auto bg-[#0F172A]/95 text-white p-4 rounded-2xl shadow-xl border border-slate-700/55 flex items-start gap-3 "
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === "warning" ? (
                  <div className="p-1.5 bg-rose-500/10 text-rose-450 text-rose-400 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-450 text-emerald-400 rounded-lg">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
                    <span>{toast.title}</span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                    </span>
                  </h4>
                  <button 
                    onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] font-bold font-mono px-1">×</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                  {toast.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
};
