import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debounce de valores
 * @param value - O valor a ser debounced
 * @param delay - O tempo de delay em milissegundos
 * @returns O valor após o debounce
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configura um timer para atualizar o valor após o delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timer se o valor mudar antes do delay terminar
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
} 