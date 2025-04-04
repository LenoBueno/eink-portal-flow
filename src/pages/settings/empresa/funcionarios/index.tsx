import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const mockFuncionarios = [
  { id: 1, nome: "João Silva", cargo: "Gerente", departamento: "Administrativo", contato: "(47) 99999-8888" },
  { id: 2, nome: "Maria Oliveira", cargo: "Analista", departamento: "Financeiro", contato: "(47) 99999-7777" },
  { id: 3, nome: "Pedro Santos", cargo: "Vendedor", departamento: "Comercial", contato: "(47) 99999-6666" },
  { id: 4, nome: "Ana Costa", cargo: "Assistente", departamento: "RH", contato: "(47) 99999-5555" },
  { id: 5, nome: "Lucas Ferreira", cargo: "Técnico", departamento: "TI", contato: "(47) 99999-4444" },
];

const Funcionarios = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Funcionários</CardTitle>
            <CardDescription>
              Gerencie os funcionários da sua empresa
            </CardDescription>
          </div>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Novo Funcionário
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFuncionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium">{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.cargo}</TableCell>
                  <TableCell>{funcionario.departamento}</TableCell>
                  <TableCell>{funcionario.contato}</TableCell>
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

export default Funcionarios; 