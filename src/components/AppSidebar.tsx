
import { Link } from "react-router-dom";
import { 
  PackageIcon, ShoppingCartIcon, LayoutDashboardIcon, 
  Users2Icon, BarChart3Icon, Settings2Icon,
  Store, CreditCard, Package, Notebook, StoreIcon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Principal",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboardIcon,
        href: "/",
      }
    ],
  },
  {
    title: "Catálogo",
    items: [
      {
        title: "Produtos",
        icon: PackageIcon,
        href: "/catalog/produtos",
      },
      {
        title: "Serviços",
        icon: StoreIcon,
        href: "/catalog/servicos",
      },
      {
        title: "Categorias",
        icon: Package,
        href: "/catalog/categorias",
      },
    ],
  },
  {
    title: "Compras",
    items: [
      {
        title: "Pedidos/Orçamentos",
        icon: ShoppingCartIcon,
        href: "/compras/pedidos-orcamentos",
      },
      {
        title: "Fornecedores",
        icon: Store,
        href: "/compras/fornecedores",
      },
    ],
  },
  {
    title: "Vendas",
    items: [
      {
        title: "Pedidos/Orçamentos",
        icon: ShoppingCartIcon,
        href: "/vendas/pedidos-orcamentos",
      },
      {
        title: "Clientes",
        icon: Users2Icon,
        href: "/vendas/clientes",
      },
    ],
  },
  {
    title: "Financeiro",
    items: [
      {
        title: "Fluxo de Caixa",
        icon: BarChart3Icon,
        href: "/financeiro/fluxo-caixa",
      },
      {
        title: "Pagamentos",
        icon: CreditCard,
        href: "/financeiro/pagamentos/a-pagar",
      },
      {
        title: "Recebimentos",
        icon: CreditCard,
        href: "/financeiro/recebimentos/a-receber",
      },
    ],
  },
  {
    title: "Configurações",
    items: [
      {
        title: "Configurações",
        icon: Settings2Icon,
        href: "/config/empresa/dados-gerais",
      },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center space-x-2">
        <Notebook className="w-6 h-6" />
        <span className="font-semibold text-lg">ERP System</span>
      </SidebarHeader>
      <SidebarContent>
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.href} className="flex items-center">
                        <item.icon className="mr-2 h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-center">
          <span className="text-xs text-muted-foreground">v1.0.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
