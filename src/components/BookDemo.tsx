/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Building, 
  Mail, 
  User, 
  Phone, 
  MessageSquare, 
  Check, 
  Clock, 
  Lock, 
  ShieldCheck, 
  Cpu,
  RefreshCw
} from 'lucide-react';

export const BookDemo: React.FC = () => {
  // Form values state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    requirements: '',
  });

  // Presentation feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Mobile Number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.institution.trim()) errors.institution = 'Institution Name is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate elite AI scheduler connection and API process
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
    }, 2000);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      requirements: '',
    });
    setHasSubmitted(false);
  };

  const highlightPoints = [
    {
      title: 'AI-powered automation',
      desc: 'Smarter workflows with auto-scheduling and generative reporting.',
    },
    {
      title: 'Cloud-based management',
      desc: 'Secure distributed database with 99.9% global uptime.',
    },
    {
      title: 'Real-time analytics',
      desc: 'Live telemetry indicators, finance progress trackers, and cohort views.',
    },
    {
      title: 'Smart parent communication',
      desc: 'Direct channels, automatic student action triggers, and secure alerts.',
    },
    {
      title: 'Multi-campus support',
      desc: 'Scale from single institutes to complex integrated university groups.',
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden w-full select-text text-slate-800 border-t border-slate-200"
    >
      {/* Soft floating blurred mesh highlights */}
      <div className="absolute top-1/4 left-1/10 h-[400px] w-[400px] rounded-full bg-[#0074E4]/5 blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 h-[500px] w-[500px] rounded-full bg-indigo-505/10 blur-[100px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay with ultra thin guidelines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#002D6202_1px,transparent_1px),linear-gradient(to_bottom,#002D6202_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full relative z-10">
        
        {/* Decorative Mini tag */}
        <div className="text-center lg:text-left mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100/60 shadow-2xs">
            <Cpu className="h-3 w-3 text-blue-600" />
            <span className="tracking-widest uppercase font-mono text-[9px] font-black">GET STARTED TODAY</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Informational Content                        */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] leading-tight font-sans">
                Best AI School & <br />College <span className="bg-gradient-to-r from-[#003B73] to-[#0074E4] bg-clip-text text-transparent">ERP Platform</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed font-sans">
                NexoraOS AI combines admissions, attendance, finance, HR, exams, communication, and analytics into one intelligent ecosystem. Experience how automation can transform your entire institutional network.
              </p>
            </div>

            {/* Feature Checkpoints */}
            <div className="space-y-5 text-left max-w-xl mx-auto lg:mx-0">
              {highlightPoints.map((pt, i) => (
                <div key={i} className="flex gap-3.5 group">
                  <div className="h-6 w-6 rounded-full bg-[#0074E4]/10 text-[#0074E4] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#0074E4]/15 transition-all">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-[#002244] uppercase tracking-wide">
                      {pt.title}
                    </h5>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini Trust Credential */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 inline-flex items-center gap-3 text-left">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide block leading-none">SECURE & COMPLIANT</span>
                <span className="text-[11px] text-slate-600 font-bold block mt-1">FERPA & GDPR data safeguards active by default.</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Premium Demo Form Card                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-6">
            <div className="bg-white/80  rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_20px_48px_rgba(0,40,90,0.06)] relative overflow-hidden text-left">
              
              {/* Soft decorative accent gradients inside the card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-300/10 to-transparent rounded-bl-full pointer-events-none" />

              <AnimatePresence mode="wait">
                {!hasSubmitted ? (
                  <motion.div
                    key="form-fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#0074E4]" />
                        Book a Free Demo
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        Select a preferred slot to align with our Academic Engineering Lead.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Aarav Sharma"
                            className={`w-full bg-white pl-10 pr-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-500 bg-red-50/10' : 'border-slate-200'} text-xs font-semibold placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#0074E4] focus:border-[#0074E4] transition-all`}
                          />
                        </div>
                        {formErrors.name && (
                          <span className="text-[9px] font-bold text-red-500 block">{formErrors.name}</span>
                        )}
                      </div>

                      {/* Email + Phone Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="aarav@university.edu"
                              className={`w-full bg-white pl-10 pr-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500 bg-red-50/10' : 'border-slate-200'} text-xs font-semibold placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#0074E4] focus:border-[#0074E4] transition-all`}
                            />
                          </div>
                          {formErrors.email && (
                            <span className="text-[9px] font-bold text-red-500 block">{formErrors.email}</span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                            Mobile Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className={`w-full bg-white pl-10 pr-4 py-3 rounded-xl border ${formErrors.phone ? 'border-red-500 bg-red-50/10' : 'border-slate-200'} text-xs font-semibold placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#0074E4] focus:border-[#0074E4] transition-all`}
                            />
                          </div>
                          {formErrors.phone && (
                            <span className="text-[9px] font-bold text-red-500 block">{formErrors.phone}</span>
                          )}
                        </div>
                      </div>

                      {/* Institution input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                          Institution Name
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            placeholder="Nexora Academy of Excellence"
                            className={`w-full bg-white pl-10 pr-4 py-3 rounded-xl border ${formErrors.institution ? 'border-red-500 bg-red-50/10' : 'border-slate-200'} text-xs font-semibold placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#0074E4] focus:border-[#0074E4] transition-all`}
                          />
                        </div>
                        {formErrors.institution && (
                          <span className="text-[9px] font-bold text-red-500 block">{formErrors.institution}</span>
                        )}
                      </div>

                      {/* Requirements textbox */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                          Requirements / Notes
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-4 h-4 w-4 text-slate-400" />
                          <textarea 
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Please tell us about student strength, RFID scope, LMS requirements..."
                            className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#0074E4] focus:border-[#0074E4] transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Submission button with loading effect */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#003B73] to-[#0074E4] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-650/15 hover:shadow-indigo-600/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-80 disabled:hover:scale-100 cursor-pointer select-none"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="h-4 w-4" />
                            <span>Connecting Secure Scheduler...</span>
                          </>
                        ) : (
                          <>
                            <span>Schedule Demo</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                    </form>

                    {/* Privacy Policy Disclaimer text */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-bold leading-normal">
                      <Lock className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>We treat your data with absolute trust. 100% cloud secure connection assured.</span>
                    </div>

                  </motion.div>
                ) : (
                  // Success State View with Elegant UI Matcher
                  <motion.div
                    key="success-fields"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-150 flex items-center justify-center shadow-xs">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-black text-slate-900 tracking-tight">
                        Demo Requested Successfully!
                      </h4>
                      <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="font-bold text-indigo-600">{formData.name}</span>. An AI systems consultant has booked a secure slot for <span className="font-bold text-indigo-600">{formData.institution}</span>.
                      </p>
                    </div>

                    {/* Meta reservation block */}
                    <div className="max-w-xs mx-auto bg-slate-50 border border-slate-200/60 p-4 rounded-2xl space-y-3 font-sans text-left">
                      <span className="text-[8px] font-mono font-black text-slate-400 tracking-wider uppercase block">PENDING APPOINTMENT CONFIRMATION</span>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        <div>
                          <p className="text-xs font-bold text-[#002244]">1-on-1 Personalized Walkthrough</p>
                          <p className="text-[10px] text-slate-500 font-bold mt-0.5">Duration: 45 min slot scheduled</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200/50 text-[9.5px] font-semibold text-slate-500">
                        Check your email at <span className="font-bold text-slate-800 font-mono">{formData.email}</span> for calendar coordinates and direct meeting guidelines.
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResetForm}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer py-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Book Another Demo slot
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
