import React from 'react';

interface BiasGameContainerProps {
  levelId: string;
}

import { biasCardLevels } from '@/lib/data/biascarddata';

export default function BiasGameContainer({ levelId }: BiasGameContainerProps) {
  const levelData = biasCardLevels.find(l => l.levelNumber === parseInt(levelId));
  if (!levelData) return <div className="p-10 text-center font-bold text-red-500">Level {levelId} not found</div>;
  return (
    <div className="antialiased selection:bg-brand-rose selection:text-white">
      { /* Dynamic Level display */ }
      <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold z-50">
        Level ID: {levelId}
      </div>
      
{/* BEGIN: SiteNavigationHeader */}
<header className="w-full bg-white/90 backdrop-blur-md border-b border-brand-lavender-border sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
{/* Left side: Navigation & Identity */}
<div className="flex items-center gap-3">
<a className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" href="#map">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          Back to Map
        </a>
<div className="flex items-center gap-1 text-sm font-black text-brand-rose tracking-tight pl-1">
<span className="text-brand-coral">✦</span>
<span className="">Spark School</span>
</div>
<div className="hidden sm:flex items-center text-xs font-medium text-slate-400 pl-1 border-l border-slate-200">
<span className="pl-2">Lab Node #05: Bias Detective</span>
</div>
</div>
{/* Center: Current Level Pill Badge */}
<div className="flex-shrink-0">
<div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#FF5072] to-[#FF6B6B] text-white shadow-pill-glow text-xs sm:text-sm font-black tracking-wide uppercase">
<span className="">LEVEL 5 OF 5: BEAT THE BIAS</span>
<span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
</div>
</div>
{/* Right side: Game State & Controls */}
<div className="flex items-center gap-3">
<button className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
<svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          Glitch Codex
        </button>
<div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-black shadow-sm">
<span className="">★</span>
<span className="">{levelData.xp} XP</span>
</div>
<button aria-label="Settings and audio" className="w-8 h-8 rounded-full bg-rose-50 text-brand-rose flex items-center justify-center hover:bg-rose-100 transition-colors">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
<button aria-label="Exit Workbench" className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center hover:bg-slate-200 transition-colors">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</button>
</div>
</div>
</header>
{/* END: SiteNavigationHeader */}
{/* BEGIN: MainWorkbenchContent */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-6">
{/* BEGIN: SubheaderRibbon */}
{/* Status & Mode Pill Bar */}
<div className="bg-white/80 border border-brand-lavender-border rounded-2xl px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-card">
<div className="flex items-center gap-3">
<span className="w-3.5 h-3.5 rounded-full bg-brand-rose ring-4 ring-rose-100 inline-block"></span>
<span className="text-xs sm:text-sm font-black tracking-wider text-slate-800 uppercase">AI BIAS INVESTIGATION LAB</span>
<span className="text-slate-300">•</span>
<span className="text-xs sm:text-sm font-semibold text-slate-500">Mode: Algorithmic Fairness &amp; Training Data</span>
</div>
<div className="flex items-center gap-3 text-xs font-bold">
<div className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full flex items-center gap-1.5">
<span className="">⚡</span>
<span className="">NEURAL AUDIT: ACTIVE</span>
</div>
<div className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">
          RANK: SENIOR DETECTIVE
        </div>
</div>
</div>
{/* END: SubheaderRibbon */}
{/* BEGIN: MissionBanner */}
{/* Core Case Prompt Banner */}
<section className="bg-white border border-brand-lavender-border rounded-3xl p-6 sm:p-7 shadow-card relative overflow-hidden">
{/* Decorative background blur orb */}
<div className="absolute -right-16 -top-16 w-52 h-52 bg-rose-100/50 rounded-full blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-brand-rose border border-rose-200 text-xs font-black uppercase tracking-wider mb-2.5">
<span className="">🛡️ CASE #{levelData.id}</span>
<span className="">•</span>
<span className="">DIFFICULTY: {levelData.difficulty}</span>
</div>
<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {levelData.title}
          </h1>
<p className="text-sm sm:text-base text-slate-500 mt-1.5">
            Inspect the three candidates below. Notice who the AI picked, and find the latent training bias!
          </p>
</div>
<div className="flex-shrink-0 flex items-center gap-2 self-start md:self-center">
<span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
<span className="">👁️</span> Model Inference Ready
          </span>
</div>
</div>
</section>
{/* END: MissionBanner */}
{/* BEGIN: CandidatesCardGrid */}
{/* 3-Column Image Candidates Section */}
<section aria-label="Candidate Dog Options" className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {Object.values(levelData.candidates).map((candidate, index) => {
    const isAiSelected = candidate.id === levelData.aiSelected;
    const isCorrectAnswer = candidate.id === levelData.correctAnswer;
    
    // We determine the container styles exactly based on the static mockups
    let articleClass = "bg-white border border-brand-lavender-border rounded-3xl p-5 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group";
    let imageContainerClass = "w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-amber-50/40 to-slate-50 border-2 border-dashed border-slate-200 my-4 group-hover:border-slate-300 transition-colors overflow-hidden p-0";
    let buttonClass = "w-full mt-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2";
    let titleClass = "text-xs font-black text-slate-400 tracking-wider uppercase";
    let badgeContainerClass = "bg-slate-50 border border-slate-100 rounded-xl p-2 flex flex-col justify-center";
    
    if (isAiSelected) {
      articleClass = "bg-white border-2 border-purple-200 rounded-3xl p-5 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between relative overflow-hidden group";
      imageContainerClass = "w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-purple-50 to-pink-50/60 border-2 border-dashed border-purple-200 my-4 group-hover:border-purple-300 transition-colors overflow-hidden p-0";
      buttonClass = "w-full mt-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-purple-300 bg-slate-50 hover:bg-purple-50/50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2";
      titleClass = "text-xs font-black text-purple-600 tracking-wider uppercase";
      badgeContainerClass = "bg-slate-50 border border-slate-100 rounded-xl p-2 flex flex-col justify-center";
    } else if (isCorrectAnswer) {
      articleClass = "bg-white border-2 border-brand-rose ring-4 ring-rose-100/70 rounded-3xl p-5 shadow-elevated flex flex-col justify-between relative overflow-hidden";
      imageContainerClass = "w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-rose-50/60 to-purple-50/40 border-2 border-dashed border-rose-300 my-4 overflow-hidden p-0";
      buttonClass = "w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-rose to-brand-coral text-white text-xs font-black shadow-pill-glow transition-all flex items-center justify-center gap-2";
      titleClass = "text-xs font-black text-brand-rose tracking-wider uppercase";
      badgeContainerClass = "bg-rose-50/50 border border-rose-100 rounded-xl p-2 flex flex-col justify-center";
    }

    return (
      <article className={articleClass} key={candidate.id}>
        {isAiSelected && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-black tracking-wide shadow-md ring-2 ring-purple-300/60">
              <span className="">🤖 AI CHOSE THIS!</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{levelData.aiConfidence}% Conf</span>
            </span>
          </div>
        )}
        
        {isCorrectAnswer && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-brand-rose to-brand-coral text-white text-[11px] font-black tracking-wide shadow-pill-glow">
              <span className="">⭐ YOUR CHOICE</span>
            </span>
          </div>
        )}

        <div>
          <div>
            <div className="flex items-center gap-2">
              <span className={titleClass}>Candidate {candidate.id}</span>
              {isCorrectAnswer && (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">Objective Best Fit</span>
              )}
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight pr-12">{candidate.name}</h2>
          </div>
          
          <div className={imageContainerClass}>
            <img src={candidate.imageUrl} alt={candidate.name} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1 pb-3">
            {candidate.stats.map((stat, sIdx) => (
              <div key={sIdx} className={badgeContainerClass}>
                <p className="text-[10px] uppercase font-bold text-slate-400">{stat.label}</p>
                <p className="text-xs font-black text-slate-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {isCorrectAnswer ? (
          <button className={buttonClass} type="button">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            Selected by You
          </button>
        ) : (
          <button className={buttonClass} type="button">
            <span className="w-3.5 h-3.5 rounded-full border border-slate-300"></span>
            Select Candidate {candidate.id}
          </button>
        )}
      </article>
    );
  })}
</section>
{/* END: CandidatesCardGrid */}
{/* BEGIN: InvestigationAndTelemetrySection */}
{/* Two Column Analysis Section (7 cols left : 5 cols right) */}
<div className="w-full bg-white border border-brand-lavender-border rounded-3xl p-6 sm:p-8 shadow-card"><div className="flex items-center justify-between gap-2 mb-4"><div className="flex items-center gap-2"><span className="text-base">🕵️</span><h2 className="text-xs font-black tracking-wider text-slate-800 uppercase">YOUR INVESTIGATION NOTES • WHY DID YOU CHOOSE THIS CANDIDATE?</h2></div><span className="text-[11px] font-bold text-slate-400">142 / 400 chars</span></div><div className="relative"><textarea className="w-full rounded-2xl border-slate-200 bg-slate-50/50 p-5 text-sm sm:text-base font-medium text-slate-800 focus:border-brand-rose focus:ring-brand-rose transition-all leading-relaxed shadow-inner resize-none min-h-[170px]" placeholder="Explain the specific evidence leading to your candidate verdict..." rows={6}>Bruno has certified perimeter patrol training and 36 months of official campus security experience, whereas Pip is just viral on social media.{""}</textarea></div><div className="mt-4 flex items-center justify-between text-xs text-slate-500"><div className="flex items-center gap-1.5 text-emerald-600 font-semibold"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"></path></svg><span className="">Detective rationale verified with factual candidate attributes</span></div><span className="text-[11px] font-bold text-slate-400">Auto-saved</span></div></div><section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch pt-2"><div className="space-y-6 w-full flex flex-col"><div className="bg-white border border-brand-lavender-border rounded-3xl p-6 sm:p-8 shadow-card flex-1 flex flex-col justify-between"><div className="mb-6"><div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-purple-700 tracking-wider mb-1.5"><span className="">🔍</span><span className="">Root Cause Diagnosis</span></div><h2 className="text-base sm:text-lg font-extrabold text-slate-900">INVESTIGATE THE AI: Why did the AI model select Option A?</h2><p className="text-xs sm:text-sm text-slate-500 mt-1.5">Select the underlying dataset flaw that warped the vision classifier:</p></div><div aria-label="AI Error Diagnosis" className="space-y-4" role="radiogroup">
  {levelData.investigationOptions.map((option) => (
    <label className="block cursor-pointer" key={option.id}>
      {option.isCorrect ? (
        <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 transition-all flex items-start gap-3.5 shadow-sm">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✓</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-900 uppercase">{option.title}</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">Correct Diagnosis!</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 leading-relaxed">{option.description}</p>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all flex items-start gap-3.5">
          <span className="w-5 h-5 rounded-full border border-slate-300 flex-shrink-0 mt-0.5"></span>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 block">{option.title}</span>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{option.description}</p>
          </div>
        </div>
      )}
    </label>
  ))}
</div></div></div><aside aria-label="Detective Learning Insight" className="bg-gradient-to-br from-amber-50 via-white to-pink-50 border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between relative overflow-hidden ring-4 ring-amber-100/50"><div className="absolute -right-12 -top-12 w-44 h-44 bg-rose-100/60 rounded-full blur-3xl pointer-events-none"></div><div className="relative z-10"><div className="flex items-center justify-between gap-2 flex-wrap mb-3"><div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-black tracking-wide uppercase"><span className="">💡</span><span className="">Detective Cognitive Insight</span></div><span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-rose to-brand-coral text-white text-[11px] font-black shadow-sm tracking-wide">+50 XP CONCEPT UNLOCKED</span></div><h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">The Popularity ≠ Capability Bias Trap</h3><div className="space-y-3.5 mb-5"><div className="bg-white/80 border border-slate-100 rounded-2xl p-3.5 shadow-sm"><div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-brand-rose"></span><h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">1. The Data Mirage</h4></div><p className="text-xs text-slate-600 leading-relaxed">AI doesn't know what a 'guard dog' actually is; it only learns statistical patterns. If millions of internet videos tag Pomeranians as 'The Greatest Dog Ever', the model associates that tag with all positive traits.</p></div><div className="bg-white/80 border border-slate-100 rounded-2xl p-3.5 shadow-sm"><div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-purple-600"></span><h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">2. Real-World Impact</h4></div><p className="text-xs text-slate-600 leading-relaxed">In the wild, algorithmic training skew can bias automated resume filters, loan approvals, or facial recognition when uncurated data replaces objective qualifications.</p></div></div><div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-xs font-medium text-amber-900 leading-relaxed shadow-sm relative"><span className="text-amber-500 font-bold block mb-1 uppercase tracking-wider text-[10px]">★ Core Principle</span><p className="italic font-semibold">"Garbage In, Garbage Out — A machine vision model is only as fair and objective as the data curated to train it."</p></div></div><div className="mt-5 pt-4 border-t border-amber-200/60 relative z-10 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-1.5"><span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">Data Provenance</span><span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">Selection Bias</span><span className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">Algorithmic Fairness</span></div><div className="flex items-center gap-2"><button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-sm" type="button"><span className="">🎧</span><span className="">Listen (0:45)</span></button><button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-brand-rose border border-rose-200 text-xs font-black transition-all shadow-sm" type="button"><span className="">✦</span><span className="">Pin to Codex</span></button></div></div></aside><div className="mt-4 flex justify-end lg:col-span-2"><button className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform active:scale-95"><span className="">Next Mission</span><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path></svg></button></div></section>
{/* END: InvestigationAndTelemetrySection */}
{/* BEGIN: ProgressionCurriculumCard */}
{/* Level Milestone Status Tracker */}
<section className="bg-white border border-brand-lavender-border rounded-2xl p-4 sm:p-5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center border border-purple-200">05</span>
<div>
<h2 className="text-xs sm:text-sm font-black text-slate-800">
            Curriculum Track: Bias &amp; Algorithmic Fairness Masterclass
          </h2>
<p className="text-[11px] text-slate-400 mt-0.5">
            Level 1: Specifics • Level 2: Personas • Level 3: Constraints • Level 4: Hallucination • <strong className="text-slate-700">Level 5: Beat the Bias</strong>
</p>
</div>
</div>
<div className="flex-shrink-0">
<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-black">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          5/5 Boss Stage Completed
        </span>
</div>
</section>
{/* END: ProgressionCurriculumCard */}
</main>
{/* END: MainWorkbenchContent */}
{/* BEGIN: SiteFooter */}
<footer className="mt-8 border-t border-brand-lavender-border bg-white/70 py-6">
<div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
<div className="flex items-center gap-2">
<span className="font-black text-brand-rose">✦ Spark School</span>
<span className="">© 2025 Spark School Educational Systems. All rights reserved.</span>
</div>
<nav aria-label="Footer Legal and Help Links" className="flex items-center gap-6">
<a className="hover:text-slate-900 transition-colors" href="#safety">Safety Center</a>
<a className="hover:text-slate-900 transition-colors" href="#curriculum">Curriculum Guide</a>
<a className="hover:text-slate-900 transition-colors" href="#privacy">Student Privacy</a>
</nav>
</div>
</footer>
{/* END: SiteFooter */}



    </div>
  );
}
