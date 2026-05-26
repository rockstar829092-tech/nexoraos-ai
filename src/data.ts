/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErpModule, Testimonial, PricingTier, FAQItem } from "./types";

export const ERP_MODULES: ErpModule[] = [
  {
    id: "academic-os",
    title: "Curriculum & Academic-OS",
    tagline: "AI-assisted curriculum map generation & student grades telemetry",
    description: "Empower department heads and teachers with unified lesson planning, auto-synchronized gradebooks, and instant state-mandated standard alignments. Automatically flag students requiring intervention before grade drops occur.",
    iconName: "BookOpen",
    category: "academic",
    features: [
      "Dynamic Lesson Planner aligned with high standards",
      "Automated diagnostic grading and real-time rubric setup",
      "Interactive curriculum mapping and collaborative syllabi tracking",
      "Smart alerts for performance dips or high learning engagement"
    ],
    specs: [
      { label: "Syllabus Sync Speed", value: "< 2 Minutes" },
      { label: "Standard Mapping Coverage", value: "100% Automated" }
    ]
  },
  {
    id: "admin-quantum",
    title: "Scheduler & Registry",
    tagline: "Conflict-free scheduler utilizing high-performance constraint solver",
    description: "Bid farewell to manual timetable conflicts. Nexora's scheduler dynamically computes optimal class allocations, teacher substitutions, and room availability against complex spatial and curricular constraints.",
    iconName: "Calendar",
    category: "admin",
    features: [
      "Instant conflict-free timetables compiled in seconds",
      "Smart teacher rotation & sub-allocations on-the-fly",
      "Digital student profiles with complete academic record history",
      "Dynamic classroom spatial assignment optimization"
    ],
    specs: [
      { label: "Conflict Correction", value: "Real-time AI Solver" },
      { label: "Roster Management Cap", value: "Unlimited Students" }
    ]
  },
  {
    id: "fee-ledger",
    title: "Financial Nucleus & Ledger",
    tagline: "Centralized student billing, online processing & smart alerts",
    description: "A secure, modern ledger that completely automates invoices, scholarship distributions, and collection tracking. Send automated, polite WhatsApp/Email reminders to guardians with immediate secure checkout links.",
    iconName: "CreditCard",
    category: "finance",
    features: [
      "Automated recurring term invoices and installment plan trackers",
      "Seamless integrations with Stripe, Apple Pay, and local banking portals",
      "Autonomous scholarship and sibling discounts allocation",
      "Real-time expense audits & double-entry transparent school ledgers"
    ],
    specs: [
      { label: "Invoicing Automation", value: "Set-and-Forget Schedule" },
      { label: "Billing Accuracy Rate", value: "99.99%" }
    ]
  },
  {
    id: "guardian-portal",
    title: "Omni-Channel Guardian Hub",
    tagline: "Bridging schools, parents, and students with transparent metrics",
    description: "Replace cluttered chat groups with a clean, centralized feed. Keep parents in the loop with push notifications of day-to-day achievements, real-time bus tracking, attendance telemetry, and direct chat channels.",
    iconName: "MessageSquare",
    category: "communication",
    features: [
      "Direct secure messaging between educators and family households",
      "Unified timeline of student homework, sports, and club schedules",
      "AI-driven comment translations for multilingual families",
      "Instant push approvals for field trips and safety sign-offs"
    ],
    specs: [
      { label: "Parent Engagement Index", value: "+342% uplift" },
      { label: "Average Response Time", value: "< 14 Minutes" }
    ]
  },
  {
    id: "smart-attendance",
    title: "Autonomous Attendance",
    tagline: "RFID, QR, & secure biometric registers syncing in sub-seconds",
    description: "Automate morning roll calls entirely. Support instant scanning terminals or secure RFID gates that log attendance, alert teachers of tardiness, and send automatic safety notifications to parents upon campus entry.",
    iconName: "UserCheck",
    category: "admin",
    features: [
      "RFID gate and QR-code kiosk synchronization in sub-seconds",
      "Smart dashboard with daily, weekly, and seasonal attendance charts",
      "Preloaded customizable email-notification templates for absences",
      "Automatic generation of regional educational compliance statistics"
    ],
    specs: [
      { label: "Gate Logging Speed", value: "0.15s per pupil" },
      { label: "Parent Alerts Trigger", value: "Instant Automated" }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Dr. Evelyn Cartwright",
    role: "Head of School",
    institution: "Oakridge International Academies",
    quote: "Transitioning our 3,200 students to NexoraOS AI was the best administrative decision of our decade. We automated scheduling in 10 minutes (down from 3 weeks) and parents feel incredibly connected.",
    avatarSeed: "female1",
    rating: 5
  },
  {
    id: "t2",
    author: "Marcus Vance",
    role: "Chief Technology Officer",
    institution: "St. Jude Collegiate Group",
    quote: "With NexoraOS AI, our double-entry billing is bulletproof, and the parent engagement portal solved our ongoing collection issues. The design is clean, fast, and remarkably refined.",
    avatarSeed: "male1",
    rating: 5
  },
  {
    id: "t3",
    author: "Hana Shiraishi",
    role: "Director of Curriculum",
    institution: "Beacon Modern Prep School",
    quote: "The Lesson Planner and AI grade comments have saved my teachers over 8 hours a week. It allows educators to actually focus on teaching and providing direct feedback rather than staring at clumsy tables.",
    avatarSeed: "female2",
    rating: 5
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "foundation",
    name: "Foundation Tier",
    tagline: "Perfect for small and growing schools seeking a modern, affordable school ERP.",
    description: "Ideal for institutions focusing on streamlined core operations and parent engagement.",
    studentCapacity: "Up to 500 Students",
    monthlyPrice: 1999,
    annualPrice: 17999,
    features: [
      "Student Information Management",
      "Attendance Management",
      "Fee Management",
      "Exam Management",
      "Parent Portal",
      "Communication Center",
      "Role-Based Access Control",
      "Basic Reports & Analytics",
      "Email Support",
      "Cloud Database Hosting"
    ],
    supportType: "Standard Support",
    bestFor: "Small Schools"
  },
  {
    id: "elite",
    name: "NexoraOS AI Elite",
    tagline: "Complete AI-powered school operations suite with advanced automation and analytics.",
    description: "Unlock the full potential of your institution with cutting-edge AI tools and mobile ecosystem.",
    studentCapacity: "Up to 2,000 Students",
    monthlyPrice: 4999,
    annualPrice: 44999,
    isPopular: true,
    badge: "MOST POPULAR",
    features: [
      "Everything in Foundation Tier",
      "AI Academic Copilot",
      "AI Quiz Generator",
      "AI Assignment Evaluator",
      "Learning Management System (LMS)",
      "Admission & Intake Management",
      "Mobile Applications",
      "Transport Management",
      "Communication Automation",
      "Advanced Analytics Dashboard",
      "Executive Reports",
      "Priority Support"
    ],
    supportType: "Priority Support",
    bestFor: "Growing Schools & Institutions"
  },
  {
    id: "enterprise",
    name: "District Core Enterprise",
    tagline: "Built for large schools, educational groups, and multi-campus institutions.",
    description: "Unmatched scaling capabilities with white-labeling and dedicated enterprise infrastructure.",
    studentCapacity: "Unlimited Students",
    monthlyPrice: 12999,
    annualPrice: 116999,
    badge: "ENTERPRISE",
    features: [
      "Everything in AI Elite",
      "Multi-Campus Management",
      "Hostel Management",
      "Dedicated Infrastructure",
      "Custom Domain",
      "API Integrations",
      "White Label Branding",
      "Advanced AI Insights",
      "Dedicated Account Manager",
      "SLA Support",
      "Enterprise Security Controls",
      "Priority Feature Deployment"
    ],
    supportType: "Dedicated Enterprise Support",
    bestFor: "Large Institutions & School Networks"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "How long does it take migrating academic data from our old ERP?",
    answer: "Our automated data onboarding wizard imports CSV/XLS and old legacy ERP database exports easily. Most schools complete compliance profiles, roster configurations, and student account generation in less than 48 hours with the support of our dedicated integration architects."
  },
  {
    id: "faq2",
    question: "Is NexoraOS AI compliant with international data privacy regulations?",
    answer: "Yes, NexoraOS AI is strictly built on SOC-2 certified infrastructure, fully conforming to COPPA (Children's Online Privacy Protection), FERPA (Family Educational Rights and Privacy Act), and GDPR frameworks. Parent data, grades telemetry, and financial items are isolated securely."
  },
  {
    id: "faq3",
    question: "Do our parents and teachers have separate secure download links?",
    answer: "No download required! NexoraOS AI uses highly responsive single-page portal engines compatible with absolute mobile fluid layouts. Parents, teachers, and student accounts can be opened immediately on any modern iOS, Android, or desktop browser for friction-free access."
  },
  {
    id: "faq4",
    question: "Can we configure regional tax structures and sliding schedule installment billing?",
    answer: "Absolutely. The Financial Nucleus module empowers business managers to customize local VAT/sales taxes, structure sliding scholarship brackets, program automatic sibling discount logic, and schedule customizable installment milestones effortlessly."
  }
];
