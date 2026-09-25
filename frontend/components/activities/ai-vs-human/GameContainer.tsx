"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { QuestionData } from "@/lib/data/aivsHuman";
import FeedbackModal from "./FeedbackModal";

interface GameContainerProps {
  levelData: QuestionData;
}

export default function GameContainer({
  levelData,
}: GameContainerProps) {
  const router = useRouter();
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [xp, setXp] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Cleanly reset state if level changes
  useEffect(() => {
    setHasAnswered(false);
    setIsCorrect(false);
    setSelectedAnswer("");
    setZoomLevel(100);

    // XP persistence logic
    if (levelData.id === 1) {
      localStorage.setItem("aiVsHumanXP", "0");
      setXp(0);
    } else {
      const savedXp = localStorage.getItem("aiVsHumanXP");
      setXp(savedXp ? parseInt(savedXp, 10) : 0);
    }
  }, [levelData.id]);

  const handleGuess = (guess: string) => {
    if (hasAnswered) return;
    const correct = guess.toLowerCase() === levelData.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setSelectedAnswer(guess);
    setHasAnswered(true);
    if (correct) {
      setXp((prev) => {
        const newXp = prev + 10;
        localStorage.setItem("aiVsHumanXP", newXp.toString());
        return newXp;
      });
    }
  };

  const handleNext = () => {
    if (levelData.id < 15) {
      router.push(`/activities/ai-vs-human/${levelData.id + 1}`);
    } else {
      router.push("/activity-list");
    }
  };

  const handlePrevious = () => {
    if (levelData.id > 1) {
      router.push(`/activities/ai-vs-human/${levelData.id - 1}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-surface font-body-md text-body-md text-on-surface bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed/40 via-surface to-tertiary-fixed/30 antialiased flex flex-col justify-between">
      {/* Top Rich Gamified Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)]">
        <div className="h-20 w-full px-margin-mobile lg:px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-md">
            <button className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container-high rounded-full shadow-[0_2px_8px_rgba(132,134,232,0.12)] text-tertiary hover:text-on-surface transition-all font-label-md text-label-md" type="button" onClick={() => router.push("/activity-list")}>
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="">Back to Map</span>
            </button>
          </div>
          
          {/* Center: Activity Identifier & Level Pill Banner */}
          <div className="flex items-center gap-space-sm bg-surface-container-lowest/90 px-space-md py-space-xs rounded-full shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08)]">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface">Level {levelData.id}: Mystery Canvas</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Activity 01 · AI vs Human?</span>
            </div>
          </div>
          
          {/* Right: Gamification Badges, 10-Pip Progress, Avatar, and Quit Button */}
          <div className="flex items-center gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-secondary-fixed text-on-secondary-fixed rounded-full shadow-[0_2px_8px_rgba(255,183,3,0.2)]">
              <span className="material-symbols-outlined text-[18px]">stars</span>
              <span className="font-label-lg text-label-lg font-bold">+{xp} XP</span>
            </div>
            
            {/* 15-pip progress indicator mapped to levelData.id */}
            <div className="hidden md:flex items-center gap-1 bg-surface-container-low px-space-md py-space-sm rounded-full">
              {[...Array(15)].map((_, i) => (
                <div key={i} className={`w-2.5 h-4 rounded-full ${i < levelData.id ? 'bg-gradient-to-t from-primary to-secondary-container shadow-[0_0_8px_rgba(182,14,61,0.4)]' : 'bg-surface-variant'}`}></div>
              ))}
            </div>
            
            <div className="relative flex items-center pl-space-xs pr-4">
              <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary ring-2 ring-primary-fixed-dim shadow-[0_2px_6px_0_rgba(255,77,109,0.2)] font-bold text-label-md">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <span className="absolute bottom-0 right-3 w-3 h-3 bg-secondary-container rounded-full border-2 border-surface-container-lowest"></span>
            </div>
            
            {/* NEW BUTTON PLACEMENT (QUIT) */}
            <button 
              type="button"
              onClick={() => router.push("/activity-list")}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high hover:bg-error-container text-on-surface hover:text-on-error-container transition-all"
              title="Quit Activity"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Gameplay Center Area */}
      <main className="w-full pt-28 pb-10 flex-1 flex flex-col items-center justify-center px-margin-mobile lg:px-margin relative">
        <style>{`
          @keyframes floatUpAndFade {
            0% { transform: translate(-50%, -50%) translateY(0); opacity: 0; scale: 0.5; }
            15% { opacity: 1; scale: 1.2; }
            100% { transform: translate(-50%, -50%) translateY(-100px); opacity: 0; scale: 1; }
          }
          .animate-float-xp {
            animation: floatUpAndFade 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        `}</style>
        
        {/* Floating XP Animation */}
        {hasAnswered && isCorrect && (
          <div
            key={`xp-anim-${levelData.id}`}
            className="fixed top-1/2 left-1/2 pointer-events-none z-[100] font-headline-xl text-[64px] font-extrabold text-[#FFB703] drop-shadow-[0_0_20px_rgba(255,183,3,1)] animate-float-xp"
          >
            +10 XP
          </div>
        )}

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* Atmospheric Ambient Glows behind canvas */}
          <div className="absolute top-24 left-1/4 w-96 h-96 bg-primary-fixed/35 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-secondary-fixed/45 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-16 left-1/3 w-[30rem] h-[30rem] bg-tertiary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
          
          {/* Top Detective Game HUD Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-space-sm mb-4 bg-surface-container-lowest/80 backdrop-blur-md px-space-lg py-space-sm rounded-full shadow-[0_2px_12px_-2px_rgba(132,134,232,0.1)] border border-surface-container-high/60">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[17px]">psychology</span>
                🕵️ Spark Detective Mode: In-Flight Inspection
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                🔥 3x Streak Bonus
              </span>
            </div>
            <div className="flex items-center gap-space-md">
              {/* Question Progress Tracker */}
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant font-semibold">Question <strong className="text-primary">{levelData.id}</strong> of 15</span>
                <div className="w-20 h-2 rounded-full bg-surface-container-high overflow-hidden flex">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary-container" style={{ width: `${(levelData.id / 15) * 100}%` }}></div>
                </div>
              </div>
              <div className="h-4 w-px bg-outline-variant/60 hidden md:block"></div>
              <div className="hidden md:flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="">Target:</span>
                <span className="font-bold text-primary">85%+</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[15px] text-tertiary">timer</span>
                <span className="font-bold font-mono">00:45 sprint</span>
              </div>
            </div>
          </div>
          
          {/* Hook Title */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-primary text-[28px] animate-pulse">auto_awesome</span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">AI vs Human?</h1>
              <span className="material-symbols-outlined text-secondary text-[26px]">palette</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Can you tell who made this artwork? Look closely at the strokes, texture &amp; details! 👀
            </p>
          </div>
          
          {/* DYNAMIC EMPTY IMAGE SHOWCASE FRAME / DROPZONE & VIEWPORT CONTAINER */}
          <div className="relative w-full bg-surface-container-lowest rounded-xl p-3 shadow-[0_16px_38px_-6px_rgba(74,64,88,0.12),0_4px_20px_0_rgba(255,77,109,0.08)] border border-surface-container-high/80 transition-all group" id="canvas-container" style={{ aspectRatio: '1 / 1', maxWidth: '520px' }}>
            {/* Inner Viewport Frame with HUD Matrix */}
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#1a1426] via-[#241a35] to-[#120d1c] shadow-inner flex items-center justify-center" id="viewport-stage">
              {/* Subtle Optical Grid Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ecddfb_1px,transparent_1px)] [background-size:24px_24px]"></div>
              {/* Optical Lens Crosshair Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                <div className="w-full h-px bg-surface-variant/40"></div>
                <div className="h-full w-px bg-surface-variant/40 absolute"></div>
                <div className="w-48 h-48 rounded-full border border-surface-variant/30 absolute"></div>
                <div className="w-80 h-80 rounded-full border border-dashed border-surface-variant/20 absolute"></div>
              </div>
              {/* Corner Bracket HUD Accents (Viewfinder framing) */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-secondary-container/80 rounded-tl-md pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-secondary-container/80 rounded-tr-md pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-secondary-container/80 rounded-bl-md pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-secondary-container/80 rounded-br-md pointer-events-none"></div>
              
              {/* Top HUD Bar inside Frame: Status & Aperture */}
              <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none px-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-on-surface/60 backdrop-blur-md border border-white/10 text-white font-label-sm text-label-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="font-bold tracking-wide uppercase text-[11px]">Viewfinder Active · RAW 4K</span>
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-surface/60 backdrop-blur-md border border-white/10 text-surface-container font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[15px] text-secondary-container">camera</span>
                    <span className="font-mono text-[11px]">f/1.8 · ISO 100 · 1/250s</span>
                  </div>
                  {/* Zoom Controls (+ / -) */}
                  <div className="flex items-center bg-on-surface/70 backdrop-blur-md rounded-full border border-white/10 p-0.5 shadow-md">
                    <button className="w-7 h-7 rounded-full text-white hover:bg-white/20 flex items-center justify-center transition-all" id="zoom-out-btn" title="Zoom Out" type="button" onClick={() => setZoomLevel(prev => Math.max(50, prev - 25))}>
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="text-[11px] font-mono text-white/90 px-1.5" id="zoom-level">{zoomLevel}%</span>
                    <button className="w-7 h-7 rounded-full text-white hover:bg-white/20 flex items-center justify-center transition-all" id="zoom-in-btn" title="Zoom In" type="button" onClick={() => setZoomLevel(prev => Math.min(300, prev + 25))}>
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Dynamic Target Artwork */}
              <img alt="Active Inspection Artwork Canvas" className="w-full h-full object-cover z-10" id="dynamic-artwork-img" src={levelData.imageSrc} style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.2s ease-in-out' }} />

              {/* JUNK BUTTONS PURGED HERE as per instructions */}
            </div>
          </div>
          
          {/* Action Area: High-Impact Tactile Answer Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-5">
            {/* Button 1: AI (Futuristic Tech Indigo/Cyan) */}
            <button className={`group relative h-20 px-space-lg rounded-3xl bg-tertiary text-on-tertiary shadow-[0_12px_24px_-4px_rgba(79,81,175,0.35)] flex items-center justify-center gap-4 transition-all focus:outline-none focus:ring-4 focus:ring-tertiary-fixed border-2 border-tertiary-fixed/30 ${
              hasAnswered 
                ? (isCorrect && selectedAnswer.toLowerCase() === "ai generated" 
                    ? "opacity-100 ring-4 ring-secondary-container" 
                    : (!isCorrect && selectedAnswer.toLowerCase() === "ai generated" ? "ring-4 ring-primary-fixed" : "opacity-75 cursor-not-allowed"))
                : "hover:bg-tertiary-container hover:scale-[1.02] active:scale-[0.98]"
            }`} id="btn-ai" type="button" onClick={() => handleGuess("AI Generated")} disabled={hasAnswered}>
              <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest/20 flex items-center justify-center group-hover:rotate-6 transition-transform shadow-inner border border-white/20">
                <span className="material-symbols-outlined text-[28px] text-on-tertiary">smart_toy</span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm font-bold tracking-tight">AI Generated<br/></span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono tracking-wider uppercase font-bold">Bot / CPU</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary-fixed-dim font-medium">Artificial Intelligence / Synthetic Generation</span>
              </div>
            </button>
            
            {/* Button 2: Human (Warm Vibrant Coral-Pink & Golden Organic Craft) */}
            <button className={`group relative h-20 px-space-lg rounded-3xl bg-primary text-on-primary shadow-[0_12px_24px_-4px_rgba(182,14,61,0.35)] flex items-center justify-center gap-4 transition-all focus:outline-none focus:ring-4 focus:ring-primary-fixed border-2 border-primary-fixed/30 ${
              hasAnswered 
                ? (isCorrect && selectedAnswer.toLowerCase() === "original" 
                    ? "opacity-100 ring-4 ring-secondary-container" 
                    : (!isCorrect && selectedAnswer.toLowerCase() === "original" ? "ring-4 ring-primary-fixed" : "opacity-75 cursor-not-allowed"))
                : "hover:bg-primary-container hover:scale-[1.02] active:scale-[0.98] ring-4 ring-secondary-container"
            }`} id="btn-human" type="button" onClick={() => handleGuess("Original")} disabled={hasAnswered}>
              <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest/20 flex items-center justify-center group-hover:-rotate-6 transition-transform shadow-inner border border-white/20">
                <span className="material-symbols-outlined text-[28px] text-on-primary">draw</span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm font-bold tracking-tight">ORIGINAL<br/></span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono tracking-wider uppercase font-bold">Artist</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary-fixed-dim font-medium">Human Artist / Real Paintbrush &amp; Soul</span>
              </div>
            </button>
          </div>

          {/* Interactive Feedback & Detective Clue Drawer Dock */}
          {hasAnswered && (
            <div className="w-full mt-4 flex flex-col gap-3">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <FeedbackModal 
                  isCorrect={isCorrect}
                  explanation={levelData.Explanation}
                  takeaway={levelData.Takeaway}
                  onNext={handleNext}
                  onPrevious={levelData.id > 1 ? handlePrevious : undefined}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="w-full bg-surface-container-lowest/80 backdrop-blur-md border-t border-surface-container-high/60 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="h-14 w-full px-margin-mobile lg:px-margin flex items-center justify-between text-on-surface-variant">
          <div className="flex items-center gap-space-md font-label-md text-label-md">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
              <span className="font-semibold text-on-surface">AI Detective Engine: Ready for Inference</span>
            </div>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <div className="hidden sm:flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px] text-tertiary">cloud_done</span>
              <span className="">Autosaved</span>
            </div>
          </div>
          <div className="flex items-center gap-space-lg font-label-md text-label-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">volume_up</span>
              <span className="hidden md:inline">Sound Effects: On</span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span className="hidden md:inline">Spark School Classroom 4B</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
