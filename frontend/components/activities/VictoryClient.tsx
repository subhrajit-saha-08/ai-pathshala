"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function VictoryClient() {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 max-w-2xl w-full flex flex-col items-center justify-center p-8 bg-surface-container-lowest/80 backdrop-blur-2xl rounded-3xl border border-outline-variant shadow-2xl">
      <div className="w-32 h-32 mb-8 bg-gradient-to-br from-secondary-container to-secondary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,184,0,0.4)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-on-secondary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
        </svg>
      </div>
      
      <h1 className="text-display-hero text-on-surface text-center mb-4 tracking-tight">
        Module Complete!
      </h1>
      
      <p className="text-body-lg text-on-surface-variant text-center mb-10 max-w-lg">
        Incredible job, Spark Explorer! You've successfully trained the AI and mastered all the challenges in this module.
      </p>
      
      <div className="flex items-center justify-center gap-6 mb-12">
        <div className="flex flex-col items-center bg-surface px-8 py-4 rounded-2xl border border-outline-variant">
          <span className="text-label-md text-on-surface-variant mb-1 uppercase tracking-widest">XP Earned</span>
          <span className="text-display-hero-mobile text-primary font-extrabold">+150 XP</span>
        </div>
        <div className="flex flex-col items-center bg-surface px-8 py-4 rounded-2xl border border-outline-variant">
          <span className="text-label-md text-on-surface-variant mb-1 uppercase tracking-widest">Levels</span>
          <span className="text-display-hero-mobile text-secondary font-extrabold">15/15</span>
        </div>
      </div>
      
      <Link href="/dashboard" className="w-full sm:w-auto px-12 py-5 bg-primary text-on-primary rounded-full text-label-lg uppercase tracking-wider hover:bg-primary-container transition-all hover:scale-105 active:scale-95 text-center shadow-xl shadow-primary/30">
        Return to Dashboard
      </Link>
    </div>
  );
}
