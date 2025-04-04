import { Outlet, useNavigate } from "react-router-dom";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import AppSidebar from "@/components/AppSidebar";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, LogOut, Settings } from "lucide-react";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  
  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc)
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollPosition = mainRef.current.scrollTop;
        setShowShadow(scrollPosition > 10);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex w-full font-quicksand">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className={`h-16 flex items-center px-4 bg-background sticky top-0 z-10 transition-shadow duration-200 ${showShadow ? 'shadow-md' : ''}`}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-medium ml-2">2103 ERP System</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>LB</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Lenoir Bueno</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 text-destructive" />
                    <span className="text-destructive">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main ref={mainRef} className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
        <footer className="p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 2103 - Todos os direitos reservados
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
