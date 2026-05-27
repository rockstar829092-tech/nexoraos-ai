/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Cpu, 
  ArrowRight, 
  Loader2, 
  CornerDownLeft,
  GraduationCap
} from 'lucide-react';

type PlayTab = 'lesson' | 'report' | 'advisor';

export const AiPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlayTab>('lesson');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  
  // Lesson Planner States
  const [subject, setSubject] = useState<string>('Science');
  const [gradeLevel, setGradeLevel] = useState<string>('Grade 7');
  const [topic, setTopic] = useState<string>('Introduction to Ecosystems');
  const [duration, setDuration] = useState<string>('50 Minutes');

  // Report Card Generator States
  const [evaluation, setEvaluation] = useState<string>('Exceeds Expectations');
  const [personalityInput, setPersonalityInput] = useState<string>('participative, curious, helps peers');
  const [studentName, setStudentName] = useState<string>('Sarah Jenkins');

  // Principal Advisor Chat States
  const [advisorMessage, setAdvisorMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: "Welcome to the NexoraOS Advisory Suite. Ask any operational question: teacher rosters, budget allocation scenarios, compliance protocols, or drafting automated safety policies."
    }
  ]);

  // Call the server API endpoint
  const handleAiGeneration = async (promptText: string, instruction: string) => {
    setLoading(true);
    setResult('');
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: promptText,
          systemInstruction: instruction
        })
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.text || 'No response returned.');
      } else {
        setResult(`Error: ${data.error || 'Failed to call API background service.'}`);
      }
    } catch (err: any) {
      setResult(`Network Error: ${err.message || 'Could not communicate with Express server.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `Generate a modern, highly practical, active-learning Lesson Plan for:
Grade: ${gradeLevel}
Subject: ${subject}
Topic: ${topic}
Lesson Duration: ${duration}

Structure the plan with explicit timetabled sections (e.g. first 10m Hook, next 20m Core, ending Assessment), student-centric objectives, resource checklists, and custom interactive checks for understanding. Provide it in beautiful professional markdown format.`;
    
    const system = `You are NexoraOS Academic AI, an expert school curriculum designer and pedagogical consultant. You generate high-impact lesson plans strictly using modern cooperative learning strategies.`;
    
    handleAiGeneration(prompt, system);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `Construct 3 unique options of premium, personalized report card feedback comments for Student: "${studentName}" in ${evaluation} bracket. 
Key traits identified: ${personalityInput}. 

Generate:
Option 1: Professional and Academic focused.
Option 2: Warm and student-growth encouraging.
Option 3: Constructive next-step actions. 

Maintain warm, highly professional, supportive language designed for supportive parent-teacher counseling.`;
    
    const system = `You are NexoraOS Comment Wizard, an specialized grading reviewer. You craft empathetic, precise, and encouraging grades commentary that fosters a positive growth mindset in youngsters.`;
    
    handleAiGeneration(prompt, system);
  };

  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorMessage.trim()) return;

    const userMsg = advisorMessage;
    setAdvisorMessage('');
    const newHistory = [...chatHistory, { role: 'user' as const, text: userMsg }];
    setChatHistory(newHistory);
    
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          systemInstruction: `You are Dr. Evelyn, a senior Ivy League educational operating consultant representing NexoraOS AI administration solutions. You solve administrative timetable overlaps, write elegant school security notices, draft parent-communication plans, and optimize operational budgets transparently. Answer concisely and use structured bullet points.`
        })
      });
      const data = await response.json();
      if (response.ok) {
        setChatHistory([...newHistory, { role: 'assistant', text: data.text }]);
      } else {
        setChatHistory([...newHistory, { role: 'assistant', text: `Failed to fetch response: ${data.error}` }]);
      }
    } catch (err: any) {
      setChatHistory([...newHistory, { role: 'assistant', text: `Failed to parse response: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const setPreloadedQuestion = (q: string) => {
    setAdvisorMessage(q);
  };

  // Helper to safely render simple markdown styling (bold, lists)
  const formatTextSnippet = (text: string) => {
    if (!text) return 'Click Generate to start the telemetry simulation...';
    
    return text.split('\n').map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h5 key={idx} className="font-bold text-slate-800 text-sm mt-3 mb-1.5">{line.replace('### ', '')}</h5>;
      }
      if (line.startsWith('#### ')) {
        return <h6 key={idx} className="font-bold text-blue-600 text-xs mt-3 mb-1">{line.replace('#### ', '')}</h6>;
      }
      if (line.startsWith('## ')) {
        return <h4 key={idx} className="font-bold text-slate-900 text-base mt-4 mb-2 border-b border-slate-100 pb-1">{line.replace('## ', '')}</h4>;
      }
      if (line.startsWith('# ')) {
        return <h3 key={idx} className="font-sans font-black text-slate-950 text-lg mt-4 mb-2">{line.replace('# ', '')}</h3>;
      }
      
      // Bullets
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const cleanContent = line.replace(/^[\*\-]\s+/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-slate-600 mb-1 leading-relaxed">
            {boldTextHelper(cleanContent)}
          </li>
        );
      }
      
      return (
        <p key={idx} className="text-xs text-slate-600 mb-2 leading-relaxed">
          {boldTextHelper(line)}
        </p>
      );
    });
  };

  const boldTextHelper = (text: string) => {
    // Basic regex-like splitter for **bold** text
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    if (parts.length > 1) {
      return parts.map((part, index) => 
        index % 2 === 1 ? <strong key={index} className="font-bold text-slate-800">{part}</strong> : part
      );
    }
    return text;
  };

  return (
    <div id="playground" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-250 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Server-side AI Workspace</span>
          </div>
          <h3 className="text-xl font-bold font-sans text-slate-900 tracking-tight">
            Comprehensive Workspace Sandbox
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Interact with our three core AI subsystems, directly connected to our Express microservice running the high-performance Gemini LLM model.
          </p>
        </div>

        {/* Tab List */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl border border-slate-200 w-fit">
          <button
            onClick={() => { setActiveTab('lesson'); setResult(''); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'lesson'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Lesson Planner</span>
          </button>
          <button
            onClick={() => { setActiveTab('report'); setResult(''); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'report'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Grading Comments</span>
          </button>
          <button
            onClick={() => { setActiveTab('advisor'); setResult(''); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'advisor'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Director Advisory Chat</span>
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Play Workspace left form columns */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          
          {/* TAB 1: Lesson planner */}
          {activeTab === 'lesson' && (
            <form onSubmit={handleLessonSubmit} className="space-y-4">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-4 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Module: Academic-OS Intelligence</span>
                Empower educators to formulate customized, research-backed instructional lesson blocks aligned with multi-national curriculum expectations.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Academic Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                  >
                    <option>Science & Physics</option>
                    <option>Mathematics & Calc</option>
                    <option>Global History</option>
                    <option>Language & Rhetoric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Grade
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                  >
                    <option>Grade 4 (Primary)</option>
                    <option>Grade 7 (Middle)</option>
                    <option>Grade 10 (Secondary)</option>
                    <option>Grade 12 (Advanced)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Instructional Topic
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Newton's 2nd Law of Motion"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Lesson Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                >
                  <option>30 Minutes (Focus Block)</option>
                  <option>50 Minutes (Standard Period)</option>
                  <option>90 Minutes (Unified Double Period)</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group bg-blue-600 text-white rounded-xl py-3 px-5 text-xs font-bold text-center hover:bg-blue-700 shadow-sm transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white" />
                      <span>Drafting Syllabus Mapping...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Lesson Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Grading Assessment Wizard */}
          {activeTab === 'report' && (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mb-4 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Module: Autonomous Gradebook Wizard</span>
                Save hours of paperwork. Convert evaluation criteria and student attributes into beautiful, constructive feedback points instantly.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Performance Bracket
                </label>
                <select
                  value={evaluation}
                  onChange={(e) => setEvaluation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                >
                  <option>Exceeds Expectations (Grade A/High-B)</option>
                  <option>Meets National Criteria (Grade B-C)</option>
                  <option>Targeted Support Required (Improvement Bracket)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Identified Traits / Strengths
                </label>
                <input
                  type="text"
                  required
                  value={personalityInput}
                  onChange={(e) => setPersonalityInput(e.target.value)}
                  placeholder="participative, creative, needs support in equations"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group bg-blue-600 text-white rounded-xl py-3 px-5 text-xs font-bold text-center hover:bg-blue-700 shadow-sm transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white" />
                      <span>Structuring Dialogue Blocks...</span>
                    </>
                  ) : (
                    <>
                      <span>Assemble Remarks Pack</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Principal Advisory Chat */}
          {activeTab === 'advisor' && (
            <div className="flex flex-col h-[350px] justify-between">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs mb-3 space-y-2.5">
                <span className="font-bold text-slate-700 block text-[10px] tracking-wider uppercase">
                  Suggested Administrative Queries
                </span>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setPreloadedQuestion("Draft an automated SMS template notifying parent when a student misses morning biometric gate roll-call.")}
                    className="text-left py-2 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition text-[11px] text-slate-600 font-medium whitespace-normal"
                  >
                    Draft Roll-Call Tardiness SMS Rule
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreloadedQuestion("Suggest options on how to rearrange timetable blocks if the main Physics teacher goes on an emergency 3-day leave.")}
                    className="text-left py-2 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition text-[11px] text-slate-600 font-medium whitespace-normal"
                  >
                    Resolve Emergency Teacher Leave conflict
                  </button>
                </div>
              </div>

              {/* Advisory Chat Submission Form */}
              <form onSubmit={handleAdvisorSubmit} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ask advisor about school admin..."
                  value={advisorMessage}
                  onChange={(e) => setAdvisorMessage(e.target.value)}
                  className="flex-grow bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg py-2.5 px-3 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white rounded-lg p-2.5 flex items-center justify-center hover:bg-blue-700 transition"
                  aria-label="Send message"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Play workspace right output results visual card */}
        <div className="lg:col-span-7 flex flex-col bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden h-[420px]">
          {/* Header */}
          <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 text-xs flex justify-between items-center font-bold text-slate-600 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-600" />
              Intelligence Center Output
            </span>
            <span>Channel Secure</span>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1 font-sans">
            {activeTab === 'advisor' ? (
              // Chat conversation history for TAB 3
              <div className="space-y-4">
                {chatHistory.map((chat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[85%] rounded-xl p-3.5 text-xs ${
                      chat.role === 'user' 
                        ? 'bg-blue-600 text-white ml-auto' 
                        : 'bg-white border border-slate-200 text-slate-700 mr-auto'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider mb-1 opacity-70">
                      {chat.role === 'user' ? 'Local Admin' : 'Dr. Evelyn, Nexora Advisory'}
                    </span>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {chat.role === 'assistant' ? formatTextSnippet(chat.text) : chat.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                    <Loader2 className="w-3.5 h-3.5" />
                    <span>Dr Evelyn is mapping administrative rules...</span>
                  </div>
                )}
              </div>
            ) : (
              // Single response output block for TAB 1 & TAB 2
              <div className="prose prose-sm h-full flex flex-col justify-between">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                    <Loader2 className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-semibold">Nexora NLP parsing parameters and querying Gemini model...</span>
                  </div>
                ) : result ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="text-xs">{formatTextSnippet(result)}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full max-w-sm mx-auto text-slate-400 p-6">
                    <Sparkles className="w-8 h-8 text-blue-500 mb-3" />
                    <span className="font-bold text-slate-700 text-sm">Awaiting Generation Query</span>
                    <p className="text-xs mt-1.5 leading-relaxed text-slate-500">
                      Select variables or input custom fields in the workspace left pane and click Generate to see the actual live response from Google Gemini AI.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
