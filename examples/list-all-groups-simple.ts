import { EvolutionAPI } from '../src';

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configuração da API
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.agenciafer.com.br/';
const API_KEY = process.env.EVOLUTION_API_KEY || '4cb762d3bd01fb9d479989ff87acebd0';
// A instância que queremos verificar
const INSTANCE_NAME = 'ferraz';

async function listAllGroups() {
  try {
    // Inicializa a API
    const api = new EvolutionAPI({
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: true  // Ativa logs para depuração
    });

    // Define a instância
    api.useInstance(INSTANCE_NAME);
    
    console.log(`Buscando todos os grupos da instância: ${INSTANCE_NAME}`);
    
    // Busca todos os grupos 
    const result = await api.group.fetchAll();
    
    // Verifica se o resultado tem a estrutura esperada
    const groups = Array.isArray(result) ? result : (result && result.groups ? result.groups : []);
    
    console.log(`Total de grupos encontrados: ${groups.length}`);
    
    // Mostra informações detalhadas de cada grupo
    groups.forEach((group, index) => {
      console.log(`\n=== Grupo ${index + 1} ===`);
      console.log(`ID: ${group.id}`);
      console.log(`Nome: ${group.subject}`);
      console.log(`Descrição: ${group.desc || 'Sem descrição'}`);
      console.log(`Tamanho: ${group.size || 'Desconhecido'}`);
      
      if (group.participants && group.participants.length > 0) {
        console.log(`Participantes: ${group.participants.length}`);
        const admins = group.participants.filter((p: any) => p.isAdmin || p.isSuperAdmin).length;
        console.log(`Admins: ${admins}`);
      }
    });
    
    return groups;
  } catch (error) {
    console.error('Erro ao listar grupos:', error);
    throw error;
  }
}

// Executa a função e imprime os resultados
listAllGroups()
  .then(() => console.log('\nListagem de grupos concluída com sucesso!'))
  .catch(err => console.error('\nFalha ao listar grupos:', err.message));