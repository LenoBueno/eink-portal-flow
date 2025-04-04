import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DadosGerais = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados da Empresa</CardTitle>
          <CardDescription>
            Configure as informações básicas da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="razao-social">Razão Social</Label>
                <Input id="razao-social" placeholder="Razão Social" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                <Input id="nome-fantasia" placeholder="Nome Fantasia" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" placeholder="00.000.000/0000-00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inscricao-estadual">Inscrição Estadual</Label>
                <Input id="inscricao-estadual" placeholder="Inscrição Estadual" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(00) 0000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="contato@empresa.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="https://www.empresa.com" />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
          <CardDescription>
            Configure o endereço da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logradouro">Logradouro</Label>
                <Input id="logradouro" placeholder="Rua, Avenida, etc" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input id="numero" placeholder="Número" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input id="complemento" placeholder="Complemento" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input id="bairro" placeholder="Bairro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" placeholder="Cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input id="estado" placeholder="Estado" />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DadosGerais; 