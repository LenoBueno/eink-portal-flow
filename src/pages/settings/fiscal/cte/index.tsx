import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CTe = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de CT-e</CardTitle>
          <CardDescription>
            Configure os parâmetros para emissão de Conhecimento de Transporte Eletrônico
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground text-center">
            Módulo em desenvolvimento. <br />
            As configurações de CT-e estarão disponíveis em breve.
          </p>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="button" disabled>Salvar Alterações</Button>
      </div>
    </div>
  );
};

export default CTe; 