import { EvolutionAPI } from '../src';

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configuração da API
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.agenciafer.com.br/';
const API_KEY = process.env.EVOLUTION_API_KEY || '4cb762d3bd01fb9d479989ff87acebd0';
// A instância que queremos verificar
const INSTANCE_NAME = 'ferraz';

async function listArchivedGroups() {
  try {
    // Inicializa a API
    const api = new EvolutionAPI({
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: true  // Ativa logs para depuração
    });

    // Define a instância
    api.useInstance(INSTANCE_NAME);
    
    console.log(`Buscando grupos ARQUIVADOS da instância: ${INSTANCE_NAME}`);
    
    // Primeiro precisamos verificar o status de arquivamento de cada grupo
    const allGroups = await api.group.fetchAll();
    const groups = Array.isArray(allGroups) ? allGroups : (allGroups.groups || []);
    
    console.log(`Total de grupos encontrados: ${groups.length}`);
    
    // Verificar quais grupos estão arquivados
    console.log("Verificando status de arquivamento dos grupos...");
    const groupsWithStatus = await Promise.all(
      groups.map(async (group) => {
        try {
          const isArchived = await api.group.isArchived(group.id);
          return { ...group, archived: isArchived };
        } catch (error) {
          return { ...group, archived: false };
        }
      })
    );
    
    // Filtrar grupos arquivados
    const archivedGroups = groupsWithStatus.filter(group => group.archived);
    // Filtrar grupos não arquivados
    const unarchivedGroups = groupsWithStatus.filter(group => !group.archived);
    
    console.log(`\n=== RESUMO ===`);
    console.log(`Total de grupos: ${groups.length}`);
    console.log(`Grupos arquivados: ${archivedGroups.length}`);
    console.log(`Grupos não arquivados: ${unarchivedGroups.length}`);
    
    console.log(`\n=== GRUPOS ARQUIVADOS ===`);
    archivedGroups.forEach((group, index) => {
      console.log(`${index + 1}. ${group.subject} (${group.id})`);
    });
    
    console.log(`\n=== GRUPOS NÃO ARQUIVADOS ===`);
    unarchivedGroups.forEach((group, index) => {
      console.log(`${index + 1}. ${group.subject} (${group.id})`);
    });
    
    return {
      archivedGroups,
      unarchivedGroups
    };
  } catch (error) {
    console.error('Erro ao listar grupos arquivados:', error);
    throw error;
  }
}

// Executa a função e imprime os resultados
listArchivedGroups()
  .then(() => console.log('\nListagem de grupos arquivados concluída com sucesso!'))
  .catch(err => console.error('\nFalha ao listar grupos arquivados:', err.message));