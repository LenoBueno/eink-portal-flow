import { Link } from "react-router-dom";
import { 
  PackageIcon, ShoppingCartIcon, LayoutDashboardIcon, 
  Users2Icon, BarChart3Icon, Settings2Icon,
  Store, CreditCard, Package, Notebook, StoreIcon,
  ChevronDown, ChevronRight
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
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
  subItems?: SidebarItem[];
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Menu",
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
        subItems: [
          {
            title: "Em Aberto",
            icon: ChevronRight,
            href: "/compras/em-aberto",
          },
          {
            title: "Devoluções",
            icon: ChevronRight,
            href: "/compras/devolucoes",
          }
        ]
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
    title: "My Account",
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
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 flex flex-col items-center">
        <div className="flex items-center gap-2.5 mb-1">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">ENGLISH (UNITED)</span>
            <span className="font-semibold text-sm">Jackson Smith</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.title} className="mb-4">
            <SidebarGroupLabel className="text-xs tracking-wider text-muted-foreground ml-2 mb-1">
              {section.title.toUpperCase()}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.subItems ? (
                      <CollapsibleSidebarItem item={item} />
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link to={item.href} className="flex items-center">
                          <item.icon className="mr-2 h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="mt-auto p-4 border-t">
        {/* Footer content removed as requested */}
      </SidebarFooter>
    </Sidebar>
  );
};

interface CollapsibleSidebarItemProps {
  item: SidebarItem;
}

const CollapsibleSidebarItem: React.FC<CollapsibleSidebarItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full py-2 px-3 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <div className="flex items-center">
            <item.icon className="mr-2 h-5 w-5" />
            <span>{item.title}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-8 pt-1 space-y-1">
        {item.subItems?.map((subItem) => (
          <Link 
            key={subItem.title}
            to={subItem.href}
            className="flex items-center py-1.5 px-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span className="text-muted-foreground">{subItem.title}</span>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AppSidebar;
