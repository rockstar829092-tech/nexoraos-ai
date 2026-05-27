/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Cpu, ShieldCheck, Sparkles, Fingerprint } from 'lucide-react';

export interface StudentData {
  name: string;
  class: string;
  id: string;
  avatar?: string;
  avatarBg?: string;
  attendance?: string;
  guardian?: string;
  address?: string;
  fullAddress?: string;
  phone?: string;
  altPhone?: string;
  tagId?: string;
  blood?: string;
  allergies?: string;
  securityType?: string;
  officeEmail?: string;
  grade?: string;
}

interface StudentIDCardProps {
  student: StudentData;
  activeTab?: 'front' | 'back';
  isHovered?: boolean;
  onCardClick?: () => void;
  biometricSyncActive?: boolean;
}

export const StudentIDCard: React.FC<StudentIDCardProps> = ({
  student,
  activeTab = 'front',
  isHovered = false,
  onCardClick,
  biometricSyncActive = true,
}) => {
  // Normalize fallback data to match requested signature
  const name = student.name || 'Aarav Sharma';
  const classTag = student.class || 'Grade XI - A';
  const idValue = student.id || 'NEX-2026-98';
  const address = student.fullAddress || student.address || '221B Lake View Residency, New Delhi';
  const fatherPhone = student.phone || '+91 98765 43210';
  const motherPhone = student.altPhone || '+91 91234 56789';
  const schoolHelpline = '+91 1800 456 8899';
  const attendance = student.attendance || '96.4%';
  const avatarInitials = student.avatar || name.split(' ').map(n => n[0]).join('');

  return (
    <div 
      className="perspective-[1200px] w-full max-w-[480px] h-[270px] relative select-none cursor-pointer"
      onClick={onCardClick}
    >
      <motion.div 
        animate={{ rotateY: (activeTab === 'back' || isHovered) ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        
        {/* ========================================================= */}
        {/* FRONT SIDE ID CARD                                        */}
        {/* ========================================================= */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[24px] bg-gradient-to-tr from-[#EBEFF5] via-[#FFFFFF] to-[#DCE7F4] border border-[#002D62]/15 p-5 flex flex-col justify-between relative overflow-hidden shadow-[0_16px_50px_rgba(0,40,90,0.08)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Holographic Security Overlay Linework */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M-10,50 Q25,100 50,50 T110,50" fill="none" stroke="#003B73" strokeWidth="0.5" />
              <path d="M-10,30 Q25,80 50,30 T110,30" fill="none" stroke="#0074E4" strokeWidth="0.5" />
              <path d="M-10,70 Q25,120 50,70 T110,70" fill="none" stroke="#003B73" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Micro Grid Technical Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#002D6204_1px,transparent_1px),linear-gradient(to_bottom,#002D6204_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none" />

          {/* Futuristic Abstract Mesh Glows */}
          <span className="absolute -top-12 -left-12 w-32 h-32 bg-blue-300 rounded-full blur-2xl opacity-25 pointer-events-none" />
          <span className="absolute -bottom-16 -right-16 w-36 h-36 bg-indigo-200 rounded-full blur-2xl opacity-30 pointer-events-none" />
          <span className="absolute top-1/2 left-1/3 -translate-y-1/2 w-20 h-20 bg-sky-200 rounded-full blur-xl opacity-15 pointer-events-none" />

          {/* TOP SECTION */}
          <div className="relative z-10 flex justify-between items-center shrink-0">
            {/* Elegant Institutional Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#002B49] via-[#004B87] to-[#0074E4] text-white flex items-center justify-center font-extrabold text-xs tracking-tighter shadow-[0_4px_12px_rgba(0,116,228,0.25)] relative overflow-hidden">
                <span className="relative z-10">N</span>
              </div>
              <div className="text-left">
                <span className="text-[11px] font-black tracking-tight text-[#002244] font-sans leading-none block">NEXORAOS</span>
                <span className="text-[7.5px] font-extrabold text-[#0074E4] tracking-[0.24em] leading-none block uppercase font-mono mt-0.5">ACADEMY</span>
              </div>
            </div>

            {/* Glowing active badge block */}
            <div className="flex items-center gap-1.5 shrink-0">
              {biometricSyncActive ? (
                <span className="bg-blue-50 text-blue-700 text-[7.5px] font-extrabold py-0.5 px-2 rounded-full border border-blue-200 flex items-center gap-1 shadow-sm hover:bg-blue-100 transition-all" title="Biometric Hardware Sync">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <Cpu className="w-2.5 h-2.5" />
                  RFID CHIP ACTIVE
                </span>
              ) : (
                <span className="bg-amber-50 text-amber-700 text-[7.5px] font-extrabold py-0.5 px-2 rounded-full border border-amber-200 flex items-center gap-1 hover:bg-amber-100 transition-all" title="Biometric Hardware Sync">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                  <Cpu className="w-2.5 h-2.5" />
                  CHIP SYNC PENDING
                </span>
              )}
              <span className="bg-emerald-50 text-emerald-700 text-[7.5px] font-extrabold py-0.5 px-2 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                ACTIVE
              </span>
            </div>
          </div>

          {/* CENTER SECTION (Personal split container with premium tech layout) */}
          <div className="relative z-10 grid grid-cols-12 gap-3 items-center my-auto w-full">
            {/* Circular student profile placeholder with glows */}
            <div className="col-span-4 flex justify-center relative">
              <div className="relative">
                {/* Electric blue glowing aura boundary ring */}
                <div className="absolute inset-0 bg-[#0074E4]/15 rounded-full blur-xs scale-110 pointer-events-none" />
                <div className="absolute -inset-1 border border-[#0074E4]/30 rounded-full pointer-events-none" />
                <div className="absolute -inset-2 border border-dashed border-[#0074E4]/10 rounded-full pointer-events-none" />
                
                {/* Principal initial/avatar circle */}
                <div className={`w-[60px] h-[60px] rounded-full border-2 border-white relative overflow-hidden flex items-center justify-center shadow-[0_8px_24px_rgba(0,116,228,0.22)] bg-gradient-to-br from-[#003B73] to-[#0074E4] text-white font-extrabold text-xl select-none`}>
                  {avatarInitials}
                  
                  {/* Digital grid line graphic overlay on portrait */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                </div>
                
                {/* Floating grade badge */}
                <span className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-[#002D62] to-[#0074E4] text-[8px] font-black text-white px-1.5 py-0.5 rounded-md border border-white shadow-sm shadow-[#002D62]/20 uppercase">
                  A+
                </span>
              </div>
            </div>

            {/* Student Info Details */}
            <div className="col-span-8 text-left space-y-1 pr-1">
              <span className="text-[7px] font-mono tracking-[0.18em] text-[#0074E4] font-black uppercase block">STUDENT SECURITY LAYER</span>
              
              <div>
                <h4 className="text-[15px] font-black text-[#002244] tracking-tight leading-none uppercase">
                  {name}
                </h4>
                
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="inline-block bg-blue-50 border border-blue-100 text-blue-700 text-[8px] font-black py-0.5 px-2 rounded-md shadow-sm leading-none">
                    {classTag}
                  </span>
                  <span className="text-[8px] font-mono font-bold text-slate-500 bg-slate-100 px-1 rounded-sm leading-none py-0.5">
                    UID: {idValue}
                  </span>
                </div>
              </div>

              {/* Dynamic details group */}
              <div className="space-y-0.5 pt-1 border-t border-[#002D62]/5 text-[7px] text-slate-650 font-semibold leading-normal">
                <p className="truncate flex items-center gap-1">
                  <span className="text-[#004B87] font-extrabold font-mono text-[6.5px]">ADDR:</span> 
                  <span className="truncate text-slate-700">{address}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span className="text-[#004B87] font-extrabold font-mono text-[6.5px]">PARENT CONTACTS:</span>
                  <span className="text-slate-700 font-mono text-[6.5px] truncate max-w-full">
                    {fatherPhone} (F) | {motherPhone} (M)
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <span className="text-[#004B87] font-extrabold font-mono text-[6.5px]">HELPLINE SERVICE:</span>
                  <span className="text-slate-700 font-mono text-[6.5px]">{schoolHelpline}</span>
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM STATS PANEL (Solid segments) */}
          <div className="relative z-10 grid grid-cols-3 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm divide-x divide-slate-100 text-center shrink-0">
            <div>
              <span className="text-[6.5px] font-extrabold text-slate-400 block uppercase tracking-wider leading-none">PRESENCE</span>
              <span className="text-[10px] font-black text-[#002244] mt-0.5 block leading-none">{attendance}</span>
            </div>
            <div>
              <span className="text-[6.5px] font-extrabold text-slate-400 block uppercase tracking-wider leading-none">GRADE AVG</span>
              <span className="text-[10px] font-black text-blue-600 mt-0.5 block leading-none">A+</span>
            </div>
            <div>
              <span className="text-[6.5px] font-extrabold text-slate-400 block uppercase tracking-wider leading-none">CAMPUS CARD</span>
              <span className="text-[9px] font-black text-emerald-600 uppercase mt-0.5 block leading-none">PAID</span>
            </div>
          </div>

          {/* BOTTOM HEADER AREA */}
          <div className="relative z-10 flex items-center justify-between gap-4 border-t border-[#002D62]/5 pt-2 shrink-0">
            <div className="text-left leading-none space-y-0.5">
              <span className="text-[6px] font-mono font-black text-[#004B87]/55 tracking-wider uppercase block">STUDENT CARD UID</span>
              <span className="text-[9.5px] font-mono font-black text-[#002244] tracking-tight">{idValue}</span>
            </div>

            {/* Barcode lines + NFC icon combo */}
            <div className="flex items-center gap-2.5">
              {/* NFC Logo wave representation */}
              <div className="flex items-center gap-1 bg-gradient-to-r from-[#004B87]/8 to-[#0074E4]/8 px-1.5 py-0.5 rounded border border-[#0074E4]/15">
                <svg className="w-2.5 h-2.5 text-[#0074E4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8a8 8 0 0 1 14 0" />
                  <path d="M7 10a6 6 0 0 1 10 0" />
                  <path d="M9 12a4 4 0 0 1 6 0" />
                  <circle cx="12" cy="14" r="1.5" fill="currentColor" />
                </svg>
                <span className="text-[5.5px] font-mono font-black text-[#0074E4] tracking-widest uppercase leading-none">NFC CAPABLE</span>
              </div>

              {/* Barcode representation */}
              <div className="flex gap-[1px] h-5.5 items-end shrink-0 bg-white px-1 py-0.5 rounded border border-slate-900/5 mix-blend-multiply pointer-events-none">
                <span className="w-[1px] h-full bg-slate-900" />
                <span className="w-[2.2px] h-full bg-slate-900" />
                <span className="w-[0.8px] h-full bg-slate-900" />
                <span className="w-[1.2px] h-full bg-slate-900" />
                <span className="w-[3px] h-full bg-slate-900" />
                <span className="w-[0.8px] h-full bg-slate-900" />
                <span className="w-[1.5px] h-full bg-slate-900" />
                <span className="w-[1.8px] h-full bg-slate-900" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BACK SIDE ID CARD                                         */}
        {/* ========================================================= */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[24px] bg-gradient-to-br from-[#ECEFF4] via-[#F8FAFC] to-[#DCE6F1] border border-[#002D62]/15 p-5 flex flex-col justify-between overflow-hidden shadow-[0_16px_50px_rgba(0,40,90,0.12)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Subtle Grid Security line texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#002D6208_1px,transparent_1px)] [background-size:10px_10px] opacity-40 pointer-events-none" />
          
          {/* Futuristic Soft Glow Points */}
          <span className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-40 pointer-events-none" />
          <span className="absolute -bottom-20 -left-12 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-45 pointer-events-none" />

          {/* Background Decorative Abstract Circular Vectors */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#003B73" strokeWidth="0.25" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#003B73" strokeWidth="0.25" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#003B73" strokeWidth="0.25" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#003B73" strokeWidth="0.25" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-12 gap-3 h-full items-stretch">
            
            {/* LEFT SECTION: EMERGENCY INFO & SECURITY FEATURES LIST */}
            <div className="col-span-5 flex flex-col justify-between text-left space-y-1">
              <div>
                <span className="text-[6.5px] font-mono tracking-[0.25em] text-[#0074E4] font-black block uppercase">EMERGENCY INFO</span>
                <h4 className="text-[12px] font-black text-[#002244] tracking-tight leading-none uppercase mt-0.5">NEXORAOS ACADEMY</h4>
                
                <div className="mt-2 space-y-1 text-[7px] leading-tight text-slate-600 font-semibold font-sans">
                  <p className="flex items-start gap-1">
                    <span className="text-[#004B87] font-black tracking-normal">EMERGENCY NO:</span> 
                    <span className="text-slate-800 font-mono tracking-tight">{schoolHelpline}</span>
                  </p>
                  <p className="flex items-start gap-1">
                    <span className="text-[#004B87] font-black tracking-normal">PARENT CONTACT:</span> 
                    <span className="text-slate-800 font-mono tracking-tight">{fatherPhone}</span>
                  </p>
                  <p className="flex items-start gap-1">
                    <span className="text-[#004B87] font-black tracking-normal">ADDRESS:</span> 
                    <span className="text-slate-800 font-sans tracking-tight leading-normal overflow-hidden max-w-[125px] block">{address}</span>
                  </p>
                </div>
              </div>

              {/* SECURITY FEATURES LIST */}
              <div className="mt-2 pt-2 border-t border-[#002D62]/5">
                <span className="text-[6px] font-mono font-black text-slate-400 tracking-wider uppercase block mb-1">SECURED PROTOCOLS</span>
                <div className="grid grid-cols-2 gap-1 text-[6px] font-extrabold text-[#002244]/80">
                  <span className="bg-white/60 border border-slate-200/60 py-0.5 px-1 rounded-sm flex items-center gap-0.5 truncate">
                    <span className="w-1 h-1 rounded-full bg-[#0074E4]" />
                    EMV CHIP SECURED
                  </span>
                  <span className="bg-white/60 border border-slate-200/60 py-0.5 px-1 rounded-sm flex items-center gap-0.5 truncate">
                    <span className="w-1 h-1 rounded-full bg-[#0074E4]" />
                    NFC COMPATIBLE
                  </span>
                  <span className="bg-white/60 border border-slate-200/60 py-0.5 px-1 rounded-sm flex items-center gap-0.5 truncate">
                    <span className="w-1 h-1 rounded-full bg-[#0074E4]" />
                    SMART ATTENDANCE
                  </span>
                  <span className="bg-white/60 border border-slate-200/60 py-0.5 px-1 rounded-sm flex items-center gap-0.5 truncate">
                    <span className="w-1 h-1 rounded-full bg-[#0074E4]" />
                    AI CAMPUS VERIFY
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER SECTION: SMART CHIP, QR CODE & SECURITIES */}
            <div className="col-span-3 flex flex-col items-center justify-between border-x border-[#002D62]/5 px-1.5 text-center">
              
              {/* Beautiful luxury gold/silver blend EMV smart chip graphic */}
              <div className="w-8 h-6 bg-gradient-to-br from-[#E2B659] via-[#F4D992] to-[#B78827] rounded-[4px] border border-[#C69A32] shadow-xs opacity-90 relative flex flex-col justify-between p-0.5 scale-90">
                <div className="flex justify-between"><div className="w-2 h-[1.2px] bg-[#FFF3D2]" /><div className="w-2 h-[1.2px] bg-[#FFF3D2]" /></div>
                <div className="h-[2.5px] bg-slate-950/20 border-y border-[#FFEBAD]/40 flex items-center" />
                <div className="flex justify-between"><div className="w-2 h-[1.2px] bg-[#FFF3D2]" /><div className="w-2 h-[1.2px] bg-[#FFF3D2]" /></div>
              </div>

              {/* QR Verification area */}
              <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-3xs flex items-center justify-center w-[54px] h-[54px] relative bg-white/95">
                <div className="absolute inset-0 border border-[#0074E4]/30 rounded-lg scale-105 pointer-events-none" />
                <QrCode className="w-full h-full text-[#002244]" />
              </div>

              {/* Holographic Security Pattern text */}
              <span className="text-[5.5px] font-mono text-[#0074E4] font-black tracking-widest uppercase block mt-1">
                {idValue}
              </span>
            </div>

            {/* RIGHT SECTION: SIGNATURE, SEAL & INSTITUTION INFO */}
            <div className="col-span-4 flex flex-col justify-between text-right pl-1">
              
              {/* Branding Header */}
              <div className="leading-tight">
                <span className="text-[10px] font-black text-[#002244] leading-none block font-sans">NEXORAOS</span>
                <span className="text-[5px] font-bold text-[#0074E4] tracking-[0.2em] leading-none block uppercase font-mono mt-0.5">ACADEMY</span>
              </div>

              {/* Principal Seal & Signature */}
              <div className="flex flex-col items-end pr-1 mt-1 space-y-0.5">
                {/* Principal Signature */}
                <span className="font-serif text-[12px] italic text-[#004B87] font-black tracking-normal leading-none block select-none mb-0.5">
                  S. Singhal
                </span>
                <span className="text-[5px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-300 pt-0.5 block">
                  PRINCIPAL SIGNATURE
                </span>
              </div>

              {/* Official Credentials stack */}
              <div className="space-y-0.5 border-t border-[#002D62]/5 pt-1.5 text-[6px] text-slate-600 font-semibold leading-tight">
                <p className="flex items-center justify-end gap-1 font-mono">
                  <span className="text-[5px] font-extrabold text-[#0074E4]">URL:</span> 
                  <span className="text-slate-700">www.nexoraosacademy.edu.in</span>
                </p>
                <p className="flex items-center justify-end gap-1 font-mono">
                  <span className="text-[5px] font-extrabold text-[#0074E4]">EMAIL:</span> 
                  <span className="text-slate-700 uppercase">support@nexoraosacademy.edu.in</span>
                </p>
                <div className="pt-1 flex justify-end">
                  <span className="bg-[#002D62] text-white font-mono font-extrabold py-0.5 px-1.5 rounded-sm text-[5px] tracking-wider uppercase">
                    VALID TILL: 2030
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};
