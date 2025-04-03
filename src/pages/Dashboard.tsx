
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChartIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  UsersIcon,
  BoxIcon,
  AlertCircleIcon
} from "lucide-react";

const stats = [
  {
    title: "Vendas Hoje",
    value: "R$ 4.200",
    description: "+15% do que ontem",
    icon: DollarSignIcon,
  },
  {
    title: "Novos Clientes",
    value: "12",
    description: "+3 desde a semana passada",
    icon: UsersIcon,
  },
  {
    title: "Pedidos Pendentes",
    value: "8",
    description: "Precisam de aprovação",
    icon: ShoppingCartIcon,
  },
  {
    title: "Itens em Baixo Estoque",
    value: "5",
    description: "Atenção necessária",
    icon: AlertCircleIcon,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Data: {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="eink-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2 eink-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-5 w-5" /> Desempenho de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Chart placeholder - in a real app this would be a chart */}
            <div className="h-80 flex items-center justify-center border border-dashed rounded-md">
              <span className="text-muted-foreground">Gráfico de Vendas</span>
            </div>
          </CardContent>
        </Card>

        <Card className="eink-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BoxIcon className="h-5 w-5" /> Produtos Populares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Produto A", "Produto B", "Produto C", "Produto D", "Produto E"].map(
                (product, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between pb-2 border-b last:border-0"
                  >
                    <span>{product}</span>
                    <span>{Math.floor(Math.random() * 100) + 20} vendas</span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
