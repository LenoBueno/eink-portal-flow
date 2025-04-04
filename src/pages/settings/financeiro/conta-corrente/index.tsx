import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileEdit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockContas = [
  { id: 1, banco: "Banco do Brasil", agencia: "1234-5", conta: "12345-6", tipo: "Corrente", saldo: 25468.90, status: "Ativa" },
  { id: 2, banco: "Itaú", agencia: "5678-9", conta: "98765-4", tipo: "Corrente", saldo: 12540.35, status: "Ativa" },
  { id: 3, banco: "Caixa Econômica", agencia: "1111-2", conta: "11111-1", tipo: "Poupança", saldo: 5300.00, status: "Ativa" },
  { id: 4, banco: "Santander", agencia: "3333-4", conta: "33333-3", tipo: "Corrente", saldo: 0.00, status: "Inativa" },
  { id: 5, banco: "Nubank", agencia: "0001", conta: "9999999-9", tipo: "Digital", saldo: 3240.75, status: "Ativa" },
];

const ContaCorrente = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Contas Correntes</CardTitle>
            <CardDescription>
              Gerencie as contas bancárias da empresa
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
                <TableHead>Banco</TableHead>
                <TableHead>Agência</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContas.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="font-medium">{conta.banco}</TableCell>
                  <TableCell>{conta.agencia}</TableCell>
                  <TableCell>{conta.conta}</TableCell>
                  <TableCell>{conta.tipo}</TableCell>
                  <TableCell className="font-mono">
                    {conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={conta.status === "Ativa" ? "default" : "outline"}
                      className={conta.status === "Ativa" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {conta.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
          <CardDescription>
            Visão geral das movimentações nas contas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Saldo Total</p>
              <p className="text-2xl font-bold">
                {mockContas.reduce((total, conta) => total + (conta.status === "Ativa" ? conta.saldo : 0), 0)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            
            <div className="space-y-2 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Contas Ativas</p>
              <p className="text-2xl font-bold">
                {mockContas.filter(conta => conta.status === "Ativa").length}
              </p>
            </div>
            
            <div className="space-y-2 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Contas Inativas</p>
              <p className="text-2xl font-bold">
                {mockContas.filter(conta => conta.status === "Inativa").length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContaCorrente; 