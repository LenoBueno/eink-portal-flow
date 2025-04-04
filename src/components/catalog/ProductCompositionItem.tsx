import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { UNITS } from "@/types/product";

interface ProductCompositionItemProps {
  index: number;
  productName: string;
  quantity: number;
  unit: string;
  unitCost: number;
  onProductNameChange: (value: string) => void;
  onQuantityChange: (value: number) => void;
  onUnitChange: (value: string) => void;
  onUnitCostChange: (value: number) => void;
  onRemove: () => void;
}

const ProductCompositionItem = ({
  index,
  productName,
  quantity,
  unit,
  unitCost,
  onProductNameChange,
  onQuantityChange,
  onUnitChange,
  onUnitCostChange,
  onRemove
}: ProductCompositionItemProps) => {
  const totalCost = quantity * unitCost;
  const [isQuantityFocused, setIsQuantityFocused] = useState(false);
  const [isUnitCostFocused, setIsUnitCostFocused] = useState(false);

  return (
    <div className="grid grid-cols-12 gap-2 items-center mb-2">
      <div className="col-span-4">
        <Input
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
          placeholder="Buscar produto..."
        />
      </div>
      <div className="col-span-2">
        <Input
          type={isQuantityFocused ? "number" : "text"}
          value={isQuantityFocused ? (quantity === 0 ? '' : quantity) : quantity.toString()}
          onChange={(e) => onQuantityChange(e.target.value === '' ? 0 : Number(e.target.value))}
          onFocus={() => setIsQuantityFocused(true)}
          onBlur={() => setIsQuantityFocused(false)}
          min="0.01"
          step="0.01"
        />
      </div>
      <div className="col-span-2">
        <Select value={unit} onValueChange={onUnitChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {UNITS.map((unitOption) => (
              <SelectItem key={unitOption} value={unitOption}>{unitOption}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <div className="relative">
          <Input
            type={isUnitCostFocused ? "number" : "text"}
            value={isUnitCostFocused ? (unitCost === 0 ? '' : unitCost) : unitCost.toFixed(2)}
            onChange={(e) => onUnitCostChange(e.target.value === '' ? 0 : Number(e.target.value))}
            onFocus={() => setIsUnitCostFocused(true)}
            onBlur={() => setIsUnitCostFocused(false)}
            min="0"
            step="0.01"
            className="pl-6"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            R$
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative">
          <Input
            type="text"
            value={totalCost.toFixed(2)}
            readOnly
            className="pl-6 bg-gray-50"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            R$
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCompositionItem;
