import { LoginForm } from "@/components/login-form";
export default function LoginLayout() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center overflow-hidden font-sans antialiased">
      {/* BACKGROUND MOVING HEADLINES LAYER */}
      <div className="absolute inset-0 flex flex-col justify-between py-12 pointer-events-none select-none overflow-hidden z-0 opacity-40">
        {/* Top Headline: Moves Left to Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-[marqueeReverse_30s_linear_infinite] gap-12 text-[10rem] font-black tracking-tighter text-sky-400 uppercase leading-none">
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
          </div>
        </div>

        {/* Center Headline: Moves Right to Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-[marqueeReverse_30s_linear_infinite] gap-12 text-[10rem] font-black tracking-tighter text-sky-300 uppercase leading-none">
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
          </div>
        </div>

        {/* Bottom Headline: Moves Right to Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-[marqueeReverse_30s_linear_infinite] gap-12 text-[10rem] font-black tracking-tighter text-sky-200 uppercase leading-none">
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
            <span>Kashf Foundation</span>
          </div>
        </div>
      </div>

      {/* Decorative subtle ambient backdrop blur */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none z-0" />

      {/* CENTER AUTHENTICATION CARD */}
      <div className="relative z-10 w-full px-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <LoginForm />
      </div>
    </div>
  );
}
