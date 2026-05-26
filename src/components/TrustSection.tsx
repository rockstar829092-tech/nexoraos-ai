/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { School, Users, ShieldCheck, Network } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const stats = [
    {
      id: 1,
      number: '500+',
      label: 'Active Schools & Colleges',
      subtext: 'Trusted across multiple regions',
      icon: School,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      number: '50K+',
      label: 'Daily Active Students',
      subtext: 'Seamless cloud connections',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 3,
      number: '99.9%',
      label: 'Platform Cloud Uptime',
      subtext: 'Enterprise stability guaranteed',
      icon: ShieldCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 4,
      number: 'Multi-Branch',
      label: 'Campus Support Enabled',
      subtext: 'Centralized administration panel',
      icon: Network,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  // Container animation for staggering items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <section id="trust" className="bg-white py-20 border-b border-slate-200/60 relative z-10 w-full select-text text-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Subtle top divider line text */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-450">
            Empowering Education Ecosystems At Scale
          </p>
        </div>

        {/* Stats Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative flex flex-col items-center text-center py-8 px-6 rounded-2xl border border-slate-100 bg-[#F8FAFC]/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 group"
              >
                {/* Dynamic Icon with Custom Soft Backgrounds */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Big Bold Trust Metrics */}
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-sans">
                  {stat.number}
                </span>

                {/* Highly Readable Labels */}
                <span className="mt-2 text-sm font-semibold text-slate-800">
                  {stat.label}
                </span>

                {/* Contextual Subtext */}
                <span className="mt-1 text-xs text-slate-500 font-medium">
                  {stat.subtext}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
