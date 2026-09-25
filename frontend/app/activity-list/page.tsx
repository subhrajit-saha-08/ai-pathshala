"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useProfileStore from "@/store/useProfileStore";

export default function ActivitiesPage() {
  const router = useRouter();
  const {
    childName,
    childAvatar,
    ageBand,
    childAge,
    grade,
    school,
    stateRegion,
  } = useProfileStore();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (!childName || childName.trim() === "") {
      router.push("/profile");
    }
  }, [childName, router]);

  if (!mounted || !childName) return null;

  return (
    <div  className="font-body-md text-body-md text-on-surface min-h-screen antialiased selection:bg-[#FFE5EC] selection:text-[#FF4D6D]" style={{ 'background': 'radial-gradient(at 0% 0%, #FFF0F5 0px, transparent 55%), radial-gradient(at 100% 0%, #FFFDF0 0px, transparent 50%), radial-gradient(at 50% 50%, #FFFDF0 0px, transparent 65%), radial-gradient(at 100% 100%, #F3F2FE 0px, transparent 55%), linear-gradient(135deg, #FFF0F5 0%, #FFFDF0 50%, #F3F2FE 100%)' }}>
      
{/* Left Sidebar Navigation */}
<aside className={`fixed left-0 top-0 h-full bg-white/75 backdrop-blur-xl z-50 flex flex-col p-space-md border-r border-[#8486E8]/15 shadow-[0_4px_20px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap flex-shrink-0 ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 px-0 border-none'}`}>
<div className="flex items-center justify-between px-space-sm py-space-sm mb-space-md">
<div className="flex items-center gap-space-sm cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push('/dashboard')}>
<div className="w-10 h-10 rounded-full bg-[#FF4D6D] flex items-center justify-center shadow-[0_4px_16px_rgba(255,77,109,0.35)]">
<span className="material-symbols-outlined text-white text-[22px]">auto_awesome</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface leading-none font-bold">Spark School</span>
<span className="font-label-sm text-label-sm text-[#8486E8] font-bold tracking-wider uppercase mt-space-xs">Kids Learning Lab</span>
</div>
</div>
<button onClick={() => setIsSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container/60 text-on-surface-variant transition-colors" type="button">
<span className="material-symbols-outlined text-lg">close</span>
</button>
</div>
<nav className="flex-1 flex flex-col gap-space-xs" data-active-classes="bg-[#FF4D6D] text-white shadow-[0_8px_20px_rgba(255,77,109,0.3)]">
<a className="flex items-center justify-between px-space-md py-space-sm rounded-full text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface transition-all group" data-path="profile" onClick={(e) => { e.preventDefault(); router.push("/dashboard"); }} href="#">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[20px] text-[#8486E8] transition-transform group-hover:scale-110">account_circle</span>
<span className="font-label-lg text-label-lg">Profile</span>
</div>
<span className="bg-[#F5EAFF] text-on-surface-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold">{grade || "Grade 6"}</span>
</a>
<a aria-current="page" className="flex items-center justify-between px-space-md py-space-sm rounded-full transition-all group bg-[#FF4D6D] text-white shadow-[0_8px_20px_rgba(255,77,109,0.35)]" data-path="activities" onClick={(e) => { e.preventDefault(); router.push("/activity-list"); }} href="#">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">rocket_launch</span>
<span className="font-label-lg text-label-lg font-bold">Activities</span>
</div>
<span className="bg-[#FFB703] text-[#20172D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-extrabold shadow-sm">15 Levels</span>
</a>
<a className="flex items-center justify-between px-space-md py-space-sm rounded-full text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface transition-all group" data-path="progress" href="#" onClick={(e) => !e.defaultPrevented && e.preventDefault()}>
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[20px] text-[#8486E8] transition-transform group-hover:scale-110">military_tech</span>
<span className="font-label-lg text-label-lg">Projects</span>
</div>
<span className="bg-[#FFF3BF] text-[#7D5800] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold">24 ★</span>
</a>
<a className="flex items-center justify-between px-space-md py-space-sm rounded-full text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface transition-all group" data-path="mentor" href="#" onClick={(e) => !e.defaultPrevented && e.preventDefault()}>
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[20px] text-[#8486E8] transition-transform group-hover:scale-110">smart_toy</span>
<span className="font-label-lg text-label-lg">Mentor</span>
</div>
<div className="flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-[#FFB703] animate-pulse"></span>
<span className="text-[11px] text-on-surface-variant font-bold">Sparky</span>
</div>
</a>
</nav>
{/* Sparky AI fixed widget at bottom-left corner */}
<div className="flex flex-col gap-space-sm mt-auto">
<div className="bg-white p-space-sm rounded-2xl shadow-[0_6px_20px_rgba(132,134,232,0.08)] border border-[#8486E8]/20">
<div className="flex items-center gap-space-sm mb-space-xs">
<div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#FFE5EC]">
<span className="material-symbols-outlined text-[#FF4D6D] text-[18px]">smart_toy</span>
<span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#FFB703] rounded-full ring-2 ring-white"></span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">Sparky AI</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Builder Co-Pilot</span>
</div>
</div>
<div className="flex items-center justify-between bg-[#FFF0F5] px-space-sm py-space-xs rounded-xl border border-[#FF4D6D]/15">
<span className="font-label-sm text-label-sm text-[#FF4D6D] font-bold">15 Levels Ready!</span>
<span className="material-symbols-outlined text-[#FF4D6D] text-[16px]">waving_hand</span>
</div>
</div>
<div className="flex items-center justify-between px-space-xs">
<button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-on-surface-variant hover:bg-white hover:text-[#FF4D6D] border border-[#8486E8]/15 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">volume_up</span>
</button>
<button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-on-surface-variant hover:bg-white hover:text-[#FF4D6D] border border-[#8486E8]/15 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">palette</span>
</button>
<a className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-on-surface-variant hover:bg-white hover:text-[#FF4D6D] border border-[#8486E8]/15 transition-colors shadow-sm" data-path="settings" href="#" onClick={(e) => !e.defaultPrevented && e.preventDefault()}>
<span className="material-symbols-outlined text-[18px]">tune</span>
</a>
</div>
</div>
</aside>
{/* Main Content Wrapper */}
<div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
{/* Fixed Top Header */}
<header className={`fixed top-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-[#8486E8]/15 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.06),0_2px_6px_0_rgba(255,77,109,0.03)] z-40 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'left-64' : 'left-0'}`}>
<div className="h-20 w-full px-margin flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-lg">
{!isSidebarOpen && (
  <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container/60 text-on-surface-variant transition-colors" type="button">
    <span className="material-symbols-outlined text-2xl">menu</span>
  </button>
)}
<div className="hidden xl:flex items-center gap-space-xs bg-[#FFFDF0] px-space-md py-space-xs rounded-full border border-[#FFB703]/30 shadow-[0_2px_8px_rgba(255,183,3,0.1)]">
<span className="material-symbols-outlined text-[#FFB703] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
<span className="font-label-md text-label-md text-on-surface font-bold">5 Day Streak</span>
<span className="text-[#8486E8]/40">•</span>
<span className="material-symbols-outlined text-[#FFB703] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>sunny</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">Sunny Day</span>
</div>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-[#8486E8] text-[18px]">search</span>
<input className="w-64 lg:w-80 bg-white/90 border border-[#8486E8]/25 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant pl-10 pr-space-md py-space-xs rounded-full focus:outline-none focus:border-[#FF4D6D] focus:ring-2 focus:ring-[#FF4D6D]/20 transition-all shadow-sm" placeholder="Search 15 levels, missions, concepts..." type="text" />
</div>
</div>
<div className="flex items-center gap-space-md">
<button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white text-on-surface-variant hover:text-[#FF4D6D] border border-[#8486E8]/20 hover:border-[#FF4D6D]/30 transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[20px]">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF4D6D] ring-2 ring-white"></span>
</button>
<div className="flex items-center gap-space-sm pl-space-sm">
<div className="flex flex-col text-right hidden sm:flex">
<span className="font-label-md text-label-md text-on-surface font-bold">{childName || "Explorer"}</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{grade || "Grade 6"} · {ageBand || "Builder"} Stage</span>
</div>
<div className="w-9 h-9 rounded-full bg-[#FF4D6D] flex items-center justify-center shadow-[0_4px_12px_rgba(255,77,109,0.3)]">
<span className="material-symbols-outlined text-white text-[18px]">person</span>
</div>
</div>
</div>
</div>
</header>
{/* Main Canvas Area */}
<main className="w-full pt-20 flex-1 pb-16">
<div className="w-full px-margin py-space-md flex flex-col gap-space-lg max-w-7xl mx-auto">
{/* Top Adventure Header Strip */}
<div className="w-full bg-white rounded-3xl p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)]">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="bg-[#FFE5EC] text-[#FF4D6D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full uppercase tracking-wider font-extrabold border border-[#FF4D6D]/20">15-Level AI Curriculum</span>
<span className="text-[#8486E8]/40">•</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{ageBand || "Builder"} Stage · Age {childAge || 11} · Non-Linear Exploration</span>
</div>
<div className="flex items-baseline gap-space-sm">
<h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">{childName ? `${childName}'s` : "Explorer's"} 15–Level Bento Adventure</h1>
<span className="hidden md:inline font-label-md text-label-md text-[#8486E8] font-semibold bg-[#E8E9FC] px-2.5 py-0.5 rounded-full">Level 8 In-Flight</span>
</div>
</div>
{/* Live Player Stats Bar */}
<div className="flex flex-wrap items-center gap-space-sm">
<div className="flex items-center gap-space-sm bg-[#FFE5EC]/70 border border-[#FF4D6D]/20 px-space-md py-space-xs rounded-full shadow-sm">
<div className="w-7 h-7 rounded-full bg-[#FF4D6D] flex items-center justify-center shadow-[0_2px_8px_rgba(255,77,109,0.35)]">
<span className="material-symbols-outlined text-white text-[16px]">bolt</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Total XP</span>
<span className="font-label-lg text-label-lg text-[#20172D] font-extrabold leading-none">1,680 XP</span>
</div>
</div>
<div className="flex items-center gap-space-sm bg-[#FFFDF0] border border-[#FFB703]/35 px-space-md py-space-xs rounded-full shadow-sm">
<div className="w-7 h-7 rounded-full bg-[#FFB703] flex items-center justify-center shadow-[0_2px_8px_rgba(255,183,3,0.35)]">
<span className="material-symbols-outlined text-[#20172D] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-[#7D5800] font-medium">Spark Streak</span>
<span className="font-label-lg text-label-lg text-[#20172D] font-extrabold leading-none">5 Days Fire</span>
</div>
</div>
<div className="flex items-center gap-space-sm bg-[#FFF3BF]/60 border border-[#FFB703]/30 px-space-md py-space-xs rounded-full shadow-sm">
<div className="w-7 h-7 rounded-full bg-[#FFB703] flex items-center justify-center shadow-[0_2px_8px_rgba(255,183,3,0.35)]">
<span className="material-symbols-outlined text-[#20172D] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-[#7D5800] font-medium">Star Vault</span>
<span className="font-label-lg text-label-lg text-[#20172D] font-extrabold leading-none">24 / 45 Stars</span>
</div>
</div>
</div>
</div>
{/* Global Level Progression Matrix Banner */}

{/* Vertical Activity Journey Stream */}
<div className="w-full flex flex-col gap-space-lg">
{/* ================= ACTIVITY 1 ================= */}
<div className="w-full bg-white rounded-3xl p-space-lg flex flex-col gap-space-md border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] transition-all">
{/* Activity Meta &amp; Header */}
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-14 h-14 rounded-2xl bg-[#FFE5EC] text-[#FF4D6D] flex items-center justify-center shrink-0 shadow-inner border border-[#FF4D6D]/20">
<span className="material-symbols-outlined text-[30px]">visibility</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 flex-wrap">
<span className="bg-[#FFE5EC] text-[#FF4D6D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FF4D6D]/20">Activity 01</span>
<span className="bg-[#FFF3BF] text-[#7D5800] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FFB703]/25">Ages 8–9 • Explorer Stage</span>
<span className="bg-[#F3F2FE] text-on-surface-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-medium">15–20 Mins</span>
<span className="text-[#3E33DD] font-label-sm text-label-sm font-bold bg-[#EEF0FF] px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">11/15 Cleared (73%)</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">AI or Human?</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">Visual guessing game where children spot AI hallucinations, unnatural anatomy (6-finger glitches), and synthetic lighting.</p>
<div className="flex flex-wrap gap-1.5 pt-1">
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Zero-Backend / Interactive Cards</span>
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Built by AI vs Built by Human</span>
<span className="text-[#7D5800] font-bold text-[11px] bg-[#FFF3BF] px-2.5 py-0.5 rounded-full border border-[#FFB703]/30">+1,280 XP Total Potential</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 self-start lg:self-center">
<button onClick={() => router.push('/activities/ai-or-human')} className="bg-white hover:bg-[#FFE5EC] text-[#FF4D6D] border border-[#FF4D6D]/30 font-label-md text-label-md px-space-md py-2 rounded-full shadow-sm transition-all flex items-center gap-1.5 font-bold" type="button">
<span className="material-symbols-outlined text-[18px]">replay</span>
<span className="">Sandbox Replay</span>
</button>
</div>
</div>
{/* Integrated 15-Level Progression Journey */}
<div className="bg-[#F8F6FF] rounded-2xl p-space-md border border-[#8486E8]/20 flex flex-col gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[#FF4D6D] text-[18px]">route</span>
<span className="font-label-md text-label-md text-on-surface font-bold">15-LEVEL PROGRESSION TRACK</span>
</div>
{/* 15 Level Track: 2 Rows (8 + 7) */}
<div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 w-full">
{/* L01 (Blue Completed) */}
<Link href="/activities/ai-vs-human/1">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L01</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L02 (Blue Completed) */}
<Link href="/activities/ai-vs-human/2">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L02</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L03 (Blue Completed) */}
<Link href="/activities/ai-vs-human/3">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L03</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L04 (Blue Completed) */}
<Link href="/activities/ai-vs-human/4">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L04</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L05 (Blue Completed) */}
<Link href="/activities/ai-vs-human/5">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L05</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L06 (Blue Completed) */}
<Link href="/activities/ai-vs-human/6">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L06</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L07 (Blue Completed) */}
<Link href="/activities/ai-vs-human/7">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L07</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L08 (Blue Completed) */}
<Link href="/activities/ai-vs-human/8">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L08</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L09 (Blue Completed) */}
<Link href="/activities/ai-vs-human/9">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L09</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L10 (Blue Completed) */}
<Link href="/activities/ai-vs-human/10">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L10</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L11 (Blue Completed) */}
<Link href="/activities/ai-vs-human/11">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L11</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L12 (Incomplete White / Next up) */}
<Link href="/activities/ai-vs-human/12">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border-2 border-[#FFB703] shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L12</span>
<span className="material-symbols-outlined text-[14px] text-[#FFB703]">play_arrow</span>
<span className="text-[9px] text-[#7D5800] font-bold leading-none">Next Up</span>
</div>
</Link>
{/* L13 (Incomplete White) */}
<Link href="/activities/ai-vs-human/13">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L13</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L14 (Incomplete White) */}
<Link href="/activities/ai-vs-human/14">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L14</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L15 (Incomplete White Capstone) */}
<Link href="/activities/ai-vs-human/15">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border-2 border-dashed border-[#8486E8]/40 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L15</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">military_tech</span>
<span className="text-[9px] text-on-surface-variant font-semibold leading-none">Capstone</span>
</div>
</Link>
</div>
</div>
{/* ================= ACTIVITY 2 ================= */}
<div className="w-full bg-white rounded-3xl p-space-lg flex flex-col gap-space-md border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] transition-all">
{/* Activity Meta &amp; Header */}
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-14 h-14 rounded-2xl bg-[#E1DFFF] text-[#4F51AF] flex items-center justify-center shrink-0 shadow-inner border border-[#8486E8]/25">
<span className="material-symbols-outlined text-[30px]">videocam</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 flex-wrap">
<span className="bg-[#FFE5EC] text-[#FF4D6D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FF4D6D]/20">Activity 02</span>
<span className="bg-[#FFF3BF] text-[#7D5800] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FFB703]/25">Ages 8–9 • Explorer Stage</span>
<span className="bg-[#F3F2FE] text-on-surface-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-medium">25 Mins</span>
<span className="bg-[#3E33DD] text-white font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]">verified</span> 15/15 Mastered (100% Blue!)
</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">Train the Robot</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">Live webcam gesture game learning how datasets train ML models using Google Teachable Machine &amp; TensorFlow.js frame classification.</p>
<div className="flex flex-wrap gap-1.5 pt-1">
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Client-Side ML / Webcam Gestures</span>
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Confidence Score &gt;= 0.85</span>
<span className="text-[#3E33DD] font-bold text-[11px] bg-[#EEF0FF] px-2.5 py-0.5 rounded-full border border-[#8486E8]/30">+1,650 XP Earned</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 self-start lg:self-center">
<button onClick={() => router.push('/activities/train-the-robot')} className="bg-white hover:bg-[#FFE5EC] text-[#FF4D6D] border border-[#FF4D6D]/30 font-label-md text-label-md px-space-md py-2 rounded-full shadow-sm transition-all flex items-center gap-1.5 font-bold" type="button">
<span className="material-symbols-outlined text-[18px]">videocam</span>
<span className="">Test Webcam Sandbox</span>
</button>
</div>
</div>
{/* Integrated 15-Level Progression Journey (ALL 15 COMPLETED BLUE!) */}
<div className="bg-[#F8F6FF] rounded-2xl p-space-md border border-[#8486E8]/20 flex flex-col gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[#3E33DD] text-[18px]">workspace_premium</span>
<span className="font-label-md text-label-md text-on-surface font-bold">15-LEVEL PROGRESSION TRACK</span>
</div>
{/* Row 1: L01 to L08 (All Blue Completed) */}
<div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 w-full">
{[...Array(14)].map((_, i) => {
  const levelNum = i + 1;
  const levelStr = levelNum.toString().padStart(2, '0');
  return (
    <Link href={`/activities/train-the-robot/${levelNum}`} key={levelNum}>
      <div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all">
        <span className="text-[11px] font-bold text-white leading-none">L{levelStr}</span>
        <span className="material-symbols-outlined text-[14px] text-white">check</span>
        <span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
      </div>
    </Link>
  );
})}
{/* L15 Master Level */}
<Link href="/activities/train-the-robot/15">
  <div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm cursor-pointer ring-2 ring-[#FFB703] hover:scale-[1.02] hover:shadow-md transition-all">
    <span className="text-[11px] font-extrabold text-white leading-none">L15</span>
    <span className="material-symbols-outlined text-[14px] text-[#FFB703]">military_tech</span>
    <span className="text-[9px] text-white font-bold leading-none">Master</span>
  </div>
</Link>
</div>
</div>
</div>
{/* ================= ACTIVITY 3 (CURRENT ACTIVE IN-FLIGHT) ================= */}
<div className="w-full bg-white rounded-3xl p-space-lg flex flex-col gap-space-md relative overflow-hidden border-2 border-[#FFB703] ring-4 ring-[#FFB703]/25 shadow-[0_16px_36px_-4px_rgba(255,183,3,0.22),0_6px_16px_-2px_rgba(255,77,109,0.12)]">
<div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FFF3BF]/60 rounded-full blur-3xl pointer-events-none"></div>
{/* Activity Meta &amp; Header */}
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md relative z-10">
<div className="flex items-start gap-space-md">
<div className="w-14 h-14 rounded-2xl bg-[#FFB703] text-[#20172D] flex items-center justify-center shrink-0 shadow-md ring-2 ring-[#FFF3BF]">
<span className="material-symbols-outlined text-[30px] animate-bounce">style</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 flex-wrap">
<span className="bg-[#FFB703] text-[#20172D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
<span className="w-2 h-2 rounded-full bg-[#20172D] animate-ping"></span>CURRENT ACTIVE IN-FLIGHT
</span>
<span className="bg-[#FFE5EC] text-[#FF4D6D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FF4D6D]/20">Activity 03</span>
<span className="bg-[#FFF3BF] text-[#7D5800] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FFB703]/30">Ages 10–12 • {ageBand || "Builder"} Stage</span>
<span className="bg-[#F3F2FE] text-on-surface font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-semibold border border-[#8486E8]/25">7 Cleared • Level 8 Active</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">Bias Card Game</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">Tinder-style swipe game where young AI architects swipe right for &apos;Fair&apos; and left for &apos;Biased&apos; algorithms, auditing training datasets and hiring systems.</p>
<div className="flex flex-wrap gap-1.5 pt-1">
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Swipe Mechanics / Fair vs Biased</span>
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Demographic Representation</span>
<span className="text-[#7D5800] font-bold text-[11px] bg-[#FFF3BF] px-2.5 py-0.5 rounded-full border border-[#FFB703]/30">+1,420 XP Total Potential</span>
</div>
</div>
</div>
{/* Main Resume Action Button (Vibrant Coral-Pink CTA) */}
<div className="flex items-center gap-space-sm shrink-0 self-start lg:self-center">
<button onClick={() => router.push('/activities/bias-card-game/8')} className="bg-[#FF4D6D] hover:bg-[#C9184A] text-white font-label-lg text-label-lg px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_8px_24px_rgba(255,77,109,0.4)] flex items-center gap-2 font-extrabold" type="button">
<span className="material-symbols-outlined text-[20px]">play_arrow</span>
<span className="">Resume In-Flight Challenge</span>
</button>
</div>
</div>
{/* Integrated 15-Level Progression Journey: L1-L7 Blue, L8 Active Gold, L9-L15 White */}
<div className="bg-[#FFFDF0] rounded-2xl p-space-md border border-[#FFB703]/35 flex flex-col gap-space-sm relative z-10 shadow-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[#7D5800] text-[18px]">route</span>
<span className="font-label-md text-label-md text-on-surface font-bold">15-LEVEL PROGRESSION TRACK</span>
</div>
{/* Row 1: L01 to L08 (L1-L7 Blue, L8 Active Gold) */}
<div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 w-full">
{[...Array(14)].map((_, i) => {
  const levelNum = i + 1;
  const levelStr = levelNum.toString().padStart(2, '0');
  const isCompleted = levelNum <= 7;
  const isActive = levelNum === 8;

  if (isCompleted) {
    return (
      <Link href={`/activities/bias-card-game/${levelNum}`} key={levelNum}>
        <div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
          <span className="text-[11px] font-bold text-white leading-none">L{levelStr}</span>
          <span className="material-symbols-outlined text-[14px] text-white">check</span>
          <span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
        </div>
      </Link>
    );
  } else if (isActive) {
    return (
      <Link href={`/activities/bias-card-game/${levelNum}`} key={levelNum}>
        <div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border-2 border-[#FFB703] shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
          <span className="text-[11px] font-bold text-on-surface leading-none">L{levelStr}</span>
          <span className="material-symbols-outlined text-[14px] text-[#FFB703]">play_arrow</span>
          <span className="text-[9px] text-[#7D5800] font-bold leading-none">Next Up</span>
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/activities/bias-card-game/${levelNum}`} key={levelNum}>
        <div className="bg-white text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[11px] font-bold text-on-surface leading-none">L{levelStr}</span>
          <span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
          <span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
        </div>
      </Link>
    );
  }
})}
{/* L15 (Capstone) */}
<Link href="/activities/bias-card-game/15">
  <div className="bg-white text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border-2 border-dashed border-[#8486E8]/40 shadow-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
    <span className="text-[11px] font-bold text-on-surface leading-none">L15</span>
    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">military_tech</span>
    <span className="text-[9px] text-on-surface-variant font-semibold leading-none">Capstone</span>
  </div>
</Link>
</div>
</div>
</div>
</div>
{/* ================= ACTIVITY 4 ================= */}
<div className="w-full bg-white rounded-3xl p-space-lg flex flex-col gap-space-md border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] transition-all">
{/* Activity Meta &amp; Header */}
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-14 h-14 rounded-2xl bg-[#FFF3BF] text-[#7D5800] flex items-center justify-center shrink-0 shadow-inner border border-[#FFB703]/30">
<span className="material-symbols-outlined text-[30px]">tune</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 flex-wrap">
<span className="bg-[#FFE5EC] text-[#FF4D6D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FF4D6D]/20">Activity 04</span>
<span className="bg-[#FFF3BF] text-[#7D5800] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FFB703]/25">Ages 10–12 • {ageBand || "Builder"} Stage</span>
<span className="bg-[#F3F2FE] text-on-surface-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-medium">30 Mins</span>
<span className="bg-[#EEF0FF] text-[#3E33DD] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold border border-[#8486E8]/30">3/15 Cleared (L1–L3 Blue)</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">Prompt Challenge Cards</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">Constraint-based prompt engineering (e.g. 3-line story about a flying dog including "Ocean") evaluated dynamically by FastAPI + Groq LLM-as-a-judge.</p>
<div className="flex flex-wrap gap-1.5 pt-1">
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">LLM-as-a-Judge / Constraint Scoring</span>
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Target Checklist System</span>
<span className="text-[#FF4D6D] font-bold text-[11px] bg-[#FFE5EC] px-2.5 py-0.5 rounded-full border border-[#FF4D6D]/20">+1,500 XP Total Potential</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 self-start lg:self-center">
<button onClick={() => router.push('/activities/prompt-challenge')} className="bg-[#FF4D6D] text-white font-label-md text-label-md px-space-lg py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(255,77,109,0.35)] flex items-center gap-2 font-bold" type="button">
<span className="material-symbols-outlined text-[18px]">draw</span>
<span className="">Start Activity</span>
</button>
</div>
</div>
{/* Integrated 15-Level Progression Journey: L1-L3 Blue, L4-L15 White */}
<div className="bg-[#F8F6FF] rounded-2xl p-space-md border border-[#8486E8]/20 flex flex-col gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[#FF4D6D] text-[18px]">route</span>
<span className="font-label-md text-label-md text-on-surface font-bold">15-LEVEL PROGRESSION TRACK</span>
</div>
{/* Row 1: L01 to L08 (L1-L3 Blue, L4-L8 White) */}
<div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 w-full">
{/* L01 (Blue Completed) */}
<Link href="/activities/prompt-challenge/1">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L01</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L02 (Blue Completed) */}
<Link href="/activities/prompt-challenge/2">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L02</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L03 (Blue Completed) */}
<Link href="/activities/prompt-challenge/3">
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L03</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
</Link>
{/* L04 (Incomplete White) */}
<Link href="/activities/prompt-challenge/4">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L04</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L05 (Incomplete White) */}
<Link href="/activities/prompt-challenge/5">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L05</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L06 (Incomplete White) */}
<Link href="/activities/prompt-challenge/6">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L06</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L07 (Incomplete White) */}
<Link href="/activities/prompt-challenge/7">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L07</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L08 (Incomplete White) */}
<Link href="/activities/prompt-challenge/8">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L08</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L09 (Incomplete White) */}
<Link href="/activities/prompt-challenge/9">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L09</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L10 (Incomplete White) */}
<Link href="/activities/prompt-challenge/10">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L10</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L11 (Incomplete White) */}
<Link href="/activities/prompt-challenge/11">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L11</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L12 (Incomplete White) */}
<Link href="/activities/prompt-challenge/12">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L12</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L13 (Incomplete White) */}
<Link href="/activities/prompt-challenge/13">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L13</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L14 (Incomplete White) */}
<Link href="/activities/prompt-challenge/14">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L14</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
</Link>
{/* L15 (Incomplete White Capstone) */}
<Link href="/activities/prompt-challenge/15">
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border-2 border-dashed border-[#8486E8]/40 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L15</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">military_tech</span>
<span className="text-[9px] text-on-surface-variant font-semibold leading-none">Capstone</span>
</div>
</Link>
</div>
</div>
</div>
{/* ================= ACTIVITY 5 ================= */}
<div className="w-full bg-white rounded-3xl p-space-lg flex flex-col gap-space-md border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] transition-all">
{/* Activity Meta &amp; Header */}
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-14 h-14 rounded-2xl bg-[#E1DFFF] text-[#4F51AF] flex items-center justify-center shrink-0 shadow-inner border border-[#8486E8]/25">
<span className="material-symbols-outlined text-[30px]">search_insights</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 flex-wrap">
<span className="bg-[#FFE5EC] text-[#FF4D6D] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#FF4D6D]/20">Activity 05</span>
<span className="bg-[#E8E9FC] text-[#4F51AF] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold border border-[#8486E8]/25">Ages 13–16 • Maker Stage</span>
<span className="bg-[#F3F2FE] text-on-surface-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-medium">35 Mins</span>
<span className="bg-[#EEF0FF] text-[#3E33DD] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold border border-[#8486E8]/30">2/15 Cleared (L1–L2 Blue)</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">Prompt Detective</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">Reverse-engineering AI paragraphs by identifying hidden target keywords (Mars, Cybernetic, Shakespearean tone) and reverse LLM evaluation.</p>
<div className="flex flex-wrap gap-1.5 pt-1">
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Reverse LLM Evaluation / Match %</span>
<span className="bg-[#F3F2FE] text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#8486E8]/25">Hidden Target Keywords</span>
<span className="text-[#4F51AF] font-bold text-[11px] bg-[#E1DFFF] px-2.5 py-0.5 rounded-full border border-[#8486E8]/30">+1,620 XP Total Potential</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 self-start lg:self-center">
<button onClick={() => router.push('/activities/prompt-detective')} className="bg-[#FF4D6D] hover:bg-[#C9184A] text-white font-label-md text-label-md px-space-lg py-2.5 rounded-full shadow-[0_4px_16px_rgba(255,77,109,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold" type="button">
<span className="material-symbols-outlined text-[18px]">search</span>
<span className="">Enter Detective Lab</span>
</button>
</div>
</div>
{/* Integrated 15-Level Progression Journey: L1-L2 Blue, L3-L15 White */}
<div className="bg-[#F8F6FF] rounded-2xl p-space-md border border-[#8486E8]/20 flex flex-col gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[#FF4D6D] text-[18px]">route</span>
<span className="font-label-md text-label-md text-on-surface font-bold">15-LEVEL PROGRESSION TRACK</span>
</div>
{/* Row 1: L01 to L08 (L1-L2 Blue, L3-L8 White) */}
<div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 w-full">
{/* L01 (Blue Completed) */}
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L01</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
{/* L02 (Blue Completed) */}
<div className="bg-[#3e33dd] hover:bg-[#342ac2] text-white rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-white leading-none">L02</span>
<span className="material-symbols-outlined text-[14px] text-white">check</span>
<span className="text-[9px] text-white/80 font-medium leading-none">3/3 ★</span>
</div>
{/* L03 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L03</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L04 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L04</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L05 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L05</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L06 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L06</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L07 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L07</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L08 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L08</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L09 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L09</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L10 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L10</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L11 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L11</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L12 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L12</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L13 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L13</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L14 (Incomplete White) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border border-[#8486E8]/35 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L14</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
<span className="text-[9px] text-on-surface-variant font-medium leading-none">0/3 ★</span>
</div>
{/* L15 (Incomplete White Capstone) */}
<div className="bg-white hover:bg-[#faf9ff] text-on-surface rounded-xl w-full h-16 py-2 px-1 flex flex-col items-center justify-center gap-0.5 border-2 border-dashed border-[#8486E8]/40 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
<span className="text-[11px] font-bold text-on-surface leading-none">L15</span>
<span className="material-symbols-outlined text-[14px] text-on-surface-variant">military_tech</span>
<span className="text-[9px] text-on-surface-variant font-semibold leading-none">Capstone</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
</div>



    </div>
  );
}
