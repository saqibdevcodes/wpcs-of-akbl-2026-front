import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LogOut, ShieldCheck } from "lucide-react";
import Cookies from "js-cookie";

export default function AppHeader() {
  const userName = Cookies.get("userName");

  return (
    <header className="relative bg-white border-b border-slate-200/80 shadow-2xs">
      {/* Askari Signature Accent Line */}
      <div className="h-0.75 w-full bg-gradient-to-r from-[#009bdf] via-[#0082bc] to-[#f36f21]" />

      <div className="flex items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f0f9fd] text-[#0077b5] border border-[#009bdf]/25 shadow-2xs">
            <span className="size-1.5 rounded-full bg-[#009bdf] animate-pulse" />
            AKBL WPCS 2026
          </span>
          <span className="hidden sm:inline-block text-xs font-semibold text-[#808285]">
            Askari Bank Limited • Workplace Climate Survey
          </span>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#0077b5] hover:bg-[#f0f9fd] border border-slate-200/70 shadow-2xs transition-colors">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#0077b5] to-[#009bdf] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                  {userName?.charAt(0).toUpperCase() || "A"}
                </div>
                <span>{userName || "User Menu"}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-2 min-w-[210px] bg-white rounded-xl shadow-xl border border-slate-200">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <ShieldCheck className="size-3.5 text-[#009bdf]" />
                    <span>Askari Bank Portal</span>
                  </div>
                  <p className="text-[10px] text-[#808285] mt-0.5">
                    WPCS of AKBL 2026
                  </p>
                </div>
                <NavigationMenuLink
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg cursor-pointer transition-colors"
                  onClick={() => {
                    Cookies.remove("userName");
                    Cookies.remove("userEmail");
                    window.location.href = "/login";
                  }}
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
