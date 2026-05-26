/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  Twitter, 
  Github, 
  Sparkles, 
  Cpu, 
  ArrowUpRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050B14] text-slate-300 border-t border-[#002D62]/20 pt-16 pb-12 w-full overflow-hidden">
      {/* Background soft tech gradients for futuristic aesthetic */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#0074E4]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-indigo-505/5 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Grid Pattern overlay with low opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#002D6203_1px,transparent_1px),linear-gradient(to_bottom,#002D6203_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Core 5-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#002D62]/10">
          
          {/* COLUMN 1: Brand & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#003B73] via-[#0074E4] to-[#7C3AED] text-white flex items-center justify-center font-extrabold text-sm shadow-[0_4px_14px_rgba(0,116,228,0.3)] relative overflow-hidden group">
                <span className="relative z-10">N</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-[14px] font-black tracking-tight text-white uppercase">NexoraOS</span>
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-mono text-[9px] font-black uppercase tracking-wider">AI</span>
                </div>
                <span className="text-[7px] font-black text-[#0074E4] tracking-[0.24em] leading-none block uppercase font-mono mt-1">OPERATING SYSTEM</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
              NexoraOS AI is an intelligent operating system designed for schools, colleges, and universities. Automate management, telemetry sync, and learning workflows seamlessly.
            </p>

            <div className="flex items-center gap-2 bg-[#001E3D]/30 border border-[#0074E4]/15 px-3 py-1.5 rounded-full w-fit">
              <Cpu className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider font-extrabold text-blue-300">SYSTEM: ACTIVE SECURE CLOUD</span>
            </div>
          </div>

          {/* COLUMN 2: Products */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[10px] font-mono font-black text-[#0074E4] tracking-widest uppercase">Products</h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              {['School ERP', 'College ERP', 'Institute ERP', 'Learning Management System'].map((item) => (
                <li key={item} className="flex items-center group">
                  <span className="hover:text-white transition-all cursor-pointer hover:translate-x-0.5 flex items-center gap-0.5">
                    {item}
                    <ArrowUpRight className="w-3 h-3 text-[#0074E4] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Features */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[10px] font-mono font-black text-[#0074E4] tracking-widest uppercase">Features</h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              {[
                'Student Management', 
                'Attendance', 
                'Fee Management', 
                'AI Analytics', 
                'Staff Payroll', 
                'AI Communication', 
                'Hostel Management'
              ].map((item) => (
                <li key={item} className="flex items-center group">
                  <span className="hover:text-white transition-all cursor-pointer hover:translate-x-0.5 flex items-center gap-0.5">
                    {item}
                    <ArrowUpRight className="w-3 h-3 text-[#0074E4] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Resources */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[10px] font-mono font-black text-[#0074E4] tracking-widest uppercase">Resources</h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              {['Blog', 'Privacy Policy', 'Documentation', 'Support Center'].map((item) => (
                <li key={item} className="flex items-center group">
                  <span className="hover:text-white transition-all cursor-pointer hover:translate-x-0.5 flex items-center gap-0.5">
                    {item}
                    <ArrowUpRight className="w-3 h-3 text-[#0074E4] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: Contact & Socials */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[10px] font-mono font-black text-[#0074E4] tracking-widest uppercase">Contact</h5>
            <div className="space-y-2.5 text-xs text-slate-400 font-semibold text-left">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0074E4] shrink-0 mt-0.5" />
                <span>221B Lake View Residency, New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0074E4] shrink-0" />
                <span className="hover:text-white cursor-pointer transition">support@nexoraosacademy.edu.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0074E4] shrink-0" />
                <span className="font-mono tracking-tight text-slate-300">+91 1800 456 8899</span>
              </div>
            </div>

            {/* Social icons with futuristic hover glow */}
            <div className="flex items-center gap-3 pt-3">
              {[
                { icon: Twitter, url: 'https://twitter.com', name: 'Twitter' },
                { icon: Linkedin, url: 'https://linkedin.com', name: 'LinkedIn' },
                { icon: Github, url: 'https://github.com', name: 'GitHub' }
              ].map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8.5 h-8.5 rounded-lg bg-[#001E3D]/50 border border-[#0074E4]/15 hover:border-[#0074E4]/50 flex items-center justify-center text-slate-400 hover:text-white hover:shadow-[0_0_12px_rgba(0,116,228,0.3)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-bold gap-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>© NexoraOS AI 2026. All Rights Reserved. Fully Certified Educational ERP Suite.</span>
          </div>
          <div className="flex gap-4 tracking-wide">
            <span className="hover:text-white transition cursor-pointer">Security SLA</span>
            <span className="hover:text-white transition cursor-pointer">Compliance Guidelines</span>
            <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
