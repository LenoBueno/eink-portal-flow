
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import AppSidebar from "@/components/AppSidebar";
import { useState } from "react";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex w-full font-quicksand">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center px-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-medium ml-2">ERP System</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
        <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ERP System - All rights reserved
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
