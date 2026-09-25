'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export interface PromptLevel {
  id: number;
  level_title: string;
  mission_text: string;
  hint_image_url?: string;
  constraints?: any;
  learning_point_title?: string;
  learning_point_desc?: string;
  ideal_prompt?: string;
}

interface PromptChallengeMasterViewProps {
  levelData: PromptLevel;
}

export default function PromptChallengeMasterView({ levelData }: PromptChallengeMasterViewProps) {
  const router = useRouter();
  const [userPrompt, setUserPrompt] = useState('A golden retriever with majestic sapphire dragonfly wings who zooms across the deep blue Ocean to rescue stranded seagulls in storms.');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [constraintsMet, setConstraintsMet] = useState<any[]>([]);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [earnedXP, setEarnedXP] = useState<number | null>(null);
  const [levelFailed, setLevelFailed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [beltIndex, setBeltIndex] = useState(-1);
  const [newBeltUnlocked, setNewBeltUnlocked] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const belts = ['White', 'Orange', 'Yellow', 'Green', 'Purple'];

  // Hydrate totalXP, streak, beltIndex from localStorage on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('spark_total_xp');
      if (saved) setTotalXP(Number(saved));
      const savedStreak = localStorage.getItem('spark_streak');
      if (savedStreak) setStreak(Number(savedStreak));
      const savedBelt = localStorage.getItem('spark_belt_index');
      if (savedBelt) setBeltIndex(Number(savedBelt));
    }
  }, []);

  const toggleDictation = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserPrompt(prev => prev.trim() ? prev + ' ' + transcript : transcript);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);

    recognition.start();
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { x: 0, y: 0 }, colors: ['#ff0044', '#ffcc00', '#00ccff', '#ffffff'] });
    confetti({ particleCount: 100, spread: 70, origin: { x: 1, y: 0 }, colors: ['#ff0044', '#ffcc00', '#00ccff', '#ffffff'] });
  };

  const handleAutofill = () => {
    if (!levelData.ideal_prompt || isTyping) return;
    setIsTyping(true);
    setUserPrompt('');
    const text = levelData.ideal_prompt;
    let i = 0;
    const interval = setInterval(() => {
      setUserPrompt((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
  };

  useEffect(() => {
    if (score > 0) {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setDisplayedScore(current);
        if (current >= score) {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    } else {
      setDisplayedScore(0);
    }
  }, [score]);

  const handleLaunchPrompt = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/challenge/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          challenge_id: levelData.id.toString(),
          user_prompt: userPrompt,
          constraints: levelData.constraints
        })
      });
      const data = await response.json();
      const newScore: number = data.score;
      setScore(newScore);
      setConstraintsMet(data.constraints_met || []);

      // XP calculation ruleset
      let calculatedXP = 0;
      if (newScore > 25 && newScore <= 50) calculatedXP = 10;
      else if (newScore <= 60) calculatedXP = 20;
      else if (newScore <= 70) calculatedXP = 30;
      else if (newScore <= 80) calculatedXP = 40;
      else if (newScore <= 100) calculatedXP = 50;

      if (calculatedXP > 0) {
        const newTotal = totalXP + calculatedXP;
        setTotalXP(newTotal);
        localStorage.setItem('spark_total_xp', String(newTotal));
        setEarnedXP(calculatedXP);
        setTimeout(() => setEarnedXP(null), 3000);
      } else if (newScore <= 25) {
        setLevelFailed(true);
      }

      // Belt / streak logic
      if (newScore >= 80) {
        const newStreak = streak + 1;
        if (newStreak >= 3) {
          const newBeltIdx = beltIndex < 4 ? beltIndex + 1 : beltIndex;
          setBeltIndex(newBeltIdx);
          setStreak(0);
          localStorage.setItem('spark_belt_index', String(newBeltIdx));
          localStorage.setItem('spark_streak', '0');
          setNewBeltUnlocked(belts[newBeltIdx]);
          triggerConfetti();
        } else {
          setStreak(newStreak);
          localStorage.setItem('spark_streak', String(newStreak));
        }
      } else {
        setStreak(0);
        localStorage.setItem('spark_streak', '0');
      }
    } catch (error) {
      console.error('Error evaluating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans text-slate-800 antialiased selection:bg-[#ff758f] selection:text-white pb-6 bg-[linear-gradient(135deg,#fdf6fb_0%,#f6f3ff_50%,#f0f4ff_100%)] min-h-screen">
      {/* BEGIN: MainContainer */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 pt-3 space-y-3.5">
        {/* BEGIN: TopNavigation */}
        <header className="flex items-center justify-between gap-4 py-1" data-purpose="top-navigation">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <a className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-semibold text-slate-700 border border-slate-200/80 shadow-sm hover:bg-slate-50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer" href="#map">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Map
            </a>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50/80 border border-rose-100 rounded-full text-xs font-bold text-rose-600">
              <svg className="w-3.5 h-3.5 fill-rose-500" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"></path>
              </svg>
              Spark School
            </div>
            <span className="text-xs font-medium text-slate-400">| Lab Node #04</span>
          </div>
          {/* Center Mission Pill */}
          <div>
            <div className="inline-flex items-center gap-2 px-7 py-2 bg-gradient-to-r from-[#ff3366] to-[#f43f5e] rounded-full text-white font-extrabold text-xs tracking-wider shadow-sm">
              <span>{`LEVEL ${levelData.id} OF 15: ${levelData.level_title.toUpperCase()}`}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
          </div>
          {/* Right Profile & Stats */}
          <div className="flex items-center gap-3">
            <a className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer" href="#codex">
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Glitch Codex
            </a>
            {/* XP Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fef3c7] border border-amber-200/80 rounded-full text-xs font-extrabold text-amber-800">
              <span className="text-amber-500 text-sm">★</span>
              {totalXP} XP
            </div>
            {/* Radar / Target Icon Button */}
            <button aria-label="Targeting Radar" className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer" type="button">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>
                <circle cx="12" cy="12" r="4" strokeWidth="2"></circle>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v3m0 12v3M3 12h3m12 0h3"></path>
              </svg>
            </button>
            {/* Close Button */}
            <button aria-label="Close" className="w-8 h-8 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-900 hover:bg-purple-100 text-xs font-bold transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer" type="button" onClick={() => router.push('/dashboard')}>
              ✕
            </button>
          </div>
        </header>
        {/* END: TopNavigation */}

        {/* BEGIN: HolographicStatusRibbon */}
        <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 border border-slate-200/70 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs" data-purpose="workbench-status-bar">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="font-extrabold tracking-wide text-slate-800 text-[11px] sm:text-xs">HOLOGRAPHIC AI LAB WORKBENCH</span>
            <span className="text-slate-300 font-bold">•</span>
            <span className="text-slate-600 font-medium">Mode: Natural Language Synthesis</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50/90 text-indigo-700 font-bold rounded-full border border-indigo-100 text-[11px]">
              <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"></path>
              </svg>
              NEURAL STABILITY: 98%
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-900 font-bold rounded-full border border-amber-200/80 text-[11px]">
              RANK: JUNIOR PROMPTEER
            </div>
          </div>
        </div>
        {/* END: HolographicStatusRibbon */}

        {/* BEGIN: MainThreeColumnGrid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start" data-purpose="lab-core-workspace">
          {/* ================= LEFT COLUMN ================= */}
          <section className="lg:col-span-4 xl:col-span-4 space-y-4" data-purpose="left-flight-parameters-and-checklist">
            {/* Flight Parameters Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(123,44,191,0.05),0_8px_10px_-6px_rgba(0,0,0,0.03)] border border-slate-100 space-y-3">
              {/* Tags */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-rose-50 text-rose-600 font-bold text-[10px] tracking-wider rounded-full border border-rose-100">
                  FLIGHT PARAMETERS
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold text-[10px] tracking-wider rounded-full border border-purple-100">
                  ☆ EASY LEVEL
                </span>
              </div>
              {/* Main Heading */}
              <div className="space-y-1.5">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {levelData.level_title}
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {levelData.mission_text}
                </p>
              </div>
              {/* Holographic Specimen Box */}
              <div 
                className="bg-[linear-gradient(180deg,#ede9fe_0%,#e0e7ff_50%,#cbd5e1_100%)] rounded-2xl p-6 h-36 relative flex flex-col items-center justify-center overflow-hidden border border-indigo-100/50 hover:opacity-90 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer"
                onClick={() => setShowHint(true)}
              >
                {showHint && levelData.hint_image_url ? (
                  <img src={levelData.hint_image_url} alt="Hint" className="absolute inset-0 w-full h-full object-cover rounded-[inherit]" />
                ) : (
                  <>
                    {/* Center Camera/Scan Reticle */}
                    <div className="w-10 h-10 border-2 border-indigo-300/80 rounded-xl flex items-center justify-center relative">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                      </svg>
                    </div>
                    {/* Target Spec Label Overlay */}
                    <div className="absolute bottom-2.5 px-3 py-1 bg-slate-900/60 backdrop-blur-md rounded-full text-white text-[11px] font-semibold tracking-wide">
                      Target Spec: Click to Reveal Hint
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Target Checklist Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(123,44,191,0.05),0_8px_10px_-6px_rgba(0,0,0,0.03)] border border-slate-100 space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                  <h2 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">TARGET CHECKLIST</h2>
                </div>
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full border border-indigo-100">
                  {constraintsMet.length} of {levelData.constraints?.length || 0} Cleared
                </span>
              </div>
              {/* Checklist Items */}
              <div className="space-y-2.5">
                {(levelData.constraints || []).map((constraint: string, idx: number) => {
                  const isMet = constraintsMet.includes(constraint);
                  return (
                    <div key={idx} className={`flex items-center justify-between p-2.5 rounded-2xl border ${isMet ? 'bg-slate-50/60 border-slate-100' : 'bg-amber-50/40 border-amber-100/80'}`}>
                      <div className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 ${isMet ? 'bg-emerald-500' : 'bg-amber-400 font-bold text-[10px]'}`}>
                          {isMet ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          ) : '•••'}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{constraint}</p>
                          <p className={`text-[10px] font-medium ${isMet ? 'text-slate-500' : 'text-amber-700'}`}>
                            {isMet ? 'Constraint fulfilled' : 'Awaiting input...'}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${isMet ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                        +10 XP
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Bottom Lab Tip Pod */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900 leading-snug">
                <span className="text-amber-500 text-sm mt-0.5">💡</span>
                <p className="text-[11px] font-medium text-amber-900">
                  <span className="font-bold">Lab Tip:</span> Break your concept into three parts: <span className="underline decoration-amber-400">Looks</span>, <span className="underline decoration-amber-400">Habitat</span>, and <span className="underline decoration-amber-400">Mission</span>!
                </p>
              </div>
            </div>
          </section>

          {/* ================= CENTER COLUMN ================= */}
          <section className="lg:col-span-5 xl:col-span-5" data-purpose="center-neural-prompt-synthesizer">
            <div className="bg-white rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(123,44,191,0.05),0_8px_10px_-6px_rgba(0,0,0,0.03)] border border-slate-100 space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-base font-extrabold text-slate-900">Neural Prompt Synthesizer</h2>
                      <span className="text-amber-400">✓</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      HOLOGRAM ENGINE ONLINE
                    </div>
                  </div>
                </div>
                {/* Clear Button */}
                <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer" type="button" onClick={() => setUserPrompt('')}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Clear
                </button>
              </div>

              {/* Detected Atoms Ribbon */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 tracking-wide uppercase mr-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                    </svg>
                    DETECTED ATOMS:
                  </div>
                  {/* Atom 1: Character */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded-full text-xs font-semibold">
                    <span>🐾</span>
                    <span>Character: <strong className="text-rose-900">Dog</strong></span>
                  </div>
                  {/* Atom 2: Feature */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full text-xs font-semibold">
                    <span>✈️</span>
                    <span>Feature: <strong className="text-indigo-900">Wings</strong></span>
                  </div>
                  {/* Atom 3: Location */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 border border-sky-200 text-sky-700 rounded-full text-xs font-semibold">
                    <span>🌊</span>
                    <span>Location: <strong className="text-sky-900">Ocean</strong></span>
                  </div>
                </div>
              </div>

              {/* Textarea Interactive Surface */}
              <div className="rounded-3xl border-2 border-indigo-100 bg-slate-50/50 p-4 relative focus-within:border-indigo-300 focus-within:bg-white transition-all shadow-inner">
                <label className="sr-only" htmlFor="prompt-input">Neural Prompt Synthesizer Input</label>
                <textarea 
                  className="w-full bg-transparent border-0 text-slate-800 text-sm font-medium leading-relaxed resize-none focus:ring-0 p-1 placeholder:text-slate-400" 
                  id="prompt-input" 
                  placeholder="Write your prompt here..." 
                  rows={6}
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                ></textarea>
                {/* Bottom Counter Toolbar */}
                <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px]">1</span>
                    <span>1 Sentence</span>
                    <span>•</span>
                    <span>{userPrompt.trim() ? userPrompt.trim().split(/\s+/).length : 0} Words</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400">
                    {userPrompt.length} / 500 chars
                  </div>
                </div>
              </div>

              {/* Trust & Engine Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500 pt-1">
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <svg className="w-4 h-4 fill-emerald-500 text-white" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM14.707 7.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                  </svg>
                  <span>Spark KidSafe Filter Active</span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-700">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Inference: Claude-3.5-Spark Lab</span>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button className={`flex-1 py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer ${isRecording ? 'bg-pink-100 border border-pink-400 text-pink-900 animate-pulse' : 'bg-purple-50 border border-purple-200/70 text-purple-900 hover:bg-purple-100'}`} type="button" onClick={toggleDictation}>
                  <svg className={`w-4 h-4 ${isRecording ? 'text-pink-600' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path>
                  </svg>
                  {isRecording ? 'Listening...' : 'Voice Dictation'}
                </button>
                <button className="flex-1 py-3 px-4 bg-gradient-to-r from-[#ff4d6d] to-[#ff3366] text-white rounded-full font-bold text-xs hover:brightness-105 shadow-[0_10px_25px_-3px_rgba(255,77,109,0.35)] transition-all flex items-center justify-center gap-2" type="button" onClick={handleLaunchPrompt} disabled={isLoading}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                  </svg>
                  {isLoading ? 'Evaluating...' : 'Launch Prompt 🚀'}
                </button>
              </div>
            </div>
          </section>

          {/* ================= RIGHT COLUMN ================= */}
          <section className="lg:col-span-3 xl:col-span-3 space-y-4" data-purpose="right-telemetry-and-actions">
            {/* AI Telemetry Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(123,44,191,0.05),0_8px_10px_-6px_rgba(0,0,0,0.03)] border border-slate-100 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l4-4m-4 4l-4-4"></path>
                  </svg>
                  <h2 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">AI TELEMETRY</h2>
                </div>
                {/* Star Rating (2 gold, 1 gray outline) */}
                <div className="flex items-center gap-0.5 text-sm">
                  <span className="text-amber-400">★</span>
                  <span className="text-amber-400">★</span>
                  <span className="text-slate-300">☆</span>
                </div>
              </div>
              {/* Circular Radial Progress Gauge */}
              <div className="flex flex-col items-center justify-center pt-1 pb-1">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#fee2e2" strokeWidth="9"></circle>
                    {/* Progress Arc (Dynamic) */}
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#f43f5e" strokeLinecap="round" strokeWidth="9" style={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 - (displayedScore / 100) * 251.2, transition: 'stroke-dashoffset 0.1s linear' }}></circle>
                  </svg>
                  {/* Inner Gauge Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">{displayedScore}</span>
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider mt-0.5">/ 100 SCORE</span>
                  </div>
                </div>
                {/* Reward pill */}
                <div className="mt-3 px-4 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-900 font-extrabold text-xs">
                  +{displayedScore} XP EARNED!
                </div>
              </div>
              {/* AI Critic Evaluation Bubble */}
              <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2">
                <div className="flex items-center gap-1.5 text-purple-900 font-extrabold text-[11px] uppercase tracking-wide">
                  <span>🤖</span>
                  <span>AI CRITIC EVALUATION</span>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "Outstanding prompt crafting! You vividly captured the flying dog and the Ocean setting. Satisfy the 3-sentence guideline to reach 100 points!"
                </p>
              </div>
            </div>

            {/* Educational Insight Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(123,44,191,0.05),0_8px_10px_-6px_rgba(0,0,0,0.03)] border border-slate-100 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                  💡
                </div>
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">EDUCATIONAL INSIGHT</span>
              </div>
              <h3 className="text-xs font-extrabold text-slate-900">
                {levelData.learning_point_title || "The Specifics Rule"}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                {levelData.learning_point_desc || "Specific details are the steering wheel of generative AI. Stating the animal type, wing physics, and exact mission prevents generic hallucinations!"}
              </p>
            </div>

            {/* Right Side Primary Action Buttons */}
            <div className="space-y-2.5">
              <button
                className={`w-full py-3 px-4 bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 ${isTyping ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                type="button"
                onClick={handleAutofill}
                disabled={isTyping}
              >
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
                {isTyping ? 'Typing...' : 'Autofill 3-Star Prompt'}
              </button>
              <button className="w-full py-3 px-4 bg-[#1b1429] hover:bg-[#251b38] text-white font-bold text-xs rounded-full shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer" type="button" onClick={() => router.push(`/activities/prompt-challenge/${Number(levelData.id) + 1}`)}>
                Next Mission →
              </button>
            </div>
          </section>
        </main>
        {/* END: MainThreeColumnGrid */}

        {/* BEGIN: CurriculumTrackFooterBar */}
        <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs" data-purpose="curriculum-track-banner">
          <div className="flex items-center gap-3">
            {/* Number Circle Badge */}
            <span className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-[11px] flex items-center justify-center">
              01
            </span>
            <div>
              <span className="font-bold text-slate-800">Curriculum Track: Prompt Engineering Masterclass</span>
              <p className="text-[11px] text-slate-500">
                Level 1: Specifics • Level 2: Personas • Level 3: Constraints • Level 4: Hallucination • Level 5: Beat the Bias
              </p>
            </div>
          </div>
          <div>
            <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-full text-xs">
              1/5 In Progress
            </span>
          </div>
        </div>
        {/* END: CurriculumTrackFooterBar */}

        {/* BEGIN: MainFooter */}
        <footer className="flex flex-wrap items-center justify-between pt-2 pb-2 text-[11px] text-slate-400 gap-4 border-t border-slate-200/40">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-rose-500 font-bold">★ Spark School</span>
            <span>© 2025 Spark School Educational Systems. All rights reserved.</span>
          </div>
          <nav className="flex items-center gap-5 text-slate-500 font-medium">
            <a className="hover:text-slate-800 transition-colors" href="#safety">Safety Center</a>
            <a className="hover:text-slate-800 transition-colors" href="#curriculum">Curriculum Guide</a>
            <a className="hover:text-slate-800 transition-colors" href="#privacy">Student Privacy</a>
          </nav>
        </footer>
        {/* END: MainFooter */}
      </div>
      {/* END: MainContainer */}

      {/* XP Earned Overlay */}
      {earnedXP !== null && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4 animate-bounce">
            <span className="text-7xl font-black text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.9)] select-none" style={{ textShadow: '0 0 40px rgba(250,204,21,0.8), 0 0 80px rgba(250,204,21,0.4)' }}>
              +{earnedXP} XP!
            </span>
            <span className="text-xl font-bold text-white bg-yellow-500/90 px-6 py-2 rounded-full shadow-lg">
              🏆 Prompt Mastered!
            </span>
          </div>
        </div>
      )}

      {/* Level Failed Overlay */}
      {levelFailed && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6">
            <span className="text-7xl font-black text-red-500 drop-shadow-xl animate-bounce select-none" style={{ textShadow: '0 0 30px rgba(239,68,68,0.8)' }}>
              LEVEL FAILED
            </span>
            <p className="text-white/80 text-lg font-semibold">Score too low — refine your prompt and try again!</p>
            <button
              className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-sm rounded-full shadow-lg hover:brightness-110 transition-all active:scale-95 cursor-pointer"
              onClick={() => {
                setLevelFailed(false);
                setScore(0);
                setConstraintsMet([]);
                setUserPrompt('');
              }}
            >
              Try Again 🔁
            </button>
          </div>
        </div>
      )}

      {/* Belt Unlock Modal */}
      {newBeltUnlocked && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center">
          <div className="relative bg-[linear-gradient(135deg,#1e1b4b,#312e81,#1e1b4b)] border border-indigo-400/40 rounded-3xl px-12 py-10 flex flex-col items-center gap-5 shadow-[0_0_60px_rgba(99,102,241,0.5)] max-w-md w-full mx-4" style={{ animation: 'zoomIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            {/* Glow ring */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-yellow-400/30 via-pink-500/20 to-indigo-500/30 blur-sm pointer-events-none" />
            <span className="text-6xl animate-bounce">🥋</span>
            <h2 className="text-4xl font-black text-center" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: 'none', filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.7))' }}>
              MASTER STREAK!
            </h2>
            <p className="text-xl font-extrabold text-white text-center">
              You&apos;ve earned the{' '}
              <span className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]">{newBeltUnlocked} Belt!</span>
            </p>
            <p className="text-indigo-300 text-sm font-medium text-center">3 consecutive high scores — absolute precision!</p>
            <button
              className="mt-2 px-10 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold text-sm rounded-full shadow-lg hover:brightness-110 transition-all active:scale-95 cursor-pointer"
              onClick={() => setNewBeltUnlocked(null)}
            >
              Continue 🚀
            </button>
          </div>
          <style>{`@keyframes zoomIn { from { opacity: 0; transform: scale(0.5) rotate(-3deg); } to { opacity: 1; transform: scale(1) rotate(0deg); } }`}</style>
        </div>
      )}
    </div>
  );
}
