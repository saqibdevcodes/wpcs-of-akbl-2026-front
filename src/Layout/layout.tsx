import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar/AppSidebar";
import AppHeader from "@/components/AppHeader/AppHeader";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full min-h-screen bg-slate-50/70 flex flex-col">
        <AppHeader />
        <main className="m-6 flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
