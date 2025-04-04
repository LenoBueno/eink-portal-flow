
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProductsPage from "./pages/catalog/ProductsPage";
import ProductForm from "./pages/catalog/ProductForm";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="eink-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/dashboard" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="catalog/produtos" element={<ProductsPage />} />
                  <Route path="catalog/produtos/novo" element={<ProductForm />} />
                  <Route path="catalog/produtos/editar/:id" element={<ProductForm />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
