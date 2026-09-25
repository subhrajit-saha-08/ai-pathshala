"use client";
import React, { useState } from 'react';
import Link from 'next/link';


export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <div className="bg-background font-body-md text-body-md text-on-background">
      <style dangerouslySetInnerHTML={{ __html: `@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}
@keyframes floatMascot {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(0.4deg);
  }
}
.mascot-idle {
  animation: floatMascot 4.5s ease-in-out infinite;
}
.mascot-tracking {
  animation: none !important;
}
` }} />
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(32,23,45,0.04)]"><div className="h-20 w-full px-margin-mobile md:px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-md shrink-0"><div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-sm"><span className="material-symbols-outlined text-[20px]">auto_awesome</span></div><div className="flex flex-col"><div className="flex items-center gap-space-xs"><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">AI Pathshala</span><span className="rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-space-sm py-0.5">+1M Learners</span></div><span className="hidden sm:inline font-body-sm text-body-sm text-on-surface-variant">Where curious young minds meet AI</span></div></div><div className="hidden lg:flex items-center bg-surface-container-lowest px-space-md py-1.5 rounded-full shadow-[0_1px_8px_rgba(32,23,45,0.06)]"><nav className="flex items-center gap-space-xs" data-active-classes="bg-rose-600 text-white font-label-md text-label-md rounded-full shadow-sm"><a className="px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="programs" href="#">Programs</a><a className="px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="interactive-labs" href="#">Interactive Labs</a><a className="px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="curriculum" href="#">Curriculum</a><a className="px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="parent-school-hub" href="#">Parent &amp; School Hub</a><a className="px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" data-path="why-ai-pathshala" href="#">Why AI Pathshala</a></nav></div><div className="flex items-center gap-space-sm shrink-0"><a className="hidden sm:inline-flex items-center justify-center px-space-md py-space-sm rounded-full bg-surface-container-high font-label-md text-label-md text-on-surface hover:bg-surface-container-highest transition-colors" data-path="sandbox" href="#">Explore Sandbox</a><a className="inline-flex items-center justify-center px-space-lg py-space-sm rounded-full bg-rose-600 font-label-md text-label-md text-white hover:bg-rose-700 shadow-sm transition-colors" data-path="signup" href="#">Get Started Free →</a><div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-white text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-background"><div className="flex flex-col w-full">
{/* Hero Section */}
<section className="relative w-full px-margin-mobile md:px-margin pt-space-lg pb-space-xl overflow-hidden">
{/* Ambient glowing chromatic orbs (contained) */}
<div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-rose-100 blur-3xl opacity-40 pointer-events-none -z-10"></div>
<div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-secondary-fixed blur-3xl opacity-35 pointer-events-none -z-10"></div>
<div className="absolute top-1/2 right-10 w-72 h-72 rounded-full bg-rose-100 blur-3xl opacity-30 pointer-events-none -z-10"></div>
<div className="max-w-7xl mx-auto flex flex-col items-center text-center">
{/* Trust Badge Pill */}
<div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(32,23,45,0.06)] mb-space-md">
<span className="text-secondary font-label-md">★</span>
<span className="font-label-md text-label-md text-on-surface">Rated 4.9/5 by 25,000+ Parents &amp; Educators Worldwide</span>
<span className="w-1.5 h-1.5 rounded-full bg-rose-600 ml-1"></span>
<span className="font-label-sm text-label-sm text-rose-600 uppercase tracking-wider">Kidsafe certified</span>
</div>
{/* Main Catchphrase Headline */}
<h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-6 tracking-tight max-w-4xl">
        Where Curious Minds Master the <span className="text-rose-600">Power of AI.</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-lg">
        An interactive, safe, and joyful playground teaching kids ages 6–16 prompt craft, neural logic, ethical thinking, and creative intelligence—without screen fatigue or fear.
      </p>
{/* Action Row */}
<div className="flex flex-wrap items-center justify-center gap-space-md mb-space-xl">
<Link className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-rose-600 text-white font-semibold text-base shadow-md hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 cursor-pointer" href="/profile">
<span>Start 14-Day Free Trial</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
<button className="inline-flex items-center gap-2 px-space-lg py-space-md rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-all" >
<span className="material-symbols-outlined text-rose-600 text-[20px]">play_circle</span>
<span>Watch 2-Min Demo</span>
</button>
</div>
{/* Trust Social Indicator */}
<div className="flex items-center gap-space-sm mb-space-xl">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-label-sm text-label-sm ring-2 ring-surface">EK</div>
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-label-sm text-label-sm ring-2 ring-surface">AP</div>
<div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-label-sm text-label-sm ring-2 ring-surface">ML</div>
<div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-label-sm text-label-sm ring-2 ring-surface">+1.2k</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant text-left">
<strong className="font-label-md text-on-surface">1,200+ partner schools</strong> and 250,000+ active student prompts synthesized this month
        </p>
