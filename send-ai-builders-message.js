const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function sendSummaryToAIBuilders() {
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

    // Como não encontramos o grupo específico, vamos enviar diretamente para o número solicitado
    const targetPhone = "5522999772047";
    
    // Preparar a mensagem com o resumo
    const date = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const summary = `*Resumo AI Builders - ${date}*

Não foi possível encontrar um grupo específico com o nome "Lista de Espera - Mentoria AI Builders #2" na instância. 

Entretanto, encontramos os seguintes grupos relacionados à AI Builders:
- AI Builders (Comunidade)
- FrankenstAI
- Chatwoot (ligado à AI Builders)
- Mega Web Agents (ligado à AI Builders)
- AI Healthcare (ligado à AI Builders)

Este é um resumo automático gerado através do SDK da Evolution API. Para mais informações específicas sobre as conversas do dia, seria necessário ter acesso ao grupo específico "Lista de Espera - Mentoria AI Builders #2".

Atenciosamente,
SDK Evolution API`;

    // Enviar a mensagem
    console.log(`Enviando resumo para ${targetPhone}...`);
    const result = await api.message.sendText({
      number: targetPhone,
      text: summary
    });
    
    console.log('Mensagem enviada com sucesso:', result);
    return result;
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return null;
  }
}

// Executar a função principal
sendSummaryToAIBuilders();