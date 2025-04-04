import { Link, useLocation } from "react-router-dom";
import { 
  PackageIcon, ShoppingCartIcon, LayoutDashboardIcon, 
  Users2Icon, BarChart3Icon, Settings2Icon,
  Store, CreditCard, Package, StoreIcon,
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
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarItem {
  title: string;
  icon?: React.ElementType;
  href: string;
  subItems?: SidebarItem[];
}

interface SidebarSection {
  title: string;
  icon?: React.ElementType;
  href: string;
  items: SidebarItem[];
}

// Menu reorganizado para eliminar redundâncias
const sidebarSections: SidebarSection[] = [
  {
    title: "DASHBOARD",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    items: [],
  },
  {
    title: "CATÁLOGO",
    icon: PackageIcon,
    href: "/dashboard/catalog",
    items: [
      {
        title: "Produtos",
        href: "/dashboard/catalog/produtos",
      },
    ],
  },
  {
    title: "COMPRAS",
    icon: ShoppingCartIcon,
    href: "/dashboard/compras",
    items: [
      {
        title: "Pedidos/Orçamentos",
        href: "/dashboard/compras/pedidos-orcamentos",
        subItems: [
          {
            title: "Em Aberto",
            href: "/dashboard/compras/em-aberto",
          },
          {
            title: "Devoluções",
            href: "/dashboard/compras/devolucoes",
          }
        ]
      },
      {
        title: "Fornecedores",
        href: "/dashboard/compras/fornecedores",
      },
    ],
  },
  {
    title: "VENDAS",
    icon: Users2Icon,
    href: "/dashboard/vendas",
    items: [
      {
        title: "Pedidos/Orçamentos",
        href: "/dashboard/vendas/pedidos-orcamentos",
        subItems: [
          {
            title: "Em Aberto",
            href: "/dashboard/vendas/em-aberto",
          },
          {
            title: "Devoluções",
            href: "/dashboard/vendas/devolucoes",
          }
        ]
      },
      {
        title: "Clientes",
        href: "/dashboard/clientes",
      },
    ],
  },
  {
    title: "FINANCEIRO",
    icon: BarChart3Icon,
    href: "/dashboard/financeiro",
    items: [
      {
        title: "Fluxo de Caixa",
        href: "/dashboard/financeiro/fluxo-caixa",
      },
      {
        title: "Pagamentos",
        href: "/dashboard/financeiro/pagamentos/a-pagar",
      },
      {
        title: "Recebimentos",
        href: "/dashboard/financeiro/recebimentos/a-receber",
      },
    ],
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Verifica qual seção deve estar aberta com base na URL atual
  useEffect(() => {
    const newOpenSections: Record<string, boolean> = {};
    
    sidebarSections.forEach(section => {
      // Verifica se o caminho atual começa com o caminho da seção
      if (location.pathname.startsWith(section.href)) {
        newOpenSections[section.title] = true;
      }
    });
    
    setOpenSections(newOpenSections);
  }, [location.pathname]);

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };
  
  return (
    <Sidebar className="border-r">
      <SidebarContent className="px-2 py-4">
        {/* Avatar e informações do usuário alinhados com os ícones */}
        <SidebarGroup className="mb-4">
          <div className="flex items-center pl-3 py-2">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>LB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">PORTUGUÊS (BRASIL)</span>
              <span className="text-sm font-medium">Lenoir Bueno</span>
            </div>
          </div>
        </SidebarGroup>
        
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.title} className="mb-4">
            {section.items.length > 0 ? (
              <Collapsible 
                open={openSections[section.title]} 
                onOpenChange={() => toggleSection(section.title)}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <button className={`flex items-center justify-between w-full py-2 px-3 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}>
                    <div className="flex items-center">
                      {section.icon && <section.icon className="mr-2 h-5 w-5" />}
                      <span>{section.title}</span>
                    </div>
                    {openSections[section.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-7 pt-1 space-y-1">
                  {section.items.map((item) => (
                    item.subItems ? (
                      <SubMenu 
                        key={item.title} 
                        item={item} 
                        location={location}
                      />
                    ) : (
                      <Link 
                        key={item.title}
                        to={item.href}
                        className={`flex items-center py-1.5 px-2 text-sm rounded-md ${
                          (location.pathname === item.href || location.pathname.startsWith(item.href + "/")) 
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                            : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <span className={(location.pathname === item.href || location.pathname.startsWith(item.href + "/")) ? "" : "text-muted-foreground"}>
                          {item.title}
                        </span>
                      </Link>
                    )
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              // Para o Dashboard (sem submenus)
              <Link 
                to={section.href} 
                className={`flex items-center justify-between w-full py-2 px-3 text-sm font-medium rounded-md ${
                  (location.pathname === section.href || location.pathname === section.href + "/") 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <div className="flex items-center">
                  {section.icon && <section.icon className="mr-2 h-5 w-5" />}
                  <span>{section.title}</span>
                </div>
              </Link>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="mt-auto p-4">
        <div className="text-center text-xs text-muted-foreground">
          eink-portal © 2024
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

interface SubMenuProps {
  item: SidebarItem;
  location: ReturnType<typeof useLocation>;
}

const SubMenu: React.FC<SubMenuProps> = ({ item, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (item.subItems?.some(subItem => 
      location.pathname === subItem.href || 
      location.pathname.startsWith(subItem.href + "/")
    )) {
      setIsOpen(true);
    }
  }, [location.pathname, item.subItems]);
  
  const isActive = item.subItems?.some(
    subItem => location.pathname === subItem.href || location.pathname.startsWith(subItem.href + "/")
  ) || location.pathname === item.href;
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <button className={`flex items-center justify-between w-full py-1.5 px-2 text-sm rounded-md ${
          isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        }`}>
          <span className={isActive ? "" : "text-muted-foreground"}>
            {item.title}
          </span>
          {isOpen ? (
            <ChevronDown className="h-3 w-3 ml-2" />
          ) : (
            <ChevronRight className="h-3 w-3 ml-2" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 pt-1 space-y-1">
        {item.subItems?.map((subItem) => {
          const isSubActive = location.pathname === subItem.href || location.pathname.startsWith(subItem.href + "/");
          return (
            <Link 
              key={subItem.title}
              to={subItem.href}
              className={`flex items-center py-1.5 px-2 text-sm rounded-md ${
                isSubActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <span className={isSubActive ? "" : "text-muted-foreground"}>
                {subItem.title}
              </span>
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AppSidebar;
