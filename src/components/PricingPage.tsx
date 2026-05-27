import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Pricing } from './Pricing';

interface PricingPageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ theme, setTheme }) => {
  return (
    <PageLayout theme={theme} setTheme={setTheme}>
      <div className="py-20 bg-slate-50 dark:bg-black">
        <Pricing />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20 text-center">
            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-8">Trusted by Institutions Worldwide</h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-40 dark:opacity-20 grayscale">
                <span className="text-2xl font-black">UNIVERSITY_A</span>
                <span className="text-2xl font-black">GLOBAL_ACADEMY</span>
                <span className="text-2xl font-black">TECH_INSTITUTE</span>
                <span className="text-2xl font-black">MODERN_SCHOOL</span>
            </div>
        </div>
      </div>
    </PageLayout>
  );
};
