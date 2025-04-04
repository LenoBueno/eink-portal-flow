import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { InboxIcon, BarcodeIcon, SaveIcon, PlusIcon, PlusCircle } from "lucide-react";
import { 
  Product, 
  ProductCompositionItem,
  PRODUCT_TYPES,
  UNITS,
  CATEGORIES,
  SUBCATEGORIES,
  FISCAL_TYPES,
  ORIGINS,
  CLASSIFICATIONS
} from "@/types/product";
import ProductImageUpload from "@/components/catalog/ProductImageUpload";
import ProductPriceCalculator from "@/components/catalog/ProductPriceCalculator";
import ProductCompositionItemComponent from "@/components/catalog/ProductCompositionItem";
import { 
  getProductById, 
  createProduct, 
  updateProduct,
  generateBarcode,
  generateInternalCode
} from "@/services/productService";
import NCMCombobox from "@/components/catalog/NCMCombobox";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [isCostPriceFocused, setIsCostPriceFocused] = useState(false);
  const [isWholesaleQtyFocused, setIsWholesaleQtyFocused] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  const [product, setProduct] = useState<Product>({
    id: "",
    code: "",
    barcode: "",
    name: "",
    description: "",
    productType: PRODUCT_TYPES[0],
    unit: UNITS[0],
    category: CATEGORIES[0] || "",
    subcategory: "",
    internalCode: "",
    image: "/placeholder.svg",
    isActive: true,
    costPrice: 0,
    retailPrice: 0,
    wholesalePrice: 0,
    minWholesaleQty: 10,
    moveStock: true,
    moveComposition: false,
    fiscalType: FISCAL_TYPES[0],
    ncm: "",
    origin: ORIGINS[0],
    cest: "",
    classification: CLASSIFICATIONS[0],
    composition: []
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const productData = await getProductById(id);
          if (productData) {
            setProduct(productData);
            setSelectedCategory(productData.category);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!id && !selectedCategory && CATEGORIES.length > 0) {
      const initialCategory = CATEGORIES[0];
      setSelectedCategory(initialCategory);
      
      const initialSubcategories = SUBCATEGORIES[initialCategory as keyof typeof SUBCATEGORIES] || [];
      setSubcategories(initialSubcategories);
      
      if (initialSubcategories.length > 0 && !product.subcategory) {
        setProduct(prev => ({
          ...prev,
          category: initialCategory,
          subcategory: initialSubcategories[0]
        }));
      }
    }
  }, [id, selectedCategory, product.subcategory]);

  useEffect(() => {
    if (selectedCategory) {
      const categorySubcategories = SUBCATEGORIES[selectedCategory as keyof typeof SUBCATEGORIES] || [];
      setSubcategories(categorySubcategories);
      
      if (categorySubcategories.length > 0) {
        if (!categorySubcategories.includes(product.subcategory)) {
          setProduct(prev => ({
            ...prev,
            subcategory: categorySubcategories[0]
          }));
        }
      } else {
        setProduct(prev => ({
          ...prev,
          subcategory: ""
        }));
      }
    } else {
      setSubcategories([]);
      setProduct(prev => ({
        ...prev,
        subcategory: ""
      }));
    }
  }, [selectedCategory, product.subcategory]);

  useEffect(() => {
    if (product.category && !selectedCategory) {
      setSelectedCategory(product.category);
    }
  }, [product.category, selectedCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value)
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "category") {
      setSelectedCategory(value);
      
      const categorySubcategories = SUBCATEGORIES[value as keyof typeof SUBCATEGORIES] || [];
      
      setSubcategories(categorySubcategories);
      
      setProduct(prev => ({
        ...prev,
        category: value,
        subcategory: categorySubcategories.length > 0 ? categorySubcategories[0] : ""
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNcmChange = (value: string, description?: string) => {
    setProduct(prev => ({
      ...prev,
      ncm: value,
      ncmDescription: description || ""
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProduct(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImageChange = (image: string) => {
    setProduct(prev => ({
      ...prev,
      image
    }));
  };

  const handleGenerateBarcode = async () => {
    const barcode = await generateBarcode();
    setProduct(prev => ({
      ...prev,
      barcode
    }));
  };

  const handleGenerateInternalCode = async () => {
    const internalCode = await generateInternalCode();
    setProduct(prev => ({
      ...prev,
      internalCode
    }));
  };

  const handleAddCompositionItem = () => {
    const newItem: ProductCompositionItem = {
      id: Date.now().toString(),
      productId: "",
      productName: "",
      quantity: 1,
      unit: UNITS[0],
      unitCost: 0,
      totalCost: 0
    };
    
    setProduct(prev => ({
      ...prev,
      composition: [...prev.composition, newItem]
    }));
  };

  const handleRemoveCompositionItem = (index: number) => {
    setProduct(prev => ({
      ...prev,
      composition: prev.composition.filter((_, i) => i !== index)
    }));
  };

  const handleCompositionItemChange = (index: number, field: keyof ProductCompositionItem, value: any) => {
    setProduct(prev => {
      const updatedComposition = [...prev.composition];
      updatedComposition[index] = {
        ...updatedComposition[index],
        [field]: value,
        totalCost: field === 'quantity' || field === 'unitCost' 
          ? (field === 'quantity' ? value : updatedComposition[index].quantity) * 
            (field === 'unitCost' ? value : updatedComposition[index].unitCost)
          : updatedComposition[index].totalCost
      };
      return {
        ...prev,
        composition: updatedComposition
      };
    });
  };

  const handleCancel = () => {
    navigate("/dashboard/catalog/produtos");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      if (id) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      
      navigate("/dashboard/catalog/produtos");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      const updatedCategories = [...CATEGORIES, newCategory.trim()];
      setSelectedCategory(newCategory.trim());
      setProduct(prev => ({
        ...prev,
        category: newCategory.trim()
      }));
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  const handleAddNewSubcategory = () => {
    if (newSubcategory.trim() && selectedCategory) {
      const updatedSubcategories = [...subcategories, newSubcategory.trim()];
      setSubcategories(updatedSubcategories);
      setProduct(prev => ({
        ...prev,
        subcategory: newSubcategory.trim()
      }));
      console.log(`Nova subcategoria "${newSubcategory.trim()}" adicionada à categoria "${selectedCategory}"`);
      setNewSubcategory("");
      setIsAddingSubcategory(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
        <span className="ml-2">Carregando...</span>
      </div>
    );
  } 

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {id ? "Editar Produto" : "Novo Produto"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="product">
          <TabsList className="mb-4">
            <TabsTrigger value="product">Produto e Preços</TabsTrigger>
            <TabsTrigger value="characteristics">Características</TabsTrigger>
          </TabsList>
          
          <TabsContent value="product" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1">
                <ProductImageUpload 
                  initialImage={product.image}
                  onChange={handleImageChange}
                />
              </div>
              
              <div className="col-span-3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código do Produto</Label>
                    <Input
                      id="code"
                      name="code"
                      value={product.code}
                      onChange={handleInputChange}
                      placeholder="Ex: P001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Código de Barras</Label>
                    <div className="flex">
                      <Input
                        id="barcode"
                        name="barcode"
                        value={product.barcode}
                        onChange={handleInputChange}
                        placeholder="Ex: 7891234567890"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleGenerateBarcode}
                        className="ml-2"
                      >
                        <BarcodeIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Quartinha de Cerâmica"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Descrição do produto..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productType">Tipo de Produto</Label>
                    <Select 
                      value={product.productType}
                      onValueChange={(value) => handleSelectChange("productType", value)}
                    >
                      <SelectTrigger id="productType">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidade</Label>
                    <Select 
                      value={product.unit}
                      onValueChange={(value) => handleSelectChange("unit", value)}
                    >
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {UNITS.map((unit) => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internalCode">Código Interno</Label>
                    <div className="flex">
                      <Input
                        id="internalCode"
                        name="internalCode"
                        value={product.internalCode}
                        onChange={handleInputChange}
                        placeholder="Código interno"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleGenerateInternalCode}
                        className="ml-2"
                      >
                        <InboxIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="category">Categoria</Label>
                      <button 
                        type="button"
                        onClick={() => setIsAddingCategory(true)}
                        className="ml-2 text-primary hover:text-primary/80"
                      >
                        <PlusCircle className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {isAddingCategory ? (
                      <div className="flex gap-2">
                        <Input
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="Nova categoria"
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={handleAddNewCategory}
                          variant="outline"
                          size="icon"
                          className="bg-black hover:bg-black/90 text-white"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setIsAddingCategory(false)}
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                        >
                          <span className="sr-only">Cancelar</span>
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <Select 
                        value={product.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="subcategory">Subcategoria</Label>
                      <button 
                        type="button"
                        onClick={() => selectedCategory && setIsAddingSubcategory(true)}
                        className={`ml-2 text-primary hover:text-primary/80 ${!selectedCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!selectedCategory}
                      >
                        <PlusCircle className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {isAddingSubcategory ? (
                      <div className="flex gap-2">
                        <Input
                          value={newSubcategory}
                          onChange={(e) => setNewSubcategory(e.target.value)}
                          placeholder="Nova subcategoria"
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={handleAddNewSubcategory}
                          variant="outline"
                          size="icon"
                          className="bg-black hover:bg-black/90 text-white"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setIsAddingSubcategory(false)}
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                        >
                          <span className="sr-only">Cancelar</span>
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <Select 
                        value={product.subcategory}
                        onValueChange={(value) => handleSelectChange("subcategory", value)}
                        disabled={!selectedCategory}
                      >
                        <SelectTrigger id="subcategory">
                          <SelectValue placeholder={selectedCategory ? "Selecione" : "Selecione uma categoria"} />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategories.map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Preços</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="costPrice" className="block mb-1.5">
                      Preço de Custo (Última Compra)
                    </Label>
                    <div className="relative">
                      <Input
                        id="costPrice"
                        name="costPrice"
                        type={isCostPriceFocused ? "number" : "text"}
                        value={isCostPriceFocused ? (product.costPrice === 0 ? '' : product.costPrice) : `${product.costPrice.toFixed(2)}`}
                        onChange={handleNumberInputChange}
                        onFocus={() => setIsCostPriceFocused(true)}
                        onBlur={() => setIsCostPriceFocused(false)}
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
                  
                  <ProductPriceCalculator 
                    costPrice={product.costPrice}
                    retailPrice={product.retailPrice}
                    wholesalePrice={product.wholesalePrice}
                    onRetailPriceChange={(price) => {
                      setProduct(prev => ({ ...prev, retailPrice: price }));
                    }}
                    onWholesalePriceChange={(price) => {
                      setProduct(prev => ({ ...prev, wholesalePrice: price }));
                    }}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="minWholesaleQty" className="block mb-1.5">
                      Quantidade Mínima para Atacado
                    </Label>
                    <Input
                      id="minWholesaleQty"
                      name="minWholesaleQty"
                      type={isWholesaleQtyFocused ? "number" : "text"}
                      value={isWholesaleQtyFocused ? (product.minWholesaleQty === 0 ? '' : product.minWholesaleQty) : product.minWholesaleQty}
                      onChange={handleNumberInputChange}
                      onFocus={() => setIsWholesaleQtyFocused(true)}
                      onBlur={() => setIsWholesaleQtyFocused(false)}
                      min="0"
                      step="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="characteristics" className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Estoque</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Movimentar Estoque</h4>
                    <p className="text-sm text-muted-foreground">
                      Ao ativar este recurso o sistema movimentará o estoque deste produto,
                      automaticamente, sempre que uma compra ou venda for realizada.
                    </p>
                  </div>
                  <Switch 
                    checked={product.moveStock}
                    onCheckedChange={(checked) => handleSwitchChange("moveStock", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Movimentar Composição</h4>
                    <p className="text-sm text-muted-foreground">
                      Ao ativar este recurso o sistema movimentará o estoque dos produtos
                      que fazem parte da composição, automaticamente, sempre que uma venda
                      for realizada ou uma produção estiver em andamento.
                    </p>
                  </div>
                  <Switch 
                    checked={product.moveComposition}
                    onCheckedChange={(checked) => handleSwitchChange("moveComposition", checked)}
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Informações Fiscais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fiscalType">Tipo</Label>
                  <Select 
                    value={product.fiscalType}
                    onValueChange={(value) => handleSelectChange("fiscalType", value)}
                  >
                    <SelectTrigger id="fiscalType">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {FISCAL_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ncm">NCM</Label>
                  <NCMCombobox
                    value={product.ncm}
                    onChange={handleNcmChange}
                    disabled={isLoading}
                    placeholder="Buscar código ou descrição NCM..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="origin">Origem</Label>
                  <Select 
                    value={product.origin}
                    onValueChange={(value) => handleSelectChange("origin", value)}
                  >
                    <SelectTrigger id="origin">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORIGINS.map((origin) => (
                        <SelectItem key={origin} value={origin}>{origin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cest">CEST</Label>
                  <Input
                    id="cest"
                    name="cest"
                    value={product.cest}
                    onChange={handleInputChange}
                    placeholder="Ex: 10.028.00"
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Classificação</h3>
              <div className="space-y-2">
                <Label htmlFor="classification">Classificação do Produto</Label>
                <Select 
                  value={product.classification}
                  onValueChange={(value) => handleSelectChange("classification", value)}
                >
                  <SelectTrigger id="classification">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASSIFICATIONS.map((classification) => (
                      <SelectItem key={classification} value={classification}>{classification}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Composição</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddCompositionItem}
                  className="flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" /> Adicionar Item
                </Button>
              </div>
              
              {product.composition.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum item na composição. Clique em "Adicionar Item" para começar.
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium">
                    <div className="col-span-4">Produto</div>
                    <div className="col-span-2">Quantidade</div>
                    <div className="col-span-2">Unidade</div>
                    <div className="col-span-2">Custo Unit.</div>
                    <div className="col-span-1">Custo Total</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  {product.composition.map((item, index) => (
                    <ProductCompositionItemComponent
                      key={item.id}
                      index={index}
                      productName={item.productName}
                      quantity={item.quantity}
                      unit={item.unit}
                      unitCost={item.unitCost}
                      onProductNameChange={(value) => 
                        handleCompositionItemChange(index, 'productName', value)
                      }
                      onQuantityChange={(value) => 
                        handleCompositionItemChange(index, 'quantity', value)
                      }
                      onUnitChange={(value) => 
                        handleCompositionItemChange(index, 'unit', value)
                      }
                      onUnitCostChange={(value) => 
                        handleCompositionItemChange(index, 'unitCost', value)
                      }
                      onRemove={() => handleRemoveCompositionItem(index)}
                    />
                  ))}
                </div>
              )}
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
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <SaveIcon className="h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
