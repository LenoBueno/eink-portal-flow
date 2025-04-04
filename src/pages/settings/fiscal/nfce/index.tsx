import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NFCe = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de NFC-e</CardTitle>
          <CardDescription>
            Configure os parâmetros para emissão de Nota Fiscal de Consumidor Eletrônica
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground text-center">
            Módulo em desenvolvimento. <br />
            As configurações de NFC-e estarão disponíveis em breve.
          </p>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="button" disabled>Salvar Alterações</Button>
      </div>
    </div>
  );
};

export default NFCe; 