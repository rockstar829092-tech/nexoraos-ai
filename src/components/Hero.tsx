/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Cpu, 
  UserCheck, 
  TrendingUp, 
  CheckCircle, 
  BarChart3, 
  Bell, 
  ShieldCheck,
  Activity
} from 'lucide-react';

import youngProfImage from '../assets/images/young_professional_laptop_1779785953007.png';

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  const [activeWidgetTab, setActiveWidgetTab] = useState<'attendance' | 'grades' | 'autopilot'>('attendance');
  const [hoveredButton, setHoveredButton] = useState<'demo' | 'tour' | null>(null);

  const handleCtaClick = (target: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onScrollToSection) {
      onScrollToSection(target);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FAF9FF] to-[#F1EEFE] py-16 lg:py-24 border-b border-[#002D62]/10 w-full select-text text-slate-800"
    >
      {/* Stripe / Linear Inspired Premium Tech Backdrop Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#002D6203_1px,transparent_1px),linear-gradient(to_bottom,#002D6203_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Futuristic soft floating blurred mesh blobs */}
      <div className="absolute top-20 left-10 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-300/20 to-indigo-300/25 blur-[100px] pointer-events-none animate-[pulse_8s_infinite]" />
      <div className="absolute bottom-10 right-10 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#DCF2FE]/40 to-[#E8E5FF]/50 blur-[110px] pointer-events-none animate-[pulse_10s_infinite_1s]" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -z-10 h-[250px] w-[250px] rounded-full bg-emerald-200/10 blur-[60px] pointer-events-none" />
      
      {/* Decorative vector grid accent circles */}
      <div className="absolute inset-x-0 top-0 h-[400px] -z-10 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <circle cx="500" cy="-100" r="300" fill="none" stroke="#000040" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="500" cy="-100" r="450" fill="none" stroke="#000040" strokeWidth="1" />
          <line x1="0" y1="150" x2="1000" y2="150" stroke="#000040" strokeWidth="1" strokeDasharray="2,8" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full relative z-10 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Typography and SaaS Actions                    */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            
            {/* Soft Lavender Minimal Tech Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50/80 to-blue-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 border border-indigo-100/60 shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-spin-slow" />
              <span className="tracking-wide uppercase font-mono text-[10px] font-black">✨ Next-Gen AI Operating System</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl font-black tracking-tight text-[#0F172A] sm:text-5xl xl:text-6xl leading-[1.08]">
                Empower Your Institutional Growth With Next-Gen <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#003B73] via-[#0074E4] to-[#7C3AED] bg-clip-text text-transparent">NexoraOS AI ERP</span>
              </h1>
              
              {/* Distinctive Subheadline */}
              <p className="text-lg sm:text-xl font-bold text-indigo-950/80 tracking-tight">
                Next-generation AI Operating System for Schools, Colleges, and Universities.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Automate admissions, attendance, finance, communication, and academic operations from one intelligent platform. Optimized with secure distributed telemetry.
            </motion.p>

            {/* Mini Trust Features Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-xs font-bold text-slate-500"
            >
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle className="h-4 w-4 text-emerald-500 shadow-3xs" /> 
                <span>Intelligent Attendance</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle className="h-4 w-4 text-emerald-500 shadow-3xs" /> 
                <span>Unified Cloud Ledger</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle className="h-4 w-4 text-emerald-500 shadow-3xs" /> 
                <span>99.9% RFID Uptime</span>
              </div>
            </motion.div>

            {/* CTA action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredButton('demo')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={(e) => handleCtaClick('playground', e)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-tr from-[#003B73] via-[#005CAD] to-[#0074E4] px-7 py-4 text-sm font-black text-white shadow-lg shadow-indigo-650/15 hover:shadow-indigo-600/25 transition-all cursor-pointer select-none text-center relative overflow-hidden"
              >
                <span className="relative z-10">Get Free Demo</span>
                <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredButton('tour')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={(e) => handleCtaClick('telemetry', e)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-250 bg-white/70 backdrop-blur-md px-7 py-4 text-sm font-black text-slate-800 hover:bg-white/95 transition-all cursor-pointer select-none shadow-sm"
              >
                <Play className="h-4 w-4 text-[#0074E4] fill-[#0074E4]" />
                <span>Watch Platform Tour</span>
              </motion.button>
            </motion.div>

            {/* Micro proof line to add Dribbble-tier brand visual weight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="pt-4 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-4 text-left"
            >
              <div className="flex -space-x-2">
                {['EC', 'MV', 'HS'].map((seed, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#002D62] to-[#0074E4] text-white flex items-center justify-center font-bold text-[9px] border-2 border-white shadow-2xs">
                    {seed}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">TRUSTED NATIONALLY</p>
                <p className="text-xs text-slate-600 font-bold mt-1">Powering automation at 500+ premium academies and universities.</p>
              </div>
            </motion.div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Graphic Artwork with Layered Floating Mockups */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0 flex justify-center items-center">
            
            {/* Soft Glowing Cyan Center Spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300/20 rounded-full blur-[90px] pointer-events-none -z-10" />

            {/* Base graphic container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[500px] h-[440px] flex items-center justify-center rounded-3xl p-6 select-none bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-xs border border-white/40 shadow-sm"
            >
              {/* Ambient network SVG link lines in background */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 500 440" fill="none">
                  <path d="M50 120 L220 80 M220 80 L380 150 M380 150 L420 320 M50 120 L150 280 M150 280 L280 380 M280 380 L420 320 M220 80 L280 380" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0074E4" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                  {/* Dynamic pulse circles along vertices */}
                  <circle cx="220" cy="80" r="3" fill="#0074E4" />
                  <circle cx="150" cy="280" r="3.5" fill="#7C3AED" />
                  <circle cx="380" cy="150" r="4.5" fill="#10B981" />
                </svg>
              </div>

              {/* Core Portrait: Modern Professional with sleek Laptop generated image */}
              <div className="relative z-10 w-[290px] h-[340px] rounded-[36px] overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,40,90,0.15)] bg-gradient-to-t from-slate-100 to-indigo-50 border-2 border-white/80 group">
                <img 
                  src={youngProfImage} 
                  alt="Modern young professional with laptop representing premium SaaS ERP user" 
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay linear shade gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0520]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* ========================================================= */}
              {/* FLOATING WIDGET 1: AI Dashboard Widget (Live Attendance)   */}
              {/* ========================================================= */}
              <motion.div 
                animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                onClick={() => setActiveWidgetTab('attendance')}
                className={`absolute top-8 -left-5 z-20 w-[190px] p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-white/65 shadow-lg shadow-slate-900/5 text-left cursor-pointer transition-all ${activeWidgetTab === 'attendance' ? 'ring-2 ring-indigo-500' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <UserCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[7px] font-mono font-black text-indigo-600 uppercase tracking-widest block">TELEMETRY</span>
                    <h5 className="text-[10px] font-black text-slate-800 leading-none">ATTENDANCE REPORT</h5>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[15px] font-black text-slate-900">96.4%</span>
                    <span className="text-[7.5px] font-extrabold text-[#10B981] bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      +1.2%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '96.4%' }} />
                  </div>
                  <p className="text-[7.5px] text-slate-500 font-bold leading-none">RFID Automated Instant Sync Active</p>
                </div>
              </motion.div>

              {/* ========================================================= */}
              {/* FLOATING WIDGET 2: Analytics Cards (AI Predictions)      */}
              {/* ========================================================= */}
              <motion.div 
                animate={{ y: [0, 8, 0], rotate: [1, -0.5, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                onClick={() => setActiveWidgetTab('grades')}
                className={`absolute bottom-[10%] -right-8 z-20 w-[210px] p-4 rounded-2xl bg-gradient-to-br from-white/95 to-indigo-50/95 backdrop-blur-md border border-indigo-100/60 shadow-xl shadow-slate-900/5 text-left cursor-pointer transition-all ${activeWidgetTab === 'grades' ? 'ring-2 ring-[#0074E4]' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <BarChart3 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[7px] font-mono font-black text-emerald-600 uppercase tracking-wide">AI FORECAST</span>
                      <h5 className="text-[10px] font-black text-[#002244] leading-none">CLASS PROGRESSION</h5>
                    </div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[8px] font-extrabold text-slate-400 block uppercase">GRADE AVG</span>
                    <span className="text-[12px] font-black text-slate-800">A+ Status</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-extrabold text-slate-400 block uppercase">FEE RECOVERY</span>
                    <span className="text-[12px] font-black text-blue-600">92%</span>
                  </div>
                </div>

                {/* Micro trend lines visually styled under */}
                <div className="flex items-end gap-1.5 h-6 mt-2.5">
                  <div className="w-full bg-slate-100 h-1 rounded-sm" />
                  <div className="w-full bg-indigo-200 h-2 rounded-sm" />
                  <div className="w-full bg-blue-400 h-3 rounded-sm" />
                  <div className="w-full bg-indigo-600 h-5 rounded-sm" />
                </div>
              </motion.div>

              {/* ========================================================= */}
              {/* FLOATING WIDGET 3: System Status / Autopilot Controller   */}
              {/* ========================================================= */}
              <motion.div 
                animate={{ x: [0, -6, 0], y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                onClick={() => setActiveWidgetTab('autopilot')}
                className={`absolute bottom-4 left-6 z-20 bg-[#0F172A] text-white p-3 rounded-xl border border-slate-800 shadow-2xl flex items-center gap-3 text-left cursor-pointer transition-all ${activeWidgetTab === 'autopilot' ? 'ring-2 ring-indigo-400' : ''}`}
              >
                <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[6.5px] text-indigo-400 font-mono font-black tracking-widest block uppercase">AUTO SCHEDULER</span>
                  <p className="text-[10px] text-white font-extrabold mt-0.5 whitespace-nowrap">Optimizing Class Timetable ✅</p>
                  <p className="text-[8px] text-slate-400 font-bold leading-none mt-0.5">Gemini GenAI-Powered</p>
                </div>
              </motion.div>

              {/* Minimalist Tech indicators and vector circles */}
              <div className="absolute top-[35%] -right-4 w-10 h-10 rounded-full bg-[#0074E4]/10 border border-[#0074E4]/20 flex items-center justify-center text-[#0074E4] -z-10">
                <Activity className="h-4 w-4 animate-pulse" />
              </div>
              <div className="absolute top-[60%] left-[-20px] w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 -z-10">
                <Bell className="h-3.5 w-3.5" />
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
