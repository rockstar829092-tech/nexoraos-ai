import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-10 shadow-xl text-center"
      >
        <div className="relative mb-8 flex justify-center">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-3xl flex items-center justify-center relative z-10">
            <ShieldAlert className="w-10 h-10 text-rose-600" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-rose-200 dark:bg-rose-500/20 rounded-full blur-2xl opacity-30" 
          />
        </div>

        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
          Access Restricted
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8">
          The security protocol for <span className="font-bold text-slate-900 dark:text-white">NexoraOS AI</span> has identified that your current role does not have administrative clearance for this section.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-[#1D1D1F] dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Command Hub
          </button>
          
          <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Handshake: Fail</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
