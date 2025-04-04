import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const NFe = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="configuracoes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="impressao">Impressão</TabsTrigger>
        </TabsList>
        
        <TabsContent value="configuracoes" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da NF-e</CardTitle>
              <CardDescription>
                Configure os parâmetros para emissão de Nota Fiscal Eletrônica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serie">Série</Label>
                  <Input id="serie" placeholder="1" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="proxima-numeracao">Próxima Numeração</Label>
                  <Input id="proxima-numeracao" placeholder="1" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="versao">Versão do Layout</Label>
                  <Select defaultValue="4.00">
                    <SelectTrigger id="versao">
                      <SelectValue placeholder="Selecione a versão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.00">4.00</SelectItem>
                      <SelectItem value="3.10">3.10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Enviar Automaticamente ao Emitir
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar a NF-e automaticamente para a SEFAZ ao emitir
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Consultar Cadastro do Destinatário
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Consultar dados do destinatário na SEFAZ antes de emitir
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
        
        <TabsContent value="emails" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>
                Configure o envio automático de emails para Notas Fiscais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Enviar Email Automaticamente
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar email com XML e PDF automaticamente ao autorizar a NF-e
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="titulo-email">Título do Email</Label>
                <Input id="titulo-email" placeholder="Nota Fiscal Eletrônica - {numero}" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="corpo-email">Corpo do Email</Label>
                <Textarea 
                  id="corpo-email" 
                  placeholder="Prezado cliente, segue em anexo a Nota Fiscal Eletrônica..." 
                  rows={5}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impressao" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Impressão</CardTitle>
              <CardDescription>
                Configure as opções de impressão do DANFE
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="formato">Formato de Impressão</Label>
                  <Select defaultValue="retrato">
                    <SelectTrigger id="formato">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retrato">Retrato</SelectItem>
                      <SelectItem value="paisagem">Paisagem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="copias">Número de Cópias</Label>
                  <Input id="copias" placeholder="1" type="number" min="1" max="5" />
                </div>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Imprimir Automaticamente
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Imprimir DANFE automaticamente após autorização
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Mostrar Logo da Empresa
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Exibir logotipo da empresa no DANFE
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
      </Tabs>
    </div>
  );
};

export default NFe; 