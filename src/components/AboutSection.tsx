import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Settings, 
  Building2, 
  Lock, 
  Cpu, 
  Server, 
  Users, 
  ArrowRight,
  UserCheck,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
        
        {/* Hero Introduction */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trusted by Modern Educational Institutions</span>
          </div>
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 font-sans max-w-3xl mx-auto">
            Built for the Future of Educational Management
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            NexoraOS AI is an intelligent school operating system engineered to simplify administration, automate repetitive workflows, improve institutional efficiency, and help educational leaders make better decisions through AI-powered insights.
          </p>
        </div>

        {/* Leadership Showcase */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3 aspect-square bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100">
             <img 
               src="/image_0.png" 
               alt="Vijay K. Tiwari" 
               className="w-full h-full object-cover rounded-2xl"
             />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-slate-900">VIJAY K. TIWARI</h3>
              <p className="text-blue-600 font-semibold">Founder & Chief Executive Officer</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Founder', 'CEO', 'AI Specialist', 'Platform Architect'].map((badge) => (
                <span key={badge} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">{badge}</span>
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed">
              Vijay brings decades of expertise in software architecture and enterprise workflow automation. His vision for NexoraOS AI centres on transforming school management through cutting-edge AI-assisted educational systems, fostering platform innovation, scalability, and ensuring that institutional leaders remain empowered with actionable, future-ready intelligence.
            </p>
            <p className="text-slate-500 italic text-sm font-medium">Specialization: AI Systems & Enterprise Automation</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Our Mission", desc: "To empower educational institutions with intelligent automation, operational transparency, and scalable digital infrastructure that enables educators to focus more on learning outcomes and student success." },
            { title: "Our Vision", desc: "To become the most trusted AI-powered operating system for educational institutions by transforming school management through automation, intelligence, and data-driven decision making." }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Impact & Scale */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: "Active Schools", val: "500+" },
            { label: "Students Engaged Daily", val: "50,000+" },
            { label: "Platform Uptime", val: "99.9%" },
            { label: "Administrative Workload Reduction", val: "Up To 75%" },
            { label: "Support Availability", val: "24×7" },
            { label: "Automation Coverage", val: "75%+" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center space-y-2">
              <div className="text-3xl font-extrabold text-blue-600">{stat.val}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Why School Owners Trust Us */}
        <div className="space-y-12">
          <h3 className="text-3xl font-bold text-slate-900 text-center">Why School Owners Trust Us</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Lock, title: "Role-Based Security", desc: "Every user sees only the information they are authorized to access." },
              { icon: Cpu, title: "AI Workforce Automation", desc: "Reduce repetitive administrative workload through intelligent automation." },
              { icon: Building2, title: "Centralized Operations", desc: "Manage admissions, fees, academics, attendance, communication, and analytics from a single platform." },
              { icon: ShieldCheck, title: "Data Security & Reliability", desc: "Enterprise-grade architecture designed for availability, integrity, and operational continuity." }
            ].map((f, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role-Specific Intelligent Interfaces */}
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">Role-Specific Intelligent Interfaces</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">NexoraOS AI provides tailored, secure, and intuitive dashboards for different institutional stakeholders, ensuring precision and focus for every user.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Principal", description: "High-level analytics, institutional performance, and strategic decision support." },
              { icon: BookOpen, title: "Teacher", description: "Class management, attendance, grading, and automated lesson assistance." },
              { icon: Users, title: "Parent", description: "Student progress, attendance, communication, and fee management." }
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 group hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">{card.title}</h4>
                <p className="text-sm text-slate-600">{card.description}</p>
                <div className="mt-4 h-24 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 text-xs font-mono uppercase tracking-widest">
                  {card.title} View
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Operations Center */}
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Behind The Platform</h3>
              <p className="text-slate-600 max-w-xl">NexoraOS AI is continuously monitored by a dedicated technical operations and engineering ecosystem responsible for performance, infrastructure stability, security monitoring, updates, and customer success.</p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold uppercase tracking-wider border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              24×7 Monitoring Active
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Platform Engineering", "Infrastructure Monitoring", "AI Systems", "Security Operations", "Cloud Services", "Customer Success"].map((item, i) => (
              <div key={i} className="px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* AI Autopilot Statement */}
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">AI Handles The Repetitive Work. Leadership Stays In Control.</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">NexoraOS AI automates attendance workflows, communication processes, scheduling assistance, reporting tasks, operational reminders, and administrative coordination while ensuring that all critical institutional decisions remain under school leadership control.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-blue-600">75%</span>
              <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Automated Operations</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-blue-600">100%</span>
              <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Administrative Authority</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center space-y-6">
          <h3 className="text-4xl font-extrabold text-slate-900">Ready To Modernize Your Institution?</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Discover how NexoraOS AI can help your institution save time, improve efficiency, reduce administrative burden, and create a better educational experience for students, teachers, parents, and leadership teams.</p>
          <div className="flex gap-4 justify-center">
             <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md">Schedule Demo</button>
             <button className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition border border-slate-300">Contact Our Team</button>
          </div>
        </div>
        
      </div>
    </section>
  );
};
