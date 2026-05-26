/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  Loader2, 
  Copy, 
  Check, 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  RefreshCw, 
  Terminal, 
  HelpCircle 
} from 'lucide-react';

type TaskType = 'syllabus' | 'report';

export const LiveAssistantPlayground: React.FC = () => {
  const [taskType, setTaskType] = useState<TaskType>('syllabus');
  const [field2, setField2] = useState<string>('Physics & Chemistry'); // Subject or Student Name
  const [field3, setField3] = useState<string>('Grade 9 / Practical lab experiments, Newton laws, and basic chemical reactions'); // Grade/Traits
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [traceStep, setTraceStep] = useState<number>(0);
  const [aiResult, setAiResult] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  // Sane presets helper based on dropdown selection
  useEffect(() => {
    if (taskType === 'syllabus') {
      setField2('Physics & Chemistry');
      setField3('Grade 9 / Practical lab experiments, Newton laws, and basic chemical reactions');
    } else {
      setField2('Karan Malhotra');
      setField3('Grade 6 / Outstanding conceptual math skills but distraction during group sessions');
    }
  }, [taskType]);

  // Loading animation trace steps
  const traceSteps = [
    '✦ Connecting to secure school-telemetry core...',
    '✦ Formulating system prompt with pedagogy instructions...',
    '✦ Querying Google Gemini 1.5 Pro backend endpoint...',
    '✦ Structuring high-quality responsive markdown blocks...',
    '✦ Instantiating outcome assessments and teacher comments...'
  ];

  useEffect(() => {
    let timer: any;
    if (isLoading && traceStep < traceSteps.length) {
      timer = setTimeout(() => {
        setTraceStep(prev => prev + 1);
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [isLoading, traceStep]);

  const handleCopy = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!field2.trim() || !field3.trim()) return;

    setIsLoading(true);
    setTraceStep(0);
    setAiResult('');
    setErrorText('');

    // Pre-structured prompts based on input fields to maximize live demonstration proof-of-value
    let finalPrompt = '';
    let sysInstruction = '';

    if (taskType === 'syllabus') {
      finalPrompt = `Generate a high-quality pedagogical Academic Syllabus Syllabus block for:
Subject: ${field2}
Details & Grade: ${field3}

Structure the output with clear Heading sections, weekly curriculum progression, primary objectives, and sample quiz questions for teacher assistance. Format in clean professional markdown.`;
      
      sysInstruction = `You are NexoraOS Syllabus Engine, powered by high-capacity educational models. You write highly practical, curriculum-aligned academic guidelines.`;
    } else {
      finalPrompt = `Draft a premium student report card progress narrative for student: "${field2}" who is in: "${field3}". 
Draft:
1. Academic development review.
2. Behavioral observation regarding focus and participation.
3. Supportive constructive feedback narrative for upcoming school term.`;
      
      sysInstruction = `You are NexoraOS Report Card Specialist. You write compassionate, professional, growth-oriented student report comments for supportive parent counseling sessions.`;
    }

    try {
      // Call endpoint
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          systemInstruction: sysInstruction,
        }),
      });

      const data = await response.json();

      // Ensure trace finishes nicely before displaying output
      const remainingStepsTime = (traceSteps.length - traceStep) * 600;
      setTimeout(() => {
        setIsLoading(false);
        if (response.ok) {
          setAiResult(data.text || 'No output returned.');
        } else {
          setErrorText(data.error || 'Connection fallback reached.');
          setAiResult(`#### ✦ Live Assistant Result Preview\n\nBased on your custom inputs, NexoraOS AI automatically drafts:\n\n*   **Task Mode**: ${taskType === 'syllabus' ? 'Syllabus Development' : 'Student Report Narrative'}\n*   **Target Identifier**: *${field2}*\n*   **Criteria Configuration**: *${field3}*\n\n**Generated Mock Report Sample:**\n"The student demonstrates superb foundational awareness of terms but benefits from direct, structured check-ins during cooperative assignments to lock in focus."`);
        }
      }, Math.max(800, remainingStepsTime));

    } catch (err: any) {
      setTimeout(() => {
        setIsLoading(false);
        setErrorText('Network interruption. Rendering offline simulated fallback.');
        setAiResult(`### ✦ Academic AI Result Preview (Offline Fallback)\n\n*   **Syllabus Target**: ${field2}\n*   **Syllabus Focus**: ${field3}\n\n**Proposed Weekly Breakdown Outline:**\n*   **Week 1**: Foundational review of concepts and safety rules.\n*   **Week 2**: Practical application laboratories and active observation exercises.\n*   **Week 3**: Collaborative pair presentations & peer assessments.`);
      }, 2500);
    }
  };

  // Safe renderer for rich text snippet
  const renderTextContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) {
        return <h4 key={i} className="text-sm font-black text-white uppercase tracking-wider mb-2 mt-4">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ') || line.startsWith('#### ')) {
        return <h5 key={i} className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1.5 mt-3">{line.replace(/^##+\s/, '')}</h5>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 list-disc text-slate-300 text-xs mb-1.5 leading-relaxed font-medium">
            {formatBold(line.replace(/^[\*\-]\s+/, ''))}
          </li>
        );
      }
      return (
        <p key={i} className="text-slate-300 text-xs mb-2 leading-relaxed font-medium">
          {formatBold(line)}
        </p>
      );
    });
  };

  const formatBold = (text: string) => {
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    if (parts.length > 1) {
      return parts.map((part, index) => 
        index % 2 === 1 ? <strong key={index} className="font-extrabold text-[#0074E4]">{part}</strong> : part
      );
    }
    return text;
  };

  return (
    <section 
      id="ai-assistant-playground"
      className="relative bg-[#050B14] text-white py-24 border-t border-[#002D62]/30 w-full overflow-hidden"
    >
      {/* Premium ambient light fields */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#0074E4]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Decorative tech grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#002D6204_1px,transparent_1px),linear-gradient(to_bottom,#002D6204_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none opacity-40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================= */}
          {/* LEFT CONTENT SIDE                                         */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#001E3D] to-[#002D62] px-4 py-1.5 text-xs font-semibold text-blue-300 border border-[#0074E4]/30 shadow-md">
              <Cpu className="h-4 w-4 text-blue-400 animate-pulse" />
              <span className="tracking-wider uppercase font-mono text-[9px] font-black">Powered by Gemini 1.5 Pro Backend</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Try Our Live AI <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Assistant Instantly
                </span>
              </h2>
              
              <h3 className="text-sm sm:text-base font-semibold text-cyan-400 font-sans tracking-wide">
                (Abhi khud chala kar dekhein: Ghanton ka Syllabus aur Report Card ka kaam sirf ek click me!)
              </h3>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed max-w-md mx-auto lg:mx-0">
              Instantly draft authentic curricula, customized academic structures, or compile complex student report card narratives without any sign-up requirements. Experience real-world automation on the spot.
            </p>

            {/* Quick trust metrics */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4 text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0074E4]" />
                <span>No CC Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Zero Latency Sandbox</span>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COL: Interactive Glassmorphic Form Card             */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-[0_24px_50px_-12px_rgba(0,116,228,0.15)] relative overflow-hidden text-left">
              
              {/* Corner tech line decoration */}
              <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#0074E4] to-transparent" />
              <div className="absolute top-0 right-0 h-24 w-[1px] bg-gradient-to-b from-[#0074E4] to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Field 1: Task Selector dropdown */}
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-[9.5px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                    Choose AI Engine Task
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTaskType('syllabus')}
                      className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${taskType === 'syllabus' ? 'bg-[#0074E4] border-[#0074E4] text-white shadow-md shadow-blue-600/10' : 'bg-[#001530]/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Academic Syllabus</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaskType('report')}
                      className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${taskType === 'report' ? 'bg-[#0074E4] border-[#0074E4] text-white shadow-md shadow-blue-600/10' : 'bg-[#001530]/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Report Card Narrative</span>
                    </button>
                  </div>
                </div>

                {/* Field 2: Target Identifier Input */}
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                    {taskType === 'syllabus' ? 'Subject Name' : 'Student Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    placeholder={taskType === 'syllabus' ? 'e.g., Mathematics, Computer Science' : 'e.g., Sarah Jenkins'}
                    className="w-full bg-[#001530]/55 border border-white/15 px-4 py-3 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-1 focus:ring-[#0074E4] focus:border-[#0074E4] transition-all"
                  />
                </div>

                {/* Field 3: Criteria Description Input */}
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono font-black text-slate-400 tracking-wider uppercase block">
                    {taskType === 'syllabus' ? 'Grade / Key Topics Scope' : 'Grade / Trait & Focus Criteria'}
                  </label>
                  <textarea
                    required
                    value={field3}
                    onChange={(e) => setField3(e.target.value)}
                    rows={2}
                    placeholder={taskType === 'syllabus' ? 'e.g., Grade 10 / Algebra equations, graphing, functions' : 'e.g., Grade 6 / Participative but distracted'}
                    className="w-full bg-[#001530]/55 border border-white/15 px-4 py-3 rounded-xl text-xs font-medium text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-1 focus:ring-[#0074E4] focus:border-[#0074E4] transition-all resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading || !field2.trim() || !field3.trim()}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-[#0074E4] hover:from-[#0074E4] hover:to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.45)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer select-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Initiating AI Generation Pipelines...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Instantly</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Dynamic Presentation Telemetry & Results Display Block */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                
                {/* 1. Live Generation Trace Progress (Only visible during loading state) */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-[#001530]/80 rounded-xl p-4 border border-blue-500/15 font-mono text-[10px] space-y-2 text-slate-400"
                    >
                      <div className="flex items-center gap-1.5 text-blue-400 font-extrabold">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>AI CORE REAL-TIME TELEMETRY TRACE</span>
                      </div>
                      <div className="space-y-1.5 pl-1.5">
                        {traceSteps.slice(0, traceStep + 1).map((step, idx) => (
                          <div 
                            key={idx} 
                            className={`flex items-center gap-2 transition-opacity ${idx === traceStep ? 'text-white font-black animate-pulse' : 'text-slate-500'}`}
                          >
                            <span>{step}</span>
                            {idx < traceStep && <Check className="w-3 h-3 text-emerald-400" />}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 2. Output block container */}
                {aiResult && !isLoading ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4.5 w-4.5 text-blue-400 animate-pulse" />
                        <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase">Generated Sandbox Outcome</span>
                      </div>
                      
                      {/* Copy Action button */}
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-[10px] font-bold cursor-pointer select-none"
                        title="Copy text outcome"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Output</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Result Card styled quote box */}
                    <div className="bg-[#00152F]/75 border border-white/10 rounded-2xl p-5 overflow-y-auto max-h-[250px] font-sans scrollbar-thin scrollbar-thumb-white/10">
                      {renderTextContent(aiResult)}
                    </div>
                    {errorText && (
                      <span className="text-[9.5px] font-semibold text-slate-500 italic block mt-1">{errorText}</span>
                    )}
                  </motion.div>
                ) : (
                  !isLoading && (
                    <div className="bg-[#00152F]/30 border border-white/5 rounded-xl p-6 text-center text-slate-500 space-y-1">
                      <HelpCircle className="h-6 w-6 text-slate-600 mx-auto" />
                      <span className="text-[11px] font-semibold block text-slate-400">Output Result Preview Terminal</span>
                      <p className="text-[10.5px] max-w-sm mx-auto">
                        Setup parameters, select task type and execute the button to trigger live AI generation processes on screen.
                      </p>
                    </div>
                  )
                )}

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
