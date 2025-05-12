const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function sendSimpleSummary() {
  try {
    // Inicializa o SDK com a configuração
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true,
      timeout: 60000 // 60 segundos de timeout
    });

    // Definir instância "007"
    api.useInstance("007");

    // Número para enviar a mensagem (agora com código do país)
    const targetPhone = "5522981477000";
    
    // Preparar a mensagem com o resumo
    const formattedDate = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const simpleSummary = `*Resumo AI Builders (Comunidade) - ${formattedDate}*

Principais atividades de hoje na comunidade AI Builders:

- Discussões sobre projetos de IA generativa
- Compartilhamento de recursos e ferramentas
- Dúvidas sobre integração com APIs externas
- Anúncios sobre eventos e webinars

Este resumo foi gerado automaticamente pelo SDK da Evolution API.

Atenciosamente,
SDK Evolution API`;
      
    // Enviar a mensagem
    console.log(`Enviando resumo para ${targetPhone}...`);
    const result = await api.message.sendText({
      number: targetPhone,
      text: simpleSummary
    });
    
    console.log('Mensagem enviada com sucesso:', result);
    return result;
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return null;
  }
}

// Executar a função principal
sendSimpleSummary();