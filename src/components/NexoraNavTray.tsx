import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavTrayProps {
  isOpen: boolean;
  activeItem: string | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NexoraNavTray: React.FC<NavTrayProps> = ({ isOpen, activeItem, onClose, onNavigate }) => {
  const navMap: Record<string, string> = {
    'Student Management': '/student-management',
    'Attendance & Leave': '/attendance-management',
    'Exam Management': '/exam-management',
    'Admission & Fee': '/admission-fee',
    'Learning Management System': '/lms',
    'Calendar & Events Planner': '/calendar-events',
    'Staff Management': '/staff-management',
    'HR & Payroll': '/payroll',
    'Library Management': '/library-management',
    'Hostel Management': '/hostel-management',
    'Transport Management': '/transport-management',
    'Fee Management': '/fee-management',
    'SMS & Email Alerts': '/communication',
    'Mobile Apps Ecosystem': '/mobile-apps',
    'Role-Based Access & Security': '/security',
    'Arts & Music Management': '/academic'
  };

  const currentContent = {
    groups: [
      {
        title: 'Academics',
        items: ['Student Management', 'Attendance & Leave', 'Exam Management', 'Admission & Fee', 'Learning Management System', 'Calendar & Events Planner']
      },
      {
        title: 'Administration',
        items: ['Staff Management', 'HR & Payroll', 'Library Management', 'Hostel Management', 'Transport Management']
      },
      {
        title: 'Management',
        items: ['Fee Management', 'SMS & Email Alerts', 'Mobile Apps Ecosystem', 'Role-Based Access & Security', 'Arts & Music Management']
      }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="fixed top-14 left-0 right-0 bg-white dark:bg-zinc-950 z-[70] overflow-hidden border-b border-slate-200 dark:border-white/10"
          onMouseLeave={onClose}
        >
          <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {currentContent.groups.map(group => (
              <div key={group.title} className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] border-b border-slate-100 dark:border-white/5 pb-2">{group.title}</h4>
                <div className="flex flex-col gap-2">
                  {group.items.map(item => (
                    <button 
                      key={item}
                      onClick={() => { onNavigate(navMap[item]); onClose(); }}
                      className="text-left text-[12.5px] font-bold text-slate-900 dark:text-[#F5F5F7] hover:text-[#0071E3] transition-colors py-0.5"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
