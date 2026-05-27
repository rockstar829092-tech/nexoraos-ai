/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onScrollToSection?: (sectionId: string) => void;
  onNavigateToHome?: () => void;
  onNavigateToResources?: () => void;
  activeSection?: string;
}

// BrandLogo exported cleanly so that the Footer and general pages can reuse it with proper contrast adaptations
export const BrandLogo: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 36 }) => {
  return (
    <div className={`flex items-center gap-2 select-none cursor-pointer ${className}`}>
      <div 
        className="flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20 shrink-0"
        style={{ width: size, height: size }}
      >
        <GraduationCap className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        NEXORAOS <span className="text-blue-600">AI</span>
      </span>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection, onNavigateToHome, onNavigateToResources, activeSection = 'hero' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Map user names and targets to direct scroll tags in the single-page application
  const menuItems = [
    { name: 'Home', href: '#', onClick: () => { onNavigateToHome && onNavigateToHome(); } },
    { name: 'ERP Solutions', href: '#telemetry', target: 'telemetry' },
    { name: 'Features', href: '#features', target: 'features' },
    { name: 'Resources', href: '#', onClick: () => { onNavigateToResources && onNavigateToResources(); } },
    { name: 'About', href: '#about', target: 'about' },
    { name: 'Contact', href: '#contact', target: 'contact' },
  ];

  const handleNavClick = (target: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (onScrollToSection) {
      if (target === 'contact') {
        const footerElement = document.querySelector('footer');
        if (footerElement) {
          footerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      } else {
        onScrollToSection(target);
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Bar for support query lookup */}
      <div className="bg-slate-950 text-slate-450 text-xs font-semibold py-2 px-6 sm:px-8 border-b border-slate-900 select-text">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span>For queries, contact: <a href="mailto:support@nexoraos.ai" className="text-slate-200 hover:text-blue-400 font-bold transition-colors">support@nexoraos.ai</a></span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500 font-bold tracking-wider uppercase">Active School ERP Session</span>
        </div>
      </div>

      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 "
      >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* LEFT: Logo & Brand Name */}
          <motion.a 
            href="#home"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => handleNavClick('hero', e)}
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              NEXORAOS <span className="text-blue-600">AI</span>
            </span>
          </motion.a>

          {/* CENTER: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              // Highlight active section dynamically based on the state
              const isCurrent = activeSection === item.target;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => item.onClick ? item.onClick() : handleNavClick(item.target, e)}
                  className={`relative text-sm font-semibold transition-colors duration-200 hover:text-blue-600 group py-1 ${
                    isCurrent ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-355 ${
                    isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              );
            })}
          </div>

          {/* RIGHT: Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleNavClick('playground', e)}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100/80 cursor-pointer"
            >
              Login
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleNavClick('playground', e)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 cursor-pointer"
            >
              Book Demo
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* MOBILE: Hamburger Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE: Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-b border-slate-200 bg-white md:hidden overflow-hidden"
          >
            <div className="space-y-1 px-6 pb-6 pt-3">
              {menuItems.map((item) => {
                const isCurrent = activeSection === item.target;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.target, e)}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isCurrent 
                        ? 'bg-blue-50/55 text-blue-600' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col gap-3">
                <button 
                  onClick={(e) => handleNavClick('playground', e)}
                  className="w-full rounded-xl py-3 text-center text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={(e) => handleNavClick('playground', e)}
                  className="w-full rounded-xl bg-blue-600 py-3 text-center text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </div>
  );
};

export default Navbar;
