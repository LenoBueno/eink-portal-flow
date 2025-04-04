import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, FileEdit } from "lucide-react";

const mockNaturezas = [
  { id: 1, codigo: "1.101", descricao: "Venda de produção do estabelecimento", tipo: "Entrada", finalidade: "Normal" },
  { id: 2, codigo: "1.102", descricao: "Devolução de venda de produção do estabelecimento", tipo: "Entrada", finalidade: "Devolução" },
  { id: 3, codigo: "2.101", descricao: "Compra para comercialização", tipo: "Saída", finalidade: "Normal" },
  { id: 4, codigo: "2.102", descricao: "Devolução de compra para comercialização", tipo: "Saída", finalidade: "Devolução" },
  { id: 5, codigo: "5.101", descricao: "Venda de produção do estabelecimento", tipo: "Saída", finalidade: "Normal" },
  { id: 6, codigo: "5.102", descricao: "Devolução de compra para comercialização", tipo: "Saída", finalidade: "Devolução" },
];

const NaturezaOperacao = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Natureza da Operação</CardTitle>
            <CardDescription>
              Gerencie as naturezas de operação utilizadas em documentos fiscais
            </CardDescription>
          </div>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Nova Natureza
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Finalidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNaturezas.map((natureza) => (
                <TableRow key={natureza.id}>
                  <TableCell className="font-mono">{natureza.codigo}</TableCell>
                  <TableCell className="font-medium">{natureza.descricao}</TableCell>
                  <TableCell>{natureza.tipo}</TableCell>
                  <TableCell>{natureza.finalidade}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
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

export default NaturezaOperacao; 