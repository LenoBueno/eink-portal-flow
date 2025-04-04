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
                  <div className="md:col-span-2 space-y-2">
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
              
              {/* Dados Fiscais */}
              <div className="mt-6 pt-6 border-t space-y-4">
                <h3 className="text-lg font-medium">Dados Fiscais</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="nfeEmail">E-mail do destinatário da NF-e</Label>
                  <Input
                    id="nfeEmail"
                    name="nfeEmail"
                    type="email"
                    value={client.nfeEmail || ''}
                    onChange={handleInputChange}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                      <span className="mr-2">ISS retido na fonte?</span>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          id="issWithheldSim"
                          name="issWithheld"
                          className="h-4 w-4"
                          checked={client.issWithheld}
                          onChange={() => handleSwitchChange("issWithheld", true)}
                        />
                        <input
                          type="radio"
                          id="issWithheldNao"
                          name="issWithheld"
                          className="h-4 w-4"
                          checked={!client.issWithheld}
                          onChange={() => handleSwitchChange("issWithheld", false)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="mr-2">Consumidor final?</span>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          id="isFinalConsumerSim"
                          name="isFinalConsumer"
                          className="h-4 w-4"
                          checked={client.isFinalConsumer}
                          onChange={() => handleSwitchChange("isFinalConsumer", true)}
                        />
                        <input
                          type="radio"
                          id="isFinalConsumerNao"
                          name="isFinalConsumer"
                          className="h-4 w-4"
                          checked={!client.isFinalConsumer}
                          onChange={() => handleSwitchChange("isFinalConsumer", false)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="mr-2">Produtor rural?</span>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          id="isRuralProducerSim"
                          name="isRuralProducer"
                          className="h-4 w-4"
                          checked={client.isRuralProducer}
                          onChange={() => handleSwitchChange("isRuralProducer", true)}
                        />
                        <input
                          type="radio"
                          id="isRuralProducerNao"
                          name="isRuralProducer"
                          className="h-4 w-4"
                          checked={!client.isRuralProducer}
                          onChange={() => handleSwitchChange("isRuralProducer", false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARACTERÍSTICAS */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">CARACTERÍSTICAS</h3>
                
                {/* Abas de Características */}
                <div className="mb-4">
                  <div className="flex border-b-0">
                    <button 
                      onClick={() => {
                        document.getElementById('enderecos-content')?.classList.remove('hidden');
                        document.getElementById('contatos-content')?.classList.add('hidden');
                        document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                        document.getElementById('documentos-content')?.classList.add('hidden');
                        document.getElementById('credito-content')?.classList.add('hidden');
                        document.getElementById('historico-content')?.classList.add('hidden');
                      }} 
                      className="px-4 py-2 bg-green-600 text-white"
                    >
                      ENDEREÇOS
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('enderecos-content')?.classList.add('hidden');
                        document.getElementById('contatos-content')?.classList.remove('hidden');
                        document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                        document.getElementById('documentos-content')?.classList.add('hidden');
                        document.getElementById('credito-content')?.classList.add('hidden');
                        document.getElementById('historico-content')?.classList.add('hidden');
                      }} 
                      className="px-4 py-2 bg-teal-700 text-white"
                    >
                      CONTATOS
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('enderecos-content')?.classList.add('hidden');
                        document.getElementById('contatos-content')?.classList.add('hidden');
                        document.getElementById('dadosBancarios-content')?.classList.remove('hidden');
                        document.getElementById('documentos-content')?.classList.add('hidden');
                        document.getElementById('credito-content')?.classList.add('hidden');
                        document.getElementById('historico-content')?.classList.add('hidden');
                      }} 
                      className="px-4 py-2 bg-teal-700 text-white"
                    >
                      DADOS BANCÁRIOS
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('enderecos-content')?.classList.add('hidden');
                        document.getElementById('contatos-content')?.classList.add('hidden');
                        document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                        document.getElementById('documentos-content')?.classList.remove('hidden');
                        document.getElementById('credito-content')?.classList.add('hidden');
                        document.getElementById('historico-content')?.classList.add('hidden');
                      }} 
                      className="px-4 py-2 bg-teal-700 text-white"
                    >
                      DOCUMENTOS
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('enderecos-content')?.classList.add('hidden');
                        document.getElementById('contatos-content')?.classList.add('hidden');
                        document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                        document.getElementById('documentos-content')?.classList.add('hidden');
                        document.getElementById('credito-content')?.classList.remove('hidden');
                        document.getElementById('historico-content')?.classList.add('hidden');
                      }} 
                      className="px-4 py-2 bg-teal-700 text-white"
                    >
                      CRÉDITO
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('enderecos-content')?.classList.add('hidden');
                        document.getElementById('contatos-content')?.classList.add('hidden');
                        document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                        document.getElementById('documentos-content')?.classList.add('hidden');
                        document.getElementById('credito-content')?.classList.add('hidden');
                        document.getElementById('historico-content')?.classList.remove('hidden');
                      }} 
                      className="px-4 py-2 bg-teal-700 text-white"
                    >
                      HISTÓRICO
                    </button>
                  </div>
                </div>
                
                {/* Endereços */}
                <div id="enderecos-content" className="border border-gray-300 bg-gray-50">
                  <div className="p-2">
                    <div className="flex flex-wrap -mx-2">
                      <div className="px-2 w-24 mb-2">
                        <div className="flex items-center">
                          <span className="text-sm">CEP</span>
                          <div className="ml-1 w-4 h-4 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs">?</div>
                        </div>
                        <div className="flex">
                          <Input placeholder="00000-000" className="h-8 text-sm rounded-none" />
                          <button className="px-2 bg-gray-300 border border-gray-400 border-l-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="px-2 flex-1 mb-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Endereço</span>
                          <div className="flex items-center">
                            <input type="checkbox" id="isForeign" className="h-4 w-4" />
                            <label htmlFor="isForeign" className="text-xs ml-1">no exterior</label>
                          </div>
                        </div>
                        <Input placeholder="Rua, Avenida, etc" className="h-8 text-sm rounded-none" />
                      </div>
                      
                      <div className="px-2 w-16 mb-2">
                        <span className="text-sm">Nº</span>
                        <Input placeholder="123" className="h-8 text-sm rounded-none" />
                      </div>
                      
                      <div className="px-2 w-60 mb-2">
                        <span className="text-sm">Complemento</span>
                        <Input placeholder="Apto, Bloco, etc" className="h-8 text-sm rounded-none" />
                      </div>
                      
                      <div className="px-2 w-48 mb-2">
                        <span className="text-sm">Bairro</span>
                        <Input placeholder="Bairro" className="h-8 text-sm rounded-none" />
                      </div>
                      
                      <div className="w-full flex justify-end px-2">
                        <button className="px-4 py-1 bg-teal-600 text-white text-sm">OK</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-4 text-orange-600 text-sm font-medium border-t border-gray-300">
                    NENHUM ENDEREÇO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                  </div>
                </div>
                
                {/* Contatos */}
                <div id="contatos-content" className="border border-gray-300 bg-gray-50 hidden">
                  <div className="flex justify-end p-2 border-b border-gray-300">
                    <button className="px-2 py-1 bg-black text-white text-xs flex items-center">
                      <PlusIcon className="h-3 w-3 mr-1" /> Adicionar Contato
                    </button>
                  </div>
                  
                  <div className="text-center py-4 text-orange-600 text-sm font-medium">
                    NENHUM CONTATO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                  </div>
                </div>
                
                {/* Dados Bancários */}
                <div id="dadosBancarios-content" className="border border-gray-300 bg-gray-50 hidden">
                  <div className="flex justify-end p-2 border-b border-gray-300">
                    <button className="px-2 py-1 bg-black text-white text-xs flex items-center">
                      <PlusIcon className="h-3 w-3 mr-1" /> Adicionar Conta
                    </button>
                  </div>
                  
                  <div className="text-center py-4 text-orange-600 text-sm font-medium">
                    NENHUM DADO BANCÁRIO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                  </div>
                </div>
                
                {/* Documentos */}
                <div id="documentos-content" className="border border-gray-300 bg-gray-50 hidden">
                  <div className="flex justify-end p-2 border-b border-gray-300">
                    <button className="px-2 py-1 bg-black text-white text-xs flex items-center">
                      <PlusIcon className="h-3 w-3 mr-1" /> Adicionar Documento
                    </button>
                  </div>
                  
                  <div className="text-center py-4 text-orange-600 text-sm font-medium">
                    NENHUM DOCUMENTO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                  </div>
                </div>
                
                {/* Crédito */}
                <div id="credito-content" className="border border-gray-300 bg-gray-50 hidden">
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-2 bg-gray-200 border border-gray-300">
                        <div className="text-xs mb-1">TOTAL VENCIDAS</div>
                        <div className="text-sm font-medium">R$ 0,00</div>
                      </div>
                      
                      <div className="text-center p-2 bg-gray-200 border border-gray-300">
                        <div className="text-xs mb-1">TOTAL A VENCER</div>
                        <div className="text-sm font-medium">R$ 0,00</div>
                      </div>
                      
                      <div className="text-center p-2 bg-gray-200 border border-gray-300">
                        <div className="text-xs mb-1">TOTAL PAGAS</div>
                        <div className="text-sm font-medium">R$ 0,00</div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="text-xs">PARCELAS DO CLIENTE</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-green-500 mb-2"></div>
                        <div className="text-xs">VENCIDAS</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-gray-400 mb-2"></div>
                        <div className="text-xs">A VENCER</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-gray-300 mb-2"></div>
                        <div className="text-xs">PAGAS/RECEBIDAS</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-2 bg-gray-200 border border-gray-300">
                        <div className="text-xs mb-1">LIMITE DE CRÉDITO</div>
                        <div className="text-sm font-medium">R$ {(client.creditLimit || 0).toFixed(2)}</div>
                      </div>
                      
                      <div className="text-center p-2 bg-gray-200 border border-gray-300">
                        <div className="text-xs mb-1">LIMITE UTILIZADO</div>
                        <div className="text-sm font-medium">R$ 0,00</div>
                      </div>
                      
                      <div className="text-center p-2 bg-gray-200 border border-gray-300">
                        <div className="text-xs mb-1">LIMITE DISPONÍVEL</div>
                        <div className="text-sm font-medium">R$ {(client.creditLimit || 0).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Histórico */}
                <div id="historico-content" className="border border-gray-300 bg-gray-50 hidden">
                  <div className="flex justify-end p-2 border-b border-gray-300">
                    <button className="px-2 py-1 bg-black text-white text-xs flex items-center">
                      <PlusIcon className="h-3 w-3 mr-1" /> Adicionar Histórico
                    </button>
                  </div>
                  
                  <div className="text-center py-4 text-orange-600 text-sm font-medium">
                    NENHUM HISTÓRICO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                  </div>
                </div>
              </div>
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