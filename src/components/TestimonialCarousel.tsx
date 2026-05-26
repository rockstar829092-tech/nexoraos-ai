/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Smile } from 'lucide-react';

import delhiPrincipalImg from '../assets/images/delhi_principal_1779789558781.png';
import mumbaiTrusteeImg from '../assets/images/mumbai_trustee_1779789577430.png';
import chennaiDeanImg from '../assets/images/chennai_dean_1779789595228.png';
import bengaluruMdImg from '../assets/images/bengaluru_md_1779789614172.png';
import jaipurPrincipalImg from '../assets/images/jaipur_principal_1779789629553.png';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
  address: string;
  image: string;
}

const CAROUSEL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-delhi',
    quote: "NexoraOS AI ne hamare billing operations ko 100% bulletproof bana diya hai. Automated parent notifications ki wajah se hamari outstanding fee collection ab tak ke sabse highest record par hai.",
    author: "Dr. Rajeshwari Malhotra",
    role: "Principal & Director",
    institution: "Venkateshwara International School",
    address: "Sector 10, Dwarka, New Delhi, India",
    image: delhiPrincipalImg,
  },
  {
    id: 't-mumbai',
    quote: "Multi-campus administration hamare liye ek sir-dard tha. NexoraOS AI ke centralized dashboard se hum Mumbai aur Pune ke dono campuses ki financial health ek single number me track kar sakte hain.",
    author: "Prof. Arvind Kulkarni",
    role: "Trustee & Administrator",
    institution: "Sahyadri Education Trust",
    address: "Nariman Point, Mumbai, Maharashtra, India",
    image: mumbaiTrusteeImg,
  },
  {
    id: 't-chennai',
    quote: "AI-powered automatic substitution engine ek chamatkar jaisa hai. Jab bhi koi teacher leave par hota hai, system 1 minute ke andar schedule balance kar deta hai. HOD ka ghanton ka waqt bachta hai.",
    author: "Dr. S. Meenakshi Sundaram",
    role: "Dean of Academics",
    institution: "Padma Seshadri Bala Bhavan Group",
    address: "Nungambakkam, Chennai, Tamil Nadu, India",
    image: chennaiDeanImg,
  },
  {
    id: 't-bengaluru',
    quote: "Hamare high-tech campus ke liye hume ek intelligent platform chahiye tha. AI Telemetry aur RFID gate integration ka uptime behtareen hai. Parents bacchon ki safety ko lekar ab 100% nishchint hain.",
    author: "Capt. Sandeep Narayanan (Retd.)",
    role: "Managing Director",
    institution: "Neon Woods International School",
    address: "Whitefield, Bengaluru, Karnataka, India",
    image: bengaluruMdImg,
  },
  {
    id: 't-jaipur',
    quote: "NexoraOS AI ka Transparency Hub naye admissions ke liye ek magnet ki tarah kaam kar raha hai. Pichle 5 saalon ke board results aur faculty bio-data ko dekh kar naye parents ka trust pehle din hi ban jata hai.",
    author: "Smt. Devika Rathore",
    role: "Senior Principal",
    institution: "Maharani Gayatri Devi Academy",
    address: "Sawai Ram Singh Road, Jaipur, Rajasthan, India",
    image: jaipurPrincipalImg,
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_TESTIMONIALS.length) % CAROUSEL_TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_TESTIMONIALS.length);
  };

  const current = CAROUSEL_TESTIMONIALS[currentIndex];

  return (
    <section 
      id="trust" 
      className="relative bg-[#002D62] text-white py-20 w-full select-text text-center overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
        
        {/* Centered White Heading */}
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-normal">
            Our Valued Clients' Testimonials Speak Volumes <br className="hidden sm:inline" />
            About Our Work's Power
          </h2>
          
          {/* Thin yellow underline below Title */}
          <div className="w-24 h-[3px] bg-[#FFD700] mx-auto mt-2 rounded-full" />
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative max-w-3xl mx-auto px-12 sm:px-14 flex items-center justify-center">
          
          {/* LEFT CAROUSEL ARROW - outside card, centered vertically */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 sm:-left-4 z-25 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all outline-hidden cursor-pointer select-none"
            title="Previous"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* RIGHT CAROUSEL ARROW - outside card, centered vertically */}
          <button 
            onClick={handleNext}
            className="absolute right-0 sm:-right-4 z-25 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all outline-hidden cursor-pointer select-none"
            title="Next"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Main Card */}
          <div className="w-full relative min-h-[320px] sm:min-h-[250px] flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="w-full bg-[#FAFAFA] rounded-xl p-8 sm:p-10 shadow-lg text-left relative overflow-hidden"
              >
                
                {/* TOP LEFT SMALL ICON - Gold Quote sign in reference style */}
                <div className="absolute top-6 left-6 text-[#FFD700] select-none opacity-90">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* RIGHT SIDE SMALL CIRCLE ICON - Smile Icon */}
                <div className="absolute top-6 right-6 text-[#FFD700] opacity-80">
                  <Smile className="w-6 h-6 stroke-[2]" />
                </div>

                <div className="flex flex-col justify-between h-full pt-6 space-y-6">
                  {/* Testimonial Quote - Small readable font, aligned top-left */}
                  <p className="text-sm text-slate-700 font-medium leading-relaxed font-sans max-w-2xl">
                    “{current.quote}”
                  </p>

                  {/* BOTTOM LEFT: Author Panel */}
                  <div className="flex items-center gap-4 pt-6 mt-4 border-t border-slate-200">
                    {/* Circle Principal image */}
                    {current.image ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-slate-250 bg-white shadow-xs">
                        <img 
                          src={current.image} 
                          alt={current.author} 
                          className="w-full h-full object-cover select-none pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      // Dynamic corporate theme initials fallback
                      <div className="w-14 h-14 rounded-full bg-slate-200 text-[#002D62] font-black text-sm flex items-center justify-center shrink-0 border border-slate-300 shadow-3xs select-none">
                        {current.author.split(' ').map((n, i) => i < 2 ? n[0] : '').join('')}
                      </div>
                    )}

                    {/* Left aligned details */}
                    <div className="text-left font-sans">
                      <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                        {current.author}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 mt-1 leading-normal">
                        {current.role}, <span className="text-[#002D62] font-black">{current.institution}</span>
                        <span className="block text-[11px] text-slate-400 font-medium mt-0.5">{current.address}</span>
                      </p>
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>

        {/* Small Yellow Pagination Dots Centered below card */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {CAROUSEL_TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 outline-hidden ${idx === currentIndex ? 'w-6 bg-[#FFD700]' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
