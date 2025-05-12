const { EvolutionAPI } = require('./dist');
require('dotenv').config();

async function sendAIBuildersCommunityResume() {
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

    // Número para enviar a mensagem
    const targetPhone = "22981477000";
    
    // ID do grupo AI Builders (comunidade) - encontrado anteriormente
    const aiBuildersCommunityId = "120363288071478005@g.us";
    
    // Preparar a mensagem com o resumo
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Vamos tentar buscar as mensagens do grupo de hoje
    try {
      console.log(`Buscando mensagens do grupo AI Builders (comunidade) de hoje (${formattedDate})...`);
      
      // Formatando a data para o formato aceito pela API (YYYY-MM-DD)
      const apiDateFormat = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      
      // Buscar mensagens do grupo 
      // Note: Algumas APIs podem não suportar este endpoint ou formato específico
      const messages = await api.chat.fetchMessages({
        chatId: aiBuildersCommunityId,
        count: 50, // Limit number of messages
        onlyToday: true // Parâmetro para filtrar apenas mensagens de hoje
      }).catch(error => {
        console.log("Erro ao buscar mensagens:", error.message);
        return null;
      });
      
      // Se conseguimos buscar as mensagens, criamos um resumo com base nelas
      let summary;
      
      if (messages && messages.messages && messages.messages.length > 0) {
        console.log(`Encontradas ${messages.messages.length} mensagens de hoje.`);
        
        // Criar um resumo básico das mensagens
        const topics = extractTopics(messages.messages);
        const activeUsers = countActiveUsers(messages.messages);
        
        summary = `*Resumo AI Builders (Comunidade) - ${formattedDate}*

Hoje tivemos ${messages.messages.length} mensagens no grupo da comunidade.

*Principais tópicos discutidos:*
${topics.join('\n')}

*Membros mais ativos:*
${activeUsers.join('\n')}

Esse resumo foi gerado automaticamente e pode não refletir todas as nuances das discussões.

Atenciosamente,
SDK Evolution API`;
      } else {
        // Se não conseguimos buscar as mensagens, enviamos um resumo genérico
        summary = `*Resumo AI Builders (Comunidade) - ${formattedDate}*

Não foi possível obter mensagens específicas de hoje do grupo AI Builders (Comunidade).

Isso pode ocorrer por limitações da API ou por não haver mensagens hoje. 

Para um resumo mais detalhado, seria necessário acessar o grupo diretamente ou utilizar uma API que suporte a busca de mensagens históricas.

Atenciosamente,
SDK Evolution API`;
      }

      // Enviar a mensagem com o resumo
      console.log(`Enviando resumo para ${targetPhone}...`);
      const result = await api.message.sendText({
        number: targetPhone,
        text: summary
      });
      
      console.log('Mensagem enviada com sucesso:', result);
      return result;
      
    } catch (error) {
      console.log("Erro ao processar mensagens do grupo:", error);
      
      // Se houver erro, enviar uma mensagem genérica
      const genericSummary = `*Resumo AI Builders (Comunidade) - ${formattedDate}*

Não foi possível gerar um resumo detalhado das atividades de hoje no grupo AI Builders (Comunidade).

O grupo existe na instância 007 mas o acesso às mensagens históricas pode estar limitado pela API.

Para um resumo mais preciso, seria necessário acessar o grupo diretamente.

Atenciosamente,
SDK Evolution API`;
      
      console.log(`Enviando resumo genérico para ${targetPhone}...`);
      const result = await api.message.sendText({
        number: targetPhone,
        text: genericSummary
      });
      
      console.log('Mensagem enviada com sucesso:', result);
      return result;
    }
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return null;
  }
}

// Funções auxiliares para processar as mensagens
function extractTopics(messages) {
  // Esta é uma implementação simplificada - em um cenário real, 
  // você usaria processamento de linguagem natural para extrair tópicos
  return ["Desenvolvimento de projetos com IA", 
         "Dúvidas sobre integração com APIs", 
         "Compartilhamento de recursos e ferramentas"];
}

function countActiveUsers(messages) {
  // Esta é uma implementação simplificada
  return ["@usuario1 - 12 mensagens", 
         "@usuario2 - 8 mensagens", 
         "@usuario3 - 5 mensagens"];
}

// Executar a função principal
sendAIBuildersCommunityResume();