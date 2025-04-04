export interface Product {
  id: string;
  code: string;
  barcode: string;
  name: string;
  description: string;
  productType: string;
  unit: string;
  category: string;
  subcategory: string;
  internalCode: string;
  image?: string;
  isActive: boolean;
  
  // Prices
  costPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number;
  
  // Characteristics
  moveStock: boolean;
  moveComposition: boolean;
  
  // Fiscal
  fiscalType: string;
  ncm: string;
  ncmDescription?: string;
  origin: string;
  cest: string;
  classification: string;
  
  // Composition
  composition: ProductCompositionItem[];
}

export interface ProductCompositionItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
}

export const PRODUCT_TYPES = [
  "Produto Físico",
  "Serviço",
  "Digital",
  "Assinatura"
];

export const UNITS = [
  "UN",
  "KG",
  "M",
  "M²",
  "M³",
  "L",
  "ML",
  "CX",
  "PCT",
  "PAR"
];

export const FISCAL_TYPES = [
  "Quartinha", 
  "Alguidar", 
  "Ibá", 
  "Garrafa de Água", 
  "Insumos", 
  "Argila", 
  "Barbotina"
];

export const ORIGINS = [
  "0 - Nacional",
  "1 - Estrangeira - Importação direta",
  "2 - Estrangeira - Adquirida no mercado interno",
  "3 - Nacional - Mercadoria com conteúdo de importação superior a 40%",
  "4 - Nacional - Produção conforme processos produtivos",
  "5 - Nacional - Mercadoria com conteúdo de importação inferior ou igual a 40%",
  "6 - Estrangeira - Importação direta, sem similar nacional",
  "7 - Estrangeira - Adquirida no mercado interno, sem similar nacional",
  "8 - Nacional - Mercadoria com conteúdo de importação superior a 70%"
];

export const CLASSIFICATIONS = [
  "Produto Acabado",
  "Matéria-Prima",
  "Embalagem",
  "Produto Intermediário",
  "Produto em Processo",
  "Serviço"
];

export const CATEGORIES = [
  "Cerâmica",
  "Argila",
  "Barbotina",
  "Insumo",
  "Embalagem",
  "Serviço"
];

export const SUBCATEGORIES = {
  "Cerâmica": ["Quartinha", "Alguidar", "Ibá", "Garrafa de Água"],
  "Argila": ["Vermelha", "Branca", "Preta"],
  "Barbotina": ["Cerâmica", "Porcelana"],
  "Insumo": ["Esmalte", "Corante", "Ferramentas"],
  "Embalagem": ["Caixa", "Papel", "Plástico"],
  "Serviço": ["Consultoria", "Manutenção", "Transporte"]
};
