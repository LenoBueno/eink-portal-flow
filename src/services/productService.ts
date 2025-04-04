
import { Product, ProductCompositionItem } from "@/types/product";
import { v4 as uuidv4 } from "uuid";

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    code: "P001",
    barcode: "7891234567890",
    name: "Quartinha de Cerâmica",
    description: "Quartinha tradicional feita de cerâmica",
    productType: "Produto Físico",
    unit: "UN",
    category: "Cerâmica",
    subcategory: "Quartinha",
    internalCode: "INT001",
    image: "/placeholder.svg",
    isActive: true,
    costPrice: 15.50,
    retailPrice: 35.90,
    wholesalePrice: 28.70,
    minWholesaleQty: 10,
    moveStock: true,
    moveComposition: false,
    fiscalType: "Quartinha",
    ncm: "69149000",
    origin: "0 - Nacional",
    cest: "10.028.00",
    classification: "Produto Acabado",
    composition: []
  },
  {
    id: "2",
    code: "P002",
    barcode: "7891234567891",
    name: "Alguidar Médio",
    description: "Alguidar médio para uso doméstico",
    productType: "Produto Físico",
    unit: "UN",
    category: "Cerâmica",
    subcategory: "Alguidar",
    internalCode: "INT002",
    image: "/placeholder.svg",
    isActive: true,
    costPrice: 18.30,
    retailPrice: 39.90,
    wholesalePrice: 32.90,
    minWholesaleQty: 5,
    moveStock: true,
    moveComposition: false,
    fiscalType: "Alguidar",
    ncm: "69149000",
    origin: "0 - Nacional",
    cest: "10.028.00",
    classification: "Produto Acabado",
    composition: []
  },
  {
    id: "3",
    code: "P003",
    barcode: "7891234567892",
    name: "Argila Branca",
    description: "Argila branca para produção de cerâmica",
    productType: "Produto Físico",
    unit: "KG",
    category: "Argila",
    subcategory: "Branca",
    internalCode: "INT003",
    image: "/placeholder.svg",
    isActive: true,
    costPrice: 5.20,
    retailPrice: 12.90,
    wholesalePrice: 9.50,
    minWholesaleQty: 20,
    moveStock: true,
    moveComposition: false,
    fiscalType: "Argila",
    ncm: "25070090",
    origin: "0 - Nacional",
    cest: "",
    classification: "Matéria-Prima",
    composition: []
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllProducts = async (): Promise<Product[]> => {
  await delay(500);
  return [...mockProducts];
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await delay(300);
  return mockProducts.find(p => p.id === id);
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  await delay(800);
  const newProduct: Product = {
    ...product,
    id: uuidv4()
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  await delay(800);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Produto não encontrado");
  
  mockProducts[index] = {
    ...mockProducts[index],
    ...product
  };
  
  return mockProducts[index];
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  await delay(500);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  mockProducts.splice(index, 1);
  return true;
};

export const generateBarcode = async (): Promise<string> => {
  await delay(200);
  // Generate random 13 digit number for barcode
  return Math.floor(Math.random() * 9000000000000) + 1000000000000 + "";
};

export const generateInternalCode = async (): Promise<string> => {
  await delay(200);
  // Generate random 6 digit number for internal code
  return "INT" + (Math.floor(Math.random() * 900000) + 100000);
};
