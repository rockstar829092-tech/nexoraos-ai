import React from 'react';
import { Link } from 'react-router-dom';
import { NexoraNavbar } from './NexoraNavbar';
import { ModulesGrid } from './ModulesGrid';
import { TeamSuccessSection } from './TeamSuccessSection';
import { Pricing } from './Pricing';
import { BookDemo } from './BookDemo';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { AboutSection } from './AboutSection';
import { AiWorkforceAutomation } from './AiWorkforceAutomation';
import { TrustSection } from './TrustSection';
import { Hero } from './Hero';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Globe, 
  Zap,
  Building,
  GraduationCap,
  Users,
  DollarSign,
  Smartphone
} from 'lucide-react';

interface HomeProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  initialSection?: string;
}

export const NexoraLandingPage: React.FC<HomeProps> = ({ theme, setTheme, initialSection }) => {
    return (
        <div className="bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
            <NexoraNavbar theme={theme} setTheme={setTheme} />

            {/* 1. HERO SECTION */}
            <Hero onScrollToSection={() => {}} />
            
            {/* 2. TRUST SECTION */}
            <TrustSection />

            {/* 3. AI WORKFORCE AUTOMATION */}
            <div id="ai-automation">
              <AiWorkforceAutomation />
            </div>

            {/* 4. PLATFORM OVERVIEW / EVERYTHING YOUR INSTITUTION NEEDS */}
            <div id="features">
              <ModulesGrid />
            </div>

            {/* 5. DEDICATED PREVIEWS (REAL UI SNEAK PEEKS) */}
            <section className="py-24 bg-slate-50 dark:bg-zinc-950 transition-colors">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0071E3] bg-blue-50 dark:bg-blue-500/10 py-1.5 px-4 rounded-full">Operational Ecosystem Preview</span>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-6 uppercase tracking-tighter">Engineered for <span className="text-[#0071E3]">Scale</span></h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
                          <Building className="w-5 h-5 text-[#0071E3]" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">Central Operations Hub</h3>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
                        Manage multiple campuses, staff allocations, and institutional infrastructure from a single pane of glass.
                      </p>
                      <Link to="/operations" className="inline-flex items-center gap-2 text-[#0071E3] font-bold text-sm group">
                        Explore Operations <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">Financial Intelligence</h3>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
                        Automate fee collections, payroll processing, and statutory compliance with bank-grade precision.
                      </p>
                      <Link to="/finance" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm group">
                        Explore Finance <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="relative bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
                      <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 shadow-inner" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 shadow-inner" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400/20 shadow-inner" />
                        </div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NEXORA_OS_CENTRAL_DASHBOARD</div>
                      </div>
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Active Students</span>
                            <span className="text-2xl font-black text-[#0071E3]">14,282</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Monthly Rev</span>
                            <span className="text-2xl font-black text-emerald-600">₹8.4M</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0071E3] w-[75%] rounded-full" />
                          </div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <span>Syllabus Completion</span>
                            <span className="text-[#0071E3]">75%</span>
                          </div>
                        </div>
                        <div className="pt-4 flex justify-between items-end">
                           <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                  <Activity className="w-3.5 h-3.5 text-[#0071E3]" />
                                </div>
                                <span className="text-xs font-bold dark:text-white">Real-time Telemetry Active</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <span className="text-xs font-bold dark:text-white">Gate IP Security: Verified</span>
                              </div>
                           </div>
                           <div className="h-16 w-16 rounded-full border-4 border-slate-100 dark:border-white/5 flex items-center justify-center relative">
                              <span className="text-[10px] font-black text-[#0071E3]">0.4ms</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. TEAM SUCCESS */}
            <div id="team-success">
                <TeamSuccessSection />
            </div>

            {/* 7. PRICING */}
            <div id="pricing">
                <Pricing />
            </div>

            {/* 8. CONTACT / CTA */}
            <div id="contact">
              <BookDemo />
            </div>

            {/* 9. FOOTER */}
            <Footer onNavigate={(p: any) => window.location.href = p} />
            <BackToTop />
        </div>
    );
};
