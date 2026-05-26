import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Settings, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Rocket,
  Headphones
} from 'lucide-react';

export const TeamSuccessSection: React.FC = () => {
  const cards = [
    {
      title: "Our Expert Team",
      desc: "Our experienced professionals blend **deep knowledge** of the education and retail sectors with **cutting-edge technology** to deliver tailored, innovative ERP solutions for your institution.",
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-[#DDECEF]",
    },
    {
      title: "Implementation Excellence",
      desc: "Our dedicated implementation team ensures a **seamless onboarding process**, offering **personalized guidance** to help you get the most out of our software from day one.",
      icon: Rocket,
      iconColor: "text-amber-500",
      bgColor: "bg-[#F3E8FF]", // Using another soft pastel for variation but close to style
    },
    {
      title: "Your Success Support Team",
      desc: "We’re with you every step of the way. Our **friendly support team** offers **fast, reliable assistance** via email, phone, and live chat—ensuring smooth operations and long-term success.",
      icon: Headphones,
      iconColor: "text-emerald-500",
      bgColor: "bg-[#FDF2F8]", // Soft pink/pastel
    }
  ];

  // Helper to bold keywords in description
  const renderDesc = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900 font-black">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6"
          >
            The Team That Helps You Achieve Your Business Goals and Reach New Heights.
          </motion.h2>
          <div className="w-20 h-1.5 bg-blue-600 mb-6 rounded-full" />
          <p className="text-lg text-slate-500 font-medium">
            Driving growth and efficiency, every step of the way.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
              className={`${card.bgColor} rounded-[40px] p-10 md:p-12 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-shadow`}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <card.icon className={`w-8 h-8 ${card.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                {card.title}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {renderDesc(card.desc)}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
