import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BLOG_POSTS = [
  { title: "AI-Powered School Management System", snippet: "Discover how AI automation is transforming attendance, fees, communication, and academic operations.", bg: "bg-emerald-50" },
  { title: "Smart Attendance Tracking with ERP", snippet: "Learn how AI attendance systems reduce paperwork and improve real-time parent communication.", bg: "bg-blue-50" },
  { title: "Automated WhatsApp Fee Reminders", snippet: "Automatically send fee reminders, absence alerts, and announcements via WhatsApp.", bg: "bg-emerald-50" },
  { title: "Cloud-Based School ERP", snippet: "Why modern schools are switching from old desktop software to cloud-based ERP platforms.", bg: "bg-blue-50" },
  { title: "Visitor & Campus Security Management", snippet: "Manage visitor check-ins, gate logs, and student exit verification with smart digital tools.", bg: "bg-rose-50" },
  { title: "Online Exams & AI Analytics", snippet: "AI-powered exam analytics help schools improve performance tracking.", bg: "bg-purple-50" },
  { title: "Digital ID Cards & QR Verification", snippet: "Generate smart ID cards instantly with QR verification for secure school operations.", bg: "bg-amber-50" },
  { title: "Transport & GPS Bus Tracking", snippet: "Track buses in real-time and improve student safety using GPS-enabled transport.", bg: "bg-blue-50" },
  { title: "Zero-Training School ERP Experience", snippet: "Designed for real schools with simple dashboards that anyone can use.", bg: "bg-indigo-50" },
];

export const ResourcesPage: React.FC = () => {
  return (
    <section id="resources" className="py-24 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-950 font-sans">
            Distinctive Educational ERP Resources
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore AI-powered school management insights, automation strategies, EdTech innovations, and modern ERP solutions for schools and colleges.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}                
              className="bg-white border border-slate-200 rounded-[18px] p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`h-48 ${post.bg} rounded-xl mb-6 flex items-center justify-center`}>
                <span className="text-slate-400 text-xs font-mono uppercase">Illustration Placeholder</span>
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">{post.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{post.snippet}</p>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1 mt-20">
            <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
            {[1, 2, 3, 4].map(p => (
                <button key={p} className={`px-4 py-2 rounded-lg ${p === 1 ? 'bg-slate-950 text-white' : 'border border-slate-200 hover:bg-slate-50'}`}>{p}</button>
            ))}
            <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
        
      </div>
    </section>
  );
};
