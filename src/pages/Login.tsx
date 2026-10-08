import { LoginForm } from "@/components/login-form";

export default function LoginLayout() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-[#f0f9fd]/50 flex flex-col items-center justify-center overflow-hidden font-sans antialiased text-slate-900 selection:bg-[#009bdf]/20 selection:text-[#0077b5]">
      {/* 1. AMBIENT LIGHT BACKGROUND GLOWS & MESH GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-20" />

      {/* Top glowing ambient Askari Blue pastel orb */}
      <div className="absolute -top-32 left-1/4 w-[650px] h-[450px] bg-gradient-to-br from-[#009bdf]/25 via-[#0077b5]/15 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Bottom glowing ambient Askari Tangerine/Steel pastel orb */}
      <div className="absolute -bottom-32 right-1/4 w-[650px] h-[450px] bg-gradient-to-tl from-[#f36f21]/20 via-[#009bdf]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Center soft ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#009bdf]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* 2. BACKGROUND MOVING HEADLINES LAYER */}
      <div className="absolute inset-0 flex flex-col justify-between py-8 pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
        {/* Top Headline: Moves Left to Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-[marquee_36s_linear_infinite] gap-16 text-[8.5rem] md:text-[10.5rem] font-black tracking-tighter uppercase leading-none bg-gradient-to-r from-[#009bdf]/35 via-[#0077b5]/30 to-[#808285]/35 bg-clip-text text-transparent opacity-70">
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
          </div>
        </div>

        {/* Center Headline: Moves Right to Left (Askari Blue Outlined Stroke) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-[marqueeReverse_46s_linear_infinite] gap-16 text-[8.5rem] md:text-[10.5rem] font-black tracking-tighter uppercase leading-none text-transparent [-webkit-text-stroke:2px_rgba(0,155,223,0.30)] opacity-70 hover:[-webkit-text-stroke:2px_rgba(0,155,223,0.55)] transition-all">
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
          </div>
        </div>

        {/* Bottom Headline: Moves Left to Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-[marquee_32s_linear_infinite] gap-16 text-[8.5rem] md:text-[10.5rem] font-black tracking-tighter uppercase leading-none bg-gradient-to-r from-[#0077b5]/30 via-[#808285]/30 to-[#009bdf]/35 bg-clip-text text-transparent opacity-60">
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
            <span>WPCS of AKBL 2026</span>
          </div>
        </div>
      </div>

      {/* 3. CENTER AUTHENTICATION CARD */}
      <div className="relative z-10 w-full px-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
