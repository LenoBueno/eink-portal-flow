
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
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
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
            type="number"
            value={unitCost}
            onChange={(e) => onUnitCostChange(Number(e.target.value))}
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
            type="number"
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
