import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const mockContas = [
  { id: 1, codigo: "1", descricao: "ATIVO", tipo: "Sintética", nivel: 1 },
  { id: 2, codigo: "1.1", descricao: "ATIVO CIRCULANTE", tipo: "Sintética", nivel: 2 },
  { id: 3, codigo: "1.1.1", descricao: "DISPONÍVEL", tipo: "Sintética", nivel: 3 },
  { id: 4, codigo: "1.1.1.1", descricao: "CAIXA", tipo: "Analítica", nivel: 4 },
  { id: 5, codigo: "1.1.1.2", descricao: "BANCOS CONTA MOVIMENTO", tipo: "Analítica", nivel: 4 },
  { id: 6, codigo: "1.1.2", descricao: "CRÉDITOS", tipo: "Sintética", nivel: 3 },
  { id: 7, codigo: "1.1.2.1", descricao: "CLIENTES", tipo: "Analítica", nivel: 4 },
  { id: 8, codigo: "2", descricao: "PASSIVO", tipo: "Sintética", nivel: 1 },
  { id: 9, codigo: "2.1", descricao: "PASSIVO CIRCULANTE", tipo: "Sintética", nivel: 2 },
  { id: 10, codigo: "2.1.1", descricao: "FORNECEDORES", tipo: "Analítica", nivel: 3 },
];

const ContaGerencial = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Plano de Contas Gerencial</CardTitle>
            <CardDescription>
              Gerencie as contas gerenciais para relatórios financeiros
            </CardDescription>
          </div>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Nova Conta
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContas.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="font-mono">{conta.codigo}</TableCell>
                  <TableCell className="font-medium">
                    <div style={{ marginLeft: `${(conta.nivel - 1) * 16}px` }}>
                      {conta.descricao}
                    </div>
                  </TableCell>
                  <TableCell>{conta.tipo}</TableCell>
                  <TableCell>{conta.nivel}</TableCell>
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

export default ContaGerencial; 