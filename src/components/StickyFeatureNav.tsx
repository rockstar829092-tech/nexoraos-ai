import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface StickyFeatureNavProps {
  items: NavItem[];
}

export const StickyFeatureNav: React.FC<StickyFeatureNavProps> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const handleScroll = () => {
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <div className="sticky top-0 z-40 bg-white/80  border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
        <div className="flex items-center gap-8 h-16">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex flex-col items-center gap-1 transition-all group ${
                  isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'fill-blue-600' : ''}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFeatureNav"
                    className="absolute bottom-0 h-0.5 w-12 bg-blue-600"
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
