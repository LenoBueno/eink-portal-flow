import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const perfis = [
  { id: 1, nome: "Administrador", cor: "bg-red-500" },
  { id: 2, nome: "Gerente", cor: "bg-yellow-500" },
  { id: 3, nome: "Vendedor", cor: "bg-green-500" },
  { id: 4, nome: "Financeiro", cor: "bg-blue-500" },
  { id: 5, nome: "Suporte", cor: "bg-purple-500" },
];

const modulos = [
  { id: 1, nome: "Dashboard", permissoes: ["Visualizar"] },
  { id: 2, nome: "Catálogo", permissoes: ["Visualizar", "Criar", "Editar", "Excluir"] },
  { id: 3, nome: "Vendas", permissoes: ["Visualizar", "Criar", "Editar", "Excluir", "Aprovar"] },
  { id: 4, nome: "Compras", permissoes: ["Visualizar", "Criar", "Editar", "Excluir", "Aprovar"] },
  { id: 5, nome: "Financeiro", permissoes: ["Visualizar", "Criar", "Editar", "Excluir", "Aprovar"] },
  { id: 6, nome: "Configurações", permissoes: ["Visualizar", "Editar"] },
];

// Permissões mockadas para cada perfil
const permissoesMock: Record<string, Record<string, Record<string, boolean>>> = {
  "Administrador": {
    "Dashboard": { "Visualizar": true },
    "Catálogo": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": true },
    "Vendas": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": true, "Aprovar": true },
    "Compras": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": true, "Aprovar": true },
    "Financeiro": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": true, "Aprovar": true },
    "Configurações": { "Visualizar": true, "Editar": true },
  },
  "Gerente": {
    "Dashboard": { "Visualizar": true },
    "Catálogo": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": false },
    "Vendas": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": false, "Aprovar": true },
    "Compras": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": false, "Aprovar": true },
    "Financeiro": { "Visualizar": true, "Criar": false, "Editar": false, "Excluir": false, "Aprovar": false },
    "Configurações": { "Visualizar": true, "Editar": false },
  },
  "Vendedor": {
    "Dashboard": { "Visualizar": true },
    "Catálogo": { "Visualizar": true, "Criar": false, "Editar": false, "Excluir": false },
    "Vendas": { "Visualizar": true, "Criar": true, "Editar": true, "Excluir": false, "Aprovar": false },
    "Compras": { "Visualizar": false, "Criar": false, "Editar": false, "Excluir": false, "Aprovar": false },
    "Financeiro": { "Visualizar": false, "Criar": false, "Editar": false, "Excluir": false, "Aprovar": false },
    "Configurações": { "Visualizar": false, "Editar": false },
  },
};

const Permissoes = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="perfis" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="perfis">Perfis de Acesso</TabsTrigger>
          <TabsTrigger value="permissoes">Permissões por Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfis" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Perfis de Acesso</CardTitle>
                <CardDescription>
                  Gerencie os perfis de acesso do sistema
                </CardDescription>
              </div>
              <Button className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Novo Perfil
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perfis.map((perfil) => (
                    <TableRow key={perfil.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${perfil.cor}`}></span>
                          <span className="font-medium">{perfil.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell>Perfil de acesso para {perfil.nome}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissoes" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissões por Perfil</CardTitle>
              <CardDescription>
                Configure as permissões de cada perfil para os módulos do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Selecione o Perfil</label>
                <Select defaultValue="Administrador">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {perfis.map((perfil) => (
                      <SelectItem key={perfil.id} value={perfil.nome}>
                        {perfil.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Módulo</TableHead>
                    {["Visualizar", "Criar", "Editar", "Excluir", "Aprovar"].map((permissao) => (
                      <TableHead key={permissao} className="text-center">{permissao}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modulos.map((modulo) => (
                    <TableRow key={modulo.id}>
                      <TableCell className="font-medium">{modulo.nome}</TableCell>
                      {["Visualizar", "Criar", "Editar", "Excluir", "Aprovar"].map((permissao) => {
                        const temPermissao = permissoesMock["Administrador"][modulo.nome]?.[permissao];
                        const mostrarPermissao = modulo.permissoes.includes(permissao);
                        
                        return (
                          <TableCell key={`${modulo.nome}-${permissao}`} className="text-center">
                            {mostrarPermissao ? (
                              temPermissao ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                              )
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Permissoes; 