import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { searchNcm, NCMItem } from "@/services/ncmService";
import { useDebounce } from "@/hooks/useDebounce";

interface NCMComboboxProps {
  value: string;
  onChange: (value: string, description?: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

interface NCMOption {
  value: string;
  label: string;
  description: string;
}

const NCMCombobox: React.FC<NCMComboboxProps> = ({ 
  value, 
  onChange,
  disabled = false,
  placeholder = "Digite o código ou descrição do NCM..."
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [options, setOptions] = useState<NCMOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  // Função para formatar os resultados da API em opções para o combobox
  const formatResults = useCallback((results: NCMItem[]): NCMOption[] => {
    return results.map(item => ({
      value: item.codigo,
      label: `${item.codigo} - ${item.descricao}`,
      description: item.descricao
    }));
  }, []);

  // Inicializar o valor do input com o valor atual (se existir)
  useEffect(() => {
    // Se temos um valor, mas não temos um texto de input, procuramos o NCM para exibir
    if (value && !inputValue) {
      const fetchInitialValue = async () => {
        try {
          const results = await searchNcm(value);
          if (results.length > 0) {
            const option = formatResults(results)[0];
            setInputValue(option.label);
          } else {
            setInputValue(value); // Se não encontrar, mostra o valor bruto
          }
        } catch (error) {
          console.error("Erro ao buscar valor inicial de NCM:", error);
          setInputValue(value); // Em caso de erro, mostra o valor bruto
        }
      };
      
      fetchInitialValue();
    }
  }, [value, inputValue, formatResults]);

  // Buscar dados quando o termo de busca mudar
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchTerm.length < 3) {
        setOptions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await searchNcm(debouncedSearchTerm);
        setOptions(formatResults(results));
        setShowResults(true);
      } catch (error) {
        console.error("Erro ao buscar dados de NCM:", error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchTerm, formatResults]);

  // Fechar os resultados ao clicar fora do componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Função para selecionar um item
  const handleSelectItem = (selectedOption: NCMOption) => {
    onChange(selectedOption.value, selectedOption.description);
    setInputValue(selectedOption.label);
    setShowResults(false);
  };

  // Função para lidar com mudanças no input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Se o input ficar vazio, limpa o valor selecionado
    if (!newValue.trim()) {
      onChange("", "");
    }
    
    // Mostra os resultados se o input tiver pelo menos 3 caracteres
    if (newValue.length >= 3) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Função para lidar com o foco no input
  const handleInputFocus = () => {
    if (inputValue.length >= 3) {
      setShowResults(true);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(isLoading && "opacity-70")}
      />
      
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-opacity-50 border-t-primary rounded-full"></div>
        </div>
      )}
      
      {showResults && options.length > 0 && (
        <div className="absolute w-full z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover p-1 shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className="relative flex flex-col cursor-default select-none items-start rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[selected='true']:bg-accent"
              onClick={() => handleSelectItem(option)}
            >
              <div className="font-medium">{option.value}</div>
              <div className="text-xs text-muted-foreground">{option.description}</div>
            </div>
          ))}
        </div>
      )}
      
      {showResults && inputValue.length >= 3 && options.length === 0 && !isLoading && (
        <div className="absolute w-full z-50 mt-1 overflow-auto rounded-md border bg-popover p-3 shadow-md text-center text-sm">
          Nenhum NCM encontrado
        </div>
      )}
      
      {inputValue.length > 0 && inputValue.length < 3 && (
        <div className="text-xs text-muted-foreground mt-1">
          Digite pelo menos 3 caracteres para buscar
        </div>
      )}
    </div>
  );
};

export default NCMCombobox; 