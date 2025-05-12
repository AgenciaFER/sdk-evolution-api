// filepath: scripts/list-groups.js
const { EvolutionAPI } = require('../dist');
require('dotenv').config();
const GET_PARTICIPANTS = process.env.GET_PARTICIPANTS === 'true';

async function listGroups() {
  try {
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true
    });

    // Use instance from ENV or default to "007"
    const instanceName = process.env.INSTANCE_NAME || '007';
    console.log(`Conectando à instância: ${instanceName}`);
    api.useInstance(instanceName);

    console.log(`Buscando todos os grupos na instância ${instanceName} (getParticipants=${GET_PARTICIPANTS})...`);
    const result = await api.group.fetchAll(undefined, GET_PARTICIPANTS);

    if (result && Array.isArray(result.groups)) {
      console.log(`Encontrados ${result.groups.length} grupos`);
      result.groups.forEach((group, index) => {
        console.log(`${index + 1}. ${group.subject} (ID: ${group.id})`);
      });
      return result.groups;
    } else {
      console.log('Nenhum grupo encontrado ou resposta inválida');
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar grupos:', error);
    return [];
  }
}

listGroups();
