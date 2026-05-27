import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react';
import { NexoraNavTray } from './NexoraNavTray';
import { motion, AnimatePresence } from 'motion/react';

interface NexoraNavbarProps {
  theme?: 'light' | 'dark';
  setTheme?: (theme: 'light' | 'dark') => void;
}

export const NexoraNavbar: React.FC<NexoraNavbarProps> = ({ theme, setTheme }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleFeatureClick = (path: string) => {
    setActiveItem(null);
    navigate(path);
  };

  return (
    <>
      <nav className="sticky top-0 z-[60] bg-white/95 dark:bg-black/95 border-b border-slate-200 dark:border-white/10 h-14 flex items-center justify-between px-6 sm:px-12 transition-all duration-300">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-black text-[13px] tracking-tighter text-slate-900 dark:text-white cursor-pointer hover:opacity-70 transition-opacity">
            NEXORA<span className="text-[#0071E3]">OS</span> AI
          </Link>
          
          <div className="hidden lg:flex gap-8 text-[11.5px] font-bold text-slate-500 dark:text-slate-400">
            <button 
              onMouseEnter={() => setActiveItem('Products')} 
              className={`hover:text-[#0071E3] transition-colors cursor-pointer flex items-center gap-1 ${activeItem === 'Products' ? 'text-[#0071E3]' : ''}`}
            >
              Academic
              <ChevronDown className="w-3 h-3" />
            </button>
            <Link to="/operations" className="hover:text-[#0071E3] dark:hover:text-blue-400 transition-colors">Operations</Link>
            <Link to="/finance" className="hover:text-[#0071E3] dark:hover:text-blue-400 transition-colors">Finance</Link>
            <Link to="/mobile-apps" className="hover:text-[#0071E3] dark:hover:text-blue-400 transition-colors">Mobile Apps</Link>
            <Link to="/pricing" className="hover:text-[#0071E3] dark:hover:text-blue-400 transition-colors">Pricing</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {setTheme && (
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.657 16.657l-.707.707M7.636 7.636l-.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>
          )}
          <button className="hidden sm:block text-[11.5px] text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors">Login</button>
          <button className="bg-[#0071E3] text-white text-[11px] px-4 py-1.5 rounded-full font-bold hover:bg-[#0077ED] transition-all shadow-sm shadow-blue-200">
            Book Live Demo
          </button>
          <button 
            className="lg:hidden p-1.5 text-slate-500 dark:text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <NexoraNavTray 
        isOpen={!!activeItem} 
        activeItem={activeItem} 
        onClose={() => setActiveItem(null)} 
        onNavigate={handleFeatureClick} 
      />
      
      {/* Background Mask */}
      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]" 
            onMouseEnter={() => setActiveItem(null)}
            onClick={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-14 bg-white dark:bg-black z-[55] border-b border-slate-200 dark:border-white/10 lg:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link to="/academic" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-900 dark:text-white">Academic</Link>
              <Link to="/operations" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-900 dark:text-white">Operations</Link>
              <Link to="/finance" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-900 dark:text-white">Finance</Link>
              <Link to="/mobile-apps" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-900 dark:text-white">Mobile Apps</Link>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-900 dark:text-white">Pricing</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
