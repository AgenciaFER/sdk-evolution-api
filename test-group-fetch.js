const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function testGroups() {
  try {
    // Inicializa o SDK com a configuração do .env
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true
    });

    // Definir instância
    api.useInstance(process.env.EVOLUTION_API_INSTANCE);

    // Buscar todos os grupos
    console.log("Buscando grupos...");
    const result = await api.group.fetchAll();
    console.log('Resultado da busca de grupos:', result);
    
    // Verificar se temos grupos
    if (result && Array.isArray(result.groups)) {
      console.log(`Encontrados ${result.groups.length} grupos`);
      
      // Se temos grupos, mostrar detalhes do primeiro
      if (result.groups.length > 0) {
        console.log('Detalhes do primeiro grupo:');
        console.log('ID:', result.groups[0].id);
        console.log('Nome:', result.groups[0].subject);
        
        // Atualizar o .env com o ID do grupo
        const fs = require('fs');
        const envContent = fs.readFileSync('.env', 'utf8');
        const updatedContent = envContent + `\nTEST_GROUP=${result.groups[0].id}`;
        fs.writeFileSync('.env', updatedContent);
        console.log('Arquivo .env atualizado com o ID do grupo');
      } else {
        console.log('Nenhum grupo encontrado');
      }
    }

  } catch (error) {
    console.error('Erro ao buscar grupos:', error);
  }
}

testGroups();