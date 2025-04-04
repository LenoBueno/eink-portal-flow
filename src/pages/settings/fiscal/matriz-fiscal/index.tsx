import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileEdit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const matrizFiscalICMS = [
  {
    id: 1,
    uf_origem: "SC",
    uf_destino: "SC",
    operacao: "Venda",
    regime: "Simples Nacional",
    cfop: "5102",
    cst: "102",
    aliquota: 17,
  },
  {
    id: 2,
    uf_origem: "SC",
    uf_destino: "PR",
    operacao: "Venda",
    regime: "Simples Nacional",
    cfop: "6102",
    cst: "102",
    aliquota: 12,
  },
  {
    id: 3,
    uf_origem: "SC",
    uf_destino: "SP",
    operacao: "Venda",
    regime: "Simples Nacional",
    cfop: "6102",
    cst: "102",
    aliquota: 12,
  },
  {
    id: 4,
    uf_origem: "SC",
    uf_destino: "MG",
    operacao: "Venda",
    regime: "Simples Nacional",
    cfop: "6102",
    cst: "102",
    aliquota: 12,
  },
  {
    id: 5,
    uf_origem: "SC",
    uf_destino: "SC",
    operacao: "Devolução",
    regime: "Simples Nacional",
    cfop: "1202",
    cst: "202",
    aliquota: 17,
  },
];

const MatrizFiscal = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="icms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="icms">ICMS</TabsTrigger>
          <TabsTrigger value="ipi">IPI</TabsTrigger>
          <TabsTrigger value="piscofins">PIS/COFINS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="icms" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Matriz Fiscal - ICMS</CardTitle>
                <CardDescription>
                  Configure as regras fiscais para operações com ICMS
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative w-[250px]">
                  <Input placeholder="Buscar regra fiscal..." className="pl-8" />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <Button className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Nova Regra
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="UF Origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas UFs</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="UF Destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas UFs</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Operação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="devolucao">Devolução</SelectItem>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>UF Origem</TableHead>
                      <TableHead>UF Destino</TableHead>
                      <TableHead>Operação</TableHead>
                      <TableHead>Regime</TableHead>
                      <TableHead>CFOP</TableHead>
                      <TableHead>CST</TableHead>
                      <TableHead>Alíquota</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matrizFiscalICMS.map((regra) => (
                      <TableRow key={regra.id}>
                        <TableCell>{regra.uf_origem}</TableCell>
                        <TableCell>{regra.uf_destino}</TableCell>
                        <TableCell>{regra.operacao}</TableCell>
                        <TableCell>{regra.regime}</TableCell>
                        <TableCell>{regra.cfop}</TableCell>
                        <TableCell>{regra.cst}</TableCell>
                        <TableCell>{regra.aliquota}%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ipi" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Matriz Fiscal - IPI</CardTitle>
              <CardDescription>
                Configure as regras fiscais para operações com IPI
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">
                Nenhuma regra fiscal de IPI configurada. Clique em "Nova Regra" para adicionar.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="piscofins" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Matriz Fiscal - PIS/COFINS</CardTitle>
              <CardDescription>
                Configure as regras fiscais para operações com PIS/COFINS
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">
                Nenhuma regra fiscal de PIS/COFINS configurada. Clique em "Nova Regra" para adicionar.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatrizFiscal; 