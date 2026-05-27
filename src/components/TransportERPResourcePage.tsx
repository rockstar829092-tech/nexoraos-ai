import React from 'react';
import { 
  Bus, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Smartphone,
  ChevronDown
} from 'lucide-react';

export const TransportERPResourcePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Resource Center</span>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">NexoraOS AI Research Team • 8 Min Read</span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100 mb-2">Modern Transportation</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight uppercase font-sans">
            AI-Powered School Transport Management
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Discover how NexoraOS AI transforms school transportation through intelligent route planning, live vehicle monitoring, automated notifications, and operational analytics.
          </p>
        </div>
      </section>

      {/* Section 1: Challenges */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">The Modern Logistics Challenge</h2>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">Navigating complexities in school commute infrastructure</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Route Delays', desc: 'Unoptimized paths causing time wastage and driver fatigue across the fleet.' },
              { title: 'Parent Anxiety', desc: 'Constant manual inquiries regarding real-time bus location and student safety status.' },
              { title: 'Safety Compliance', desc: 'The absence of centralized, real-time monitoring leads to accountability gaps.' }
            ].map((c, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-1.5 bg-blue-600 mb-6 rounded-full" />
                <h4 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{c.title}</h4>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: AI Solutions */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">NexoraOS AI Solutions</h2>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">Unifying vehicle telemetry with administrative intelligence</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: 'AI Route Optimization', theme: 'blue' },
              { icon: Bus, title: 'Live Vehicle Tracking', theme: 'indigo' },
              { icon: AlertTriangle, title: 'Performance Monitoring', theme: 'amber' },
              { icon: Smartphone, title: 'Parent Notifications', theme: 'emerald' },
              { icon: ShieldCheck, title: 'Pickup Verification', theme: 'cyan' },
              { icon: TrendingUp, title: 'Transport Fee Logistics', theme: 'violet' }
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 flex items-center gap-5 hover:border-blue-200 hover:bg-white transition-all group group cursor-pointer shadow-sm">
                <div className="p-3.5 bg-white rounded-2xl border border-slate-100 group-hover:scale-110 transition-transform">
                  <s.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{s.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Badge Section Example */}
      <section className="py-24 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Measurable Business Impact</h2>
            <div className="flex flex-wrap gap-6 justify-center">
                <div className="bg-white border border-slate-200 px-8 py-6 rounded-3xl text-blue-600 shadow-sm flex flex-col items-center gap-2">
                  <span className="text-4xl font-black">75%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Admin Workload Reduced</span>
                </div>
                <div className="bg-white border border-slate-200 px-8 py-6 rounded-3xl text-emerald-600 shadow-sm flex flex-col items-center gap-2">
                  <span className="text-4xl font-black">18%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fuel Efficiency Gain</span>
                </div>
            </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            Transform Your School Transport Operations
          </h2>
          <p className="text-blue-50 text-lg font-bold leading-relaxed max-w-2xl mx-auto">
            NexoraOS AI helps institutions improve safety, automate communication, and optimize routes for long-term operational resilience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
             <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-800/30 hover:scale-105 transition-transform">Book Live Demo</button>
             <button className="bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest border border-blue-500/50 shadow-xl shadow-blue-800/30 hover:bg-blue-800 transition-colors">Talk To Specialist</button>
          </div>
        </div>
      </section>
    </div>
  );
};
