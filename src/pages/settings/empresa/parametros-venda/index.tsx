import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ParametrosVenda = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="descontos">Descontos</TabsTrigger>
          <TabsTrigger value="prazos">Prazos e Condições</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geral" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros Gerais de Venda</CardTitle>
              <CardDescription>
                Configure os parâmetros gerais para vendas da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Aprovar vendas automaticamente
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Vendas serão aprovadas sem necessidade de revisão
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Bloquear vendas para clientes inadimplentes
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Impedir a venda para clientes com títulos em atraso
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valor-minimo">Valor Mínimo para Venda</Label>
                <Input id="valor-minimo" placeholder="0,00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valor-frete-gratis">Valor Mínimo para Frete Grátis</Label>
                <Input id="valor-frete-gratis" placeholder="0,00" />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="descontos" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros de Descontos</CardTitle>
              <CardDescription>
                Configure as regras para concessão de descontos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="desconto-maximo">Desconto Máximo Permitido (%)</Label>
                <Input id="desconto-maximo" placeholder="10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="desconto-avista">Desconto para Pagamento à Vista (%)</Label>
                <Input id="desconto-avista" placeholder="5" />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Exigir senha para descontos acima do limite
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Requer senha de administrador para descontos maiores
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prazos" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Prazos e Condições</CardTitle>
              <CardDescription>
                Configure os prazos e condições de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prazo-maximo">Prazo Máximo para Pagamento (dias)</Label>
                <Input id="prazo-maximo" placeholder="60" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parcela-minima">Valor Mínimo da Parcela</Label>
                <Input id="parcela-minima" placeholder="100,00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condicao-padrao">Condição de Pagamento Padrão</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="condicao-padrao">
                    <SelectValue placeholder="Selecione uma condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">À Vista</SelectItem>
                    <SelectItem value="2">30 Dias</SelectItem>
                    <SelectItem value="3">30/60 Dias</SelectItem>
                    <SelectItem value="4">30/60/90 Dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
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

export default ParametrosVenda; 