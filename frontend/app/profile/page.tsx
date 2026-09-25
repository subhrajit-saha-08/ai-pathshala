"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useProfileStore from "@/store/useProfileStore";

export default function ProfilePage() {

  const [name, setName] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [avatar, setAvatar] = useState("");
  const [grade, setGrade] = useState("Grade 6");
  const [school, setSchool] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const setProfile = useProfileStore((state) => state.setProfile);
  const { childName: storeName, dob: storeDob, grade: storeGrade, school: storeSchool, stateRegion: storeStateRegion, childAvatar: storeAvatar } = useProfileStore();

  useEffect(() => {
    if (storeName) {
      setName(storeName);
      if (storeDob?.year) setDobYear(storeDob.year);
      if (storeGrade) setGrade(storeGrade);
      if (storeSchool) setSchool(storeSchool);
      if (storeStateRegion) setStateRegion(storeStateRegion);
      if (storeAvatar) setAvatar(storeAvatar);
    }
  }, [storeName, storeDob, storeGrade, storeSchool, storeStateRegion, storeAvatar]);

  const grades = [
    { id: "Grade 3", label: "G3" },
    { id: "Grade 4", label: "G4" },
    { id: "Grade 5", label: "G5" },
    { id: "Grade 6", label: "G6" },
    { id: "Grade 7", label: "G7" },
    { id: "Grade 8", label: "G8" },
    { id: "Grade 9", label: "G9" },
    { id: "Grade 10", label: "G10" }
  ];

  const avatarsConfig = [
    {name: 'Nova', role: 'Inventor', bg: 'bg-toy-periwinkle', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP1aw7H0VgTM1kY0PjsdxXcBeH8pceFIqM6SBXmt5oXDCTSlYY0lBfQszRuO6VSSKUzK56JOutrVp1SwOqos24KptLerYlLnvPmb0agI5sckste6RSLmGmAUwQ8fdjl7aoNa04R-7yoy2etW6P_7ClAxrsjE9C8y_-VmcFODGJ3vgSEHDz1eo7yl1yqmzAFquMPIElZ-n4JoPVkwWSEZSZ5JSIH3RJvT4iLGm3-5y-H15UdFWsj2oF'},
    {name: 'Aero', role: 'Builder', bg: 'bg-toy-yellow/30', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8n5-a9gCsJYjBoZlLg-78NQ7ZVxIObaF7CnUCKrGL6IrASTuBYGutcb0IN_ntAQWUA8nSJygu5SYsU789yIwo02zpzSHV_lCwkRG_K1_IB_vbQ4ztudOkohiAxSzE4N_4zaKOzTO-mNVjh-aIwqXq1ou7pmD5Qmh7LW4p-APGdZptStvHKlKuZF096I79HYDVNuMFnPmRNQiI85wUywjIl59svJ6qhI-JjAKDugsmzuoEHArpoiBH'},
    {name: 'Pixel', role: 'Artist', bg: 'bg-toy-blue-light', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjiPnXe6-6ZKJcFetR_HGO--_TlK7FSmd-mY-MbRP56Tsl2ymLWnftMzAuoDsVbEHyuhxVGkSiFgY9YKH0vJpm4o1GlZzZYPWfGewjeXvoXFTK1BiXeT6Ae7n0n2XJ5kTVI3f61pecVFDY-V5A3nN9c9nZcDl6n8qzCXvG4q-U3oJoOWMGOdAQveT-KPkLXKrnop-TPY2UM3sC-sHe_RqJPdAbkhiQ0GzmWSp3QzV5i_IRm83oJkEa'},
    {name: 'Orion', role: 'Explorer', bg: 'bg-toy-periwinkle', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb167uPpC70Ers_DRd-gw__dQ3PgUz7fI3rMnEl1NXXCEXe14vS7k9em9AdQb2o2rlTlqUX-2lKQOLfforYWCIutQfAUDGtjfOG5Bpf4_sPFWG7AO8-WB2mgtVhFhZGrPcQct8a58EZKxbtueRhBAEXFi0Y-Vl5hrAVZyBr8iHPE1_NuLCDp3Mbh1KfDYfCNJDW0GWIUm4kUCgSyI9YMup4N5nPqksFKP5Vh4PRKvuvcam3rVj5x8_'},
    {name: 'Maya', role: 'Scientist', bg: 'bg-toy-yellow-light', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQJeSbjYhgmxqqpslpGjGReRck6Q9NZW2tOFHfYRYVescpfrB52bCGU39W7GPv1vssXaANDSh_nwqC5iG-ArI9DeY04ovOlfxbQk-6FfuhocjklUa8UD2LtDhCDIEpssd2xOmWBMPdxKLhzn0UPX1MncgwON3SD17sZDkf0HLNp4F2EGVyuOYc78rFS8aOgGejyqnM2YvzAgjHEajJhPliq_z3dm8FgHtiRWARl2KseFVi7FiPw0KO'},
    {name: 'Zephyr', role: 'Futurist', bg: 'bg-toy-blue-light', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoZOb6nZlqkh7nI4_Tq9wZOC7ouTpXc_krwTtU5lCc8YgnMz5Tt9QJV57OeRSnII8Csy_Jjz1saZN60ok_DSInX0H6WOWotXLO7dIO52Ob33JScb1wtrjv39NL8Sarcg5-AOEOOkQJJREHy-U9iu3qgEIF_IKswfvz12ig99WO9u6N9Mb6lMEud2zovTEKSxpmTWAhA9Q5qiE7c5jUxpVDOFSNhV2S5jxKXVmb4kP-Vr5zpK_uGPjy'}
  ];

  let calculatedAgeBand = "Builder";
  let ageBandTitle = "✨ You're in the Builder Stage (Ages 9–12)";
  let ageBandDesc = "Unlocked: Creative AI sandboxes, 3D robotics sandbox, and game development logic with visual nodes!";

  const calculatedAge = dobYear.length === 4 ? 2026 - parseInt(dobYear) : 0;
  
  if (calculatedAge > 0) {
    if (calculatedAge <= 8) {
        calculatedAgeBand = "Explorer";
        ageBandTitle = "✨ You're in the Explorer Stage (Ages 6–8)";
        ageBandDesc = "Unlocked: Story adventures, read-aloud AI tutors, and visual logic puzzles.";
    } else if (calculatedAge <= 12) {
        calculatedAgeBand = "Builder";
        ageBandTitle = "✨ You're in the Builder Stage (Ages 9–12)";
        ageBandDesc = "Unlocked: Creative AI sandboxes, 3D robotics sandbox, and game development logic with visual nodes!";
    } else {
        calculatedAgeBand = "Pioneer";
        ageBandTitle = "✨ You're in the Pioneer Stage (Ages 13–16)";
        ageBandDesc = "Unlocked: Real Python IDE, AI prompts lab, digital design and portfolio tools.";
    }
  }

  const selectedAvatarConfig = avatarsConfig.find(a => a.name === avatar) || avatarsConfig[1];

  const handleSubmit = () => {
    if (!name || !dobYear || !avatar) return;
    setProfile({ childName: name, dob: { day: "", month: "", year: dobYear }, grade, school, stateRegion, childAvatar: avatar });
    setIsSubmitting(true);
    setTimeout(() => {
        router.push("/dashboard");
    }, 2000);
  };


  return (
    <div className="font-body-md text-on-surface relative overflow-x-hidden overflow-y-auto min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* We will output the converted HTML here, but first we need to dynamically replace the hardcoded values with React state */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
{/*  Soft volumetric clay background blurs & 3D toy floats  */}
<div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-toy-pink/15 blur-3xl"></div>
<div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-toy-blue/20 blur-3xl"></div>
<div className="absolute -bottom-20 left-1/3 w-88 h-88 rounded-full bg-toy-yellow/25 blur-3xl"></div>
{/*  Playful floating soft clay beads  */}
<div className="absolute top-24 left-[12%] w-4 h-4 rounded-full bg-toy-pink opacity-50 shadow-md shadow-toy-pink/30 animate-pulse"></div>
<div className="absolute top-40 right-[15%] w-5 h-5 rounded-full bg-toy-yellow opacity-70 shadow-md shadow-toy-yellow/40 animate-bounce" style={{ animationDuration: "3s" }}></div>
<div className="absolute bottom-48 left-[8%] w-3.5 h-3.5 rounded-full bg-toy-blue opacity-60 shadow-md shadow-toy-blue/30"></div>
<div className="absolute top-1/2 right-[8%] w-3 h-3 rounded-full bg-toy-pink opacity-40"></div>
<div className="absolute bottom-20 right-[22%] w-4 h-4 rounded-full bg-toy-yellow opacity-60"></div>
</div>{/*  Header  */}<header className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_20px_rgba(100,95,210,0.06)]"><div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-toy-pink to-[#ff849d] flex items-center justify-center shadow-lg shadow-toy-pink/30 transition-transform hover:scale-110 active:rotate-6 cursor-pointer"><span className="material-symbols-outlined text-white text-[26px]">toys</span></div><div className="flex flex-col"><span className="text-xl font-black text-toy-navy tracking-tight leading-none flex items-center gap-1.5">
          Spark School <span className="text-xs px-2 py-0.5 rounded-full bg-toy-yellow font-extrabold text-toy-navy shadow-sm">Toybox 3D</span></span><span className="text-xs font-bold text-toy-navy/60 tracking-wide mt-1">Playful AI Learning World</span></div></div><div className="flex items-center gap-3"><div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-toy-navy/80 font-bold text-xs shadow-sm border border-toy-border"><span className="material-symbols-outlined text-toy-yellow text-[18px] drop-shadow-sm">stars</span><span>Setting up your toybox world ✦</span></div><div className="px-4 py-1.5 rounded-full clay-badge-pink text-xs font-black tracking-wide">
        Step 1 of 2
      </div></div></div></header><main className="relative z-10 w-full pt-28 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12"><div className="flex flex-col w-full max-w-7xl pb-12">
{/*  Top Hero Header Section  */}
<div className="w-full mx-auto mb-8 text-center flex flex-col items-center">
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border-2 border-toy-border mb-3 transition-transform hover:scale-105">
<span className="material-symbols-outlined text-toy-pink text-base animate-spin" style={{ animationDuration: "5s" }}>palette</span>
<span className="text-xs tracking-wider uppercase font-black text-toy-navy">AI Playground Studio • Personalization</span>
</div>
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-toy-navy tracking-tight max-w-3xl leading-tight">
      Let’s build your <span className="relative inline-block text-toy-pink px-2">Spark profile!<span className="absolute -bottom-1.5 left-0 right-0 h-3 bg-toy-yellow/40 rounded-full -z-10 transform -rotate-1"></span></span>
</h1>
<p className="text-base sm:text-lg text-toy-navy/70 max-w-2xl mt-3 font-semibold">
      Tell us a little about yourself and we’ll shape your Spark School experience around your real-world curiosities, toys, and grade level.
    </p>
{/*  Step-by-Step Interactive Clay Pill Trail  */}
<div className="flex items-center gap-2 mt-5 p-1.5 rounded-full bg-white/80 border-2 border-toy-border shadow-sm">
<div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-toy-pink text-white font-extrabold text-xs shadow-sm">
<span className="material-symbols-outlined text-sm">face</span>
<span>1. Explorer Info</span>
</div>
<span className="text-toy-navy/30 font-black">→</span>
<div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-toy-periwinkle/50 text-toy-navy/60 font-bold text-xs">
<span className="material-symbols-outlined text-sm">rocket</span>
<span>2. Learning Sandboxes</span>
</div>
<span className="text-toy-navy/30 font-black">→</span>
<div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-toy-periwinkle/50 text-toy-navy/60 font-bold text-xs">
<span className="material-symbols-outlined text-sm">celebration</span>
<span>3. Launch</span>
</div>
</div>
</div>
{/*  Centered Form Container  */}
<div className="w-full max-w-4xl mx-auto">
<div className="lg:col-span-7">
<div className="clay-card p-6 sm:p-9">
{/*  Header inside Card  */}
<div className="flex flex-col gap-1.5 mb-7">
<div className="flex items-center justify-between">
<h2 className="text-2xl sm:text-3xl font-black text-toy-navy tracking-tight flex items-center gap-2">
            Tell us about you
            <span className="text-toy-pink">✨</span>
</h2>
<span className="px-3.5 py-1 rounded-full clay-badge-yellow text-xs font-black shadow-sm">Step 1 of 2</span>
</div>
<p className="text-sm sm:text-base font-semibold text-toy-navy/70">
          This helps us customize your missions, classroom toy badge, and AI companion.
        </p>
</div>
<div className="flex flex-col gap-6">
{/*  FIELD 1: Nickname / Call Name  */}
<div className="flex flex-col gap-2">
<label className="flex items-center gap-1.5 text-sm font-black text-toy-navy" htmlFor="student-name">
<span>What should we call you?</span>
<span className="text-toy-pink font-extrabold">*</span>
</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-4 text-toy-pink text-2xl pointer-events-none">sentiment_satisfied</span>
<input className="clay-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-toy-navy font-bold text-base transition-all" id="student-name" maxLength={24} placeholder="e.g. Leo, Riya, or Captain Pixel" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
</div>
<span className="text-xs font-bold text-toy-navy/50 px-1">You can change this nickname anytime from your settings.</span>
</div>
{/*  FIELD 2 & 3: Date of Birth & Auto Age Bracket  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
<div className="md:col-span-7 flex flex-col gap-2">
<label className="text-sm font-black text-toy-navy flex items-center justify-between">
<span>When were you born?</span>
<span className="text-xs text-toy-navy/50 font-bold">DD / MM / YYYY</span>
</label>
<div className="grid grid-cols-3 gap-2.5">
<input className="clay-input text-center py-3.5 rounded-2xl text-toy-navy text-xl font-black transition-all" id="dob-day" max={31} min={1} placeholder="DD" type="number" />
<input className="clay-input text-center py-3.5 rounded-2xl text-toy-navy text-xl font-black transition-all" id="dob-month" max={12} min={1} placeholder="MM" type="number" />
<input className="clay-input text-center py-3.5 rounded-2xl text-toy-navy text-xl font-black transition-all" id="dob-year" max={2019} min={2008} placeholder="YYYY" type="number" value={dobYear} onChange={(e) => setDobYear(e.target.value)}/>
</div>
</div>
{/*  Calculated Age Tag Card (Chubby Clay Box)  */}
<div className="md:col-span-5 flex flex-col gap-2">
<span className="text-sm font-black text-toy-navy">Calculated Age</span>
<div className="h-[56px] px-4 rounded-2xl bg-toy-yellow/20 border-2 border-toy-yellow/40 flex items-center justify-between shadow-inner">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-amber-500 text-2xl">cake</span>
<span className="text-2xl font-black text-toy-navy" id="calculated-age-text">{calculatedAge > 0 ? calculatedAge : '--'}</span>
<span className="text-xs font-extrabold text-toy-navy/70">years old</span>
</div>
<span className="px-3 py-1 rounded-full bg-toy-yellow text-toy-navy font-black text-xs shadow-sm">✨ Match</span>
</div>
</div>
</div>
{/*  Dynamic Age Band Summary Chip  */}
<div className={`rounded-2xl p-4 flex items-start gap-3 shadow-sm ${calculatedAgeBand === "Explorer" ? "bg-gradient-to-r from-toy-blue-light to-white border-2 border-toy-blue/40" : calculatedAgeBand === "Builder" ? "bg-gradient-to-r from-toy-pink-light to-white border-2 border-toy-pink/30" : "bg-gradient-to-r from-toy-yellow-light to-white border-2 border-toy-yellow/50"}`} id="age-band-banner">
<div className="w-9 h-9 rounded-xl bg-toy-pink text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
<span className="material-symbols-outlined text-xl">auto_awesome</span>
</div>
<div>
<p className="text-sm font-black text-toy-navy" id="age-band-title">{ageBandTitle}</p>
<p className="text-xs font-semibold text-toy-navy/70 mt-0.5" id="age-band-desc">{ageBandDesc}</p>
</div>
</div>
{/*  FIELD 4: Grade / Class Selector (Chubby Toy Pill Buttons)  */}
<div className="flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<label className="text-sm font-black text-toy-navy">Which grade are you in?</label>
<span className="text-xs font-bold text-toy-pink">Select your level</span>
</div>
<div className="grid grid-cols-4 sm:grid-cols-8 gap-2" id="grade-selector-container">
          {grades.map((g) => (
            <button 
                key={g.id}
                type="button" 
                onClick={() => setGrade(g.id)}
                className={`grade-pill py-3 rounded-2xl font-black text-sm transition-all border-2 ${grade === g.id ? "clay-pill-active text-white shadow-md scale-105 border-white" : "bg-[#f4f3ff] text-toy-navy/70 hover:bg-white hover:shadow-md border-toy-border"}`}
            >
                {g.label}
            </button>
          ))}
</div>
</div>
{/*  FIELD 5 & 6: School Name & State / Region  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/*  School Name  */}
<div className="flex flex-col gap-2">
<label className="text-sm font-black text-toy-navy flex items-center justify-between" htmlFor="school-name">
<span>School Name</span>
<span className="text-xs font-bold text-toy-navy/50">Optional</span>
</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-4 text-toy-blue text-xl pointer-events-none">school</span>
<input className="clay-input w-full pl-11 pr-4 py-3 rounded-2xl text-toy-navy font-bold text-sm transition-all" id="school-name" placeholder="e.g. Oakridge, St. Mary’s..." type="text" value={school} onChange={(e) => setSchool(e.target.value)}/>
</div>
<span className="text-xs font-bold text-toy-navy/50 px-1">Used exclusively for inter-school fun challenges.</span>
</div>
{/*  Region / State  */}
<div className="flex flex-col gap-2">
<label className="text-sm font-black text-toy-navy" htmlFor="region-select">State or Region</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-4 text-toy-blue text-xl pointer-events-none">public</span>
<select className="clay-input w-full pl-11 pr-8 py-3 rounded-2xl text-toy-navy font-bold text-sm transition-all appearance-none cursor-pointer" id="region-select" value={stateRegion} onChange={(e) => setStateRegion(e.target.value)}>
<option value="" disabled>Select Region</option>
<option value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Arunachal Pradesh">Arunachal Pradesh</option>
<option value="Assam">Assam</option>
<option value="Bangalore">Bangalore</option>
<option value="Bihar ">Bihar</option>
<option value="Chennai">Chennai</option>
<option value="Chhattisgarh">Chhattisgarh</option>
<option value="Delhi">Delhi</option>
<option value="Hyderabad">Hyderabad</option>
<option value="Goa">Goa</option>
<option value="Gujarat">Gujarat</option>
<option value="Haryana ">Haryan</option>
<option value="Himachal Pradesh">Himachal Pradesh</option>
<option value="Jharkhand">Jharkhand</option>
<option value="Karnataka">Karnataka</option>
<option value="Kerala">Kerala</option>
<option value="Madhya Pradesh">Madhya Pradesh</option>
<option value="Maharastra">Maharashtra</option>
<option value="Manipur">Manipur</option>
<option value="Meghalaya">Meghalaya</option>
<option value="Mizoram">Mizoram</option>
<option value="Nagaland">Nagaland</option>
<option value="Odisha">Odisha</option>
<option value="Punjab">Punjab</option>
<option value="Rajasthan">Rajasthan</option>
<option value="Sikkim">Sikkim</option>
<option value="Tamil Nadu">Tamil Nadu</option>
<option value="Telangana">Telangana</option>
<option value="Tripura">Tripura</option>
<option value="Uttar Pradesh">Uttar Pradesh</option>
<option value="Uttarakhand">Uttarakhand</option>
<option value="West Bengal">West Bengal</option>
</select>
<span className="material-symbols-outlined absolute right-3 text-toy-navy/50 pointer-events-none text-base">expand_more</span>
</div>
<span className="text-xs font-bold text-toy-navy/50 px-1">Helps align local event timings &amp; timezones.</span>
</div>
</div>
{/*  FIELD 7: Pick Your Spark Avatar (6 Chubby 3D Toy Cards)  */}
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<div>
<label className="text-sm font-black text-toy-navy">Pick your Spark Avatar</label>
<p className="text-xs font-semibold text-toy-navy/60">Choose your learner identity. You can swap costumes later!</p>
</div>
<span className="text-xs px-3 py-1 rounded-full clay-badge-yellow font-black">6 Unlocked</span>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-1" id="avatar-container">
{/*  Avatar 1: Nova  */}
<button className={`avatar-card group relative p-3 rounded-2xl text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${avatar === 'Nova' ? 'clay-avatar-selected scale-105' : 'clay-avatar hover:scale-105'}`} data-avatar-img="nova" data-avatar-name="Nova" data-avatar-title="Curious Inventor" type="button" onClick={() => setAvatar('Nova')}>
<div className="w-16 h-16 rounded-full overflow-hidden bg-toy-periwinkle p-1 shadow-inner group-hover:rotate-6 transition-transform">
<img className="w-full h-full object-cover rounded-full" data-alt="3D cartoon avatar of Nova a curious young inventor with warm skin starry protective goggles playful headphones soft violet lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP1aw7H0VgTM1kY0PjsdxXcBeH8pceFIqM6SBXmt5oXDCTSlYY0lBfQszRuO6VSSKUzK56JOutrVp1SwOqos24KptLerYlLnvPmb0agI5sckste6RSLmGmAUwQ8fdjl7aoNa04R-7yoy2etW6P_7ClAxrsjE9C8y_-VmcFODGJ3vgSEHDz1eo7yl1yqmzAFquMPIElZ-n4JoPVkwWSEZSZ5JSIH3RJvT4iLGm3-5y-H15UdFWsj2oF"/>
</div>
<div className="flex flex-col">
<span className="text-xs font-black text-toy-navy leading-tight">Nova</span>
<span className="text-[10px] font-extrabold text-toy-navy/60">Inventor</span>
</div>
<div className="avatar-check hidden absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-toy-pink text-white items-center justify-center shadow-md">
<span className="material-symbols-outlined text-xs font-black">check</span>
</div>
</button>
{/*  Avatar 2: Aero (Default Selected)  */}
<button className={`avatar-card group relative p-3 rounded-2xl text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${avatar === 'Aero' ? 'clay-avatar-selected scale-105' : 'clay-avatar hover:scale-105'}`} data-avatar-img="aero" data-avatar-name="Aero" data-avatar-title="Tech Builder" type="button" onClick={() => setAvatar('Aero')}>
<div className="w-16 h-16 rounded-full overflow-hidden bg-toy-yellow/30 p-1 shadow-inner group-hover:rotate-6 transition-transform">
<img className="w-full h-full object-cover rounded-full" data-alt="3D cartoon avatar of Aero an energetic tech builder kid with friendly smile glowing holographic micro badge futuristic hoodie" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8n5-a9gCsJYjBoZlLg-78NQ7ZVxIObaF7CnUCKrGL6IrASTuBYGutcb0IN_ntAQWUA8nSJygu5SYsU789yIwo02zpzSHV_lCwkRG_K1_IB_vbQ4ztudOkohiAxSzE4N_4zaKOzTO-mNVjh-aIwqXq1ou7pmD5Qmh7LW4p-APGdZptStvHKlKuZF096I79HYDVNuMFnPmRNQiI85wUywjIl59svJ6qhI-JjAKDugsmzuoEHArpoiBH"/>
</div>
<div className="flex flex-col">
<span className="text-xs font-black text-toy-pink leading-tight">Aero</span>
<span className="text-[10px] font-extrabold text-toy-pink">Builder</span>
</div>
<div className="avatar-check flex absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-toy-pink text-white items-center justify-center shadow-md">
<span className="material-symbols-outlined text-xs font-black">check</span>
</div>
</button>
{/*  Avatar 3: Pixel  */}
<button className={`avatar-card group relative p-3 rounded-2xl text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${avatar === 'Pixel' ? 'clay-avatar-selected scale-105' : 'clay-avatar hover:scale-105'}`} data-avatar-img="pixel" data-avatar-name="Pixel" data-avatar-title="Creative Artist" type="button" onClick={() => setAvatar('Pixel')}>
<div className="w-16 h-16 rounded-full overflow-hidden bg-toy-blue-light p-1 shadow-inner group-hover:rotate-6 transition-transform">
<img className="w-full h-full object-cover rounded-full" data-alt="3D stylized avatar of Pixel a colorful digital artist child holding a glowing neon paintbrush with soft pastel highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjiPnXe6-6ZKJcFetR_HGO--_TlK7FSmd-mY-MbRP56Tsl2ymLWnftMzAuoDsVbEHyuhxVGkSiFgY9YKH0vJpm4o1GlZzZYPWfGewjeXvoXFTK1BiXeT6Ae7n0n2XJ5kTVI3f61pecVFDY-V5A3nN9c9nZcDl6n8qzCXvG4q-U3oJoOWMGOdAQveT-KPkLXKrnop-TPY2UM3sC-sHe_RqJPdAbkhiQ0GzmWSp3QzV5i_IRm83oJkEa"/>
</div>
<div className="flex flex-col">
<span className="text-xs font-black text-toy-navy leading-tight">Pixel</span>
<span className="text-[10px] font-extrabold text-toy-navy/60">Artist</span>
</div>
<div className="avatar-check hidden absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-toy-pink text-white items-center justify-center shadow-md">
<span className="material-symbols-outlined text-xs font-black">check</span>
</div>
</button>
{/*  Avatar 4: Orion  */}
<button className={`avatar-card group relative p-3 rounded-2xl text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${avatar === 'Orion' ? 'clay-avatar-selected scale-105' : 'clay-avatar hover:scale-105'}`} data-avatar-img="orion" data-avatar-name="Orion" data-avatar-title="Space Explorer" type="button" onClick={() => setAvatar('Orion')}>
<div className="w-16 h-16 rounded-full overflow-hidden bg-toy-periwinkle p-1 shadow-inner group-hover:rotate-6 transition-transform">
<img className="w-full h-full object-cover rounded-full" data-alt="3D stylized avatar of Orion a young space explorer in sleek astronaut themed hoodie with starry sparkle patches" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb167uPpC70Ers_DRd-gw__dQ3PgUz7fI3rMnEl1NXXCEXe14vS7k9em9AdQb2o2rlTlqUX-2lKQOLfforYWCIutQfAUDGtjfOG5Bpf4_sPFWG7AO8-WB2mgtVhFhZGrPcQct8a58EZKxbtueRhBAEXFi0Y-Vl5hrAVZyBr8iHPE1_NuLCDp3Mbh1KfDYfCNJDW0GWIUm4kUCgSyI9YMup4N5nPqksFKP5Vh4PRKvuvcam3rVj5x8_"/>
</div>
<div className="flex flex-col">
<span className="text-xs font-black text-toy-navy leading-tight">Orion</span>
<span className="text-[10px] font-extrabold text-toy-navy/60">Explorer</span>
</div>
<div className="avatar-check hidden absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-toy-pink text-white items-center justify-center shadow-md">
<span className="material-symbols-outlined text-xs font-black">check</span>
</div>
</button>
{/*  Avatar 5: Maya  */}
<button className={`avatar-card group relative p-3 rounded-2xl text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${avatar === 'Maya' ? 'clay-avatar-selected scale-105' : 'clay-avatar hover:scale-105'}`} data-avatar-img="maya" data-avatar-name="Maya" data-avatar-title="Science Prodigy" type="button" onClick={() => setAvatar('Maya')}>
<div className="w-16 h-16 rounded-full overflow-hidden bg-toy-yellow-light p-1 shadow-inner group-hover:rotate-6 transition-transform">
<img className="w-full h-full object-cover rounded-full" data-alt="3D cartoon avatar of Maya a brilliant science enthusiast girl with test-tube enamel pin and curious warm expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQJeSbjYhgmxqqpslpGjGReRck6Q9NZW2tOFHfYRYVescpfrB52bCGU39W7GPv1vssXaANDSh_nwqC5iG-ArI9DeY04ovOlfxbQk-6FfuhocjklUa8UD2LtDhCDIEpssd2xOmWBMPdxKLhzn0UPX1MncgwON3SD17sZDkf0HLNp4F2EGVyuOYc78rFS8aOgGejyqnM2YvzAgjHEajJhPliq_z3dm8FgHtiRWARl2KseFVi7FiPw0KO"/>
</div>
<div className="flex flex-col">
<span className="text-xs font-black text-toy-navy leading-tight">Maya</span>
<span className="text-[10px] font-extrabold text-toy-navy/60">Scientist</span>
</div>
<div className="avatar-check hidden absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-toy-pink text-white items-center justify-center shadow-md">
<span className="material-symbols-outlined text-xs font-black">check</span>
</div>
</button>
{/*  Avatar 6: Zephyr  */}
<button className={`avatar-card group relative p-3 rounded-2xl text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${avatar === 'Zephyr' ? 'clay-avatar-selected scale-105' : 'clay-avatar hover:scale-105'}`} data-avatar-img="zephyr" data-avatar-name="Zephyr" data-avatar-title="Futuristic Coder" type="button" onClick={() => setAvatar('Zephyr')}>
<div className="w-16 h-16 rounded-full overflow-hidden bg-toy-blue-light p-1 shadow-inner group-hover:rotate-6 transition-transform">
<img className="w-full h-full object-cover rounded-full" data-alt="3D stylized avatar of Zephyr a cyber athletic futuristic youth with lightweight neon smart glasses and cheerful energy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoZOb6nZlqkh7nI4_Tq9wZOC7ouTpXc_krwTtU5lCc8YgnMz5Tt9QJV57OeRSnII8Csy_Jjz1saZN60ok_DSInX0H6WOWotXLO7dIO52Ob33JScb1wtrjv39NL8Sarcg5-AOEOOkQJJREHy-U9iu3qgEIF_IKswfvz12ig99WO9u6N9Mb6lMEud2zovTEKSxpmTWAhA9Q5qiE7c5jUxpVDOFSNhV2S5jxKXVmb4kP-Vr5zpK_uGPjy"/>
</div>
<div className="flex flex-col">
<span className="text-xs font-black text-toy-navy leading-tight">Zephyr</span>
<span className="text-[10px] font-extrabold text-toy-navy/60">Futurist</span>
</div>
<div className="avatar-check hidden absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-toy-pink text-white items-center justify-center shadow-md">
<span className="material-symbols-outlined text-xs font-black">check</span>
</div>
</button>
</div>
</div>
{/*  DYNAMIC LIVE PREVIEW RIBBON (Animated 3D Toybox ID Card)  */}
<div className="rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-toy-blue-light via-white to-toy-pink-light border-2 border-toy-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-toy-pink shadow-md overflow-hidden flex-shrink-0 border-2 border-toy-border">
<span className="material-symbols-outlined text-3xl" id="preview-avatar-icon">face</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="text-xl font-black text-toy-navy" id="preview-name-display">{name || "Learner"}</span>
<span className="px-2.5 py-0.5 rounded-full clay-badge-yellow text-xs font-black" id="preview-grade-badge">{grade}</span>
</div>
<p className="text-xs sm:text-sm font-bold text-toy-navy/70 mt-0.5" id="preview-summary-text">Age {calculatedAge} · {calculatedAgeBand} Level ✦ Ready for AI Sandbox</p>
</div>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-toy-pink font-black text-xs shadow-sm border border-toy-pink/20">
<span className="material-symbols-outlined text-base">check_circle</span>
<span>Ready to Play!</span>
</div>
</div>
{/*  PRIMARY CHUBBY ACTION BUTTON & REASSURANCE MICROCOPY  */}
<div className="flex flex-col gap-3 pt-2">
<button className="clay-button-pink relative overflow-hidden w-full py-4 px-8 rounded-full text-white text-lg sm:text-xl font-black transition-all flex items-center justify-center gap-3 cursor-pointer group" id="submit-profile-btn" type="button" onClick={handleSubmit}>
<span id="btn-label-text">{storeName ? "Update Profile" : "Let's Go to Spark School"}</span>
<span className="material-symbols-outlined text-2xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
</button>
{/*  Reassurance Child-Friendly Microcopy  */}
<div className="flex flex-wrap items-center justify-center gap-3 text-center text-toy-navy/60 text-xs font-extrabold pt-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm text-toy-pink">lock_open_right</span>
<span>No password needed</span>
</span>
<span>•</span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm text-toy-blue">shield_with_heart</span>
<span>Protected Kid-Safe Sandbox</span>
</span>
<span>•</span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm text-amber-500">hotel_class</span>
<span>100% Free &amp; Ad-Free</span>
</span>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  Interactive Modal / Celebration Notification for Transition (Clay 3D Pop)  */}
<div className={`fixed inset-0 z-50 bg-[#1E1B4B]/60 backdrop-blur-md flex items-center justify-center p-6 ${isSubmitting ? "" : "hidden"}`} id="celebration-overlay">
<div className="w-full max-w-md bg-white rounded-4xl p-8 shadow-2xl border-4 border-white text-center flex flex-col items-center gap-4 animate-bounce" style={{ animationIterationCount: "1", animationDuration: "0.8s" }}>
<div className="w-20 h-20 rounded-3xl clay-badge-pink flex items-center justify-center text-white shadow-xl">
<span className="material-symbols-outlined text-4xl">rocket_launch</span>
</div>
<h3 className="text-2xl font-black text-toy-navy">Welcome aboard, <span className="text-toy-pink" id="modal-user-name">{name || "Learner"}</span>! 🎉</h3>
<p className="text-sm font-bold text-toy-navy/70">
      Sparky is packing your personalized 3D toybox quest map, customized for your grade level and interests!
    </p>
{/*  Progress Track  */}
<div className="w-full bg-toy-periwinkle rounded-full h-3.5 overflow-hidden mt-2 p-0.5 border border-toy-border">
<div className="h-full bg-gradient-to-r from-toy-pink to-toy-yellow rounded-full transition-all duration-1000 w-1/4 shadow-inner" id="loading-bar"></div>
</div>
<span className="text-xs font-black text-toy-pink">Configuring your creative play tools...</span>
</div>
</div>
</div>
</main>
    </div>
  );
}