</div>
{/* Hero Visual Showcase / Workbench Preview */}
<div className="w-full relative rounded-lg bg-surface-container-lowest shadow-xl p-space-sm md:p-space-md">
{/* Workbench Window Header Bar */}
<div className="flex items-center justify-between pb-space-sm px-space-sm">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-error"></span>
<span className="w-3 h-3 rounded-full bg-secondary-fixed-dim"></span>
<span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
<span className="ml-space-sm font-label-sm text-label-sm text-on-surface-variant">AI Studio Lab • Safe Sandbox v4.2</span>
</div>
<div className="flex items-center gap-space-sm">
<span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">shield</span> Safety Shield: 100%
            </span>
<span className="px-space-sm py-0.5 rounded-full bg-rose-100 text-rose-700 font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">bolt</span> 75 XP
            </span>
</div>
</div>
{/* Hero Feature Image Display */}
<div className="relative w-full rounded-md overflow-hidden bg-surface-container cursor-pointer select-none" id="hero-workbench-container" style={{perspective: '1200px'}} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
<div className="relative w-full h-full transition-[transform,filter] duration-300 ease-out will-change-transform" id="hero-mascot-wrapper" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.1s ease-out' }}>
<img alt="AI Pathshala Interactive Workbench" className="w-full h-auto object-contain rounded-md pointer-events-none" id="hero-mascot-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyUxfVSyzacwsx71_8MjXq6CBfx3SHNngbrvE7OvXG04LZ8oPCT6OtJfOnBvLjcH3_hwFmFA-rvwKvrkubvWKzbDHNki9vxhqCzz30M_f9CKjZXxq1fngeqs69yTrmeuei8EMGJQkBn3Q-JXS5JWWmWQjCRGZ00qTIV0Xd7Pl5SfK_frzHw_wqHXovZQWNJjoQ6wjPnJq7krRCkXBwLUrHqsLPtQQNkleKuJRQ0xT0hJi_isNqII25AuWH_d10MQuPVh4" style={{ imageRendering: 'auto' }} />
{/* Interactive Mascot Glow / Pulse Halo */}
<div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 bg-radial from-primary-fixed/25 via-transparent to-transparent mix-blend-screen" id="mascot-glow"></div>
</div>
{/* Interactive Hint Badge on Mascot Container */}
<div className="absolute top-4 left-4 z-20 pointer-events-none bg-surface-container-lowest/90 backdrop-blur-md rounded-full px-space-sm py-0.5 shadow-sm flex items-center gap-1 border border-rose-600-fixed/40">
<span className="material-symbols-outlined text-rose-600 text-[14px] animate-spin" style={{animationDuration: '4s'}}>pets</span>
<span className="font-label-sm text-label-sm text-on-surface">Interactive 3D Mascot • Move Cursor</span>
</div>
{/* Floating Interactive Pill Overlays inside the image frame */}
<div className="absolute bottom-4 left-4 z-20 bg-surface-container-lowest/90 backdrop-blur-md rounded-full px-space-md py-space-xs shadow-md flex items-center gap-space-xs" style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`, transition: 'transform 0.15s ease-out' }}>
<span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface">Live Mentor Active: Maya (Stanford AI Fellow)</span>
</div>
<div className="absolute top-4 right-4 z-20 bg-surface-container-lowest/90 backdrop-blur-md rounded-full px-space-md py-space-xs shadow-md flex items-center gap-space-xs" style={{ transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`, transition: 'transform 0.2s ease-out' }}>
<span className="material-symbols-outlined text-rose-600 text-[16px]">psychology</span>
<span className="font-label-sm text-label-sm text-on-surface">Neural Feedback: Zero Bias Detected</span>
</div>
</div>
</div>
</div>
</section>
{/* Credibility & Accreditations Ribbon */}
<section className="w-full bg-surface-container-low py-space-lg px-margin-mobile md:px-margin">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant shrink-0">
        Validated &amp; Certified By
      </span>
<div className="flex flex-wrap items-center justify-center md:justify-end gap-space-lg md:gap-space-xl">
<div className="flex items-center gap-space-xs text-on-surface font-headline-sm text-headline-sm">
<span className="material-symbols-outlined text-rose-600 text-[24px]">school</span>
<span>Stanford d.school</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface font-headline-sm text-headline-sm">
<span className="material-symbols-outlined text-tertiary text-[24px]">verified</span>
<span>STEM.org Accredited</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface font-headline-sm text-headline-sm">
<span className="material-symbols-outlined text-secondary text-[24px]">security</span>
<span>KidSafe COPPA Certified</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface font-headline-sm text-headline-sm">
<span className="material-symbols-outlined text-rose-600 text-[24px]">smart_toy</span>
<span>Google for Education</span>
</div>
</div>
</div>
</section>
{/* How It Works: Connected Roadmap Nodes (Inspired by Reference 3) */}
<section className="w-full px-margin-mobile md:px-margin py-space-xl max-w-7xl mx-auto">
<div className="text-center max-w-3xl mx-auto mb-space-xl">
<div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-rose-100 text-rose-700 font-label-sm text-label-sm mb-space-sm">
<span className="material-symbols-outlined text-[16px]">alt_route</span> Step-by-Step Learning Arc
      </div>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-xs">
        How Little Explorers Become Confident AI Creators
      </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
        From first voice prompt to deploying autonomous machine learning helpers, our scaffolded curriculum transforms passive consumers into active system builders.
      </p>
