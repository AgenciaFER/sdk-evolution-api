const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function findGroup() {
  try {
    // Inicializa o SDK com a configuração
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true,
      timeout: 60000, // 60 segundos de timeout
      maxRetries: 1   // apenas uma tentativa
    });

    // Definir instância "007"
    api.useInstance("007");

    // Buscar todos os grupos SEM participantes (para reduzir o tamanho da resposta)
    console.log("Buscando grupos na instância 007 (sem participantes)...");
    const result = await api.group.fetchAll(undefined, false);
    
    // Verificar se temos grupos
    if (result && Array.isArray(result.groups)) {
      console.log(`Encontrados ${result.groups.length} grupos`);
      
      // Buscar o grupo específico
      const targetGroups = result.groups.filter(group => 
        group.subject && group.subject.toLowerCase().includes("lista de espera"));
      
      if (targetGroups.length > 0) {
        console.log(`\nEncontrados ${targetGroups.length} grupos com "Lista de Espera" no nome:`);
        
        targetGroups.forEach((group, index) => {
          console.log(`${index+1}. ${group.subject} (ID: ${group.id})`);
        });
        
        // Procurar especificamente por "Lista de Espera - Mentoria AI Builders #2"
        const exactMatch = targetGroups.find(group => 
          group.subject && group.subject.includes("Lista de Espera - Mentoria AI Builders #2"));
          
        if (exactMatch) {
          console.log(`\nGrupo alvo encontrado: ${exactMatch.subject}`);
          console.log(`ID do grupo: ${exactMatch.id}`);
          return exactMatch.id;
        } else {
          console.log("\nGrupo 'Lista de Espera - Mentoria AI Builders #2' não encontrado exatamente");
          
          // Retornar o primeiro grupo com "Lista de Espera" se não encontrar o específico
          if (targetGroups.length > 0) {
            console.log(`Retornando primeiro grupo encontrado: ${targetGroups[0].subject}`);
            return targetGroups[0].id;
          }
          return null;
        }
      } else {
        console.log("\nNenhum grupo com 'Lista de Espera' no nome encontrado");
        return null;
      }
    } else {
      console.log("Nenhum grupo encontrado ou resposta inválida");
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar grupos:', error);
    return null;
  }
}

// Executar a função principal
findGroup().then(groupId => {
  if (groupId) {
    console.log("ID do grupo encontrado:", groupId);
  }
});