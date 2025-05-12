import { EvolutionAPI } from '../src';

// Configuração do cliente
const client = new EvolutionAPI({
  baseUrl: 'https://api.agenciafer.com.br',
  apiKey: 'SUA_API_KEY',
});

// Definir instância
client.useInstance('minha-instancia');

// Número de destino usado em todos os exemplos
const numeroDestino = '5511999999999';

// Exemplo de envio de texto
async function enviarTexto() {
  const resultado = await client.message.sendText({
    number: numeroDestino,
    text: 'Olá, esta é uma mensagem de teste com *formatação* _rica_ ~tachado~ ```código```',
    linkPreview: true, // Mostra preview de links se houver na mensagem
  });
  
  console.log('Texto enviado:', resultado);
}

// Exemplo de envio de imagem
async function enviarImagem() {
  const resultado = await client.message.sendMedia({
    number: numeroDestino,
    mediatype: 'image',
    mimetype: 'image/jpeg',
    caption: 'Esta é uma imagem de exemplo',
    media: 'https://example.com/imagem.jpg', // URL da imagem ou base64
    fileName: 'imagem.jpg',
  });
  
  console.log('Imagem enviada:', resultado);
}

// Exemplo de envio de vídeo
async function enviarVideo() {
  const resultado = await client.message.sendMedia({
    number: numeroDestino,
    mediatype: 'video',
    mimetype: 'video/mp4',
    caption: 'Este é um vídeo de exemplo',
    media: 'https://example.com/video.mp4', // URL do vídeo ou base64
    fileName: 'video.mp4',
  });
  
  console.log('Vídeo enviado:', resultado);
}

// Exemplo de envio de documento
async function enviarDocumento() {
  const resultado = await client.message.sendMedia({
    number: numeroDestino,
    mediatype: 'document',
    mimetype: 'application/pdf',
    caption: 'Este é um documento de exemplo',
    media: 'https://example.com/documento.pdf', // URL do documento ou base64
    fileName: 'documento.pdf',
  });
  
  console.log('Documento enviado:', resultado);
}

// Exemplo de envio de vídeo que só pode ser visto uma vez
async function enviarVideoPTV() {
  const resultado = await client.message.sendPtv({
    number: numeroDestino,
    video: 'https://example.com/video-ptv.mp4', // URL do vídeo ou base64
  });
  
  console.log('Vídeo PTV enviado:', resultado);
}

// Exemplo de envio de áudio narrado (como mensagem de voz)
async function enviarAudioNarrado() {
  const resultado = await client.message.sendNarratedAudio({
    number: numeroDestino,
    audio: 'https://example.com/audio.mp3', // URL do áudio ou base64
  });
  
  console.log('Áudio narrado enviado:', resultado);
}

// Exemplo de envio de sticker
async function enviarSticker() {
  const resultado = await client.message.sendSticker({
    number: numeroDestino,
    sticker: 'https://example.com/sticker.webp', // URL do sticker ou base64
  });
  
  console.log('Sticker enviado:', resultado);
}

// Exemplo de envio de localização
async function enviarLocalizacao() {
  const resultado = await client.message.sendLocation({
    number: numeroDestino,
    name: 'Nome do Local',
    address: 'Endereço do Local',
    latitude: -23.5505,
    longitude: -46.6333,
  });
  
  console.log('Localização enviada:', resultado);
}

// Exemplo de envio de contatos
async function enviarContatos() {
  const resultado = await client.message.sendContact({
    number: numeroDestino,
    contact: [
      {
        fullName: 'João Silva',
        wuid: '5511988888888',
        phoneNumber: '+55 11 98888-8888',
        organization: 'Empresa XYZ',
        email: 'joao@exemplo.com',
        url: 'https://exemplo.com/joao',
      },
      {
        fullName: 'Maria Souza',
        wuid: '5511977777777',
        phoneNumber: '+55 11 97777-7777',
      },
    ],
  });
  
  console.log('Contatos enviados:', resultado);
}

// Exemplo de envio de storie/status
async function enviarStatus() {
  const resultado = await client.message.sendStatus({
    type: 'text',
    content: 'Este é um status de exemplo',
    backgroundColor: '#00FF00',
    font: 3, // Estilo de fonte
    allContacts: false,
    statusJidList: [
      `${numeroDestino}@s.whatsapp.net`,
    ],
  });
  
  console.log('Status enviado:', resultado);
}

// Executar os exemplos
(async () => {
  try {
    // Descomente a função que deseja testar
    // await enviarTexto();
    // await enviarImagem();
    // await enviarVideo();
    // await enviarDocumento();
    // await enviarVideoPTV();
    // await enviarAudioNarrado();
    // await enviarSticker();
    // await enviarLocalizacao();
    // await enviarContatos();
    // await enviarStatus();
  } catch (error) {
    console.error('Erro:', error);
  }
})();
