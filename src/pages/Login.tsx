import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao sistema",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md border rounded-lg shadow-sm bg-card">
        <div className="flex flex-col items-center p-6">
          <div className="bg-black dark:bg-black rounded-full p-4 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M2 9V5c0-1.1.9-2 2-2h4m10 2h4c1.1 0 2 .9 2 2v4m-10 10h-4c-1.1 0-2-.9-2-2v-4"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-1">Login</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Entre com suas credenciais para acessar o sistema
          </p>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 dark:bg-black dark:text-white dark:hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            
            <div className="text-center text-sm">
              <a href="#" className="text-muted-foreground hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
