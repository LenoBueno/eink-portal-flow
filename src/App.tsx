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
import ClientsPage from "./pages/catalog/ClientsPage";
import ClientForm from "./pages/ClientForm";

// Importações de páginas de configurações
import SettingsLayout from "./pages/settings/SettingsLayout";
import EmpresaLayout from "./pages/settings/empresa/EmpresaLayout";
import FinanceiroLayout from "./pages/settings/financeiro/FinanceiroLayout";
import FiscalLayout from "./pages/settings/fiscal/FiscalLayout";

// Importações de páginas da empresa
import DadosGerais from "./pages/settings/empresa/dados-gerais";
import Funcionarios from "./pages/settings/empresa/funcionarios";
import Usuarios from "./pages/settings/empresa/usuarios";
import ParametrosVenda from "./pages/settings/empresa/parametros-venda";
import Permissoes from "./pages/settings/empresa/permissoes";

// Importações de páginas do financeiro
import ContaGerencial from "./pages/settings/financeiro/conta-gerencial";
import ContaCorrente from "./pages/settings/financeiro/conta-corrente";
import TiposPagamentos from "./pages/settings/financeiro/tipos-pagamentos";

// Importações de páginas fiscais
import FiscalGeral from "./pages/settings/fiscal/geral/index";
import NFe from "./pages/settings/fiscal/nfe/index";
import MatrizFiscal from "./pages/settings/fiscal/matriz-fiscal/index";
import CTe from "./pages/settings/fiscal/cte/index";
import NFSe from "./pages/settings/fiscal/nfse/index";
import NFCe from "./pages/settings/fiscal/nfce/index";
import NaturezaOperacao from "./pages/settings/fiscal/natureza-operacao/index";

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
                  
                  {/* Rotas de Clientes */}
                  <Route path="clientes" element={<ClientsPage />} />
                  <Route path="clientes/novo" element={<ClientForm />} />
                  <Route path="clientes/editar/:id" element={<ClientForm />} />
                  
                  {/* Rotas de configurações */}
                  <Route path="settings" element={<SettingsLayout />}>
                    {/* Configurações da Empresa */}
                    <Route path="empresa" element={<EmpresaLayout />}>
                      <Route path="dados-gerais" element={<DadosGerais />} />
                      <Route path="funcionarios" element={<Funcionarios />} />
                      <Route path="usuarios" element={<Usuarios />} />
                      <Route path="parametros-venda" element={<ParametrosVenda />} />
                      <Route path="permissoes" element={<Permissoes />} />
                      <Route index element={<Navigate to="dados-gerais" replace />} />
                    </Route>
                    
                    {/* Configurações Financeiras */}
                    <Route path="financeiro" element={<FinanceiroLayout />}>
                      <Route path="conta-gerencial" element={<ContaGerencial />} />
                      <Route path="conta-corrente" element={<ContaCorrente />} />
                      <Route path="tipos-pagamentos" element={<TiposPagamentos />} />
                      <Route index element={<Navigate to="conta-gerencial" replace />} />
                    </Route>
                    
                    {/* Configurações Fiscais */}
                    <Route path="fiscal" element={<FiscalLayout />}>
                      <Route path="geral" element={<FiscalGeral />} />
                      <Route path="nfe" element={<NFe />} />
                      <Route path="cte" element={<CTe />} />
                      <Route path="nfse" element={<NFSe />} />
                      <Route path="nfce" element={<NFCe />} />
                      <Route path="matriz-fiscal" element={<MatrizFiscal />} />
                      <Route path="natureza-operacao" element={<NaturezaOperacao />} />
                      <Route index element={<Navigate to="geral" replace />} />
                    </Route>
                    
                    {/* Rota padrão para settings */}
                    <Route index element={<Navigate to="empresa/dados-gerais" replace />} />
                  </Route>
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
