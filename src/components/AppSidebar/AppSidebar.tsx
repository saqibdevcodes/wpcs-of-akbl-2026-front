import { LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// Sample navigation items
const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  // { title: "Profile", url: "/profile", icon: User },
];

export default function AppSidebar() {
  const userName = Cookies.get("userName");
  const initial = userName?.charAt(0).toUpperCase() || "A";
  return (
    <Sidebar className="border-r border-slate-200/80 shadow-md bg-white animate-in fade-in-50">
      <SidebarHeader className="flex items-center justify-center py-5 px-4 bg-white border-b border-slate-100">
        <img
          src="/askari-logo.png"
          alt="Askari Bank Limited"
          className="h-10 w-auto max-w-[190px] object-contain transition-transform hover:scale-105 duration-200"
        />
      </SidebarHeader>

      <SidebarContent className="p-4 gap-4 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-extrabold text-[#808285] uppercase tracking-widest">
            Survey Portal
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="gap-1.5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link to={item.url}>
                    <SidebarMenuButton className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[#f0f9fd] hover:text-[#0077b5] data-[active=true]:bg-[#009bdf]/10 data-[active=true]:text-[#0077b5] data-[active=true]:border-l-4 data-[active=true]:border-l-[#009bdf] data-[active=true]:shadow-xs">
                      <item.icon className="h-4 w-4 shrink-0 text-[#009bdf]" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4 border-t border-slate-100 mt-auto bg-white">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#f0f9fd] cursor-pointer transition-colors border border-transparent hover:border-[#009bdf]/20">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#0077b5] via-[#009bdf] to-[#38bdf8] flex items-center justify-center text-white text-xs font-black shadow-sm shadow-[#009bdf]/30 shrink-0">
            {initial}
          </div>
          <div className="flex flex-col text-left overflow-hidden min-w-0">
            <span className="text-sm font-bold text-slate-800 leading-tight truncate">
              {Cookies.get("userName") || "AKBL User"}
            </span>
            <span className="text-[11px] text-[#808285] truncate font-medium mt-0.5">
              {Cookies.get("userEmail") || "askari-bank@akbl.com.pk"}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
