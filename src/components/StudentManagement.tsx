/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentIDCard } from './StudentIDCard';
import { 
  UserCheck, 
  FileCheck2, 
  CalendarCheck, 
  TrendingUp, 
  Shield, 
  Printer, 
  Eye, 
  RefreshCw, 
  GraduationCap, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  UserPlus2, 
  Check,
  QrCode
} from 'lucide-react';

interface StudentManagementProps {
  onNavigateStudent?: () => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({ onNavigateStudent }) => {
  // Navigation trigger inside the mockup to show off interactive states
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');
  const [isHovered, setIsHovered] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [regStatus, setRegStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [biometricSyncActive, setBiometricSyncActive] = useState<boolean>(true);

  const aaravStudent = {
    name: "Aarav Sharma",
    class: "Class XI - A",
    id: "NEX-2026-98",
    avatar: "AS",
    avatarBg: "bg-blue-600",
    attendance: "94.2%",
    guardian: "Rajesh Sharma",
    fullAddress: "Flat 405, Block B, Silver Oak Residency, Sector 62, Near Blossom Park, Jaipur, Rajasthan — 302012",
    phone: "+91 98765 43210",
    altPhone: "+91 98765 43211",
    tagId: "#98829F-A",
    blood: "O +ve",
    allergies: "None Reported",
    securityType: "EMV CHIP PROTECTED",
    officeEmail: "admin@nexoraosacademy.edu.in"
  };

  const features = [
    {
      title: '360° Student Profiles',
      desc: 'Central profile capturing scholastic logs, attendance reports, medical history, and extracurricular indices.',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Smart Admission Records',
      desc: 'Eliminate paperwork with online registry forms, digital document upload slots, and automatic checklist markers.',
      icon: FileCheck2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Real-Time Attendance Tracking',
      desc: 'Seamless sync with RFID/biometric hardware, reporting class presence status immediately to guardians.',
      icon: CalendarCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Academic Performance Analytics',
      desc: 'Generate visual reports of grade trajectories, teacher qualitative feedback, and dynamic exam logs instantly.',
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Verified Parent Details',
      desc: 'Map student ID links directly to verified guardians, housing secure communication channels and emergency details.',
      icon: Shield,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      title: 'Instant ID Card Generation',
      desc: 'Fast click-to-print dynamic PVC/digital identification badges with automatic barcode and QR mapping fields.',
      icon: Printer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const handleCopyId = () => {
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleRegenerateId = () => {
    setRegStatus('generating');
    setTimeout(() => {
      setRegStatus('success');
      setTimeout(() => setRegStatus('idle'), 1800);
    }, 1200);
  };

  return (
    <section id="student-management" className="bg-white py-24 border-b border-slate-200/60 relative select-text text-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Modern 2-column layout (stacks mockup on top in mobile view as per user request) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* VISUAL ASSET (Right Side in standard grid, but ordered FIRST on mobile) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center items-center relative w-full">
            {/* Background luxury aura */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#3b82f6]/10 to-[#818cf8]/5 rounded-[40px] blur-3xl opacity-80 pointer-events-none" />
            
            {/* Control workstation casing */}
            <div className="relative w-full max-w-[480px] bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-100 overflow-hidden group/workstation transition-all duration-300">
              
              {/* Header bar controls representing real SaaS design */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex gap-1.5 items-center">
                  <span className="w-3 h-3 rounded-full bg-rose-400 block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
                  <span className="text-[10px] font-bold text-slate-400/80 uppercase tracking-widest ml-3.5 font-mono">
                    ID-ENGINE-v1.2
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveTab('front')} 
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${activeTab === 'front' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                  >
                    Front View
                  </button>
                  <button 
                    onClick={() => setActiveTab('back')} 
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${activeTab === 'back' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                  >
                    Back ID Card
                  </button>
                </div>
              </div>

              {/* Workstation body */}
              <div className="p-8 bg-gradient-to-b from-slate-50/50 to-white flex flex-col items-center">
                             {/* ID Badge Card Wrapper loaded with dynamic perspectives */}
                <div 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full flex justify-center"
                >
                  <StudentIDCard 
                    student={aaravStudent}
                    activeTab={activeTab}
                    isHovered={isHovered}
                    biometricSyncActive={biometricSyncActive}
                    onCardClick={() => setActiveTab(activeTab === 'front' ? 'back' : 'front')}
                  />
                </div>

                {/* Simulated Terminal action panel under card for outstanding interactive feels */}
                <div className="w-full max-w-[480px] mt-6 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                    <span>Card UID Security Verification</span>
                    <span className="text-blue-600 text-[10.5s px]">99.8% Secured</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCopyId}
                      className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-black py-2.5 px-3 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                    >
                      {copiedId ? (
                        <>
                          <Check className="h-4.5 w-4.5 text-emerald-500 stroke-[3]" />
                          <span className="text-emerald-600 font-bold">UID Copied!</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4.5 w-4.5 text-slate-400" />
                          <span>Copy Student UID</span>
                        </>
                      )}
                    </button>

                    <button 
                      onClick={handleRegenerateId}
                      disabled={regStatus === 'generating'}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-2.5 px-3 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/10 disabled:opacity-80"
                    >
                      <RefreshCw className={`h-4.5 w-4.5 ${regStatus === 'generating' ? 'animate-spin' : ''}`} />
                      <span>
                        {regStatus === 'idle' && 'Sync Hardware'}
                        {regStatus === 'generating' && 'Provisioning...'}
                        {regStatus === 'success' && 'Hardware Mapped!'}
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* CONTENT (Left Side) */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-8 text-center lg:text-left">
            
            {/* Small modern badge saying "MODULE 01" and CTA Link */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-blue-700 bg-blue-100/60 py-1.5 px-4 rounded-full inline-flex items-center gap-1.5 tracking-wider border border-blue-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block animate-pulse" />
                MODULE 01
              </span>
              {onNavigateStudent && (
                <button 
                  onClick={onNavigateStudent}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] sm:text-xs py-1.5 px-4.5 rounded-full inline-flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  Explore Interactive Platform Sub-Page →
                </button>
              )}
            </div>

            {/* Main Heading heading and highlighting */}
            <div className="space-y-4">
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl font-sans leading-tight">
                Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Student Management</span> System
              </h3>
              <p className="text-slate-600 text-sm sm:text-base md:text-md leading-relaxed font-semibold max-w-xl mx-auto lg:mx-0">
                Digitize, scale, and optimize the entire academic lifecycle. From initial application leads to graduation records, maintain a microsecond-synchronized, tamper-proof system for your entire student directory.
              </p>
            </div>

            {/* divider line */}
            <div className="h-px w-20 bg-slate-200 mx-auto lg:mx-0" />

            {/* 2x3 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {features.map((feat, index) => {
                const IconComponent = feat.icon;
                return (
                  <div key={index} className="flex gap-3.5 items-start p-2 rounded-xl hover:bg-slate-50/60 transition-colors duration-200">
                    <div className={`p-2 rounded-lg shrink-0 ${feat.bgColor} ${feat.color}`}>
                      <IconComponent className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm tracking-tight mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mini visual indicator highlighting standard cloud storage details */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3.5 max-w-lg mx-auto lg:mx-0">
              <Sparkles className="h-5 w-5 text-indigo-500 animate-bounce shrink-0" />
              <p className="text-xs text-slate-500 font-bold text-left leading-normal">
                <span className="text-slate-900 font-black">Fast Synchronous Backups:</span> Our infrastructure updates live classroom check-ins to parents synchronously in less than 320ms.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
