import React from 'react';

export const NexoraSection: React.FC<{ 
  id: string; 
  title: string; 
  features: { title: string; desc: string }[]; 
  visual: React.ReactNode; 
}> = ({ id, title, features, visual }) => (
  <section id={id} className="py-48 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-6 sm:px-12 grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h2 className="text-6xl font-bold tracking-tight text-slate-900">{title}</h2>
        <div className="space-y-6">
          {features.map((f, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4">
        {visual}
      </div>
    </div>
  </section>
);
