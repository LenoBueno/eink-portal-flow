import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockUsuarios = [
  { id: 1, nome: "Admin", email: "admin@empresa.com.br", perfil: "Administrador", status: "Ativo" },
  { id: 2, nome: "José da Silva", email: "jose@empresa.com.br", perfil: "Gerente", status: "Ativo" },
  { id: 3, nome: "Maria Oliveira", email: "maria@empresa.com.br", perfil: "Vendedor", status: "Ativo" },
  { id: 4, nome: "Carlos Santos", email: "carlos@empresa.com.br", perfil: "Financeiro", status: "Inativo" },
  { id: 5, nome: "Roberta Lima", email: "roberta@empresa.com.br", perfil: "Suporte", status: "Ativo" },
];

const perfilIcons = {
  Administrador: <ShieldAlert className="h-4 w-4 text-destructive" />,
  Gerente: <ShieldCheck className="h-4 w-4 text-warning" />,
  Vendedor: <Shield className="h-4 w-4 text-muted-foreground" />,
  Financeiro: <Shield className="h-4 w-4 text-muted-foreground" />,
  Suporte: <Shield className="h-4 w-4 text-muted-foreground" />,
};

const Usuarios = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Usuários do Sistema</CardTitle>
            <CardDescription>
              Gerencie os usuários e suas permissões
            </CardDescription>
          </div>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Novo Usuário
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {perfilIcons[usuario.perfil as keyof typeof perfilIcons]}
                      {usuario.perfil}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={usuario.status === "Ativo" ? "default" : "outline"}
                      className={usuario.status === "Ativo" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {usuario.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Usuarios; 