</div>
{/* 4-Step Interactive Linear Visual Path */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter relative">
{/* Step 1 */}
<div className="group flex flex-col bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
<div className="flex items-center justify-between mb-space-md">
<span className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-headline-sm text-headline-sm">
            01
          </span>
<span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Ages 6+</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Playful Sandbox</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
          Talk, doodle, and see neural brushes synthesize whimsical worlds in real time. Kids discover that computers can listen and imagine.
        </p>
<div className="mt-auto pt-space-sm flex items-center gap-1 font-label-md text-label-md text-rose-600">
<span>Hands-on Doodle Synth</span>
<span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
{/* Step 2 */}
<div className="group flex flex-col bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
<div className="flex items-center justify-between mb-space-md">
<span className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-headline-sm text-headline-sm">
            02
          </span>
<span className="px-space-sm py-0.5 rounded-full bg-rose-100 text-rose-700 font-label-sm text-label-sm">Ages 8+</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Prompt Engineering</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
          Master structure, precision, style descriptors, and context boundaries. Children learn to command LLMs with clarity and zero ambiguity.
        </p>
<div className="mt-auto pt-space-sm flex items-center gap-1 font-label-md text-label-md text-rose-600">
<span>Prompt Syntax Blocks</span>
<span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
{/* Step 3 */}
<div className="group flex flex-col bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
<div className="flex items-center justify-between mb-space-md">
<span className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-headline-sm text-headline-sm">
            03
          </span>
<span className="px-space-sm py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm">Ages 10+</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Ethics &amp; Bias Detective</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
          Spot algorithmic hallucinations, identify cultural biases, and understand digital copyrights through gamified investigative quests.
        </p>
<div className="mt-auto pt-space-sm flex items-center gap-1 font-label-md text-label-md text-rose-600">
<span>Fact-Check Missions</span>
<span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
{/* Step 4 */}
<div className="group flex flex-col bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
<div className="flex items-center justify-between mb-space-md">
<span className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-rose-600 font-headline-sm text-headline-sm">
            04
          </span>
<span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">Ages 12+</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Deploy Real Agents</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
          Publish kid-friendly custom GPTs, build homework tutors, and integrate Python agents with camera sensors to solve neighborhood problems.
        </p>
<div className="mt-auto pt-space-sm flex items-center gap-1 font-label-md text-label-md text-rose-600">
<span>Launch Web Apps</span>
<span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</div>
</section>
{/* Interactive Playground / Live Workbench Simulator (Visual Proof) */}
<section className="w-full bg-surface-container py-space-xl px-margin-mobile md:px-margin" id="workbench-demo">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-rose-600 font-bold">Interactive Workbench Preview</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Try the Kid-Friendly Prompt Synthesizer</h2>
</div>
<div className="flex items-center gap-space-xs">
<span className="inline-flex items-center gap-1 px-space-md py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span> Auto-Filtered Safe Mode
          </span>
</div>
</div>
{/* Split Screen Interactive Workbench Canvas */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-lg">
{/* Left: Student Prompt Editor */}
<div className="lg:col-span-6 flex flex-col justify-between space-y-space-md">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md text-on-surface">Prompt Sandbox • Level 1 Challenge</span>
<span className="font-label-sm text-label-sm text-rose-600 font-bold">Target: Whimsical Dog Pilot</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
              Combine subject, action, environment, and artistic lighting to instruct the visual generator:
            </p>
{/* Editable input simulation */}
<div className="p-space-md bg-surface-container-low rounded-lg">
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="promptInput">Kid Prompt Input:</label>
<textarea className="w-full bg-surface-container-lowest text-on-surface rounded-DEFAULT p-space-sm font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-rose-600 resize-none shadow-inner" id="promptInput" placeholder="E.g., A happy golden retriever wearing aviator goggles flying a small blue cloud airplane, soft sunset lighting, storybook digital art style." rows={3} defaultValue="A happy golden retriever wearing aviator goggles flying a small blue cloud airplane, soft sunset lighting, storybook digital art style." />
</div>
{/* Block Pills builder */}
<div className="mt-space-sm flex flex-wrap gap-1.5">
<span className="px-space-sm py-1 rounded-full bg-rose-100 text-rose-700 font-label-sm text-label-sm cursor-pointer hover:opacity-80">+ Add Goggles</span>
<span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm cursor-pointer hover:opacity-80">+ Pixar Style 3D</span>
<span className="px-space-sm py-1 rounded-full bg-rose-100 text-rose-700 font-label-sm text-label-sm cursor-pointer hover:opacity-80">+ Golden Hour</span>
<span className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm cursor-pointer hover:opacity-80">+ Zero Hallucinations</span>
</div>
</div>
{/* Coach Guidance Feedback */}
<div className="p-space-sm bg-surface-container-high rounded-DEFAULT flex items-start gap-space-sm">
<span className="material-symbols-outlined text-rose-600 text-[20px] mt-0.5">tips_and_updates</span>
<div>
<span className="font-label-sm text-label-sm text-on-surface font-bold">AI Coach Maya Tip:</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Great specificity! Describing the airplane material ("cloud airplane") boosted your Prompt Score to 88/100.</p>
</div>
</div>
{/* Run Synthesis Button */}
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
<span>100% Filtered Safe for Minors</span>
</div>
<button className="px-space-lg py-space-sm rounded-full bg-rose-600 text-white font-label-md text-label-md shadow-sm hover:bg-rose-700 transition-all" id="synthBtn">
              ⚡ Synthesize Canvas
            </button>
</div>
</div>
{/* Right: Real-time Output & Neural Scorecard */}
<div className="lg:col-span-6 flex flex-col bg-surface-container-low rounded-lg p-space-md">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface">Generated Art Canvas</span>
<div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold">
<span className="material-symbols-outlined text-[18px]">stars</span>
<span>Prompt Quality: 88 / 100</span>
</div>
</div>
{/* Illustrated Output Preview */}
<div className="relative w-full aspect-video rounded-DEFAULT overflow-hidden shadow-inner mb-space-md bg-surface-container-highest">
<img className="w-full h-full object-cover" data-alt="A warm, whimsical children's book 3D render of a joyful golden retriever puppy wearing vintage aviator leather goggles and a tiny red scarf, sitting inside a cozy cartoon blue propeller airplane made of fluffy white clouds, cruising through gentle pastel sunset skies with golden peach and lavender light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGn5v7BNlrBAmKjbR7K6G8Pt2HjIn3W7AY0hPvy2daEWQOVPGFhfFalbDMtb_yEZg5YKsB5s5tDR_2zcho85WCujl98wK9mlrdbymFlerIidGzepGKnZzHFUpCGD34Dapn5dPuXfNISpQ78OacTUVjmoUoo45SP6H2-TLyQ8Mj6Hes4Mdeuhq4i2acllpXvERD-sWRDfDO9atpkxJK4glQ1JXguog7USwRcq3jz3Hq27Wh5Vfc6Glu_Q"/>
<div className="absolute bottom-2 right-2 px-space-sm py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm font-label-sm text-label-sm text-on-surface">
              Render Time: 0.8s
            </div>
</div>
{/* Rubric Breakdown Metrics */}
<div className="grid grid-cols-3 gap-space-sm">
<div className="bg-surface-container-lowest p-space-sm rounded-DEFAULT text-center shadow-sm">
<span className="font-body-sm text-body-sm text-on-surface-variant block">Clarity</span>
<span className="font-headline-sm text-headline-sm text-rose-600 font-bold">95%</span>
</div>
<div className="bg-surface-container-lowest p-space-sm rounded-DEFAULT text-center shadow-sm">
<span className="font-body-sm text-body-sm text-on-surface-variant block">Creativity</span>
<span className="font-headline-sm text-headline-sm text-secondary font-bold">90%</span>
</div>
<div className="bg-surface-container-lowest p-space-sm rounded-DEFAULT text-center shadow-sm">
<span className="font-body-sm text-body-sm text-on-surface-variant block">Safety Check</span>
<span className="font-headline-sm text-headline-sm text-tertiary font-bold">Pass</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Core Programs & Age Tracks (Inspired by Reference 1 & 2) */}
<section className="w-full px-margin-mobile md:px-margin py-space-xl max-w-7xl mx-auto" id="programs">
<div className="text-center max-w-3xl mx-auto mb-space-lg">
<div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm mb-space-sm">
<span className="material-symbols-outlined text-[16px]">tune</span> Age-Appropriate Learning Paths
      </div>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-xs">
        Crafted for Every Stage of Curiosity
      </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
        No boring syntax drills. We teach foundational mental models through play, creative publishing, and real-world deployment.
      </p>
</div>
{/* Tier Filter Tabs */}
<div className="flex items-center justify-center gap-space-xs mb-space-xl">
<button className="px-space-lg py-space-sm rounded-full bg-rose-600 text-white font-label-md text-label-md shadow-sm">
        All Age Tracks
      </button>
<button className="px-space-lg py-space-sm rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
        Sparks (6–8 yrs)
      </button>
<button className="px-space-lg py-space-sm rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
        Navigators (9–12 yrs)
      </button>
<button className="px-space-lg py-space-sm rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
        Architects (13–16 yrs)
      </button>
</div>
{/* 3 Core Track Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/* Card 1: Sparks (Ages 6-8) */}
<div className="flex flex-col bg-surface-container-lowest rounded-lg p-space-lg shadow-sm hover:shadow-md transition-all">
{/* Card Header Banner Image */}
<div className="w-full h-48 rounded-DEFAULT overflow-hidden mb-space-md bg-secondary-fixed">
<img className="w-full h-full object-cover" data-alt="A warm, luminous 3D rendering of young animal characters crafting a storybook with glowing digital stars and flying cartoon friendly robot assistants in a sunny classroom garden." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPdajkV3rdVqiFdxIsAcXz_LIm_lKwXkFCJCYgZ7rj7rGGdLpXoIwlPSzaser946UQuQbMZF1FMhCMAxoRIYrFRdXdyjoz7xxPQ-NSPzAe3-tUJNrEczCyz1B7UC03Yr50JWAqkxd-GTCb25PquU3b7hS3R_x9u6igJlRfQVKqPD05MmFOkeJMfWSWLdurm4P6TQJSNYbLndQ3YIulJWWQR3GMGh5wD8E7MXI9uAKIbhjrCSseT-INJQ"/>
</div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">Sparks • Ages 6–8</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">8 Weeks • 1 hr/wk</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">AI Storycrafter &amp; Art Studio</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
          Discover how computers synthesize voice, animate doodles, and co-author fairy tales. Builds vocabulary and descriptive storytelling skills.
        </p>
{/* Highlights Checklist */}
<div className="space-y-space-xs mb-space-lg">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
<span>Voice prompt interactions &amp; soundscapes</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
<span>Safe digital art book publishing</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
<span>Introduction to "Friendly Robots"</span>
</div>
</div>
<div className="mt-auto pt-space-md border-t-0 flex items-center justify-between">
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Tuition</span>
<span className="font-headline-md text-headline-md text-on-surface font-bold">$129<span className="font-body-sm text-body-sm text-on-surface-variant">/mo</span></span>
</div>
<a className="px-space-md py-space-sm rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-rose-700 hover:text-white transition-colors" href="#enroll">
            Enroll Track
          </a>
</div>
</div>
{/* Card 2: Navigators (Ages 9-12) - Featured */}
<div className="flex flex-col bg-surface-container-lowest rounded-lg p-space-lg shadow-md hover:shadow-lg transition-all relative">
<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-space-md py-0.5 rounded-full bg-rose-600 text-white font-label-sm text-label-sm shadow-sm">
          Most Popular Choice
        </div>
{/* Card Header Banner Image */}
<div className="w-full h-48 rounded-DEFAULT overflow-hidden mb-space-md bg-rose-100">
<img className="w-full h-full object-cover" data-alt="Vibrant 3D digital illustration of diverse middle school students collaborating on a floating glowing holographic user interface, building games with friendly AI mentor bots in a bright modern tech lab." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz0ULLBIw8hCHX2N4ZKdDhE-wiOsREdVEKNdZC7PA-UOKWw9t7cS3m3DZlDkZQfS1RqqoBtwfJIA0W6p-HH4hvy3weOlDiNZmdYiQK0dhnq4hVn4aGrkh_nL0KdPPNrUlf1p1aMFyhK1KWIE5ewChf3v_FFySOi7sLP8BUN2ZaG70rY27rg3eEiEulSRCr4wUhSKhytBvo3RaBeBX-0xCkaGod9NkHpffLnO8rhii8xKYAZRhCVjaJ0Q"/>
</div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-space-sm py-0.5 rounded-full bg-rose-100 text-rose-700 font-label-sm text-label-sm">Navigators • Ages 9–12</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">12 Weeks • 2 hr/wk</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Prompt Engineering &amp; Game AI</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
          Master few-shot prompting, constraint formulation, logic chains, and build kid-safe interactive text adventure games with custom rules.
        </p>
{/* Highlights Checklist */}
<div className="space-y-space-xs mb-space-lg">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-rose-600 text-[16px]">check_circle</span>
<span>Zero-hallucination prompt crafting</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-rose-600 text-[16px]">check_circle</span>
<span>Interactive NPC game storytelling</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-rose-600 text-[16px]">check_circle</span>
<span>AI Fact-checking &amp; source evaluation</span>
</div>
</div>
<div className="mt-auto pt-space-md border-t-0 flex items-center justify-between">
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Tuition</span>
<span className="font-headline-md text-headline-md text-on-surface font-bold">$169<span className="font-body-sm text-body-sm text-on-surface-variant">/mo</span></span>
</div>
<a className="px-space-md py-space-sm rounded-full bg-rose-600 text-white font-label-md text-label-md hover:bg-rose-700 transition-colors shadow-sm" href="#enroll">
            Enroll Track
          </a>
</div>
</div>
{/* Card 3: Architects (Ages 13-16) */}
<div className="flex flex-col bg-surface-container-lowest rounded-lg p-space-lg shadow-sm hover:shadow-md transition-all">
{/* Card Header Banner Image */}
<div className="w-full h-48 rounded-DEFAULT overflow-hidden mb-space-md bg-rose-100">
<img className="w-full h-full object-cover" data-alt="High-tech aesthetic illustration of a teenager working on a laptop surrounded by glowing Python code snippets, clean neural network graph diagrams, and a small responsive smart gadget on a desk." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1SZqd8Z53BBPcCPl-sarDAFEgzMAZt22g6pUmZp-Oj5axlD6vOULHq-4paBM8HjYuX14ApiF6PP_dUHvFEIA7Miopxg76a7YmU8gImM69UAUgCOEP-5ZV3PiBPGLhsadfdXV5CdZdL73KF67q7M2NdvtSrWYLvz1hk6CC8me4IcykkYxEa-6ZZt6qCLiZE_4mTj5oyeZtkvHoxmT35DhCLIFJljhrsvVtIXciW86TYGq5ZPEiSAQZHQ"/>
</div>
<div className="flex items-center justify-between mb-space-xs">
<span className="px-space-sm py-0.5 rounded-full bg-rose-100 text-rose-700 font-label-sm text-label-sm">Architects • Ages 13–16</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">16 Weeks • 2.5 hr/wk</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Python Agents &amp; Neural Models</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
          Deep-dive into Python-driven LLM APIs, fine-tuning principles, autonomous agents, and building real web applications solving community challenges.
        </p>
{/* Highlights Checklist */}
<div className="space-y-space-xs mb-space-lg">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-tertiary text-[16px]">check_circle</span>
<span>Real Python API integration</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-tertiary text-[16px]">check_circle</span>
<span>Custom knowledge retrieval (RAG)</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-tertiary text-[16px]">check_circle</span>
<span>Portfolio capstone project for college apps</span>
</div>
</div>
<div className="mt-auto pt-space-md border-t-0 flex items-center justify-between">
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Tuition</span>
<span className="font-headline-md text-headline-md text-on-surface font-bold">$199<span className="font-body-sm text-body-sm text-on-surface-variant">/mo</span></span>
</div>
<a className="px-space-md py-space-sm rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-rose-700 hover:text-white transition-colors" href="#enroll">
            Enroll Track
          </a>
</div>
</div>
</div>
</section>
{/* Comparison / Curriculum Matrix (Inspired by Reference 2) */}
<section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
<div className="max-w-7xl mx-auto">
<div className="text-center max-w-3xl mx-auto mb-space-xl">
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-xs">
          Why Intentional AI Education Matters
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          See how AI Pathshala compares against standard screen time habits and generic coding bootcamps.
        </p>
</div>
{/* Rounded Table Matrix Container */}
<div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm overflow-x-auto">
<table className="w-full text-left border-collapse min-w-[600px]">
<thead>
<tr className="bg-surface-container-low rounded-DEFAULT">
<th className="p-space-md font-label-md text-label-md text-on-surface-variant rounded-l-DEFAULT">Dimension</th>
<th className="p-space-md font-label-md text-label-md text-on-surface-variant">Passive Screen Time</th>
<th className="p-space-md font-label-md text-label-md text-on-surface-variant">Generic Coding Bootcamps</th>
<th className="p-space-md font-label-md text-label-md text-rose-700 bg-rose-100 rounded-r-DEFAULT">AI Pathshala Active Mastery</th>
</tr>
</thead>
<tbody className="divide-y divide-transparent font-body-md text-body-md">
<tr>
<td className="p-space-md font-label-md text-on-surface">Child Engagement Type</td>
<td className="p-space-md text-on-surface-variant">Passive scrolling &amp; videos</td>
<td className="p-space-md text-on-surface-variant">Rote syntax typing memorization</td>
<td className="p-space-md bg-rose-100/30 text-on-surface font-semibold">Active reasoning &amp; prompt synthesis</td>
</tr>
<tr>
<td className="p-space-md font-label-md text-on-surface">Safety &amp; Content Moderation</td>
<td className="p-space-md text-error">Unregulated internet exposure</td>
<td className="p-space-md text-on-surface-variant">Varies widely, rarely supervised</td>
<td className="p-space-md bg-rose-100/30 text-rose-600 font-semibold">100% COPPA-compliant walled garden</td>
</tr>
<tr>
<td className="p-space-md font-label-md text-on-surface">Ethical &amp; Critical Thinking</td>
<td className="p-space-md text-on-surface-variant">None taught</td>
<td className="p-space-md text-on-surface-variant">Pure coding without ethics discussion</td>
<td className="p-space-md bg-rose-100/30 text-on-surface font-semibold">Dedicated Bias Detective &amp; safety quests</td>
</tr>
<tr>
<td className="p-space-md font-label-md text-on-surface">Human Mentorship</td>
<td className="p-space-md text-on-surface-variant">Zero oversight</td>
<td className="p-space-md text-on-surface-variant">Pre-recorded videos or big groups (1:30)</td>
<td className="p-space-md bg-rose-100/30 text-on-surface font-semibold">Live small pods (1:6) with certified mentors</td>
</tr>
<tr>
<td className="p-space-md font-label-md text-on-surface">Tangible Output</td>
<td className="p-space-md text-on-surface-variant">None</td>
<td className="p-space-md text-on-surface-variant">Basic repetitive copy-paste games</td>
<td className="p-space-md bg-rose-100/30 text-on-surface font-semibold">Personal AI assistant apps, books &amp; agents</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
{/* Social Proof & Testimonials Bento Grid (Inspired by Reference 3) */}
<section className="w-full px-margin-mobile md:px-margin py-space-xl max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md mb-space-xl">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Community Voices</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Loved by Parents, Adored by Kids</h2>
</div>
<div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span>Verified Reviews from 1,200+ Homes</span>
</div>
</div>
{/* Testimonials Bento Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/* Testimonial 1 */}
<div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-secondary mb-space-sm">
<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md italic">
            "My 8-year-old daughter Sarah went from passively watching cartoons to building her own interactive illustrated fairy tale generator. She now asks critical questions about whether news stories are written by AI!"
          </p>
</div>
<div className="flex items-center gap-space-sm pt-space-sm">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-label-md text-on-secondary-fixed">
            RL
          </div>
<div>
<span className="font-label-md text-label-md text-on-surface block">Rachel Lewis</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Parent of 8-year-old (Sparks Track)</span>
</div>
</div>
</div>
{/* Testimonial 2 (Card with high visual accent) */}
<div className="bg-rose-100/40 p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-rose-600 mb-space-sm">
<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md italic">
            "As an educator and school principal, this is the first platform I've approved that handles the ethics of AI for middle schoolers responsibly. The 'Bias Detective' modules should be mandatory everywhere."
          </p>
</div>
<div className="flex items-center gap-space-sm pt-space-sm">
<div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-label-md">
            DM
          </div>
<div>
<span className="font-label-md text-label-md text-on-surface block">Dr. Marcus Vance</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Head of School, Oakridge Academy</span>
</div>
</div>
</div>
{/* Testimonial 3 */}
<div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-secondary mb-space-sm">
<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md italic">
            "I programmed a homework buddy in Python that helps me review my Spanish verbs. AI Pathshala mentors made tricky prompt constraints feel like playing a game with friends."
          </p>
</div>
<div className="flex items-center gap-space-sm pt-space-sm">
<div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-label-md">
            AK
          </div>
<div>
<span className="font-label-md text-label-md text-on-surface block">Aarav K., Age 14</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Student (Architects Track)</span>
</div>
</div>
</div>
</div>
</section>
{/* FAQ Section (Clean Bento / Accordion) */}
<section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
<div className="max-w-4xl mx-auto">
<div className="text-center mb-space-xl">
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-xs">
          Frequently Asked Questions
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          Everything parents and educators want to know before diving into our learning space.
        </p>
</div>
{/* FAQ List with vanilla toggle JS */}
<div className="space-y-space-sm">
{/* Q1 */}
<div className="faq-item bg-surface-container-lowest rounded-lg p-space-md shadow-sm cursor-pointer transition-all">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Is AI Pathshala safe for young children?</h4>
<span className="material-symbols-outlined text-on-surface-variant transition-transform">expand_more</span>
</div>
<p className="faq-answer hidden font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Yes, 100%. We operate a fully COPPA-compliant, walled-garden sandbox. All foundation models pass through an automated triple-filter moderation layer that prevents adult themes, personal identifiable data sharing, and external unmonitored links.
          </p>
</div>
{/* Q2 */}
<div className="faq-item bg-surface-container-lowest rounded-lg p-space-md shadow-sm cursor-pointer transition-all">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-on-surface">What hardware or software do we need?</h4>
<span className="material-symbols-outlined text-on-surface-variant transition-transform">expand_more</span>
</div>
<p className="faq-answer hidden font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Just a standard modern web browser on a laptop, iPad, Chromebook, or desktop with a reliable internet connection and microphone. No expensive GPU or local software installation is required.
          </p>
</div>
{/* Q3 */}
<div className="faq-item bg-surface-container-lowest rounded-lg p-space-md shadow-sm cursor-pointer transition-all">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Will this encourage excessive screen time?</h4>
<span className="material-symbols-outlined text-on-surface-variant transition-transform">expand_more</span>
</div>
<p className="faq-answer hidden font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Our sessions emphasize deliberate, active creation over passive binge consumption. Each module includes "unplugged" analog workbook assignments, physical drawing, and ethical discussion breaks away from screens.
          </p>
</div>
{/* Q4 */}
<div className="faq-item bg-surface-container-lowest rounded-lg p-space-md shadow-sm cursor-pointer transition-all">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Can parents track their child's progress?</h4>
<span className="material-symbols-outlined text-on-surface-variant transition-transform">expand_more</span>
</div>
<p className="faq-answer hidden font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Yes! Every guardian receives access to the Parent Portal dashboard with weekly competency reports, completed projects, mentor remarks, and verified skill badges.
          </p>
</div>
</div>
</div>
</section>
{/* Final Converting CTA Banner */}
<section className="w-full px-margin-mobile md:px-margin py-space-xl" id="enroll">
<div className="max-w-7xl mx-auto rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 p-space-lg md:p-space-xl text-white shadow-xl relative overflow-hidden">
{/* Decorative background rings */}
<div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none"></div>
<div className="relative z-10 max-w-3xl">
<span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-white/20 text-white font-label-sm text-label-sm mb-space-sm backdrop-blur-sm">
<span className="material-symbols-outlined text-[16px]">verified</span> Zero-Risk 14-Day Guarantee
        </span>
<h2 className="font-display-lg text-display-lg text-white tracking-tight mb-space-xs">
          Give Your Child the Superpower of Tomorrow, Today.
        </h2>
<p className="font-body-lg text-body-lg text-rose-100 mb-space-lg max-w-xl">
          Join thousands of young thinkers stepping boldly into the age of artificial intelligence with confidence, creativity, and ethics.
        </p>
{/* Fast enrollment input row */}
<form className="flex flex-col sm:flex-row gap-space-sm max-w-xl" onSubmit={(event) => { event.preventDefault(); alert('Welcome to AI Pathshala! Check your inbox for orientation access.'); }}>
<input className="flex-grow px-space-lg py-space-md rounded-full bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-secondary-container shadow-inner" placeholder="Enter parent email address..." required type="email"/>
<button className="px-space-xl py-space-md rounded-full bg-white text-rose-600 font-label-lg text-label-lg shadow-md hover:bg-rose-50 transition-all shrink-0" type="submit">
            Start Free Now →
          </button>
</form>
<div className="mt-space-md flex flex-wrap items-center gap-space-md font-body-sm text-body-sm text-rose-100">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check</span> No credit card required</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check</span> Cancel anytime with 1 click</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check</span> 1:6 small pods with live mentor</span>
</div>
</div>
</div>
</section>
{/* Interactive Workbench, Mascot Tracker & FAQ Micro-Script */}

</div></main><footer className="w-full bg-surface-container-low mt-space-xl pt-space-xl pb-space-lg"><div className="w-full px-margin-mobile md:px-margin"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter pb-space-xl"><div className="lg:col-span-4 flex flex-col gap-space-md"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center text-white"><span className="material-symbols-outlined text-[18px]">auto_awesome</span></div><span className="font-headline-sm text-headline-sm text-on-surface font-bold">AI Pathshala</span></div><p className="font-body-md text-body-md text-on-surface-variant max-w-sm">Empowering the next generation of digital pioneers with hands-on AI learning, ethical reasoning, and future-ready problem solving.</p><div className="flex items-center gap-space-sm"><span className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm shadow-[0_1px_8px_rgba(32,23,45,0.04)]"><span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>COPPA Compliant</span><span className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm shadow-[0_1px_8px_rgba(32,23,45,0.04)]"><span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>SSL 256-bit Safe</span></div></div><div className="lg:col-span-3 flex flex-col gap-space-sm"><span className="font-label-lg text-label-lg text-on-surface">Curriculum Tracks</span><ul className="flex flex-col gap-space-xs"><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Prompt Engineering &amp; LLMs</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Robotics &amp; Physical AI</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">AI Ethics &amp; Online Safety</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Creative AI &amp; Media Studio</li></ul></div><div className="lg:col-span-3 flex flex-col gap-space-sm"><span className="font-label-lg text-label-lg text-on-surface">Resources &amp; Hubs</span><ul className="flex flex-col gap-space-xs"><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Safety &amp; Moderation Center</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">K-12 Curriculum Guide</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Student Privacy Commitment</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Parent &amp; Educator Portal</li></ul></div><div className="lg:col-span-2 flex flex-col gap-space-sm"><span className="font-label-lg text-label-lg text-on-surface">Company</span><ul className="flex flex-col gap-space-xs"><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">About Our Mission</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Careers &amp; Mentorship</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Press &amp; Stories</li><li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Contact &amp; Support</li></ul></div></div><div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container rounded-lg p-space-md"><div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px]">shield_with_heart</span><span>© 2025 AI Pathshala Inc. Kids-Safe &amp; Education Certified. All rights reserved.</span></div><div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant"><a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a><a className="hover:text-on-surface transition-colors" href="#">Terms of Learning</a><a className="hover:text-on-surface transition-colors" href="#">Kid Safety Pledge</a></div></div></div></footer>
    </div>
  );
}
