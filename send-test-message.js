const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function sendMessage() {
  try {
    // Inicializa o SDK com a configuração do .env
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true
    });

    // Definir instância
    api.useInstance(process.env.EVOLUTION_API_INSTANCE);

    // Enviar mensagem de teste
    const result = await api.message.sendText({
      number: process.env.TEST_PHONE,
      text: "Olá, esta é uma mensagem de teste do SDK Evolution API. Por favor, responda para verificar a comunicação."
    });

    console.log('Mensagem enviada:', result);

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}

sendMessage();