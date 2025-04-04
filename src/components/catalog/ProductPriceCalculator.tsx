
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

interface ProductPriceCalculatorProps {
  costPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  onRetailPriceChange: (price: number) => void;
  onWholesalePriceChange: (price: number) => void;
}

const ProductPriceCalculator = ({
  costPrice,
  retailPrice,
  wholesalePrice,
  onRetailPriceChange,
  onWholesalePriceChange
}: ProductPriceCalculatorProps) => {
  const [retailMargin, setRetailMargin] = useState<number>(0);
  const [wholesaleMargin, setWholesaleMargin] = useState<number>(0);

  useEffect(() => {
    if (costPrice > 0) {
      const retailMarginCalc = ((retailPrice - costPrice) / costPrice) * 100;
      setRetailMargin(retailMarginCalc);
      
      const wholesaleMarginCalc = ((wholesalePrice - costPrice) / costPrice) * 100;
      setWholesaleMargin(wholesaleMarginCalc);
    }
  }, [costPrice, retailPrice, wholesalePrice]);

  const handleRetailPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onRetailPriceChange(value);
  };

  const handleWholesalePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onWholesalePriceChange(value);
  };

  const formatMargin = (margin: number) => {
    return margin.toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium">
          Preço de Venda (Varejo)
        </label>
        <div className="relative mt-1.5">
          <Input
            type="number"
            value={retailPrice}
            onChange={handleRetailPriceChange}
            step="0.01"
            min="0"
            placeholder="0,00"
            className="pl-7"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
            R$
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className={`flex items-center ${retailMargin < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {retailMargin < 0 ? (
                <TrendingDownIcon className="h-4 w-4 mr-1" />
              ) : (
                <TrendingUpIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-xs font-medium">{formatMargin(retailMargin)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">
          Preço de Venda (Atacado)
        </label>
        <div className="relative mt-1.5">
          <Input
            type="number"
            value={wholesalePrice}
            onChange={handleWholesalePriceChange}
            step="0.01"
            min="0"
            placeholder="0,00"
            className="pl-7"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
            R$
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className={`flex items-center ${wholesaleMargin < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {wholesaleMargin < 0 ? (
                <TrendingDownIcon className="h-4 w-4 mr-1" />
              ) : (
                <TrendingUpIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-xs font-medium">{formatMargin(wholesaleMargin)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPriceCalculator;
