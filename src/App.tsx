/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { StudentManagementPage } from './components/StudentManagementPage';
import { StaffManagementPage } from './components/StaffManagementPage';
import { LibraryManagementPage } from './components/LibraryManagementPage';
import { StaffPayrollPage } from './components/StaffPayrollPage';
import { FeeManagementPage } from './components/FeeManagementPage';
import { ExamManagementPage } from './components/ExamManagementPage';
import { AttendanceLeavePage } from './components/AttendanceLeavePage';
import { AdmissionFeePage } from './components/AdmissionFeePage';
import { LMSPage } from './components/LMSPage';
import { HostelManagementPage } from './components/HostelManagementPage';
import { TransportManagementPage } from './components/TransportManagementPage';
import { AlertsManagementPage } from './components/AlertsManagementPage';
import { AppsManagementPage } from './components/AppsManagementPage';
import { RoleBasedAccessPage } from './components/RoleBasedAccessPage';
import { CalendarEventsPage } from './components/CalendarEventsPage';
import { WhyNexoraOS } from './components/WhyNexoraOS';
import { WhyNotAnotherERP } from './components/WhyNotAnotherERP';
import { AiAutopilotControlCenter } from './components/AiAutopilotControlCenter';
import { TelemetrySimulator } from './components/TelemetrySimulator';
import { ModulesGrid } from './components/ModulesGrid';
import { AiPlayground } from './components/AiPlayground';
import { LiveAssistantPlayground } from './components/LiveAssistantPlayground';
import { Pricing } from './components/Pricing';
import { TeamSuccessSection } from './components/TeamSuccessSection';
import { BookDemo } from './components/BookDemo';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { TESTIMONIALS, FAQS } from './data';
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Settings, 
  Layout, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Building,
  DollarSign,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const [defaultToMusic, setDefaultToMusic] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<'home' | 'student-management' | 'staff-management' | 'library-management' | 'staff-payroll' | 'fee-management' | 'exam-management' | 'attendance-leave' | 'admission-fee' | 'lms' | 'hostel-management' | 'transport-management' | 'alerts-management' | 'apps-management' | 'role-based-access' | 'calendar-events'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/modules/student-management') return 'student-management';
      if (window.location.pathname === '/modules/staff-management') return 'staff-management';
      if (window.location.pathname === '/modules/library-management') return 'library-management';
      if (window.location.pathname === '/modules/staff-payroll') return 'staff-payroll';
      if (window.location.pathname === '/modules/fee-management') return 'fee-management';
      if (window.location.pathname === '/modules/exam-management') return 'exam-management';
      if (window.location.pathname === '/modules/attendance-leave') return 'attendance-leave';
      if (window.location.pathname === '/modules/admission-fee') return 'admission-fee';
      if (window.location.pathname === '/modules/lms') return 'lms';
      if (window.location.pathname === '/modules/hostel-management') return 'hostel-management';
      if (window.location.pathname === '/modules/transport-management') return 'transport-management';
      if (window.location.pathname === '/modules/alerts-management') return 'alerts-management';
      if (window.location.pathname === '/modules/apps-management') return 'apps-management';
      if (window.location.pathname === '/modules/role-based-access') return 'role-based-access';
      if (window.location.pathname === '/modules/calendar-events') return 'calendar-events';
    }
    return 'home';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/modules/student-management') {
        setCurrentPage('student-management');
      } else if (path === '/modules/staff-management') {
        setCurrentPage('staff-management');
      } else if (path === '/modules/library-management') {
        setCurrentPage('library-management');
      } else if (path === '/modules/staff-payroll') {
        setCurrentPage('staff-payroll');
      } else if (path === '/modules/fee-management') {
        setCurrentPage('fee-management');
      } else if (path === '/modules/exam-management') {
        setCurrentPage('exam-management');
      } else if (path === '/modules/attendance-leave') {
        setCurrentPage('attendance-leave');
      } else if (path === '/modules/admission-fee') {
        setCurrentPage('admission-fee');
      } else if (path === '/modules/lms') {
        setCurrentPage('lms');
      } else if (path === '/modules/hostel-management') {
        setCurrentPage('hostel-management');
      } else if (path === '/modules/transport-management') {
        setCurrentPage('transport-management');
      } else if (path === '/modules/alerts-management') {
        setCurrentPage('alerts-management');
      } else if (path === '/modules/apps-management') {
        setCurrentPage('apps-management');
      } else if (path === '/modules/role-based-access') {
        setCurrentPage('role-based-access');
      } else if (path === '/modules/calendar-events') {
        setCurrentPage('calendar-events');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: 'home' | 'student-management' | 'staff-management' | 'library-management' | 'staff-payroll' | 'fee-management' | 'exam-management' | 'attendance-leave' | 'admission-fee' | 'lms' | 'hostel-management' | 'transport-management' | 'alerts-management' | 'apps-management' | 'role-based-access' | 'calendar-events', navigateToMusic = false) => {
    let path = '/';
    if (page === 'student-management') {
      path = '/modules/student-management';
    } else if (page === 'staff-management') {
      path = '/modules/staff-management';
      if (navigateToMusic) {
        path = '/modules/staff-management#arts-music';
      }
    } else if (page === 'library-management') {
      path = '/modules/library-management';
    } else if (page === 'staff-payroll') {
      path = '/modules/staff-payroll';
    } else if (page === 'fee-management') {
      path = '/modules/fee-management';
    } else if (page === 'exam-management') {
      path = '/modules/exam-management';
    } else if (page === 'attendance-leave') {
      path = '/modules/attendance-leave';
    } else if (page === 'admission-fee') {
      path = '/modules/admission-fee';
    } else if (page === 'lms') {
      path = '/modules/lms';
    } else if (page === 'hostel-management') {
      path = '/modules/hostel-management';
    } else if (page === 'transport-management') {
      path = '/modules/transport-management';
    } else if (page === 'alerts-management') {
      path = '/modules/alerts-management';
    } else if (page === 'apps-management') {
      path = '/modules/apps-management';
    } else if (page === 'role-based-access') {
      path = '/modules/role-based-access';
    } else if (page === 'calendar-events') {
      path = '/modules/calendar-events';
    }
    window.history.pushState(null, '', path);
    setCurrentPage(page);
    setDefaultToMusic(navigateToMusic);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'telemetry', 'playground', 'pricing'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaqId(prev => (prev === faqId ? null : faqId));
  };

  if (currentPage === 'student-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800">
        <StudentManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'staff-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800">
        <StaffManagementPage onBack={() => navigateTo('home')} defaultToMusic={defaultToMusic} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'library-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <LibraryManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'staff-payroll') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <StaffPayrollPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'fee-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <FeeManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'exam-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <ExamManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'attendance-leave') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <AttendanceLeavePage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'admission-fee') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <AdmissionFeePage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'lms') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <LMSPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'hostel-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <HostelManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'transport-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <TransportManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'alerts-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <AlertsManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'apps-management') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <AppsManagementPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'role-based-access') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <RoleBasedAccessPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (currentPage === 'calendar-events') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-text text-slate-800 animate-fade-in">
        <CalendarEventsPage onBack={() => navigateTo('home')} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans select-text text-slate-800">
      {/* Premium Header */}
      <Navbar onScrollToSection={handleScrollToSection} activeSection={activeSection} />

      {/* Hero Section Container */}
      <Hero onScrollToSection={handleScrollToSection} />

      {/* Trust Section and Live Statistics */}
      <TrustSection />

      {/* Comprehensive Enterprise Modules Grid */}
      <ModulesGrid 
        onNavigateStudent={() => navigateTo('student-management')} 
        onNavigateStaff={() => navigateTo('staff-management')} 
        onNavigateMusic={() => navigateTo('staff-management', true)} 
        onNavigateLibrary={() => navigateTo('library-management')}
        onNavigatePayroll={() => navigateTo('staff-payroll')}
        onNavigateFees={() => navigateTo('fee-management')}
        onNavigateExams={() => navigateTo('exam-management')}
        onNavigateAttendance={() => navigateTo('attendance-leave')}
        onNavigateAdmission={() => navigateTo('admission-fee')}
        onNavigateLMS={() => navigateTo('lms')}
        onNavigateHostel={() => navigateTo('hostel-management')}
        onNavigateTransport={() => navigateTo('transport-management')}
        onNavigateAlerts={() => navigateTo('alerts-management')}
        onNavigateApps={() => navigateTo('apps-management')}
        onNavigateSecurity={() => navigateTo('role-based-access')}
        onNavigateCalendar={() => navigateTo('calendar-events')}
      />

      {/* Why NexoraOS AI Is Different Section */}
      <WhyNexoraOS />

      {/* Why NexoraOS AI Is Not Just Another School ERP Section */}
      <WhyNotAnotherERP />

      {/* AI Autopilot Control Center Reassurance Section */}
      <AiAutopilotControlCenter />

      {/* Telemetry Simulator Section */}
      <section id="telemetry" className="py-24 border-b border-slate-250 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs uppercase font-bold text-emerald-600 bg-emerald-50 py-1 px-3.5 rounded-full inline-block tracking-wider">
              Control Center
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Live Operations Simulator
            </h2>
            <p className="text-sm text-slate-500">
              Experience the power of real-time calculations. Tinker with indices and see automated logs sync.
            </p>
          </div>

          <TelemetrySimulator />
        </div>
      </section>

      {/* AI Sandbox Section */}
      <section id="playground" className="py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-lg mx-auto">
            <span className="text-xs uppercase font-bold text-violet-600 bg-violet-50 py-1 px-3.5 rounded-full inline-block tracking-wider">
              AI Play Space
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Interact with School AI Intelligence
            </h2>
            <p className="text-sm text-slate-500">
              Draft real curricula or compile student report narratives instantly. Test the real Gemini backend.
            </p>
          </div>

          <AiPlayground />
        </div>
      </section>

      {/* Success Team Section */}
      <TeamSuccessSection />

      {/* Testimonials section */}
      <TestimonialCarousel />

      {/* Pricing options section */}
      <section id="pricing" className="py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-md mx-auto">
            <span className="text-xs uppercase font-bold text-blue-600 bg-blue-50 py-1 px-3.5 rounded-full inline-block tracking-wider">
              Deployment Pricing
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Enterprise Ready Subscriptions
            </h2>
            <p className="text-sm text-slate-500">
              No long commitments. Choose the plan matching your school network profile dynamically.
            </p>
          </div>

          <Pricing />
        </div>
      </section>

      {/* Live AI Assistant Instant Sandbox */}
      <LiveAssistantPlayground />

      {/* Frequently asked answers section */}
      <section id="telemetry" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden border-t border-slate-200">
        {/* Soft decorative background circles */}
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-gradient-to-tr from-blue-100/20 to-indigo-100/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-indigo-100/15 to-purple-100/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT SIDE: Heading & Informational Details */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left sticky top-24">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-100/60 shadow-3xs">
                  <Sparkles className="w-3 px-0.5 text-blue-600" />
                  <span>SUPPORT NUCLEUS</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-mono tracking-widest text-[#0074E4] font-black uppercase">
                    FAQ
                  </h3>
                  <h4 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] leading-tight">
                    AI-Powered <br />Education ERP Questions
                  </h4>
                  {/* Thin decorative gradient line under heading */}
                  <div className="w-16 h-1 bg-gradient-to-r from-[#003B73] to-[#0074E4] rounded-full mx-auto lg:mx-0 mt-3" />
                </div>

                <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                  Everything you need to know about NexoraOS AI and how it transforms school, college, and university management.
                </p>
              </div>

              {/* Premium CTA Button */}
              <div className="pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-250 text-slate-800 font-black text-xs uppercase tracking-wider hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer select-none shadow-xs"
                >
                  <span>Explore Help Center</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0074E4]" />
                </motion.button>
              </div>
            </div>

            {/* RIGHT SIDE ACCORDION: Upgrade the accordion cards */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  id: 'faq-1',
                  question: 'What is NexoraOS AI ERP?',
                  answer: 'NexoraOS AI is a next-generation school operating system and educational ERP designed to centralize and automate administrative, academic, financial, and student management operations from a single unified, intelligent dashboard.'
                },
                {
                  id: 'faq-2',
                  question: 'How does AI automation help schools?',
                  answer: 'By utilizing advanced models and automated pipelines, NexoraOS AI automates complex scheduling, predicts student success margins, optimizes resource planning, auto-drafts personalized alerts, and dramatically reduces manual paperwork and payroll delays.'
                },
                {
                  id: 'faq-3',
                  question: 'Why should institutions choose NexoraOS AI?',
                  answer: 'Unlike traditional legacy school ERPs, NexoraOS AI offers a responsive UI/SaaS design, 99.9% RFID card telemetry sync, integrated biometric authentication, advanced analytics, and fully secure, zero-cloud-footprint student privacy measures.'
                },
                {
                  id: 'faq-4',
                  question: 'Can NexoraOS manage multi-campus institutions?',
                  answer: 'Yes. NexoraOS AI is built from the ground up to support modern multi-tenant and multi-campus configurations, letting university boards and franchise administrators view overall records or switch contexts instantly with isolated records state.'
                },
                {
                  id: 'faq-5',
                  question: 'Does the platform support AI attendance and analytics?',
                  answer: 'Absolutely. The platform features native integration with RFID scanners, biometric sensors, and AI computer vision cameras to complete hands-free daily rolls while feeding predictive dashboards that highlight student performance and risk patterns.'
                },
                {
                  id: 'faq-6',
                  question: 'Is NexoraOS suitable for colleges and universities?',
                  answer: 'Yes, NexoraOS AI scales dynamically from small primary academies to complex multi-departmental colleges and universities, offering specialized solutions for credit hours, registrar operations, hostel room assignments, and staff payrolls.'
                }
              ].map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <motion.div 
                    key={faq.id} 
                    layout="position"
                    className={`bg-white/80 backdrop-blur-md rounded-2xl border ${isExpanded ? 'border-blue-500/30 bg-white shadow-[0_12px_24px_rgba(0,116,228,0.04)]' : 'border-slate-200/80 shadow-3xs'} overflow-hidden hover:border-[#0074E4]/30 hover:shadow-[0_8px_16px_rgba(0,116,228,0.02)] transition-all duration-300`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-hidden cursor-pointer select-none group"
                    >
                      <span className={`text-[13px] font-black tracking-tight transition-colors ${isExpanded ? 'text-blue-700' : 'text-slate-800 group-hover:text-slate-950 font-sans'}`}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className={`p-1 rounded-lg border ${isExpanded ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-slate-100'} transition-all`}
                      >
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-5 pb-5 pt-2 text-[12px] text-slate-600 font-medium leading-relaxed border-t border-slate-100 font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Book a Free Demo Section */}
      <BookDemo />

      {/* Footer */}
      <Footer />

      {/* Floating active Back to Top Utility */}
      <BackToTop />
    </div>
  );
}
