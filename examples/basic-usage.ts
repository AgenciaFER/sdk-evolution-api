import { EvolutionAPI } from '../src';

// Configuração básica do cliente
const client = new EvolutionAPI({
  baseUrl: 'https://api.agenciafer.com.br',
  apiKey: 'SUA_API_KEY', // Opcional, pode ser definido através de variável de ambiente
  debug: true, // Habilita logs detalhados
  timeout: 60000, // Timeout de 60 segundos
});

// Exemplo 1: Criar uma nova instância
async function criarInstancia() {
  try {
    const resultado = await client.instance.create({
      instanceName: 'minha-instancia',
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS',
    });
    
    console.log('Instância criada com sucesso:', resultado);
  } catch (error) {
    console.error('Erro ao criar instância:', error);
  }
}

// Exemplo 2: Definir uma instância para uso em todos os módulos
client.useInstance('minha-instancia');

// Exemplo 3: Enviar uma mensagem de texto
async function enviarMensagemTexto() {
  try {
    const resultado = await client.message.sendText({
      number: '5511999999999',
      text: 'Olá, esta é uma mensagem de teste!',
    });
    
    console.log('Mensagem enviada com sucesso:', resultado);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}

// Exemplo 4: Enviar uma imagem
async function enviarImagem() {
  try {
    const resultado = await client.message.sendMedia({
      number: '5511999999999',
      mediatype: 'image',
      mimetype: 'image/jpeg',
      caption: 'Esta é uma imagem de teste',
      media: 'https://example.com/imagem.jpg', // URL da imagem
      fileName: 'imagem.jpg',
    });
    
    console.log('Imagem enviada com sucesso:', resultado);
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
  }
}

// Exemplo 5: Verificar o status de conexão
async function verificarConexao() {
  try {
    const status = await client.instance.getConnectionState();
    console.log('Status da conexão:', status);
  } catch (error) {
    console.error('Erro ao verificar conexão:', error);
  }
}

// Exemplo 6: Definir configurações da instância
async function configurarInstancia() {
  try {
    const resultado = await client.settings.set({
      rejectCall: true,
      msgCall: 'Não posso atender no momento, por favor envie uma mensagem.',
      alwaysOnline: true,
      readMessages: false,
    });
    
    console.log('Configurações aplicadas com sucesso:', resultado);
  } catch (error) {
    console.error('Erro ao configurar instância:', error);
  }
}

// Executar funções de exemplo
(async () => {
  // Descomente as funções que deseja testar
  // await criarInstancia();
  // await enviarMensagemTexto();
  // await enviarImagem();
  // await verificarConexao();
  // await configurarInstancia();
})();
