import axios from "axios";

export interface NCMItem {
  codigo: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  tipo_ato: string;
  numero_ato: string;
  ano_ato: string;
}

// Interface para o formato de dados da API do Portal Único Siscomex
interface SiscomexNCMResponse {
  Data_Ultima_Atualizacao_NCM: string;
  Ato: string;
  Nomenclaturas: {
    Codigo: string;
    Descricao: string;
    Data_Inicio: string;
    Data_Fim: string;
    Tipo_Ato_Ini: string;
    Numero_Ato_Ini: string;
    Ano_Ato_Ini: string;
  }[];
}

// Cache para armazenar os resultados da API
let ncmCache: NCMItem[] = [];
let lastCacheUpdate: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

/**
 * Busca NCMs por código ou descrição
 * @param search - Texto para busca (código ou descrição)
 * @returns Promise com a lista de NCMs encontrados
 */
export const searchNcm = async (search: string): Promise<NCMItem[]> => {
  try {
    if (!search || search.trim().length < 3) {
      return [];
    }
    
    // Verifica se precisamos atualizar o cache
    if (ncmCache.length === 0 || Date.now() - lastCacheUpdate > CACHE_DURATION) {
      await updateNCMCache();
    }
    
    // Busca no cache local
    const searchLower = search.toLowerCase();
    const filteredResults = ncmCache.filter(item => 
      item.codigo.toLowerCase().includes(searchLower) || 
      item.descricao.toLowerCase().includes(searchLower)
    );
    
    // Limite os resultados a 50 para evitar problemas de desempenho
    return filteredResults.slice(0, 50);
  } catch (error) {
    console.error("Erro ao buscar NCM:", error);
    // Retorna o item de fallback em caso de erro
    const fallbackItem: NCMItem = {
      codigo: "3305.10.00",
      descricao: "- Xampus",
      data_inicio: "2022-04-01",
      data_fim: "9999-12-31",
      tipo_ato: "Res Camex",
      numero_ato: "000272",
      ano_ato: "2021"
    };
    return [fallbackItem];
  }
};

/**
 * Atualiza o cache local com os dados da API
 */
async function updateNCMCache(): Promise<void> {
  try {
    // Tenta carregar da API
    const responseAPI = await axios.get('https://val.portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json');
    
    if (responseAPI.data && responseAPI.data.Nomenclaturas) {
      const data: SiscomexNCMResponse = responseAPI.data;
      
      // Converte o formato da API para o formato esperado
      ncmCache = data.Nomenclaturas.map(item => ({
        codigo: item.Codigo,
        descricao: item.Descricao,
        data_inicio: item.Data_Inicio,
        data_fim: item.Data_Fim,
        tipo_ato: item.Tipo_Ato_Ini,
        numero_ato: item.Numero_Ato_Ini,
        ano_ato: item.Ano_Ato_Ini
      }));
      
      lastCacheUpdate = Date.now();
      console.log(`Cache de NCM atualizado com ${ncmCache.length} itens.`);
    } else {
      console.error('Formato de resposta da API do Siscomex inesperado:', responseAPI.data);
      fallbackToDefaultData();
    }
  } catch (error) {
    console.error("Erro ao atualizar cache de NCM:", error);
    fallbackToDefaultData();
  }
}

/**
 * Fornece dados padrão em caso de falha
 */
function fallbackToDefaultData(): void {
  // Se o cache ainda estiver vazio, usamos um item de fallback
  if (ncmCache.length === 0) {
    const fallbackItem: NCMItem = {
      codigo: "3305.10.00",
      descricao: "- Xampus",
      data_inicio: "2022-04-01",
      data_fim: "9999-12-31",
      tipo_ato: "Res Camex",
      numero_ato: "000272",
      ano_ato: "2021"
    };
    ncmCache = [fallbackItem];
  }
} 