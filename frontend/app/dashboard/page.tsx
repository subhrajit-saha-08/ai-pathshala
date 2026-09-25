"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useProfileStore from "@/store/useProfileStore";

export default function DashboardPage() {
  const router = useRouter();
  const {
    childName,
    childAvatar,
    ageBand,
    childAge,
    grade,
    school,
    stateRegion,
    userStats,
    activities,
  } = useProfileStore();

  const activeMission = activities?.find(a => a.status === 'In Progress') || activities?.[0];
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [totalXP, setTotalXP] = useState(0);
  const [beltIndex, setBeltIndex] = useState(-1);
  const [avatarName, setAvatarName] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);

  const avatarsConfig = [
    {name: 'Nova', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP1aw7H0VgTM1kY0PjsdxXcBeH8pceFIqM6SBXmt5oXDCTSlYY0lBfQszRuO6VSSKUzK56JOutrVp1SwOqos24KptLerYlLnvPmb0agI5sckste6RSLmGmAUwQ8fdjl7aoNa04R-7yoy2etW6P_7ClAxrsjE9C8y_-VmcFODGJ3vgSEHDz1eo7yl1yqmzAFquMPIElZ-n4JoPVkwWSEZSZ5JSIH3RJvT4iLGm3-5y-H15UdFWsj2oF'},
    {name: 'Aero', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8n5-a9gCsJYjBoZlLg-78NQ7ZVxIObaF7CnUCKrGL6IrASTuBYGutcb0IN_ntAQWUA8nSJygu5SYsU789yIwo02zpzSHV_lCwkRG_K1_IB_vbQ4ztudOkohiAxSzE4N_4zaKOzTO-mNVjh-aIwqXq1ou7pmD5Qmh7LW4p-APGdZptStvHKlKuZF096I79HYDVNuMFnPmRNQiI85wUywjIl59svJ6qhI-JjAKDugsmzuoEHArpoiBH'},
    {name: 'Pixel', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjiPnXe6-6ZKJcFetR_HGO--_TlK7FSmd-mY-MbRP56Tsl2ymLWnftMzAuoDsVbEHyuhxVGkSiFgY9YKH0vJpm4o1GlZzZYPWfGewjeXvoXFTK1BiXeT6Ae7n0n2XJ5kTVI3f61pecVFDY-V5A3nN9c9nZcDl6n8qzCXvG4q-U3oJoOWMGOdAQveT-KPkLXKrnop-TPY2UM3sC-sHe_RqJPdAbkhiQ0GzmWSp3QzV5i_IRm83oJkEa'},
    {name: 'Orion', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb167uPpC70Ers_DRd-gw__dQ3PgUz7fI3rMnEl1NXXCEXe14vS7k9em9AdQb2o2rlTlqUX-2lKQOLfforYWCIutQfAUDGtjfOG5Bpf4_sPFWG7AO8-WB2mgtVhFhZGrPcQct8a58EZKxbtueRhBAEXFi0Y-Vl5hrAVZyBr8iHPE1_NuLCDp3Mbh1KfDYfCNJDW0GWIUm4kUCgSyI9YMup4N5nPqksFKP5Vh4PRKvuvcam3rVj5x8_'},
    {name: 'Maya', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQJeSbjYhgmxqqpslpGjGReRck6Q9NZW2tOFHfYRYVescpfrB52bCGU39W7GPv1vssXaANDSh_nwqC5iG-ArI9DeY04ovOlfxbQk-6FfuhocjklUa8UD2LtDhCDIEpssd2xOmWBMPdxKLhzn0UPX1MncgwON3SD17sZDkf0HLNp4F2EGVyuOYc78rFS8aOgGejyqnM2YvzAgjHEajJhPliq_z3dm8FgHtiRWARl2KseFVi7FiPw0KO'},
    {name: 'Zephyr', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoZOb6nZlqkh7nI4_Tq9wZOC7ouTpXc_krwTtU5lCc8YgnMz5Tt9QJV57OeRSnII8Csy_Jjz1saZN60ok_DSInX0H6WOWotXLO7dIO52Ob33JScb1wtrjv39NL8Sarcg5-AOEOOkQJJREHy-U9iu3qgEIF_IKswfvz12ig99WO9u6N9Mb6lMEud2zovTEKSxpmTWAhA9Q5qiE7c5jUxpVDOFSNhV2S5jxKXVmb4kP-Vr5zpK_uGPjy'}
  ];

  const avatarPath = avatarsConfig.find(a => a.name === (avatarName || childAvatar))?.img || avatarsConfig[1].img;

  const belts = ['White', 'Orange', 'Yellow', 'Green', 'Purple'];
  const currentBelt = beltIndex >= 0 ? belts[beltIndex] + ' Belt' : 'No Belt Yet';
  const xpGoal = 1500;

  useEffect(() => {
    setMounted(true);
    if (!childName || childName.trim() === "") {
      router.push("/profile");
    }

    const storedXP = localStorage.getItem('spark_total_xp');
    if (storedXP) setTotalXP(parseInt(storedXP, 10));

    const storedBelt = localStorage.getItem('spark_belt_index');
    if (storedBelt) setBeltIndex(parseInt(storedBelt, 10));

    const storedAvatar = localStorage.getItem('spark_child_avatar');
    if (storedAvatar) setAvatarName(storedAvatar);

    const storedLevel = localStorage.getItem('spark_current_level');
    if (storedLevel) setCurrentLevel(parseInt(storedLevel, 10));
  }, [childName, router]);

  if (!mounted || !childName) return null;

  return (
    <div className="bg-gradient-to-br from-[#FFF0F5] via-[#FFFDF0] to-[#F3F2FE] font-body-md text-on-surface antialiased min-h-screen">
      <aside className={`fixed left-0 top-0 h-full bg-surface-container-low/90 backdrop-blur-xl z-50 flex flex-col justify-between p-space-md border-r border-[#8486E8]/20 shadow-[0_10px_32px_rgba(255,77,109,0.06)] transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap flex-shrink-0 ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 px-0 border-none'}`}>
        <div className="flex flex-col gap-space-lg">
          <div className="flex items-center justify-between px-space-xs py-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4D6D] to-[#FF85A1] flex items-center justify-center shadow-[0_6px_16px_rgba(255,77,109,0.3)]">
                <span className="material-symbols-outlined text-white text-xl">
                  auto_awesome
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">
                  Spark
                </span>
                <span className="font-label-sm text-label-sm text-[#FF4D6D] tracking-wide uppercase font-bold">
                  School
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <nav
            className="flex flex-col gap-space-xs"
            data-active-classes="bg-gradient-to-r from-[#FF4D6D] to-[#FF758F] text-white shadow-[0_4px_16px_rgba(255,77,109,0.28)] font-bold"
          >
            {/* 1st: Home */}
            <a
              aria-current="page"
              className="flex items-center justify-between px-space-md py-space-sm rounded-full transition-all group bg-gradient-to-r from-[#FF4D6D] to-[#FF758F] text-white shadow-[0_4px_16px_rgba(255,77,109,0.28)] font-bold"
              data-path="dashboard-home" onClick={() => router.push('/dashboard')}
              href="/dashboard"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-white">
                  cottage
                </span>
                <span className="font-label-lg text-label-lg">Profile</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>

            {/* 3rd: Activities */}
            <a
              className="flex items-center justify-between px-space-md py-space-sm rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
              data-path="learning-activities" onClick={() => router.push('/activity-list')}
              href="#"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary">
                  explore
                </span>
                <span className="font-label-lg text-label-lg">Activities</span>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-[#E8E9FC] text-[#4346A2] font-label-sm text-label-sm font-bold">
                4 New
              </span>
            </a>
            {/* 3rd (cont): Projects */}
            <a
              className="flex items-center justify-between px-space-md py-space-sm rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
              data-path="creative-projects"
              href="#"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[#B26A00]">
                  palette
                </span>
                <span className="font-label-lg text-label-lg">Projects</span>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-[#FFF3BF] text-[#B26A00] font-label-sm text-label-sm font-bold">
                2 Active
              </span>
            </a>

            {/* 5th: Mentor */}
            <a
              className="flex items-center justify-between px-space-md py-space-sm rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group"
              data-path="discover-worlds"
              href="#"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary">
                  supervisor_account
                </span>
                <span className="font-label-lg text-label-lg">Mentor</span>
              </div>
            </a>
          </nav>
        </div>
        <div className="p-space-sm rounded-2xl bg-surface-container-lowest border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] flex items-center gap-space-sm">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF4D6D]">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#FFB703] ring-2 ring-surface-container-lowest animate-pulse"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface truncate font-bold">
              Sparky AI Co-Pilot
            </span>
            <span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              Online
            </span>
          </div>
        </div>
      </aside>
      <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out flex-1 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <header className={`fixed top-0 right-0 h-16 bg-[#FFF0F5]/80 backdrop-blur-xl z-40 border-b border-[#8486E8]/15 shadow-[0_2px_12px_rgba(255,77,109,0.04)] px-gutter flex items-center justify-between transition-all duration-300 ease-in-out ${isSidebarOpen ? 'left-64' : 'left-0'}`}>
          <div className="flex items-center gap-space-sm">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 mr-2 rounded-full hover:bg-white/50 transition-colors text-on-surface flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-xl">menu</span>
              </button>
            )}
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Hi, {childName || "Explorer"}! ✦
            </span>
            <span className="px-space-sm py-space-xs rounded-full bg-[#FFF3BF] text-[#B26A00] font-label-sm text-label-sm hidden sm:inline-flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-sm">bolt</span>{" "}
              Level {userStats?.currentLevel || 1} {ageBand || "Explorer"}
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="hidden md:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface-variant border border-[#8486E8]/15">
              <span className="material-symbols-outlined text-base text-[#FF4D6D]">
                psychology
              </span>
              <span className="font-label-sm text-label-sm font-medium">
                Sparky is ready to help
              </span>
            </div>
            <button
              aria-label="Notifications"
              className="relative p-space-xs rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF4D6D] ring-2 ring-surface"></span>
            </button>
            <div className="flex items-center gap-space-xs pl-space-xs">
              <img
                alt="Profile Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF4D6D]/40"
                src={avatarPath}
              />
            </div>
          </div>
        </header>
        <main className="relative pt-16 flex-1 w-full px-gutter">
          <div className="flex flex-col w-full pb-space-xl">
            {/*  Top Greeting & Live Streak Context  */}
            <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-lg">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-space-xs">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Hi, {childName || "Explorer"}!
                  </h1>
                  <span className="inline-flex items-center justify-center text-xl animate-bounce">
                    ✨
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Ready to discover something amazing with Sparky today?
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm">
                <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-white/90 border border-[#8486E8]/20 shadow-sm text-primary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-base text-[#FF4D6D]">
                    architecture
                  </span>
                  <span>
                    {ageBand || "Builder"} Stage · Age {childAge || 11} ·{" "}
                    {grade || "Grade 6"}
                  </span>
                </div>
                <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-[#FFF3BF] border border-[#FFB703]/30 text-[#B26A00] font-label-md text-label-md shadow-sm">
                  <span className="material-symbols-outlined text-base fill-1 text-[#FFB703]">
                    local_fire_department
                  </span>
                  <span className="font-bold">{userStats?.streakDays || 0}-Day Spark Streak!</span>
                </div>
              </div>
            </div>
            {/*  Primary 12-Column Responsive Workspace Grid  */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              {/*  ==============================================================  */}
              {/*  LEFT / CENTRAL LEARNING ZONE (~65% width: 8 of 12 cols on desktop)  */}
              {/*  ==============================================================  */}
              <div className="lg:col-span-8 flex flex-col gap-space-xl">
                {/*  HERO CARD: Continue Your Journey (Tactile Clay Hero)  */}
                <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FF4D6D] via-[#C9184A] to-[#6A0DAD] text-white p-space-lg lg:p-space-xl shadow-[0_16px_36px_rgba(255,77,109,0.25)] border border-white/20 group">
                  {/*  Ambient Glowing Clay Blob Orbs  */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#FFB703]/25 blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-20 -left-12 w-56 h-56 rounded-full bg-[#8486E8]/30 blur-2xl pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-space-lg">
                    <div className="flex flex-col gap-space-sm max-w-xl">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-space-sm py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-label-sm text-label-sm font-semibold tracking-wide uppercase border border-white/20">
                          Active Mission
                        </span>
                        <span className="text-[#FFE5EC] text-xs">●</span>
                        <span className="font-label-sm text-label-sm text-[#FFE5EC]">
                          Auto-saved today, 7:42 PM
                        </span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-white tracking-tight leading-tight">
                        Continue Mission: Prompt Challenge (Level {currentLevel})
                      </h2>
                      <p className="font-body-md text-body-md text-white/90">
                        Master AI Prompting - Level {currentLevel} of 15
                      </p>
                      {/*  Progress Bar & Checkpoint Tracker  */}
                      <div className="mt-space-xs flex flex-col gap-space-xs bg-black/15 backdrop-blur-md p-space-sm rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center text-white font-label-sm text-label-sm">
                          <span className="flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-sm text-[#FFD166]">
                              flag
                            </span>
                            Checkpoint 2: Dataset Fairness
                          </span>
                          <span className="font-bold text-[#FFD166]">
                            {Math.round((currentLevel / 15) * 100)}% Done
                          </span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden p-0.5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#FFB703] transition-all duration-700 shadow-sm"
                            style={{ width: `${(currentLevel / 15) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-[#FFE5EC] pt-0.5">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              timer
                            </span>{" "}
                            Est. 10 mins remaining
                          </span>
                          <span className="flex items-center gap-1 font-bold text-[#FFD166]">
                            <span className="material-symbols-outlined text-xs">
                              military_tech
                            </span>{" "}
                            Up to +50 XP Reward
                          </span>
                        </div>
                      </div>
                      {/*  CTA Row  */}
                      <div className="flex flex-wrap items-center gap-space-sm mt-space-sm">
                        <button onClick={() => router.push(`/activities/prompt-challenge/${currentLevel}`)}
                          className="cursor-pointer px-space-lg py-space-sm rounded-full bg-gradient-to-r from-[#FFB703] to-[#FFD166] text-[#4A4058] font-headline-sm text-headline-sm shadow-[0_8px_20px_rgba(255,183,3,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold group/btn"
                          type="button"
                        >
                          <span>Continue Mission</span>
                          <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </button>
                        <button
                          className="px-space-md py-space-sm rounded-full bg-white/15 hover:bg-white/25 text-white font-label-md text-label-md backdrop-blur-sm border border-white/20 transition-colors flex items-center gap-1.5"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-base">
                            rule
                          </span>{" "}
                          Mission Guide
                        </button>
                      </div>
                    </div>
                    {/*  Hero Tactile 3D Clay Illustration  */}
                    <div className="relative flex-shrink-0 w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-white/15 backdrop-blur-md p-space-sm flex items-center justify-center border border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
                      <img
                        className="w-full h-full object-cover rounded-2xl"
                        data-alt="A whimsical 3D clay-style scene of a friendly periwinkle robot holding an oversized golden magnifying glass, closely inspecting colorful floating dataset cards. Soft lavender ambient lighting, warm yellow glows, rounded clay aesthetics for child learners."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7kxrNaxYafd0ItS6vEYK5NMMPd6_7T3e-nydRXMG66eWQ1xBfVBJNPLGfgWaEYQcz1RmakzTq1Ms4rP2Ogq745-A-SjeE4FK2wtx0yBB1v2wGwKraFrOl_PtDGMKXKRb7tIdl5m7OmZgMwzdpQa78amncn_gg4Gp62vIq4laxE1kPC7JKprVaqoLvS88YuOviN6l1O93Le49BfR3kV9V866FkeeqRk3Ya_-GDmCgWv5em08uvrtsP"
                      />
                      <div className="absolute -bottom-3 -right-3 px-space-sm py-1 rounded-full bg-[#FFB703] text-[#4A4058] font-label-sm text-label-sm font-bold shadow-md flex items-center gap-1 border border-white/30">
                        <span className="material-symbols-outlined text-sm">
                          stars
                        </span>{" "}
                        2/4 Steps
                      </div>
                    </div>
                  </div>
                </section>
                {/*  YOUR ACTIVITY JOURNEY: Granular Activity Tracker  */}
                <section className="flex flex-col gap-space-md">
                  <div className="flex flex-wrap items-end justify-between gap-space-sm">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#FF4D6D] font-bold">
                        Performance &amp; Mastery
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                        Your Activity Journey
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Deep per-activity tracking with accuracy, attempts, and
                        time
                      </p>
                    </div>
                    {/*  Interactive Filter Tabs  */}
                    <div
                      className="flex items-center gap-1 p-1 bg-surface-container rounded-full border border-[#8486E8]/20"
                      id="filter-tabs"
                    >
                      <button
                        className="filter-tab px-space-md py-1 rounded-full bg-white text-[#FF4D6D] font-label-sm text-label-sm font-bold shadow-sm transition-all"
                        data-category="all"
                        type="button"
                      >
                        All Tracks
                      </button>
                      <button
                        className="filter-tab px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"
                        data-category="ethics"
                        type="button"
                      >
                        AI Ethics
                      </button>
                      <button
                        className="filter-tab px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"
                        data-category="vision"
                        type="button"
                      >
                        Computer Vision
                      </button>
                      <button
                        className="filter-tab px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"
                        data-category="logic"
                        type="button"
                      >
                        Logic &amp; Prompts
                      </button>
                    </div>
                  </div>
                  {/*  Activity Cards List  */}
                  <div className="grid grid-cols-1 gap-space-md">
                    {/*  Card 1: Bias Card Game  */}
                    <div className="group bg-surface-container-lowest p-space-md rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] hover:-translate-y-0.5 transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
                      <div className="flex items-start gap-space-md">
                        <div className="w-14 h-14 rounded-2xl bg-[#E8E9FC] flex items-center justify-center text-tertiary shadow-inner flex-shrink-0">
                          <span className="material-symbols-outlined text-3xl">
                            style
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <span className="px-space-xs py-0.5 rounded-full bg-[#E8E9FC] text-[#4346A2] font-label-sm text-label-sm font-bold">
                              AI Ethics
                            </span>
                            <span className="text-on-surface-variant text-xs">
                              Level 2 · Round 2/4
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#FFF3BF] text-[#B26A00] font-label-sm text-label-sm font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] animate-pulse"></span>{" "}
                              In Progress
                            </span>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-[#FF4D6D] transition-colors">
                            Bias Card Game
                          </h3>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Last played today, 7:42 PM
                          </span>
                          {/*  Segmented Progress Bar  */}
                          <div className="flex items-center gap-2 mt-space-xs max-w-xs">
                            <div className="flex-1 h-2.5 rounded-full bg-surface-container overflow-hidden p-0.5">
                              <div
                                className="h-full bg-gradient-to-r from-[#FF4D6D] to-[#FFB703] rounded-full"
                                style={{ width: "68%" }}
                              ></div>
                            </div>
                            <span className="font-label-sm text-label-sm font-bold text-[#FF4D6D]">
                              68%
                            </span>
                          </div>
                        </div>
                      </div>
                      {/*  Granular Deep Stats Container  */}
                      <div className="flex flex-wrap md:flex-col lg:flex-row items-center justify-between md:justify-end gap-space-md pt-space-xs md:pt-0">
                        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center bg-surface-container-low p-space-xs px-space-sm rounded-2xl border border-[#8486E8]/10">
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-[#FF4D6D] font-bold">
                              +120
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              XP Earned
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                              82%
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Accuracy
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              4
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Attempts
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              18m
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Spent
                            </span>
                          </div>
                        </div>
                        <button
                          className="px-space-md py-space-xs rounded-full bg-[#FF4D6D] hover:bg-[#C9184A] text-white font-label-md text-label-md shadow-[0_4px_14px_rgba(255,77,109,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-1 self-center"
                          type="button"
                        >
                          <span>Continue</span>
                          <span className="material-symbols-outlined text-sm">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    </div>
                    {/*  Card 2: Prompt Detective Lab  */}
                    <div className="group bg-surface-container-lowest p-space-md rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] hover:-translate-y-0.5 transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
                      <div className="flex items-start gap-space-md">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFF3BF] flex items-center justify-center text-[#B26A00] shadow-inner flex-shrink-0">
                          <span className="material-symbols-outlined text-3xl">
                            psychology
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <span className="px-space-xs py-0.5 rounded-full bg-[#FFE5EC] text-[#D90429] font-label-sm text-label-sm font-bold">
                              Generative AI
                            </span>
                            <span className="text-on-surface-variant text-xs">
                              Level 1 · Round 3/3
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#E8E9FC] text-[#4346A2] font-label-sm text-label-sm font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">
                                verified
                              </span>{" "}
                              Mastered
                            </span>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-[#FF4D6D] transition-colors">
                            Prompt Detective Lab
                          </h3>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Completed yesterday
                          </span>
                          {/*  100% Progress Bar  */}
                          <div className="flex items-center gap-2 mt-space-xs max-w-xs">
                            <div className="flex-1 h-2.5 rounded-full bg-surface-container overflow-hidden p-0.5">
                              <div
                                className="h-full bg-gradient-to-r from-tertiary to-[#8486E8] rounded-full"
                                style={{ width: "100%" }}
                              ></div>
                            </div>
                            <span className="font-label-sm text-label-sm font-bold text-tertiary">
                              100%
                            </span>
                          </div>
                        </div>
                      </div>
                      {/*  Granular Deep Stats Container  */}
                      <div className="flex flex-wrap md:flex-col lg:flex-row items-center justify-between md:justify-end gap-space-md pt-space-xs md:pt-0">
                        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center bg-surface-container-low p-space-xs px-space-sm rounded-2xl border border-[#8486E8]/10">
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-[#FF4D6D] font-bold">
                              +90
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              XP Earned
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-[#B26A00] font-bold">
                              94%
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Precision
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              2
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Attempts
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              14m
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Spent
                            </span>
                          </div>
                        </div>
                        <button
                          className="px-space-md py-space-xs rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all hover:scale-105 flex items-center gap-1 self-center border border-[#8486E8]/20"
                          type="button"
                        >
                          <span>Review Lab</span>
                          <span className="material-symbols-outlined text-sm">
                            replay
                          </span>
                        </button>
                      </div>
                    </div>
                    {/*  Card 3: Train the Mini Bot  */}
                    <div className="group bg-surface-container-lowest p-space-md rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] hover:-translate-y-0.5 transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
                      <div className="flex items-start gap-space-md">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFE5EC] flex items-center justify-center text-[#FF4D6D] shadow-inner flex-shrink-0">
                          <span className="material-symbols-outlined text-3xl">
                            smart_toy
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">
                              Robotics &amp; Vision
                            </span>
                            <span className="text-on-surface-variant text-xs">
                              Level 3 · Round 1/4
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#FFF3BF] text-[#B26A00] font-label-sm text-label-sm font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>{" "}
                              In Progress
                            </span>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-[#FF4D6D] transition-colors">
                            Train the Mini Bot
                          </h3>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Last played 2 days ago
                          </span>
                          {/*  Progress Bar  */}
                          <div className="flex items-center gap-2 mt-space-xs max-w-xs">
                            <div className="flex-1 h-2.5 rounded-full bg-surface-container overflow-hidden p-0.5">
                              <div
                                className="h-full bg-gradient-to-r from-[#FFB703] to-[#FFD166] rounded-full"
                                style={{ width: "25%" }}
                              ></div>
                            </div>
                            <span className="font-label-sm text-label-sm font-bold text-[#B26A00]">
                              25%
                            </span>
                          </div>
                        </div>
                      </div>
                      {/*  Granular Deep Stats Container  */}
                      <div className="flex flex-wrap md:flex-col lg:flex-row items-center justify-between md:justify-end gap-space-md pt-space-xs md:pt-0">
                        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center bg-surface-container-low p-space-xs px-space-sm rounded-2xl border border-[#8486E8]/10">
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-outline font-bold">
                              +150
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              XP Pending
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              78%
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Accuracy
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              5
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Attempts
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              22m
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Spent
                            </span>
                          </div>
                        </div>
                        <button
                          className="px-space-md py-space-xs rounded-full bg-[#FF4D6D] hover:bg-[#C9184A] text-white font-label-md text-label-md shadow-[0_4px_14px_rgba(255,77,109,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-1 self-center"
                          type="button"
                        >
                          <span>Resume</span>
                          <span className="material-symbols-outlined text-sm">
                            play_arrow
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                {/*  TWO COLUMN BENTO: Timeline + Next Spark Suggestion  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {/*  Recent Learning Timeline  */}
                  <section className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-space-sm">
                      <div className="flex items-center gap-space-xs">
                        <div className="w-8 h-8 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF4D6D]">
                          <span className="material-symbols-outlined text-sm">
                            history
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Recent Learning Timeline
                        </h3>
                      </div>
                      <span className="font-label-sm text-label-sm text-[#FF4D6D] font-bold cursor-pointer hover:underline">
                        Full Log
                      </span>
                    </div>
                    {/*  Vertical Timeline with Soft Nodes  */}
                    <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E9FC]">
                      {/*  Item 1  */}
                      <div className="relative group">
                        <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#FF4D6D] ring-4 ring-[#FFE5EC]"></span>
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between text-xs text-on-surface-variant mb-0.5">
                            <span className="font-semibold text-[#FF4D6D]">
                              Today · 7:42 PM
                            </span>
                            <span className="font-bold text-[#B26A00]">
                              +60 XP
                            </span>
                          </div>
                          <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                            Bias Card Game
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Checked 8/16 image cards, spotted 3 lighting bias
                            anomalies in dataset.
                          </p>
                        </div>
                      </div>
                      {/*  Item 2  */}
                      <div className="relative group">
                        <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-tertiary ring-4 ring-[#E8E9FC]"></span>
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between text-xs text-on-surface-variant mb-0.5">
                            <span className="font-semibold text-tertiary">
                              Yesterday · 4:15 PM
                            </span>
                            <span className="font-bold text-[#B26A00]">
                              +90 XP
                            </span>
                          </div>
                          <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                            Prompt Challenge
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Reverse-engineered &apos;Cozy Forest Cottage&apos;
                            style generator in 2 tries.
                          </p>
                        </div>
                      </div>
                      {/*  Item 3  */}
                      <div className="relative group">
                        <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#FFB703] ring-4 ring-[#FFF3BF]"></span>
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between text-xs text-on-surface-variant mb-0.5">
                            <span className="font-semibold text-[#B26A00]">
                              2 days ago · 5:30 PM
                            </span>
                            <span className="font-bold text-[#B26A00]">
                              +60 XP
                            </span>
                          </div>
                          <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                            AI vs Human Quiz
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Scored 100% precision identifying synthetic child
                            poetry verses.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/*  What Should I Do Next? (Recommendation Card)  */}
                  <section className="bg-gradient-to-br from-[#FFF0F5] via-[#FFFDF0] to-white p-space-md lg:p-space-lg rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] flex flex-col justify-between">
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="px-space-xs py-0.5 rounded-full bg-[#FFF3BF] text-[#B26A00] font-label-sm text-label-sm font-bold flex items-center gap-1 border border-[#FFB703]/30">
                          <span className="material-symbols-outlined text-xs">
                            auto_awesome
                          </span>{" "}
                          Recommended Next
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          5 min · Quick Sprint
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">
                        AI vs Human: Riddle Duel
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Put your critical eye to the test against Sparky’s
                        creative models! Can you spot the clues a machine
                        misses?
                      </p>
                      <div className="flex flex-wrap items-center gap-space-xs my-space-xs">
                        <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                          Critical Thinking
                        </span>
                        <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
                          Prompt Decoding
                        </span>
                        <span className="px-space-xs py-0.5 rounded-full bg-[#FFF3BF] text-[#B26A00] font-label-sm text-label-sm font-bold">
                          +80 XP
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-space-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF4D6D] text-sm font-bold">
                          ⚡
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Sparky&apos;s top pick for Riya
                        </span>
                      </div>
                      <button
                        className="px-space-md py-space-sm rounded-full bg-[#FF4D6D] hover:bg-[#C9184A] text-white font-label-md text-label-md hover:scale-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(255,77,109,0.35)] flex items-center gap-1 font-bold"
                        type="button"
                      >
                        <span>Start Activity</span>
                        <span className="material-symbols-outlined text-sm">
                          rocket_launch
                        </span>
                      </button>
                    </div>
                  </section>
                </div>
                {/*  AI SKILLS YOU'VE EXPLORED: Clay Progress Badges  */}
                <section className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)]">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-md">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        AI Skills You&apos;ve Explored
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Dynamic masteries tailored to your age and builder tier
                      </p>
                    </div>
                    <span className="px-space-sm py-1 rounded-full bg-[#FFE5EC] text-[#D90429] font-label-sm text-label-sm font-bold border border-[#FF4D6D]/20">
                      5 Core Domains
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm">
                    {/*  Skill 1  */}
                    <div className="flex flex-col items-center text-center p-space-sm rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="relative w-14 h-14 flex items-center justify-center mb-space-xs">
                        <svg
                          className="w-14 h-14 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-surface-container-highest stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3"
                          />
                          <path
                            className="text-[#FF4D6D] stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeDasharray="70, 100"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </svg>
                        <span className="absolute font-headline-sm text-headline-sm text-[#FF4D6D] font-bold">
                          70%
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        AI Prompting
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Tier 2 Mastered
                      </span>
                    </div>
                    {/*  Skill 2  */}
                    <div className="flex flex-col items-center text-center p-space-sm rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="relative w-14 h-14 flex items-center justify-center mb-space-xs">
                        <svg
                          className="w-14 h-14 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-surface-container-highest stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3"
                          />
                          <path
                            className="text-tertiary stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeDasharray="85, 100"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </svg>
                        <span className="absolute font-headline-sm text-headline-sm text-tertiary font-bold">
                          85%
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        AI Bias &amp; Fairness
                      </span>
                      <span className="font-label-sm text-label-sm text-[#B26A00] font-bold">
                        Ready for Badge
                      </span>
                    </div>
                    {/*  Skill 3  */}
                    <div className="flex flex-col items-center text-center p-space-sm rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="relative w-14 h-14 flex items-center justify-center mb-space-xs">
                        <svg
                          className="w-14 h-14 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-surface-container-highest stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3"
                          />
                          <path
                            className="text-[#FFB703] stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeDasharray="45, 100"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </svg>
                        <span className="absolute font-headline-sm text-headline-sm text-[#B26A00] font-bold">
                          45%
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Computer Vision
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        In Progress
                      </span>
                    </div>
                    {/*  Skill 4  */}
                    <div className="flex flex-col items-center text-center p-space-sm rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="relative w-14 h-14 flex items-center justify-center mb-space-xs">
                        <svg
                          className="w-14 h-14 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-surface-container-highest stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3"
                          />
                          <path
                            className="text-[#FF4D6D] stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeDasharray="60, 100"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </svg>
                        <span className="absolute font-headline-sm text-headline-sm text-[#FF4D6D] font-bold">
                          60%
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        ML Logic
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Active
                      </span>
                    </div>
                    {/*  Skill 5  */}
                    <div className="flex flex-col items-center text-center p-space-sm rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="relative w-14 h-14 flex items-center justify-center mb-space-xs">
                        <svg
                          className="w-14 h-14 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-surface-container-highest stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3"
                          />
                          <path
                            className="text-[#8486E8] stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeDasharray="90, 100"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </svg>
                        <span className="absolute font-headline-sm text-headline-sm text-tertiary font-bold">
                          90%
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Critical Ethics
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">
                        Expert Tier
                      </span>
                    </div>
                  </div>
                </section>
              </div>
              {/*  ==============================================================  */}
              {/*  RIGHT ZONE: Personal Identity & Companion Hub (~35% width, 4 of 12 cols)  */}
              {/*  ==============================================================  */}
              <div className="lg:col-span-4 flex flex-col gap-space-md">
                {/*  PROMINENT CHILD PROFILE CARD: "This dashboard belongs to me"  */}
                <section className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-[2.5rem] border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] flex flex-col gap-space-md relative overflow-hidden group">
                  {/*  Soft Clay Periwinkle / Coral Glow  */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#FFE5EC]/60 blur-2xl pointer-events-none"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-space-xs py-0.5 rounded-full bg-[#FFE5EC] text-[#D90429] font-label-sm text-label-sm font-bold flex items-center gap-1 border border-[#FF4D6D]/20">
                      <span className="material-symbols-outlined text-xs">
                        verified_user
                      </span>{" "}
                      Learner Identity
                    </span>
                    <a onClick={() => router.push('/profile')}
                      className="cursor-pointer font-label-sm text-label-sm text-[#FF4D6D] hover:underline font-semibold flex items-center gap-0.5"
                      href="#"
                    >
                      <span>Edit Profile</span>
                      <span className="material-symbols-outlined text-xs">
                        edit
                      </span>
                    </a>
                  </div>
                  {/*  Avatar & Core Name Header  */}
                  <div className="flex items-center gap-space-md relative z-10">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#FFE5EC] to-[#FFF3BF] p-1 shadow-md border border-[#8486E8]/20">
                        <img
                          className="w-full h-full object-cover rounded-[1.25rem]"
                          alt="Profile Avatar"
                          src={avatarPath}
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFB703] text-[#4A4058] flex items-center justify-center text-xs font-bold ring-2 ring-surface-container-lowest shadow-sm">
                        ★
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight truncate">
                        {childName || "Mohit Pandey"}
                      </h3>
                      <span className="font-label-sm text-label-sm font-bold text-[#FF4D6D] flex items-center gap-1">
                        ✦ {currentBelt} · Age {childAge || 11}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        {school || "JIS College of Engineering"}
                      </span>
                    </div>
                  </div>
                  {/*  Setup Metadata Grid  */}
                  <div className="grid grid-cols-2 gap-space-xs mt-space-sm pt-space-xs border-t border-[#8486E8]/10">
                    <div className="flex flex-col p-space-xs rounded-xl bg-surface-container-low/60 border border-[#8486E8]/10">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        School / College
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        {school || "JIS College of Engineering"}
                      </span>
                    </div>
                    <div className="flex flex-col p-space-xs rounded-xl bg-surface-container-low/60 border border-[#8486E8]/10">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Region
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        {stateRegion || "Kolkata, West Bengal"}
                      </span>
                    </div>
                    <div className="flex flex-col p-space-xs rounded-xl bg-surface-container-low/60 border border-[#8486E8]/10">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Grade / Year
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        {grade || "B.Tech 2nd Year"}
                      </span>
                    </div>
                    <div className="flex flex-col p-space-xs rounded-xl bg-surface-container-low/60 border border-[#8486E8]/10">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Track
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        {ageBand || "AI Builder"}
                      </span>
                    </div>
                  </div>
                </section>
                {/*  SPARK XP & LEVEL PROGRESSION  */}
                <section className="bg-surface-container-lowest p-space-md rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <div className="w-8 h-8 rounded-full bg-[#FFF3BF] flex items-center justify-center text-[#B26A00]">
                        <span className="material-symbols-outlined text-base">
                          bolt
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                          Level Status
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                          {currentBelt}
                        </h4>
                      </div>
                    </div>
                    <span className="px-space-xs py-0.5 rounded-full bg-[#FFF3BF] text-[#B26A00] font-label-sm text-label-sm font-bold border border-[#FFB703]/30">
                      {Math.max(xpGoal - totalXP, 0)} XP to Next Belt
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 mt-space-xs">
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant">
                        {totalXP} XP Current
                      </span>
                      <span className="font-bold text-[#FF4D6D]">
                        {xpGoal} XP Goal
                      </span>
                    </div>
                    <div className="w-full h-3.5 rounded-full bg-surface-container p-0.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#FF4D6D] via-[#FF85A1] to-[#FFB703] shadow-sm"
                        style={{ width: `${Math.min((totalXP / xpGoal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  {/*  Daily Streak Reward Box  */}
                  <div className="p-space-sm rounded-2xl bg-[#FFF3BF]/70 border border-[#FFB703]/40 flex items-center justify-between mt-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="text-2xl animate-pulse">🔥</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-[#271900] font-bold">
                          {userStats?.streakDays || 0}-Day Spark Streak!
                        </span>
                        <span className="font-body-sm text-body-sm text-[#5e4100]">
                          +40 Bonus XP today
                        </span>
                      </div>
                    </div>
                    <button
                      className="px-space-sm py-1 rounded-full bg-[#FFB703] hover:bg-[#FFD166] text-[#4A4058] font-label-sm text-label-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_2px_8px_rgba(255,183,3,0.35)]"
                      type="button"
                    >
                      Claim Bonus
                    </button>
                  </div>
                </section>
                {/*  RECENT ACHIEVEMENTS & BADGE VAULT  */}
                <section className="bg-surface-container-lowest p-space-md rounded-3xl border border-[#8486E8]/20 shadow-[0_4px_16px_-2px_rgba(132,134,232,0.08),0_2px_6px_0_rgba(255,77,109,0.04)] flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#FFB703]">
                        workspace_premium
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">
                        Badges &amp; Trophies
                      </h4>
                    </div>
                    <span className="font-label-sm text-label-sm text-[#FF4D6D] font-bold">
                      7 of 12 Unlocked
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-xs mt-space-xs">
                    {/*  Badge 1  */}
                    <div className="flex items-center gap-2 p-space-xs rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF3BF] flex items-center justify-center text-xl shadow-sm">
                        🏆
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm font-bold text-on-surface truncate">
                          Prompt Wizard
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          Earned yesterday
                        </span>
                      </div>
                    </div>
                    {/*  Badge 2  */}
                    <div className="flex items-center gap-2 p-space-xs rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="w-10 h-10 rounded-xl bg-[#E8E9FC] flex items-center justify-center text-xl shadow-sm">
                        👁️
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm font-bold text-on-surface truncate">
                          Bias Buster
                        </span>
                        <span className="text-[10px] text-[#B26A00] font-semibold">
                          3/4 Steps
                        </span>
                      </div>
                    </div>
                    {/*  Badge 3  */}
                    <div className="flex items-center gap-2 p-space-xs rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="w-10 h-10 rounded-xl bg-[#FFE5EC] flex items-center justify-center text-xl shadow-sm">
                        🤖
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm font-bold text-on-surface truncate">
                          Bot Whisperer
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          3 days ago
                        </span>
                      </div>
                    </div>
                    {/*  Badge 4  */}
                    <div className="flex items-center gap-2 p-space-xs rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-[#8486E8]/10">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-xl shadow-sm">
                        🌟
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm font-bold text-on-surface truncate">
                          Dataset Scout
                        </span>
                        <span className="text-[10px] text-[#FF4D6D] font-semibold">
                          Level 2 Unlocked
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
                {/*  PERSISTENT FLOATING AI MENTOR: Sparky Companion Widget  */}
                <section className="bg-gradient-to-br from-[#FFF0F5] via-[#FFFDF0] to-white p-space-md rounded-[2.5rem] border border-[#8486E8]/25 shadow-[0_12px_28px_-4px_rgba(255,77,109,0.12),0_4px_12px_-1px_rgba(255,183,3,0.08)] flex flex-col gap-space-sm relative overflow-hidden">
                  {/*  Companion Glow  */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF4D6D]/10 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center gap-space-sm relative z-10">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF4D6D] to-[#FF85A1] flex items-center justify-center text-white shadow-md">
                        <span className="material-symbols-outlined text-2xl">
                          smart_toy
                        </span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFB703] ring-2 ring-surface-container-lowest animate-pulse"></span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          Sparky AI Co-Pilot
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#E8E9FC] text-[#4346A2] text-[10px] font-bold">
                          Online
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Your playful learning buddy
                      </span>
                    </div>
                  </div>
                  {/*  Speech Bubble  */}
                  <div className="relative bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm border border-[#8486E8]/15 text-on-surface font-body-md text-body-md mt-1">
                    <p className="leading-relaxed text-sm">
                      "Need a quick hint on{" "}
                      <strong className="text-[#FF4D6D]">Card #9</strong>? I
                      noticed the shadow angle might be tricking our model's
                      edge detector!"
                    </p>
                  </div>
                  {/*  Sparky Action Pills  */}
                  <div className="flex flex-wrap items-center gap-space-xs mt-space-xs">
                    <button
                      className="px-space-sm py-1.5 rounded-full bg-[#FF4D6D] hover:bg-[#C9184A] text-white font-label-sm text-label-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_2px_8px_rgba(255,77,109,0.3)] flex items-center gap-1"
                      type="button"
                    >
                      <span>Ask Sparky 💡</span>
                    </button>
                    <button
                      className="px-space-sm py-1.5 rounded-full bg-white hover:bg-surface-variant text-on-surface border border-[#8486E8]/30 font-label-sm text-label-sm font-semibold transition-all hover:scale-105 flex items-center gap-1"
                      type="button"
                    >
                      <span>Explain Bias 🔍</span>
                    </button>
                    <button
                      className="px-space-sm py-1.5 rounded-full bg-white hover:bg-surface-variant text-on-surface border border-[#8486E8]/30 font-label-sm text-label-sm font-semibold transition-all hover:scale-105 flex items-center gap-1"
                      type="button"
                    >
                      <span>Voice Mode 🎙️</span>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
