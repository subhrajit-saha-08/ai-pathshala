import Link from 'next/link';
import { trainRobotLevels } from '../../../lib/trainRobotLevels';

export const metadata = {
  title: 'Train the Robot — Spark School',
  description: 'Choose a mission and teach Sparky how to see the world through AI vision challenges.',
};

const levelIcons: Record<number, string> = {
  1: 'visibility',
  2: 'sentiment_satisfied',
  3: 'gesture',
  4: 'contrast',
  5: 'zoom_in',
  6: 'wallpaper',
  7: 'content_copy',
  8: 'visibility_off',
  9: 'swap_horiz',
  10: 'checkroom',
  11: 'speed',
  12: 'group',
  13: 'palette',
  14: 'build',
  15: 'workspace_premium',
};

export default function TrainTheRobotDashboard() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body { margin: 0; padding: 0; }
        body { overscroll-behavior: none; }
        ::-webkit-scrollbar { display: none; }
        .spark-mesh-bg {
          background: linear-gradient(135deg, #FFF0F5 0%, #FFFDF0 50%, #F3F2FE 100%);
          background-attachment: fixed;
        }
      `}} />
      <div className="spark-mesh-bg min-h-screen selection:bg-[#8486E8] selection:text-white">
        {/* Hero Header */}
        <header className="relative overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#FF4D6D]/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-[#8486E8]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-[#FFB703]/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#8486E8]/20 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#FF4D6D] uppercase tracking-wider">Neural Lab Active</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#20172D] tracking-tight leading-tight">
                Train the <span className="bg-gradient-to-r from-[#FF4D6D] via-[#8486E8] to-[#FFB703] bg-clip-text text-transparent">Robot</span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-[#5A4E6B] font-medium leading-relaxed">
                Choose a mission and teach <strong className="text-[#FF4D6D] font-bold">Sparky</strong> how to see the world. Each level introduces a real AI vision challenge!
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF3D6] text-[#8F5E00] border border-[#FFB703]/40 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#FFB703]">bolt</span>
                  <span className="font-mono text-xs font-bold tracking-wide">15 Missions</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EEF0FF] text-[#35388E] border border-[#8486E8]/20 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#8486E8]">neurology</span>
                  <span className="font-mono text-xs font-bold tracking-wide">Vision AI</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Level Grid */}
        <main className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {trainRobotLevels.map((level) => {
              const icon = levelIcons[level.id] || 'smart_toy';
              const isCapstone = level.id === 15;

              return (
                <Link
                  key={level.id}
                  href={`/activities/train-the-robot/${level.id}`}
                  className={`
                    group relative flex flex-col gap-3 p-5 rounded-2xl
                    bg-white border shadow-[0_4px_20px_-2px_rgba(132,134,232,0.10),0_1px_4px_rgba(32,23,45,0.03)]
                    hover:-translate-y-1 hover:shadow-lg
                    active:scale-[0.98]
                    transition-all duration-200 ease-out
                    ${isCapstone
                      ? 'border-[#FFB703]/40 ring-1 ring-[#FFB703]/20'
                      : 'border-[#8486E8]/18'
                    }
                  `}
                >
                  {/* Level number badge */}
                  <div className="flex items-center justify-between">
                    <span className={`
                      inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-sm shadow-md
                      ${isCapstone
                        ? 'bg-gradient-to-br from-[#FFB703] to-[#FF8C00] shadow-[#FFB703]/30'
                        : 'bg-[#FF4D6D] shadow-[#FF4D6D]/30'
                      }
                    `}>
                      {level.id}
                    </span>
                    <span className={`
                      material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:scale-110
                      ${isCapstone ? 'text-[#FFB703]' : 'text-[#8486E8]/60'}
                    `}>
                      {icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-base text-[#20172D] tracking-tight leading-snug group-hover:text-[#35388E] transition-colors">
                    {level.title}
                  </h2>

                  {/* Mission preview */}
                  <p className="text-xs text-[#5A4E6B] font-medium leading-relaxed line-clamp-2">
                    {level.mission}
                  </p>

                  {/* Bottom meta */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#8486E8]/10">
                    <span className={`
                      font-mono text-[11px] font-bold uppercase tracking-wider
                      ${isCapstone ? 'text-[#8F5E00]' : 'text-[#5A4E6B]'}
                    `}>
                      {isCapstone ? '★ Capstone' : level.modelType === 'pose' ? 'Pose Model' : 'Image Model'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#FF4D6D] font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Start
                      <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                    </span>
                  </div>

                  {/* Capstone badge */}
                  {isCapstone && (
                    <div className="absolute -top-px -right-px px-2.5 py-0.5 rounded-bl-xl rounded-tr-2xl bg-gradient-to-r from-[#FFB703] to-[#FF8C00] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Final
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-white/70 backdrop-blur-md border-t border-[#8486E8]/20 py-4">
          <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#5A4E6B]">
            <div>Spark School Neural Lab Engine · Mission Selector v3.2</div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#FF4D6D]">
                <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
                15 Missions Available
              </span>
              <span className="text-[#C8C5E5]">|</span>
              <span>Copilot Sparky Standing By</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
