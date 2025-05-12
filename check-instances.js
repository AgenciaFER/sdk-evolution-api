const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function checkInstances() {
  try {
    // Inicializa o SDK com a configuração
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true
    });

    // Buscar todas as instâncias disponíveis
    console.log("Buscando instâncias disponíveis...");
    const response = await api.instance.fetchInstances();
    
    console.log("Instâncias encontradas:");
    if (response && Array.isArray(response)) {
      response.forEach((instance, index) => {
        console.log(`${index+1}. Nome: ${instance.name || 'Sem nome'}`);
        console.log(`   Estado: ${instance.connectionStatus}`);
        console.log(`   ID: ${instance.id}`);
        console.log('---');
      });
    } else {
      console.log("Nenhuma instância encontrada ou formato de resposta inesperado");
    }
  } catch (error) {
    console.error('Erro ao buscar instâncias:', error);
  }
}

// Executar a função principal
checkInstances();