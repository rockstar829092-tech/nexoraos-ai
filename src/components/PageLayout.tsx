import React from 'react';
import { NexoraNavbar } from './NexoraNavbar';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';

interface PageLayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, theme, setTheme }) => {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-300 min-h-screen flex flex-col">
      <NexoraNavbar theme={theme} setTheme={setTheme} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer onNavigate={(p) => window.location.href = p} />
      <BackToTop />
    </div>
  );
};
