# Evolution API SDK

[![npm version](https://img.shields.io/npm/v/evolution-api-sdk.svg?style=flat-square)](https://www.npmjs.org/package/evolution-api-sdk)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=evolution-api-sdk&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.com/result?p=evolution-api-sdk)
[![npm downloads](https://img.shields.io/npm/dm/evolution-api-sdk.svg?style=flat-square)](https://npm-stat.com/charts.html?package=evolution-api-sdk)

Um SDK TypeScript robusto e profissional para integração com a Evolution API (WhatsApp API). Este SDK facilita o acesso a todas as funcionalidades da Evolution API de uma maneira simples, segura e com tipagem forte.

## Instalação

```bash
npm install evolution-api-sdk
```

ou

```bash
yarn add evolution-api-sdk
```

## Recursos

- ✅ Tipagem completa com TypeScript
- ✅ Suporte a todas as funcionalidades da Evolution API
- ✅ Tratamento de erros robusto
- ✅ Sistema de retry automático para falhas de rede
- ✅ Documentação completa das funções
- ✅ Exemplos de uso
- ✅ Fácil configuração

## Início Rápido

```typescript
import { EvolutionAPI } from 'evolution-api-sdk';

// Criar cliente com URL do servidor
const client = new EvolutionAPI({
  baseUrl: 'https://api.agenciafer.com.br',
  apiKey: 'SUA_API_KEY',
});

// Definir instância padrão para todas as operações
client.useInstance('minha-instancia');

// Enviar uma mensagem de texto
async function enviarMensagem() {
  try {
    const resultado = await client.message.sendText({
      number: '5511999999999',
      text: 'Olá, esta é uma mensagem enviada através do SDK!',
    });
    
    console.log('Mensagem enviada com sucesso:', resultado);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}

enviarMensagem();
```

## Módulos Disponíveis

O SDK está organizado em módulos que correspondem às categorias da API:

- **Instance**: Gerenciamento de instâncias (criar, conectar, reiniciar, etc.)
- **Settings**: Configurações da instância
- **Message**: Envio de todos os tipos de mensagens
- **Chat**: Gerenciamento de conversas
- **Group**: Gerenciamento de grupos
- **Profile**: Configurações de perfil
- **Label**: Gerenciamento de etiquetas
- **Proxy**: Configurações de proxy
- **Call**: Funções relacionadas a chamadas
- **Integrations**: Integrações com sistemas externos

## Exemplos

### Criar uma nova instância

```typescript
const resultado = await client.instance.create({
  instanceName: 'minha-instancia',
  qrcode: true,
  integration: 'WHATSAPP-BAILEYS'
});
```

### Enviar uma imagem

```typescript
const resultado = await client.message.sendMedia({
  number: '5511999999999',
  mediatype: 'image',
  mimetype: 'image/jpeg',
  caption: 'Esta é uma imagem de exemplo',
  media: 'https://example.com/imagem.jpg',
  fileName: 'imagem.jpg',
});
```

### Verificar o status de conexão

```typescript
const status = await client.instance.getConnectionState();
console.log('Status da conexão:', status);
```

### Configurar uma instância

```typescript
const resultado = await client.settings.set({
  rejectCall: true,
  msgCall: 'Não posso atender no momento',
  alwaysOnline: true,
  readMessages: false,
});
```

## Configuração Avançada

O SDK possui várias opções de configuração para se adaptar às suas necessidades:

```typescript
const client = new EvolutionAPI({
  baseUrl: 'https://api.agenciafer.com.br',
  apiKey: 'SUA_API_KEY',
  timeout: 60000,           // Timeout de 60 segundos
  debug: true,              // Mostrar logs detalhados
  maxRetries: 3,            // Número máximo de tentativas em caso de falha
  retryDelay: 1000,         // Tempo entre tentativas (ms)
});
```

## Tratamento de Erros

O SDK inclui uma classe personalizada de erro para facilitar o tratamento:

```typescript
try {
  await client.message.sendText({
    number: '5511999999999',
    text: 'Olá!',
  });
} catch (error) {
  if (error.statusCode === 404) {
    console.error('Instância não encontrada');
  } else if (error.statusCode === 401) {
    console.error('Erro de autenticação');
  } else {
    console.error('Erro desconhecido:', error.message);
  }
}
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
