# Guia para Testes de Integração Reais

Este documento fornece orientações para executar os testes de integração com uma instância real da Evolution API.

## Pré-requisitos

1. **Instância Evolution API** funcionando corretamente
2. **Variáveis de ambiente** configuradas no arquivo `.env`:

```properties
# API da Evolution
EVOLUTION_API_URL=https://sua-api.exemplo.com/
EVOLUTION_API_KEY=sua_chave_api
EVOLUTION_API_INSTANCE=nome_instancia
TEST_PHONE=5511999999999
TEST_SEND_MESSAGE=true
TEST_GROUP=5511999999999-1234567890@g.us
```

## Execução dos Testes

### Testes Básicos de Integração

Executa apenas os testes básicos de conexão e envio de mensagem:

```bash
npm run test:basic
```

### Testes Completos de Integração

Executa todos os testes de integração, incluindo grupos e mídia:

```bash
npm run test:integration
```

### Testes de WebSocket

Testa a conexão WebSocket e recebimento de eventos:

```bash
npm test -- tests/integration/websocket-events.test.ts
```

### Testes de Grupos

Testa a API de grupos (requer ID de grupo válido no .env):

```bash
npm test -- tests/integration/api-group.test.ts
```

### Testes de Mídia

Testa o envio de mensagens com mídia:

```bash
npm test -- tests/integration/api-media.test.ts
```

## Criação de ID de Grupo

Para testar a API de grupos, você precisa de um ID de grupo válido no formato `5521999999999-1234567890@g.us`.

### Opção 1: Criar novo grupo

Você pode criar um grupo no WhatsApp e pegar seu ID usando a API do WhatsApp ou enviando uma mensagem para o grupo e obtendo o ID da mensagem.

### Opção 2: Obter ID de grupo existente

Você pode obter o ID de um grupo existente usando a API Evolution:

1. Conecte sua instância do WhatsApp
2. Execute o endpoint `GET /group/fetchAllGroups/{instance}`
3. Copie o ID de um dos grupos retornados

## Solução de Problemas

### Erro 404 em endpoints

Alguns endpoints podem não estar implementados na sua versão da API. Verifique a versão da API e documente os endpoints não suportados.

### Erro 400 ao enviar mídia

Problemas comuns:
- Formato incorreto de base64
- Tamanho do arquivo muito grande
- Endpoint espera multipart/form-data em vez de base64

### Timeout nos testes

Aumente o timeout no arquivo de teste:

```javascript
jest.setTimeout(60000); // 60 segundos
```

## Relatório de Cobertura

Para gerar um relatório de cobertura dos testes:

```bash
npm test -- --coverage
```

O relatório será gerado na pasta `coverage/`.
