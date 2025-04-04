import { Outlet, NavLink, useLocation } from "react-router-dom";

const FiscalLayout = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 space-y-2 border-r pr-4">
        <NavLink
          to="/settings/fiscal/geral"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/fiscal/geral")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Geral
        </NavLink>
        <NavLink
          to="/settings/fiscal/nfe"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/fiscal/nfe")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          NF-e
        </NavLink>
        <NavLink
          to="/settings/fiscal/cte"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/fiscal/cte")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          CT-e
        </NavLink>
        <NavLink
          to="/settings/fiscal/nfse"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/fiscal/nfse")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          NFS-e
        </NavLink>
        <NavLink
          to="/settings/fiscal/nfce"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/fiscal/nfce")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          NFC-e
        </NavLink>
        <NavLink
          to="/settings/fiscal/matriz-fiscal"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/fiscal/matriz-fiscal")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Matriz Fiscal
        </NavLink>
        <NavLink
          to="/settings/fiscal/natureza-operacao"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/fiscal/natureza-operacao")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Natureza da Operação
        </NavLink>
      </div>
      <div className="col-span-3">
        <Outlet />
      </div>
    </div>
  );
};

export default FiscalLayout; 