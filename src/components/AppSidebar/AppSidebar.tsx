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
  const initial = userName?.charAt(0).toUpperCase() || "I";
  return (
    <Sidebar className="border-r border-white shadow-lg bg-sidebar animate-in fade-in-50">
      <SidebarHeader className=" flex items-center justify-center py-6 bg-white">
        <img src="/iris.png" alt="logo" className="h-16 w-32" />
      </SidebarHeader>

      <SidebarContent className="p-4 gap-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link to={item.url}>
                    <SidebarMenuButton className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary">
                      <item.icon className="h-4 w-4 shrink-0 opacity-80" />
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
      <SidebarFooter className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors">
          {Cookies.get("userName") ? (
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              I-{initial}
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              I
            </div>
          )}
          <div className="flex flex-col text-left">
            {Cookies.get("userName") ? (
              <span className="text-sm font-medium leading-none">
                {Cookies.get("userName")}
              </span>
            ) : (
              <span className="text-sm font-medium leading-none">User</span>
            )}
            {Cookies.get("userEmail") ? (
              <span className="text-xs text-muted-foreground mt-1">
                {Cookies.get("userEmail")}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground mt-1">
                test@iris.com
              </span>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
