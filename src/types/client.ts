export interface Client {
  id: string;
  isActive: boolean;
  type: 'physical' | 'legal';
  
  // Pessoa Física
  name?: string;
  surname?: string;
  cpf?: string;
  rg?: string;
  issuer?: string;
  uf?: string;
  gender?: string;
  birthday?: string;
  
  // Pessoa Jurídica
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
  ieIndicator?: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  
  // Contato
  phone: string;
  mobile: string;
  email: string;
  website?: string;
  observation?: string;
  creditLimit: number;
  
  // Dados Fiscais
  nfeEmail?: string;
  issWithheld: boolean;
  isFinalConsumer: boolean;
  isRuralProducer: boolean;
  
  // Endereços
  addresses: Address[];
  
  // Contatos
  contacts: Contact[];
  
  // Dados Bancários
  bankAccounts: BankAccount[];
  
  // Documentos
  documents: Document[];
  
  // Crédito
  credits: Credit[];
  
  // Histórico
  history: HistoryItem[];
}

export interface Address {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  isForeign: boolean;
  isMain: boolean;
}

export interface Contact {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

export interface BankAccount {
  id: string;
  bank: string;
  agency: string;
  agencyDigit?: string;
  account: string;
  accountDigit?: string;
}

export interface Document {
  id: string;
  type: string;
  url: string;
  name: string;
}

export interface Credit {
  id: string;
  dueItems: number;
  nextDueItems: number;
  paidItems: number;
  creditLimit: number;
  usedLimit: number;
  availableLimit: number;
}

export interface HistoryItem {
  id: string;
  date: string;
  description: string;
  status: 'pending' | 'completed';
}

export const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
];

export const UF_OPTIONS = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
];

export const IE_INDICATOR_OPTIONS = [
  { value: 'contribuinte', label: 'Contribuinte ICMS' },
  { value: 'isento', label: 'Contribuinte isento de inscrição' },
  { value: 'nao_contribuinte', label: 'Não contribuinte' },
];

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'cnae', label: 'CNAE' },
  { value: 'ie', label: 'Inscrição Estadual' },
  { value: 'ie_st', label: 'Inscrição Estadual ST' },
  { value: 'im', label: 'Inscrição Municipal' },
  { value: 'suframa', label: 'SUFRAMA' },
];

export const BANK_OPTIONS = [
  { value: '001', label: '001 - Banco do Brasil' },
  { value: '104', label: '104 - Caixa Econômica Federal' },
  { value: '341', label: '341 - Itaú Unibanco' },
  { value: '033', label: '033 - Santander' },
  { value: '237', label: '237 - Bradesco' },
  { value: '756', label: '756 - Sicoob' },
  { value: '748', label: '748 - Sicredi' },
  { value: '077', label: '077 - Inter' },
  { value: '212', label: '212 - Banco Original' },
  { value: '336', label: '336 - C6 Bank' },
  { value: '260', label: '260 - Nubank' },
]; 