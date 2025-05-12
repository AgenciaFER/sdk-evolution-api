const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function listGroups() {
  try {
    // Inicializa o SDK com a configuração
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true
    });

    // Definir instância "007"
    api.useInstance("007");

    // Buscar todos os grupos
    console.log("Buscando grupos na instância 007...");
    const result = await api.group.fetchAll();
    
    // Verificar se temos grupos
    if (result && Array.isArray(result.groups)) {
      console.log(`Encontrados ${result.groups.length} grupos`);
      
      // Mostrar os primeiros 10 grupos ou todos se forem menos de 10
      const limit = Math.min(10, result.groups.length);
      console.log(`\nPrimeiros ${limit} grupos:`);
      
      for (let i = 0; i < limit; i++) {
        const group = result.groups[i];
        console.log(`${i+1}. ${group.subject} (ID: ${group.id})`);
      }
      
      // Buscar o grupo específico
      const targetGroup = result.groups.find(group => 
        group.subject.includes("Lista de Espera - Mentoria AI Builders #2"));
      
      if (targetGroup) {
        console.log(`\nGrupo alvo encontrado: ${targetGroup.subject}`);
        console.log(`ID do grupo: ${targetGroup.id}`);
        return targetGroup.id;
      } else {
        console.log("\nGrupo 'Lista de Espera - Mentoria AI Builders #2' não encontrado");
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
listGroups().then(groupId => {
  if (groupId) {
    console.log("ID do grupo encontrado:", groupId);
  }
});