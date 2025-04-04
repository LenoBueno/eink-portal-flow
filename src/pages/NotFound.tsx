
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background font-quicksand p-4">
      <div className="text-center space-y-6 max-w-md w-full">
        <div className="flex items-center justify-center">
          <div className="text-6xl font-bold border-b-4 border-primary p-2">404</div>
        </div>
        <h1 className="text-2xl font-bold mt-6">Página não encontrada</h1>
        <p className="text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="pt-6">
          <Button className="eink-button" asChild>
            <Link to="/">Voltar para o Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
