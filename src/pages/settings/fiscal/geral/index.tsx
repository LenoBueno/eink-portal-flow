import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const FiscalGeral = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="parametros" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parametros">Parâmetros Gerais</TabsTrigger>
          <TabsTrigger value="certificados">Certificados Digitais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="parametros" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros Fiscais Gerais</CardTitle>
              <CardDescription>
                Configure os parâmetros fiscais da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regime-tributario">Regime Tributário</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="regime-tributario">
                      <SelectValue placeholder="Selecione o regime tributário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Simples Nacional</SelectItem>
                      <SelectItem value="2">Lucro Presumido</SelectItem>
                      <SelectItem value="3">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ambiente">Ambiente de Emissão</Label>
                  <Select defaultValue="2">
                    <SelectTrigger id="ambiente">
                      <SelectValue placeholder="Selecione o ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Produção</SelectItem>
                      <SelectItem value="2">Homologação (Testes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serie-nfe">Série NF-e</Label>
                  <Input id="serie-nfe" placeholder="1" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serie-nfce">Série NFC-e</Label>
                  <Input id="serie-nfce" placeholder="1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="codigo-municipio">Código do Município (IBGE)</Label>
                <Input id="codigo-municipio" placeholder="4205407" />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Emitir NFe para Consumidor Final
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Isso configurará automaticamente a NFe para consumidor final
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
        
        <TabsContent value="certificados" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificados Digitais</CardTitle>
              <CardDescription>
                Gerencie os certificados digitais para emissão de documentos fiscais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Certificado A1 - Empresa XYZ</h3>
                    <p className="text-sm text-muted-foreground">Validade: 20/04/2025</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Renovar</Button>
                    <Button variant="outline" size="sm">Backup</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-1">
                  Importar Novo Certificado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FiscalGeral; 