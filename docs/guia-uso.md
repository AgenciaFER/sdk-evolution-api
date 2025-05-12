# Guia de Uso do Evolution API SDK

Este guia fornece instruções detalhadas sobre como utilizar o SDK da Evolution API para integração com WhatsApp.

## Índice

- [Instalação](#instalação)
- [Configuração Inicial](#configuração-inicial)
- [Gerenciamento de Instâncias](#gerenciamento-de-instâncias)
- [Envio de Mensagens](#envio-de-mensagens)
- [Gestão de Grupos](#gestão-de-grupos)
- [Configurações](#configurações)
- [Tratamento de Erros](#tratamento-de-erros)
- [Exemplos Avançados](#exemplos-avançados)

## Instalação

```bash
npm install evolution-api-sdk
```

## Configuração Inicial

Para começar a usar o SDK, você precisa criar uma instância do cliente com as configurações básicas:

```typescript
import { EvolutionAPI } from 'evolution-api-sdk';

// Configuração básica
const client = new EvolutionAPI({
  baseUrl: 'https://api.agenciafer.com.br', // URL da sua instância da API
  apiKey: 'SUA_API_KEY',                    // Chave de API
  debug: true,                              // Ativa logs detalhados (opcional)
  timeout: 60000,                           // Timeout das requisições em ms (opcional)
  maxRetries: 3                             // Número máximo de tentativas (opcional)
});
```

### Configuração de Instância

Na maioria dos casos, você trabalhará com uma instância específica do WhatsApp. Para definir a instância padrão para todas as operações:

```typescript
client.useInstance('minha-instancia');
```

Alternativamente, você pode especificar a instância para cada operação individual:

```typescript
// Usando instância específica para uma operação
await client.message.sendText({
  number: '5511999999999',
  text: 'Olá mundo!'
}, 'outra-instancia');
```

## Gerenciamento de Instâncias

### Criar Nova Instância

```typescript
// Criar uma instância básica
const result = await client.instance.create({
  instanceName: 'minha-instancia',
  qrcode: true
});

// Criar instância com configurações avançadas
const resultAvancado = await client.instance.create({
  instanceName: 'instancia-avancada',
  qrcode: true,
  integration: 'WHATSAPP-BAILEYS',
  webhookUrl: 'https://meusite.com/webhook',
  rejectCall: true,
  msgCall: 'Não posso atender no momento',
  alwaysOnline: true
});
```

### Conectar a uma Instância

```typescript
await client.instance.connect();
```

### Verificar Status da Conexão

```typescript
const status = await client.instance.getConnectionState();
console.log(`Status: ${status.state}`);
```

### Reiniciar Instância

```typescript
await client.instance.restart();
```

### Excluir Instância

```typescript
await client.instance.delete();
```

## Envio de Mensagens

### Mensagem de Texto

```typescript
await client.message.sendText({
  number: '5511999999999',
  text: 'Olá, esta é uma mensagem de teste!',
  linkPreview: true // Opcional: exibe preview de links
});
```

### Mensagem com Mídia

```typescript
// Enviar imagem
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  mimetype: 'image/jpeg',
  caption: 'Imagem de teste',
  media: 'https://exemplo.com/imagem.jpg' // URL ou base64
});

// Enviar vídeo
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'video',
  mimetype: 'video/mp4',
  caption: 'Vídeo de teste',
  media: 'https://exemplo.com/video.mp4'
});

// Enviar documento
await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'document',
  mimetype: 'application/pdf',
  caption: 'Documento de teste',
  media: 'https://exemplo.com/arquivo.pdf',
  fileName: 'documento.pdf'
});
```

### Localização

```typescript
await client.message.sendLocation({
  number: '5511999999999',
  name: 'Nome do Local',
  address: 'Endereço completo',
  latitude: -23.5505,
  longitude: -46.6333
});
```

### Botões

```typescript
await client.message.sendButton({
  number: '5511999999999',
  title: 'Título da mensagem',
  buttons: [
    { buttonId: 'id1', buttonText: 'Botão 1' },
    { buttonId: 'id2', buttonText: 'Botão 2' },
    { buttonId: 'id3', buttonText: 'Botão 3' }
  ],
  footer: 'Rodapé opcional'
});
```

### Lista de Opções

```typescript
await client.message.sendList({
  number: '5511999999999',
  title: 'Título da mensagem',
  description: 'Descrição da lista',
  buttonText: 'Clique aqui',
  sections: [
    {
      title: 'Seção 1',
      rows: [
        { title: 'Opção 1', description: 'Descrição da opção 1', rowId: 'id1' },
        { title: 'Opção 2', description: 'Descrição da opção 2', rowId: 'id2' }
      ]
    },
    {
      title: 'Seção 2',
      rows: [
        { title: 'Opção 3', description: 'Descrição da opção 3', rowId: 'id3' }
      ]
    }
  ],
  footer: 'Rodapé opcional'
});
```

## Gestão de Grupos

### Criar Grupo

```typescript
const grupo = await client.group.createGroup('Nome do Grupo', [
  '5511999999999',
  '5511888888888'
]);
console.log(`Grupo criado: ${grupo.groupId}`);
```

### Adicionar Participantes

```typescript
await client.group.updateParticipant(
  '123456789@g.us', // ID do grupo
  'add',             // Ação (add, remove, promote, demote)
  ['5511777777777']  // Lista de participantes
);
```

### Alterar Informações do Grupo

```typescript
// Alterar nome
await client.group.updateSubject('123456789@g.us', 'Novo Nome do Grupo');

// Alterar descrição
await client.group.updateDescription('123456789@g.us', 'Nova descrição do grupo');

// Alterar foto
await client.group.updatePicture('123456789@g.us', 'https://exemplo.com/foto.jpg');
```

## Configurações

### Definir Configurações Globais

```typescript
await client.settings.set({
  rejectCall: true,                            // Rejeitar chamadas automaticamente
  msgCall: 'Não posso atender no momento',     // Mensagem de chamada rejeitada
  alwaysOnline: true,                          // Manter status online
  readMessages: false,                         // Não marcar mensagens como lidas automaticamente
  syncFullHistory: true                        // Sincronizar histórico completo
});
```

### Obter Configurações Atuais

```typescript
const configuracoes = await client.settings.find();
console.log(configuracoes);
```

## Tratamento de Erros

O SDK inclui tratamento de erros robusto. Recomendamos que você sempre envolva suas chamadas em blocos try/catch:

```typescript
import { EvolutionAPI, EvolutionAPIError } from 'evolution-api-sdk';

try {
  const resultado = await client.message.sendText({
    number: '5511999999999',
    text: 'Olá mundo!'
  });
  console.log('Mensagem enviada:', resultado);
} catch (error) {
  if (error instanceof EvolutionAPIError) {
    console.error(`Erro ${error.statusCode}: ${error.message}`);
    console.error('Endpoint:', error.endpoint);
    console.error('Resposta:', error.response);
  } else {
    console.error('Erro desconhecido:', error);
  }
}
```

## Exemplos Avançados

### Webhook para Receber Mensagens

```typescript
// Configurar webhook para receber mensagens e outros eventos
await client.integrations.setWebhook(
  'https://meusite.com/webhook',
  ['MESSAGES_UPSERT', 'MESSAGES_UPDATE', 'QR_UPDATE', 'CONNECTION_UPDATE'],
  { 
    enabled: true,
    base64: false
  }
);
```

### Configurar um Chatbot Simples

```typescript
await client.integrations.setChatbot(
  true,
  {
    type: 'text',
    message: 'Olá! Por favor, escolha uma opção:\n1 - Atendimento\n2 - Informações\n3 - Suporte',
    keyword: 'oi,olá,inicio',
    trigger: 'message'
  }
);
```

### Enviar Mensagem com Citação (Reply)

```typescript
await client.message.sendText({
  number: '5511999999999',
  text: 'Esta é uma resposta a uma mensagem anterior',
  quoted: {
    key: {
      id: 'mensagem-original-id',
      remoteJid: '5511999999999@s.whatsapp.net',
      fromMe: false
    }
  }
});
```

Para mais exemplos e detalhes sobre todas as opções disponíveis, consulte a [documentação da API](link-para-documentacao) ou os exemplos na pasta `examples` do repositório.
