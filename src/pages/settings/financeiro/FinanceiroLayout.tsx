import { Outlet, NavLink, useLocation } from "react-router-dom";

const FinanceiroLayout = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 space-y-2 border-r pr-4">
        <NavLink
          to="/settings/financeiro/conta-gerencial"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/financeiro/conta-gerencial")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Conta Gerencial
        </NavLink>
        <NavLink
          to="/settings/financeiro/conta-corrente"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/financeiro/conta-corrente")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Conta Corrente
        </NavLink>
        <NavLink
          to="/settings/financeiro/tipos-pagamentos"
          className={`block p-2 rounded-md transition-colors ${
            isActive("/settings/financeiro/tipos-pagamentos")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Tipos de Pagamentos
        </NavLink>
      </div>
      <div className="col-span-3">
        <Outlet />
      </div>
    </div>
  );
};

export default FinanceiroLayout; 