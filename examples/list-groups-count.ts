import { EvolutionAPI } from '../src';

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configuração da API
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.agenciafer.com.br/';
const API_KEY = process.env.EVOLUTION_API_KEY || '4cb762d3bd01fb9d479989ff87acebd0';
// A instância que queremos verificar
const INSTANCE_NAME = 'ferraz';

async function listGroupsCount() {
  try {
    // Inicializa a API
    const api = new EvolutionAPI({
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: false  // Desativa logs para depuração
    });

    // Define a instância
    api.useInstance(INSTANCE_NAME);
    
    console.log(`Buscando todos os grupos da instância: ${INSTANCE_NAME}`);
    
    // Busca todos os grupos 
    const result = await api.group.fetchAll();
    
    // Verifica se o resultado tem a estrutura esperada
    const groups = Array.isArray(result) ? result : (result && result.groups ? result.groups : []);
    
    console.log(`Total de grupos encontrados: ${groups.length}\n`);
    
    // Ordenar grupos por número de participantes (do maior para o menor)
    const sortedGroups = [...groups].sort((a, b) => 
      (b.size || b.participants?.length || 0) - (a.size || a.participants?.length || 0)
    );
    
    // Formatar e exibir apenas nome e quantidade de membros
    console.log("NOME DO GRUPO | MEMBROS");
    console.log("----------------------------------------");
    sortedGroups.forEach((group) => {
      const memberCount = group.size || (group.participants ? group.participants.length : 0);
      console.log(`${group.subject?.substring(0, 50) || '[Sem Nome]'} | ${memberCount}`);
    });
    
    return sortedGroups;
  } catch (error) {
    console.error('Erro ao listar grupos:', error);
    throw error;
  }
}

// Executa a função e imprime os resultados
listGroupsCount()
  .then(() => console.log('\nListagem de grupos concluída com sucesso!'))
  .catch(err => console.error('\nFalha ao listar grupos:', err.message));