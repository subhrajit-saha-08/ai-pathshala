"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type RobotState = 'sleeping' | 'analyzing' | 'excited';

interface LevelLayoutProps {
  levelId: number;
  title: string;
  mission: string;
  webcamRef: React.RefObject<HTMLVideoElement | null>;
  prediction: string;
  confidence: number;
  progress: number;
  robotState: RobotState;
  isSuccess: boolean;
  cameraError?: boolean;
}

const robotClassMap: Record<RobotState, string> = {
  sleeping: 'grayscale scale-95 opacity-70',
  analyzing: 'animate-pulse brightness-110',
  excited: 'animate-bounce drop-shadow-lg',
};

export default function LevelLayout({ levelId, title, mission, webcamRef, prediction, confidence, progress, robotState, isSuccess, cameraError }: LevelLayoutProps) {
  const isLastLevel = levelId >= 15;
  const nextHref = isLastLevel ? '/victory' : `/activities/train-the-robot/${levelId + 1}`;
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [flipped, setFlipped] = useState(false);

  // Dynamic Sparky observation based on current state
  const sparkyObservation = (() => {
    if (isSuccess) return '"Perfect! You trained me well! 🌟"';
    if (robotState === 'sleeping') return '"I don\'t see the target yet. Get in position!"';
    if (robotState === 'analyzing' && progress < 50) return '"I see something! Hold it steady..."';
    if (robotState === 'analyzing' && progress >= 50) return '"Almost there! Keep holding! 💪"';
    if (robotState === 'excited') return '"YES! That\'s it! Hold it right there! 🔥"';
    return '"Waiting for input..."';
  })();

  const handleSnapshot = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecorded(true);
      setTimeout(() => {
        setRecorded(false);
      }, 1800);
    }, 600);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        html, body { margin: 0; padding: 0; }
        body { overscroll-behavior: none; }
        main > :first-child { margin-top: 0 !important; }
        main > :last-child { margin-bottom: 0 !important; }
        ::-webkit-scrollbar { display: none; }
        
        .spark-mesh-bg {
          background: linear-gradient(135deg, #FFF0F5 0%, #FFFDF0 50%, #F3F2FE 100%);
          background-attachment: fixed;
        }
        .pillowy-card {
          background: #FFFFFF;
          border: 1px solid rgba(132, 134, 232, 0.18);
          box-shadow: 0 4px 20px -2px rgba(132, 134, 232, 0.10), 0 1px 4px rgba(32, 23, 45, 0.03);
        }
        .pillowy-card-elevated {
          background: #FFFFFF;
          border: 1px solid rgba(132, 134, 232, 0.22);
          box-shadow: 0 10px 30px -4px rgba(132, 134, 232, 0.16), 0 2px 6px rgba(32, 23, 45, 0.04);
        }
      `}} />
      <div className="spark-mesh-bg font-body text-on-surface min-h-screen selection:bg-primary selection:text-white flex flex-col">
        {/* Top Navigation Bar */}
<header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#8486E8]/20 shadow-[0_2px_16px_rgba(132,134,232,0.08)]">
<div className="h-20 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
<div className="flex items-center gap-3 sm:gap-4">
<a className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-[#20172D] font-semibold text-sm transition-all duration-200 border border-[#8486E8]/20 shadow-sm" data-path="mission-map" href="#">
<span className="material-symbols-outlined text-[18px] text-[#FF4D6D]">arrow_back</span>
<span className="">Back to Map</span>
</a>
<div className="h-6 w-[1px] bg-outline-variant hidden sm:block"></div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-mono text-xs font-bold text-[#FF4D6D] uppercase tracking-wider">Mission Active</span>
<span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-ping"></span>
</div>
<div className="font-bold text-base sm:text-lg text-[#20172D] tracking-tight truncate">
            {title}
          </div>
</div>
</div>
{/* Center Progress & Nav Pills */}
<div className="hidden lg:flex items-center gap-6 bg-[#FAFAFE] px-5 py-2 rounded-full border border-[#8486E8]/20 shadow-sm">
<div className="flex items-center gap-2 pr-3 border-r border-[#8486E8]/20">
<span className="font-mono text-xs font-bold text-[#5A4E6B] uppercase">Progress</span>
<div className="flex items-center gap-1.5 ml-1">
<span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] shadow-[0_0_6px_rgba(255,77,109,0.5)]"></span>
<span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] shadow-[0_0_6px_rgba(255,77,109,0.5)]"></span>
<span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] shadow-[0_0_6px_rgba(255,77,109,0.5)]"></span>
<span className="w-2.5 h-2.5 rounded-full bg-[#FFB703] ring-2 ring-[#FFB703]/40 animate-pulse"></span>
<span className="w-2.5 h-2.5 rounded-full bg-[#EAE9F9]"></span>
<span className="w-2.5 h-2.5 rounded-full bg-[#EAE9F9]"></span>
</div>
</div>
<nav className="flex items-center gap-1">
<a aria-current="page" className="px-3.5 py-1.5 font-bold text-xs rounded-full bg-[#8486E8] text-white shadow-sm transition-all" data-path="train-the-robot" href="#">Vision Stage</a>
<a className="px-3.5 py-1.5 font-semibold text-xs rounded-full text-[#5A4E6B] hover:text-[#20172D] hover:bg-[#EEF0FF] transition-all" data-path="telemetry-log" href="#">Telemetry Log</a>
<a className="px-3.5 py-1.5 font-semibold text-xs rounded-full text-[#5A4E6B] hover:text-[#20172D] hover:bg-[#EEF0FF] transition-all" data-path="model-inspector" href="#">Weights</a>
</nav>
</div>
{/* Right XP & Avatar */}
<div className="flex items-center gap-3">
<div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF3D6] text-[#8F5E00] border border-[#FFB703]/40 shadow-sm">
<span className="material-symbols-outlined text-[18px] text-[#FFB703] fill-1">bolt</span>
<span className="font-mono text-xs font-bold tracking-wide">+150 XP</span>
</div>
<div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF4D6D] to-[#FF8FA3] flex items-center justify-center text-white shadow-md shadow-[#FF4D6D]/20 ring-2 ring-white">
<span className="material-symbols-outlined text-[20px]">person</span>
</div>
</div>
</div>
</header>
{/* Main Training Workspace */}
<main className="w-full pt-24 pb-12 flex-1">
<div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
{/* Decorative background blur orbs */}
<div className="absolute -top-10 left-1/4 w-[480px] h-[480px] bg-[#FF4D6D]/8 rounded-full blur-[140px] pointer-events-none -z-10"></div>
<div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-[#FFB703]/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
<div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-[#8486E8]/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
{/* Left 8 Columns: Camera Hub, Controls & Recognition Gauges */}
<div className="lg:col-span-8 flex flex-col gap-5">
{/* Step Indicator Bar */}
<div className="pillowy-card px-6 py-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
<div className="flex items-center gap-3.5">
<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4D6D] text-white font-bold text-sm shadow-md shadow-[#FF4D6D]/30">1</span>
<div>
<span className="font-mono text-xs font-bold text-[#FF4D6D] uppercase tracking-wider block">Training Step</span>
<span className="font-bold text-base sm:text-lg text-[#20172D]">{mission}</span>
</div>
</div>
<div className="flex items-center gap-2">
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF3D6] text-[#8F5E00] font-semibold text-xs border border-[#FFB703]/30">
<span className="material-symbols-outlined text-[16px] text-[#FFB703]">wb_sunny</span>
<span className="">High Contrast Mode</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF0FF] text-[#35388E] font-semibold text-xs border border-[#8486E8]/30">
<span className="w-2 h-2 rounded-full bg-[#8486E8] animate-pulse"></span>
<span className="">60 FPS Raw</span>
</div>
</div>
</div>
{/* Camera Viewfinder Frame */}
<div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden pillowy-card-elevated border-2 border-white shadow-xl group select-none bg-[#1A1429]">
{cameraError ? (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#20172D]/80 backdrop-blur-md z-40 text-center px-4">
    <span className="material-symbols-outlined text-[48px] text-[#FF4D6D] mb-4">no_photography</span>
    <h3 className="text-xl font-bold text-white mb-2">Camera Access Denied</h3>
    <p className="text-sm text-white/80 max-w-sm">Please allow camera permissions in your browser settings to train Sparky.</p>
  </div>
) : (
  <video ref={webcamRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.01]" />
)}
<div className="absolute inset-0 bg-gradient-to-t from-[#20172D]/90 via-transparent to-[#20172D]/40 pointer-events-none"></div>
{/* Viewfinder Top Bar */}
<div className="absolute top-5 left-5 flex items-center gap-2">
<div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-[#8486E8]/20">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D6D] opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4D6D]"></span>
</span>
<span className="font-bold text-xs text-[#20172D] tracking-wide">REC</span>
<span className="font-mono text-xs text-[#5A4E6B] font-semibold pl-1">00:04:18</span>
</div>
<div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md font-semibold text-xs text-[#20172D] border border-[#8486E8]/20">
<span className="material-symbols-outlined text-[16px] text-[#FFB703]">flare</span>
<span className="">Light: 840 Lux</span>
</div>
</div>
<div className="absolute top-5 right-5 flex items-center gap-2">
<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-xs font-semibold text-[#20172D] border border-[#8486E8]/20">
<span className="material-symbols-outlined text-[16px] text-[#5A4E6B]">mic_off</span>
<span className="text-[#C8C5E5]">|</span>
<span className="material-symbols-outlined text-[16px] text-[#8486E8]">lens</span>
<span className="text-[#5A4E6B] font-mono">Clean</span>
</div>
<button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#20172D] hover:text-[#FF4D6D] transition-colors shadow-md border border-[#8486E8]/20">
<span className="material-symbols-outlined text-[18px]">fullscreen</span>
</button>
</div>
{/* Face Alignment Target Overlay */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
<div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
<div className="absolute inset-0 rounded-full bg-[#8486E8]/10 blur-md animate-pulse"></div>
<svg className="absolute inset-0 w-full h-full text-[#8486E8]/60" fill="none" stroke="currentColor" strokeDasharray="3 4" strokeWidth="1" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="48"></circle>
<circle cx="50" cy="50" opacity="0.6" r="38"></circle>
</svg>
<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white shadow-md border border-[#8486E8]/30">
<span className="font-mono text-[11px] text-[#FF4D6D] font-bold tracking-wider">ALIGN FACE CENTER</span>
</div>
<div className="w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-4">
<span className="material-symbols-outlined text-[40px] text-[#FFB703] mb-1 drop-shadow">face</span>
<span className="text-xs sm:text-sm text-white font-semibold drop-shadow-md">Position face in center ring</span>
<span className="text-[11px] text-white/80 mt-1 font-medium drop-shadow-sm">Keep warm spotlight on your left cheek</span>
</div>
<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#8486E8]/20">
<span className="w-2 h-2 rounded-full bg-[#FFB703]"></span>
<span className="font-mono text-xs font-bold text-[#8F5E00]">Shadow Offset: +24°</span>
</div>
</div>
</div>
{/* Bottom telemetry chips over viewfinder */}
<div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
<div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-lg border border-[#8486E8]/20">
<div className="flex items-center gap-1.5 text-xs font-semibold text-[#5A4E6B]">
<span className="">Model Target:</span>
<span className="font-mono font-bold text-[#FF4D6D] bg-[#FFE5EC] px-2 py-0.5 rounded-md">CLASS: {prediction || 'NONE'}</span>
</div>
<span className="text-[#C8C5E5] text-xs">•</span>
<div className="flex items-center gap-1 text-[#8F5E00] font-semibold text-xs">
<span className="material-symbols-outlined text-[16px] text-[#FFB703]">wb_twilight</span>
<span className="">Harsh Silhouette Detected</span>
</div>
</div>
<div className="flex items-center gap-2 bg-white/95 backdrop-blur-xl px-3.5 py-1.5 rounded-2xl shadow-lg border border-[#8486E8]/20">
<span className="font-mono text-xs font-bold text-[#5A4E6B] uppercase tracking-wider">Shadow Tolerance</span>
<span className="font-mono text-sm font-bold text-[#FF4D6D]">68%</span>
</div>
</div>
{/* Mission Success Overlay */}
{isSuccess && (
<div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#20172D]/60 backdrop-blur-xl rounded-3xl transition-opacity duration-500 animate-in fade-in">
<div className="flex flex-col items-center gap-4 px-8 py-10 rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl border border-[#8486E8]/30 max-w-sm mx-auto text-center">
<span className="text-6xl">🎉</span>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#20172D] tracking-tight leading-tight">Mission Passed!</h2>
<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF0FF] border border-[#8486E8]/30">
<span className="w-3 h-3 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
<span className="font-mono text-sm font-bold text-[#35388E] uppercase tracking-wider">Target Locked</span>
</div>
<p className="text-sm text-[#5A4E6B] font-medium leading-relaxed">Sparky has locked in your signal with <strong className="text-[#FF4D6D]">100% confidence</strong>. Great work, AI researcher!</p>
<div className="flex items-center gap-2 mt-2">
<span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF4D6D] text-white font-bold text-sm shadow-lg shadow-[#FF4D6D]/30">
<span className="material-symbols-outlined text-[18px]">stars</span>
+150 XP Earned
</span>
</div>
<Link
  href={nextHref}
  className="mt-2 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8486E8] hover:bg-[#6C6ED8] text-white font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(132,134,232,0.35)] hover:shadow-[0_6px_28px_rgba(132,134,232,0.50)] active:scale-95 transition-all duration-150"
>
  <span className="material-symbols-outlined text-[18px]">{isLastLevel ? 'emoji_events' : 'arrow_forward'}</span>
  {isLastLevel ? 'Finish Training' : 'Next Level'}
</Link>
</div>
</div>
)}
</div>
{/* Bottom Action Controls Bar */}
<div className="pillowy-card p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
<button 
  className="group relative px-8 py-3.5 rounded-full bg-[#FF4D6D] hover:bg-[#F43F5E] text-white font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(255,77,109,0.35)] hover:shadow-[0_6px_28px_rgba(255,77,109,0.50)] active:scale-95 transition-all duration-150 flex items-center gap-2.5 overflow-hidden" 
  id="btn-snapshot"
  onClick={handleSnapshot}
>
  {isRecording ? (
    <>
      <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
      <span>Recording sample...</span>
    </>
  ) : recorded ? (
    <>
      <span className="material-symbols-outlined text-[20px]">check_circle</span>
      <span>Sample Recorded!</span>
    </>
  ) : (
    <>
      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">camera</span>
      <span className="">Train Step Snapshot</span>
    </>
  )}
</button>
<button className="px-5 py-3.5 rounded-full bg-[#F5F4FD] hover:bg-[#EAE9F9] text-[#20172D] font-bold text-sm transition-all duration-150 flex items-center gap-2 border border-[#8486E8]/20 shadow-sm" id="btn-retake">
<span className="material-symbols-outlined text-[18px] text-[#5A4E6B]">cached</span>
<span className="hidden md:inline">Reset Pose</span>
</button>
</div>
<div className="flex items-center gap-4 w-full sm:w-auto justify-end">
<div className="hidden xl:flex flex-col text-right">
<span className="font-mono text-xs font-bold text-[#5A4E6B] uppercase">Training Buffer</span>
<span className="text-xs font-bold text-[#20172D]">14 / 20 Samples Collected</span>
</div>
<div className="w-full sm:w-36 h-3 bg-[#EEF0FF] rounded-full overflow-hidden p-0.5 border border-[#8486E8]/20">
<div className="h-full bg-gradient-to-r from-[#FFB703] to-[#FF4D6D] rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
</div>
<button className="w-10 h-10 rounded-full bg-[#F5F4FD] hover:bg-[#EAE9F9] text-[#20172D] flex items-center justify-center transition-colors border border-[#8486E8]/20 shadow-sm">
<span className="material-symbols-outlined text-[20px] text-[#5A4E6B]">tune</span>
</button>
</div>
</div>
{/* Circular Metric Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/* Metric 1: Recognition Confidence */}
<div className="pillowy-card p-5 rounded-3xl flex items-center justify-between gap-4">
<div className="flex items-center gap-4">
<div className="relative w-16 h-16 flex items-center justify-center shrink-0">
<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path className="text-[#EEF0FF]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-[#FF4D6D]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="92, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-mono text-sm font-bold text-[#20172D] leading-none">{Math.round(confidence * 100)}%</span>
</div>
</div>
<div>
<span className="font-mono text-xs font-bold text-[#5A4E6B] uppercase tracking-wider block">Recognition Confidence</span>
<span className="font-bold text-base text-[#20172D]">High Certainty</span>
<span className="text-xs font-medium text-[#FF4D6D] block">Feature map locked cleanly</span>
</div>
</div>
<div className="hidden sm:flex flex-col items-end">
<span className="px-3 py-1 rounded-full bg-[#FFE5EC] text-[#9E002A] font-mono text-xs font-bold uppercase border border-[#FF4D6D]/20">Optimal</span>
</div>
</div>
{/* Metric 2: Light Uniformity */}
<div className="pillowy-card p-5 rounded-3xl flex items-center justify-between gap-4">
<div className="flex items-center gap-4">
<div className="relative w-16 h-16 flex items-center justify-center shrink-0">
<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path className="text-[#EEF0FF]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-[#FFB703]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="64, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-mono text-sm font-bold text-[#8F5E00] leading-none">64%</span>
</div>
</div>
<div>
<span className="font-mono text-xs font-bold text-[#5A4E6B] uppercase tracking-wider block">Light Uniformity</span>
<span className="font-bold text-base text-[#20172D]">Shadow Cast</span>
<span className="text-xs font-medium text-[#8F5E00] block">36% of cheek occluded</span>
</div>
</div>
<div className="hidden sm:flex flex-col items-end">
<span className="px-3 py-1 rounded-full bg-[#FFF3D6] text-[#7D5800] font-mono text-xs font-bold uppercase border border-[#FFB703]/30">Challenging</span>
</div>
</div>
</div>
</div>
{/* Right 4 Columns: Copilot Sparky, Aha! Card & Batch Metrics */}
<div className="lg:col-span-4 flex flex-col gap-6">
{/* Copilot Sparky Card */}
<div className="relative pillowy-card-elevated rounded-3xl p-6 overflow-hidden flex flex-col gap-4">
<div className="absolute -right-10 -top-10 w-44 h-44 bg-[#FFB703]/10 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between pb-1">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-[#FF4D6D] animate-pulse"></span>
<span className="font-bold text-sm sm:text-base text-[#20172D] uppercase tracking-wide">Copilot Sparky</span>
</div>
<span className="font-mono text-[11px] font-bold text-[#35388E] px-2.5 py-1 rounded-full bg-[#EEF0FF] border border-[#8486E8]/20">NEURAL CO-RUNNER</span>
</div>
{/* Robot Visual Viewport */}
<div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#F9F8FF] to-[#ECE9FE] flex items-center justify-center border border-[#8486E8]/20 shadow-inner group">
<div className="absolute inset-0 bg-radial from-[#8486E8]/10 via-transparent to-transparent pointer-events-none"></div>
<img alt="Sparky luxury spherical porcelain companion robot with glowing star eyes" className={`w-full h-full object-contain p-2 transform transition-all duration-300 ease-in-out ${robotClassMap[robotState]}`} src="https://lh3.googleusercontent.com/aida-public/AB6AXuACbW5cpczzg8WmEnE9orycv_Vd2hBWyfn01q_6I-aV9xbFiB2fdFZCnfOaC52kKW4Top5nQd4d2xV8WdTFxbRHj3Vrrm6WTMleRrZ617joszdVocv5ALGgusTS_2C_gwpxCYfo7wfQ36sLKtMnk8VRu0698tPePZzlTDz5u1YPfjsJwum8GnJcxlKJBlzYXZ6qMU9ZMUtwKOtP2QdNSiNbtMOPpDR_AKRuivVo-ESMHsGJidS1aj_V"/>
<div className="absolute bottom-3 inset-x-3 flex justify-center">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#8486E8]/20">
<span className="w-2 h-2 rounded-full bg-[#FF4D6D]"></span>
<span className="font-mono text-[11px] font-bold text-[#5A4E6B] uppercase tracking-wider">Haptic Gyro Synced</span>
</div>
</div>
</div>
{/* Mood Chips */}
<div className="flex items-center justify-between bg-[#F5F4FD] p-1.5 rounded-full border border-[#8486E8]/15">
<button className={`flex-1 py-1.5 rounded-full font-bold text-xs transition-all duration-300 ease-in-out ${robotState === 'excited' || isSuccess ? 'bg-white text-[#FF4D6D] shadow-sm border border-[#8486E8]/10' : 'hover:bg-white/60 text-[#5A4E6B]'}`}>
                Delighted ★
              </button>
<button className={`flex-1 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 ease-in-out ${robotState === 'analyzing' ? 'bg-white text-[#8486E8] shadow-sm border border-[#8486E8]/10' : 'hover:bg-white/60 text-[#5A4E6B]'}`}>
                Analyzing
              </button>
<button className={`flex-1 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 ease-in-out ${robotState === 'sleeping' ? 'bg-white text-[#5A4E6B] shadow-sm border border-[#8486E8]/10' : 'hover:bg-white/60 text-[#5A4E6B]'}`}>
                Curious
              </button>
</div>
{/* Sparky Dialogue Bubble */}
<div className={`relative p-4 rounded-2xl border shadow-sm transition-all duration-300 ease-in-out ${
  isSuccess ? 'bg-[#ECFDF5] border-[#34D399]/30' :
  robotState === 'excited' ? 'bg-[#FFF0F5] border-[#FF4D6D]/30' :
  'bg-[#FFFDF0] border-[#FFB703]/30'
}`}>
<div className="flex items-start gap-3">
<span className={`material-symbols-outlined text-[24px] shrink-0 mt-0.5 fill-1 transition-all duration-300 ease-in-out ${
  isSuccess ? 'text-[#34D399]' :
  robotState === 'excited' ? 'text-[#FF4D6D]' :
  'text-[#FFB703]'
}`}>smart_toy</span>
<div className="flex flex-col gap-1">
<span className="font-mono text-[11px] font-bold text-[#8F5E00] uppercase tracking-wider">Sparky&#39;s Observation</span>
<p className="text-sm text-[#20172D] leading-relaxed transition-all duration-300 ease-in-out">
  {sparkyObservation}
</p>
</div>
</div>
</div>
</div><div 
  id="aha-card"
  onClick={() => setFlipped(!flipped)}
  className={`pillowy-card rounded-2xl p-5 border shadow-sm relative overflow-hidden cursor-pointer transition-colors duration-300 ${flipped ? 'bg-[#FFFDF0] border-[#FFB703]/40' : 'bg-white/95 border-[#8486E8]/20'}`}
><div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-[20px] text-[#8486E8]">psychology</span><span className="font-mono text-[11px] font-bold text-[#35388E] uppercase tracking-wider">AI Concept Unlocked</span></div><span className="px-2.5 py-0.5 rounded-full bg-[#EEF0FF] text-[#35388E] font-mono text-[11px] font-bold uppercase border border-[#8486E8]/20">What You Learn</span></div><p className="text-sm text-[#20172D] leading-relaxed">AI doesn't see your face like a person does. It looks at <strong className="text-[#35388E] font-semibold">patterns of light and dark</strong>, and uses those patterns to make a smart guess! When shadows hide half your smile, AI has to learn that half a smile is still a smile.</p></div>
{/* Aha! Insight Card (Tactile Pill / Flip Card) */}
{/* Current Batch Metrics */}
</div>
</div>
</div>
{/* Script for interactive card flip & snapshot feedback */}

</main>
{/* Clean Warm Footer */}
<footer className="w-full bg-white/70 backdrop-blur-md border-t border-[#8486E8]/20 py-4 mt-auto">
<div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#5A4E6B]">
<div className="">Spark School Neural Lab Engine · AI Inference Stage v3.2</div>
<div className="flex items-center gap-3">
<span className="inline-flex items-center gap-1.5 font-semibold text-[#FF4D6D]">
<span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse"></span>
          Vision Pipeline Nominal
        </span>
<span className="text-[#C8C5E5]">|</span>
<span className="">Audio Copilot 'Sparky' Connected</span>
</div>
</div>
</footer>
      </div>
    </>
  );
}
