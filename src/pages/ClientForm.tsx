import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SaveIcon, PlusIcon, Trash2, Paperclip } from "lucide-react";
import {
  Client,
  GENDER_OPTIONS,
  UF_OPTIONS,
  IE_INDICATOR_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  BANK_OPTIONS
} from "@/types/client";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado do cliente
  const [client, setClient] = useState<Partial<Client>>({
    isActive: true,
    type: 'physical',
    creditLimit: 0,
    issWithheld: false,
    isFinalConsumer: true,
    isRuralProducer: false,
    addresses: [],
    contacts: [],
    bankAccounts: [],
    documents: [],
    credits: [],
    history: []
  });

  // Estados para controlar inputs de campos monetários
  const [isCreditLimitFocused, setIsCreditLimitFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient(prev => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value)
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setClient(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleTypeChange = (value: 'physical' | 'legal') => {
    setClient(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleCancel = () => {
    navigate("/dashboard/clientes");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de salvar
    navigate("/dashboard/clientes");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {id ? "Editar Cliente" : "Novo Cliente"}
        </h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="isActive" className="cursor-pointer">
            {client.isActive ? "Ativo" : "Inativo"}
          </Label>
          <Switch 
            id="isActive"
            checked={client.isActive}
            onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="personal">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Ficha Cadastral</TabsTrigger>
            <TabsTrigger value="fiscal">Dados Fiscais</TabsTrigger>
            <TabsTrigger value="characteristics">Características</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6">
            <div className="bg-white rounded-md shadow p-6">
              <div className="mb-6">
                <Label className="mb-2 block font-medium">Pessoa Física ou Jurídica?</Label>
                <RadioGroup 
                  value={client.type} 
                  onValueChange={(value) => handleTypeChange(value as 'physical' | 'legal')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="physical" id="physical" />
                    <Label htmlFor="physical">Pessoa Física</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="legal" id="legal" />
                    <Label htmlFor="legal">Pessoa Jurídica</Label>
                  </div>
                </RadioGroup>
              </div>

              {client.type === 'physical' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        name="name"
                        value={client.name || ''}
                        onChange={handleInputChange}
                        placeholder="Ex: João"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname">Sobrenome</Label>
                      <Input
                        id="surname"
                        name="surname"
                        value={client.surname || ''}
                        onChange={handleInputChange}
                        placeholder="Ex: Silva"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={client.cpf || ''}
                        onChange={handleInputChange}
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rg">RG</Label>
                      <Input
                        id="rg"
                        name="rg"
                        value={client.rg || ''}
                        onChange={handleInputChange}
                        placeholder="00.000.000-0"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="issuer">Emissor</Label>
                        <Input
                          id="issuer"
                          name="issuer"
                          value={client.issuer || ''}
                          onChange={handleInputChange}
                          placeholder="SSP"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="uf">UF</Label>
                        <Select 
                          value={client.uf || ''} 
                          onValueChange={(value) => handleSelectChange("uf", value)}
                        >
                          <SelectTrigger id="uf">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {UF_OPTIONS.map((uf) => (
                              <SelectItem key={uf.value} value={uf.value}>{uf.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Sexo</Label>
                      <Select 
                        value={client.gender || ''} 
                        onValueChange={(value) => handleSelectChange("gender", value)}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDER_OPTIONS.map((gender) => (
                            <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthday">Aniversário</Label>
                      <Input
                        id="birthday"
                        name="birthday"
                        type="date"
                        value={client.birthday || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Razão Social</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={client.companyName || ''}
                        onChange={handleInputChange}
                        placeholder="Ex: Empresa Ltda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradeName">Nome Fantasia</Label>
                      <Input
                        id="tradeName"
                        name="tradeName"
                        value={client.tradeName || ''}
                        onChange={handleInputChange}
                        placeholder="Ex: Empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        name="cnpj"
                        value={client.cnpj || ''}
                        onChange={handleInputChange}
                        placeholder="00.000.000/0000-00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ieIndicator">Indicador da IE do destinatário</Label>
                      <Select 
                        value={client.ieIndicator || ''} 
                        onValueChange={(value) => handleSelectChange("ieIndicator", value)}
                      >
                        <SelectTrigger id="ieIndicator">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {IE_INDICATOR_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stateRegistration">Inscrição Estadual</Label>
                      <Input
                        id="stateRegistration"
                        name="stateRegistration"
                        value={client.stateRegistration || ''}
                        onChange={handleInputChange}
                        placeholder="Ex: 123456789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="municipalRegistration">Inscrição Municipal</Label>
                      <Input
                        id="municipalRegistration"
                        name="municipalRegistration"
                        value={client.municipalRegistration || ''}
                        onChange={handleInputChange}
                        placeholder="Ex: 123456789"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t space-y-4">
                <h3 className="text-lg font-medium">Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={client.phone || ''}
                      onChange={handleInputChange}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Celular</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      value={client.mobile || ''}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={client.email || ''}
                      onChange={handleInputChange}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Site</Label>
                    <Input
                      id="website"
                      name="website"
                      value={client.website || ''}
                      onChange={handleInputChange}
                      placeholder="Ex: http://www.site.com.br"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observation">Observação</Label>
                  <Textarea
                    id="observation"
                    name="observation"
                    value={client.observation || ''}
                    onChange={handleInputChange}
                    placeholder="Observações sobre o cliente..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-start-2 space-y-2">
                    <Label htmlFor="creditLimit">Limite de Crédito</Label>
                    <div className="relative">
                      <Input
                        id="creditLimit"
                        name="creditLimit"
                        type={isCreditLimitFocused ? "number" : "text"}
                        value={isCreditLimitFocused ? 
                          (client.creditLimit === 0 ? '' : client.creditLimit) : 
                          `${(client.creditLimit || 0).toFixed(2)}`}
                        onChange={handleNumberInputChange}
                        onFocus={() => setIsCreditLimitFocused(true)}
                        onBlur={() => setIsCreditLimitFocused(false)}
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        className="pl-7"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                        R$
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fiscal" className="space-y-6">
            {/* Dados Fiscais serão implementados na próxima parte */}
            <div className="bg-white rounded-md shadow p-6">
              <h3 className="text-lg font-medium mb-4">Dados Fiscais</h3>
            </div>
          </TabsContent>
          
          <TabsContent value="characteristics" className="space-y-6">
            {/* Características serão implementadas na próxima parte */}
            <div className="bg-white rounded-md shadow p-6">
              <h3 className="text-lg font-medium mb-4">Características</h3>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="mr-2"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-black hover:bg-black/90 text-white"
          >
            <SaveIcon className="h-4 w-4" />
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm; 