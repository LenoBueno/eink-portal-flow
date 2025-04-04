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
interface SiscomexNCMItem {
  codigo: string;
  descricao: string;
  dataInicio?: string;
  dataFim?: string;
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
 * Atualiza o cache local com os dados da API ou arquivo local
 */
async function updateNCMCache(): Promise<void> {
  try {
    // Primeiro tenta carregar do arquivo local
    try {
      // Movendo o arquivo para a pasta public e atualizando o caminho
      const response = await fetch('/Tabela_NCM_Vigente_20250404.json');
      if (response.ok) {
        const localData = await response.json();
        if (localData && Array.isArray(localData)) {
          processLocalData(localData);
          lastCacheUpdate = Date.now();
          return;
        }
      }
    } catch (localError) {
      console.log('Arquivo local não encontrado, tentando API:', localError);
    }
    
    // Se não conseguir carregar do arquivo local, tenta da API
    const responseAPI = await axios.get('https://portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json');
    
    if (responseAPI.data && Array.isArray(responseAPI.data)) {
      // Converte o formato da API para o formato esperado
      ncmCache = responseAPI.data.map((item: SiscomexNCMItem) => ({
        codigo: item.codigo,
        descricao: item.descricao,
        data_inicio: item.dataInicio || "",
        data_fim: item.dataFim || "9999-12-31",
        tipo_ato: "Siscomex",
        numero_ato: "",
        ano_ato: ""
      }));
      
      lastCacheUpdate = Date.now();
    } else if (responseAPI.data && responseAPI.data.message) {
      // A API retornou uma mensagem de erro
      console.error('Erro da API do Siscomex:', responseAPI.data.message);
      fallbackToDefaultData();
    }
  } catch (error) {
    console.error("Erro ao atualizar cache de NCM:", error);
    fallbackToDefaultData();
  }
}

/**
 * Processa os dados locais do arquivo JSON
 */
function processLocalData(data: any[]): void {
  try {
    // Adaptando o formato do arquivo local para o formato esperado
    ncmCache = data.map(item => ({
      codigo: item.codigo || item.code || "",
      descricao: item.descricao || item.description || "",
      data_inicio: item.data_inicio || item.startDate || "",
      data_fim: item.data_fim || item.endDate || "9999-12-31",
      tipo_ato: item.tipo_ato || item.actType || "Local",
      numero_ato: item.numero_ato || item.actNumber || "",
      ano_ato: item.ano_ato || item.actYear || ""
    }));
  } catch (error) {
    console.error("Erro ao processar dados locais:", error);
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