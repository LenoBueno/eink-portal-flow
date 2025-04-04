import { Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SettingsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("empresa");

  useEffect(() => {
    // Determinar a aba ativa com base na URL atual
    const path = location.pathname;
    if (path.includes("/settings/empresa")) {
      setActiveTab("empresa");
    } else if (path.includes("/settings/financeiro")) {
      setActiveTab("financeiro");
    } else if (path.includes("/settings/fiscal")) {
      setActiveTab("fiscal");
    } else {
      // Redirecionar para a página padrão de configurações da empresa se estivermos apenas em /settings
      if (path === "/settings" || path === "/settings/") {
        navigate("/settings/empresa/dados-gerais");
      }
    }
  }, [location, navigate]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Redirecionar para a primeira subpágina de cada aba
    switch (value) {
      case "empresa":
        navigate("/settings/empresa/dados-gerais");
        break;
      case "financeiro":
        navigate("/settings/financeiro/conta-gerencial");
        break;
      case "fiscal":
        navigate("/settings/fiscal/geral");
        break;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout; 