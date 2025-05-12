const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function createGroup() {
  try {
    // Inicializa o SDK com a configuração do .env
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true
    });

    // Definir instância
    api.useInstance(process.env.EVOLUTION_API_INSTANCE);

    // Criar um grupo com nome "Teste" e adicionar o número de teste como participante
    const result = await api.group.createGroup(
      "Teste", // Nome do grupo
      [process.env.TEST_PHONE] // Participantes (o próprio número de teste)
    );

    console.log('Grupo criado:', result);
    console.log('ID do grupo:', result.groupInfo?.id);

    // Atualizar o .env com o ID do grupo
    if (result.groupInfo?.id) {
      const fs = require('fs');
      const envContent = fs.readFileSync('.env', 'utf8');
      const updatedContent = envContent + `\nTEST_GROUP=${result.groupInfo.id}`;
      fs.writeFileSync('.env', updatedContent);
      console.log('Arquivo .env atualizado com o ID do grupo');
    }

  } catch (error) {
    console.error('Erro ao criar grupo:', error);
  }
}

createGroup();