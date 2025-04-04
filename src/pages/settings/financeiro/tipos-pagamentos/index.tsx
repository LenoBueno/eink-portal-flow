import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, CreditCard, Banknote, Building, Wallet, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const mockTiposPagamento = [
  { 
    id: 1, 
    descricao: "Cartão de Crédito", 
    icon: CreditCard, 
    parcelas: "1-12", 
    taxa: 2.5, 
    prazoPagamento: "30 dias", 
    ativo: true 
  },
  { 
    id: 2, 
    descricao: "Cartão de Débito", 
    icon: CreditCard, 
    parcelas: "1", 
    taxa: 1.5, 
    prazoPagamento: "2 dias", 
    ativo: true 
  },
  { 
    id: 3, 
    descricao: "Dinheiro", 
    icon: Banknote, 
    parcelas: "1", 
    taxa: 0, 
    prazoPagamento: "Imediato", 
    ativo: true 
  },
  { 
    id: 4, 
    descricao: "Transferência Bancária", 
    icon: Building, 
    parcelas: "1", 
    taxa: 0, 
    prazoPagamento: "Imediato", 
    ativo: true 
  },
  { 
    id: 5, 
    descricao: "Pix", 
    icon: Wallet, 
    parcelas: "1", 
    taxa: 0, 
    prazoPagamento: "Imediato", 
    ativo: true 
  },
  { 
    id: 6, 
    descricao: "Boleto Bancário", 
    icon: Receipt, 
    parcelas: "1", 
    taxa: 0, 
    prazoPagamento: "Vencimento", 
    ativo: true 
  },
  { 
    id: 7, 
    descricao: "Parcelamento Direto", 
    icon: Receipt, 
    parcelas: "1-6", 
    taxa: 0, 
    prazoPagamento: "30 dias", 
    ativo: false 
  },
];

const TiposPagamento = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tipos de Pagamento</CardTitle>
            <CardDescription>
              Gerencie as formas de pagamento disponíveis
            </CardDescription>
          </div>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Novo Tipo
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Parcelas</TableHead>
                <TableHead>Taxa (%)</TableHead>
                <TableHead>Prazo de Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTiposPagamento.map((tipo) => (
                <TableRow key={tipo.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <tipo.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{tipo.descricao}</span>
                    </div>
                  </TableCell>
                  <TableCell>{tipo.parcelas}</TableCell>
                  <TableCell>{tipo.taxa}%</TableCell>
                  <TableCell>{tipo.prazoPagamento}</TableCell>
                  <TableCell>
                    <Switch checked={tipo.ativo} />
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

      <Card>
        <CardHeader>
          <CardTitle>Configurações Adicionais</CardTitle>
          <CardDescription>
            Configurações gerais para pagamentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium">
                Mensagem de Aprovação de Pagamento
              </label>
              <p className="text-sm text-muted-foreground">
                Exibir mensagem quando o pagamento for aprovado
              </p>
            </div>
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium">
                Gerar Recibo Automaticamente
              </label>
              <p className="text-sm text-muted-foreground">
                Gerar recibo ao confirmar pagamento no sistema
              </p>
            </div>
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium">
                Notificar Cliente sobre Pagamento
              </label>
              <p className="text-sm text-muted-foreground">
                Enviar email/SMS sobre status do pagamento
              </p>
            </div>
            <Switch checked={false} />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Salvar Configurações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TiposPagamento; 