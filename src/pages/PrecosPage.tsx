import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const PrecosPage = () => {
  const [preco, setPreco] = useState({
    precoCusto: "0.00",
    precoVendaVarejo: "0.00",
    precoVendaAtacado: "0.00",
    quantidadeMinimaAtacado: "10"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreco(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar os preços
    console.log("Preços salvos:", preco);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Preços</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuração de Preços</CardTitle>
          <CardDescription>
            Configure os preços de custo, venda varejo e atacado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="precoCusto" className="block mb-1.5">
                  Preço de Custo (Última Compra)
                </Label>
                <div className="relative">
                  <Input
                    id="precoCusto"
                    name="precoCusto"
                    type="text"
                    value={preco.precoCusto}
                    onChange={handleInputChange}
                    placeholder="R$ 0,00"
                    className="pl-7"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                    R$
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="quantidadeMinimaAtacado" className="block mb-1.5">
                  Quantidade Mínima para Atacado
                </Label>
                <Input
                  id="quantidadeMinimaAtacado"
                  name="quantidadeMinimaAtacado"
                  type="text"
                  value={preco.quantidadeMinimaAtacado}
                  onChange={handleInputChange}
                  placeholder="10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="precoVendaVarejo" className="block mb-1.5">
                  Preço de Venda (Varejo)
                </Label>
                <div className="relative">
                  <Input
                    id="precoVendaVarejo"
                    name="precoVendaVarejo"
                    type="text"
                    value={preco.precoVendaVarejo}
                    onChange={handleInputChange}
                    placeholder="R$ 0,00"
                    className="pl-7"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                    R$
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="precoVendaAtacado" className="block mb-1.5">
                  Preço de Venda (Atacado)
                </Label>
                <div className="relative">
                  <Input
                    id="precoVendaAtacado"
                    name="precoVendaAtacado"
                    type="text"
                    value={preco.precoVendaAtacado}
                    onChange={handleInputChange}
                    placeholder="R$ 0,00"
                    className="pl-7"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                    R$
                  </div>
                </div>
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

export default PrecosPage; 