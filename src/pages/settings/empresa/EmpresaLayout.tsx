import { Outlet, NavLink, useLocation } from "react-router-dom";

const EmpresaLayout = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 space-y-2 border-r pr-4">
        <NavLink
          to="/settings/empresa/dados-gerais"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/empresa/dados-gerais")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Dados Gerais
        </NavLink>
        <NavLink
          to="/settings/empresa/funcionarios"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/empresa/funcionarios")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Funcionários
        </NavLink>
        <NavLink
          to="/settings/empresa/usuarios"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/empresa/usuarios")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Usuários
        </NavLink>
        <NavLink
          to="/settings/empresa/parametros-venda"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/empresa/parametros-venda")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Parâmetros de Venda
        </NavLink>
        <NavLink
          to="/settings/empresa/permissoes"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/empresa/permissoes")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Permissões
        </NavLink>
      </div>
      <div className="col-span-3">
        <Outlet />
      </div>
    </div>
  );
};

export default EmpresaLayout; 