/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRICING_TIERS } from '../data';
import { 
  Users,
  Check, 
  X, 
  Info, 
  ShieldCheck, 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Database, 
  AlertTriangle, 
  Zap, 
  Cloud,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Eye,
  TrendingUp,
  CheckCircle2,
  Quote,
  UserCheck,
  LockIcon
} from 'lucide-react';

export const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="space-y-24 mb-24 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. BILLING TOGGLE */}
      <div className="flex flex-col items-center gap-6">
        <div className="inline-flex p-1.5 bg-slate-100/80 backdrop-blur rounded-[20px] border border-slate-200/60 shadow-inner">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-300 ${
              billingPeriod === 'monthly'
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 translate-y-[-1px]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly Subscription
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center gap-2 ${
              billingPeriod === 'annual'
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 translate-y-[-1px]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Annual Subscription 
            <span className="bg-emerald-400 text-blue-900 px-2 py-0.5 rounded-full text-[9px] font-black">
              SAVE 25%
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full animate-pulse">
           <Zap className="w-3.5 h-3.5 text-blue-600" />
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Pricing updated for 2026 Academic Season</span>
        </div>
      </div>

      {/* 2. PRICING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_TIERS.map((tier, idx) => {
          const price = billingPeriod === 'annual' ? tier.annualPrice : tier.monthlyPrice;
          const billingTerm = billingPeriod === 'annual' ? '/ Year' : '/ Month';
          
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white border-2 rounded-[40px] p-8 md:p-10 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
                tier.isPopular 
                ? 'border-blue-600 ring-4 ring-blue-50 scale-105 z-10' 
                : 'border-slate-100'
              }`}
            >
              {tier.badge && (
                <div className={`absolute top-0 right-10 translate-y-[-50%] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${
                  tier.isPopular ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                }`}>
                  {tier.badge}
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">{tier.name}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 h-10 overflow-hidden">
                    {tier.tagline}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-black text-slate-950 font-sans tracking-tighter">
                      ₹{price.toLocaleString()}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-400 font-sans uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded leading-none">
                        {billingTerm}
                      </span>
                      {billingPeriod === 'annual' && (
                         <span className="text-[10px] font-black text-emerald-600 uppercase mt-1">
                            ₹{(Math.round(price / 12)).toLocaleString()} Effective/Mo
                         </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-8">
                     <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-100">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-black text-blue-900 uppercase tracking-tight">{tier.studentCapacity}</span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <ArrowUpRight className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{tier.supportType}</span>
                     </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">
                    Key Deliverables
                  </span>
                  <div className="space-y-3">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full mt-0.5">
                           <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button className={`w-full py-5 px-6 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                  tier.isPopular
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/30'
                  : 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-900/10'
                }`}>
                  Select {tier.name} <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center font-black text-slate-400 uppercase tracking-widest">{tier.bestFor}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. SUBSCRIPTION RENEWAL & PROTECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* RENEWAL PROTECTION */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="bg-white border-2 border-slate-200 rounded-[40px] p-8 md:p-12 shadow-sm space-y-8"
        >
           <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl">
                 <Bell className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Renewal Protection</h3>
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Smart automated reminders</p>
              </div>
           </div>
           
           <p className="text-slate-600 font-medium leading-relaxed">
             NexoraOS AI automatically sends multi-channel renewal reminders before subscription expiry to ensure zero interruption in institutional data services.
           </p>

           <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6 space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">5 Days Before Expiry</span>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Smartphone, label: 'Dashboard Notification', active: true },
                      { icon: Mail, label: 'Email Reminder', active: true },
                      { icon: MessageSquare, label: 'SMS Reminder', active: true },
                      { icon: Smartphone, label: 'WhatsApp Reminder', active: true },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                         <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                            <item.icon className="w-3.5 h-3.5" />
                         </div>
                         <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{item.label}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="border-l-4 border-amber-400 pl-6 space-y-4 opacity-70">
                 <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-amber-600 uppercase tracking-widest">3 Days & 1 Day Before</span>
                 </div>
                 <div className="flex gap-4">
                    <div className="px-4 py-2 bg-amber-50 text-amber-700 text-[10px] font-black uppercase rounded-lg border border-amber-100">Renewal Warning</div>
                    <div className="px-4 py-2 bg-rose-50 text-rose-700 text-[10px] font-black uppercase rounded-lg border border-rose-100">Urgent Alert</div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* READ ONLY MODE */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="bg-[#0F172A] rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
        >
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-white/10 text-white rounded-3xl backdrop-blur-xl">
                    <ShieldCheck className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Read-Only Safety</h3>
                    <p className="text-sm font-bold text-blue-400 uppercase tracking-widest italic">Zero Data Loss Policy</p>
                 </div>
              </div>
              
              <p className="text-slate-400 font-medium leading-relaxed">
                If a subscription expires, school data remains completely safe and preserved. The platform enters <span className="text-white font-black">Read-Only Mode</span> until renewal.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 border-b border-rose-400/20 pb-2 flex items-center justify-between">
                       Restricted <X className="w-3 h-3" />
                    </span>
                    {['New Admissions', 'New Attendance', 'New Fee Collections', 'AI Features', 'SMS & WhatsApp'].map(item => (
                       <div key={item} className="flex items-center gap-2 opacity-60">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span className="text-[10px] font-bold uppercase text-slate-300">{item}</span>
                       </div>
                    ))}
                 </div>
                 <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 border-b border-emerald-400/20 pb-2 flex items-center justify-between">
                       Available <Check className="w-3 h-3" />
                    </span>
                    {['View Existing Data', 'Access History', 'Renew Anytime', 'Export Student List'].map(item => (
                       <div key={item} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] font-bold uppercase text-slate-100">{item}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                 <Info className="w-4 h-4 text-blue-400 shrink-0" />
                 <p className="text-[10px] text-slate-400 font-bold uppercase leading-tight tracking-wider">Note: No school data is deleted after subscription expiry.</p>
              </div>
           </div>
           <Database className="absolute bottom-[-30px] right-[-30px] w-64 h-64 text-white p-12 opacity-5 -rotate-12" />
        </motion.div>
      </div>

      {/* 4. OPTIONAL ADD-ONS */}
      <section className="space-y-12">
         <div className="text-center space-y-4">
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Boost Your Ecosystem</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Optional Infrastructure Upgrades</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'sms', title: 'SMS Pack', price: '₹499', detail: '5,000 SMS Credits', icon: MessageSquare },
              { id: 'wa', title: 'WhatsApp Pack', price: '₹999', detail: '2,500 Messages', icon: MessageSquare },
              { id: 'ai', title: 'AI Credits Pack', price: '₹999', detail: '10,000 AI Requests', icon: Zap },
              { id: 'cloud', title: 'Cloud Storage', price: '₹299', detail: '50 GB Additional Storage', icon: Cloud, sub: '/ Month' },
            ].map(addon => (
              <div key={addon.id} className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 text-center hover:bg-white hover:shadow-xl transition-all group flex flex-col items-center justify-between gap-4">
                 <div className="p-3 bg-white border border-slate-100 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                    <addon.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{addon.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{addon.detail}</span>
                 </div>
                 <div className="text-xl font-black text-slate-900">
                    {addon.price}
                    {addon.sub && <span className="text-[10px] text-slate-400 ml-1 uppercase">{addon.sub}</span>}
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 5. BOTTOM TRUST BANNER */}
      <section>
         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[60px] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-4xl mx-auto space-y-10">
               <div className="space-y-6">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]">
                     Flexible Plans. <br/> Transparent Pricing. <br/> <span className="text-blue-200">Complete Control.</span>
                  </h2>
                  <p className="text-blue-50 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                    Choose monthly billing for flexibility or annual billing to save 25%. Upgrade, downgrade, or renew your plan anytime while keeping your school data fully protected.
                  </p>
               </div>
               
               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-900/20"
                  >
                     Start Free Demo
                  </motion.button>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 px-8 p-4 text-white/90 font-black text-xs uppercase tracking-[0.3em] group"
                  >
                     <span>Schedule Live Consultation</span>
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
               </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl opacity-50" />
         </div>
      </section>

      {/* 6. TECHNICAL OPERATIONS & SUPPORT TEAM */}
      <section className="space-y-24 mt-40">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Behind Every NexoraOS AI School Instance</h2>
          <p className="text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            NexoraOS AI is not just software. It is backed by a dedicated technical operations team that continuously monitors platform performance, security, uptime, data protection, updates, and customer support.
          </p>
        </div>

        {/* WHERE INVESTMENT GOES */}
        <div className="bg-white border-2 border-slate-200 rounded-[50px] p-8 md:p-16 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl">
                   <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Where Your Subscription Investment Goes</h3>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                Schools often ask why communication credits, AI processing credits, and infrastructure upgrades have separate costs. NexoraOS AI maintains high-availability systems to ensure reliability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                {[
                  'Secure Cloud Infrastructure',
                  'Database Hosting & Backup',
                  'AI Processing Servers',
                  'SMS Gateway Integrations',
                  'WhatsApp Business API',
                  'Platform Security Monitoring',
                  'Continuous Product Updates',
                  'Data Protection Systems',
                  '24x7 Technical Monitoring',
                  'Customer Support Operations'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] border border-slate-200 p-8 md:p-12 rounded-[40px] text-center space-y-6 relative">
              <div className="absolute top-0 right-0 p-6 opacity-30">
                <ShieldCheck className="w-16 h-16 text-blue-600" />
              </div>
              <Quote className="w-12 h-12 text-blue-100 mx-auto -mb-4" />
              <p className="text-xl md:text-2xl font-black text-slate-900 uppercase italic tracking-tight leading-tight">
                "Every add-on reflects actual infrastructure, communication, cloud computing, and support costs required to deliver reliable enterprise-grade school operations."
              </p>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>
          </div>
        </div>

        {/* 24x7 TECH OPS CENTER */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { label: 'Technical Engineers', val: '10', sub: 'Available', icon: Users },
            { label: 'Platform Monitoring', val: '24x7', sub: 'Active', icon: Eye },
            { label: 'Avg. Response Time', val: '< 2 Hours', sub: 'Global Target', icon: Zap },
            { label: 'System Uptime', val: '99.9%', sub: 'Target SLA', icon: ArrowUpRight },
            { label: 'Support Coverage', val: '365 Days', sub: 'No Holidays', icon: Calendar },
            { label: 'Security Monitoring', val: 'Active', sub: 'Real-time', icon: LockIcon },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 p-8 rounded-[32px] text-center shadow-sm hover:shadow-xl transition-all group">
              <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-black text-slate-900 mb-1">{stat.val}</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</div>
              <div className="text-[8px] font-bold text-blue-500 uppercase tracking-tight">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* TECHNICAL TEAM GRID */}
        <div className="space-y-12">
          <div className="text-center">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">Meet The Experts</span>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Our Engineering Core</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { role: 'Cloud Infrastructure Engineer', job: 'Maintaining global AWS/GCP nodes & load balancers.' },
              { role: 'Database Administrator', job: 'Ensuring 100% data integrity and instant query response.' },
              { role: 'Security Operations Engineer', job: 'Proactive threat detection and encryption protocols.' },
              { role: 'DevOps Engineer', job: 'Continuous integration and high-speed feature deployment.' },
              { role: 'AI Systems Engineer', job: 'Optimizing Gemini models & processing credit pipelines.' },
              { role: 'Backend Systems Engineer', job: 'Maintaining API responsiveness & system logic bridges.' },
              { role: 'Platform Reliability Engineer', job: 'Monitoring uptime targets and failover systems.' },
              { role: 'Mobile Application Engineer', job: 'Optimizing iOS/Android native app performances.' },
              { role: 'Customer Success Engineer', job: 'Technical onboarding and district-wide configurations.' },
              { role: 'Integration Specialist', job: 'Bridge between ERP modules and external gate services.' }
            ].map((eng, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-[32px] p-6 text-center hover:border-blue-300 transition-all group">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:scale-105 transition-transform">
                   <UserCheck className="w-8 h-8 text-slate-400" />
                </div>
                <div className="mb-3">
                   <h5 className="text-xs font-black text-slate-900 uppercase">Engineer {String(idx + 1).padStart(2, '0')}</h5>
                   <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tight">{eng.role}</p>
                </div>
                <p className="text-[9px] text-slate-400 font-medium leading-relaxed h-10 overflow-hidden mb-4">
                  {eng.job}
                </p>
                <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full w-fit mx-auto">
                   <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[8px] font-black uppercase tracking-widest">Online</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ENTERPRISE SUPPORT PROMISE */}
        <div className="bg-[#0F172A] rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
            <Users className="w-96 h-96" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]">
                   Real People. <br/> Real Support. <br/> <span className="text-blue-400">Accountability.</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Unlike many software providers, NexoraOS AI is supported by a dedicated operations and engineering team responsible for maintaining uptime, security, platform performance, and customer success.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {[
                  'Dedicated Technical Team',
                  'Continuous Monitoring',
                  'Secure Infrastructure',
                  'Human Support',
                  'Enterprise Reliability'
                ].map(trust => (
                  <div key={trust} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{trust}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-blue-600 p-10 md:p-16 rounded-[50px] shadow-2xl shadow-blue-500/20 text-center">
              <h3 className="text-3xl font-black uppercase tracking-tight">You Are Not Just Paying For Software</h3>
              <p className="text-blue-100 font-medium leading-relaxed">
                Your subscription helps maintain secure servers, AI infrastructure, communication gateways, backups, monitoring systems, continuous development, and a dedicated technical team working behind the scenes to keep your institution running smoothly.
              </p>
              <div className="pt-8 border-t border-white/20">
                 <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                    Start Exploration
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
