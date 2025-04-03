
import { Outlet } from "react-router-dom";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import AppSidebar from "@/components/AppSidebar";
import { useState } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, LogOut, Settings } from "lucide-react";

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
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start" asChild>
                      <a href="/config/empresa/dados-gerais">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </Button>
                    <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" asChild>
                      <a href="/logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </a>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
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
