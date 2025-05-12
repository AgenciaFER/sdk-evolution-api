# Evolution API SDK - Testes de Integração

Este arquivo descreve os testes de integração implementados para o SDK da Evolution API.

## Configuração

Para executar os testes de integração, você precisa configurar as seguintes variáveis de ambiente no arquivo `.env`:

```properties
# Configurações para testes com API real
EVOLUTION_API_URL=https://sua-api.exemplo.com/
EVOLUTION_API_KEY=sua-chave-api
EVOLUTION_API_INSTANCE=nome-instancia
TEST_PHONE=5511999999999
# Defina como 'true' para ativar o envio de mensagens nos testes (cuidado: enviará mensagens reais)
TEST_SEND_MESSAGE=true
# ID de um grupo para testes - formato: 5521999999999-1111111111@g.us
TEST_GROUP=55219999-1111111@g.us
# URL do WebSocket para testes de eventos (opcional - usa URL da API por padrão)
EVOLUTION_API_WS_URL=
# Configurações para testes de RabbitMQ (opcional)
RABBITMQ_URL=
RABBITMQ_QUEUE=
# URL de webhook para testes (opcional)
WEBHOOK_TARGET_URL=
```

## Testes Disponíveis

O SDK inclui vários conjuntos de testes de integração:

1. **Testes básicos de integração** - `basic-integration.test.ts`
   - Verifica a conexão básica com a API
   - Testa operações fundamentais

2. **Testes completos** - `complete-api.test.ts`
   - Cobre todas as operações do SDK
   - Requer configuração completa

3. **Testes reais** - `real-api.test.ts`
   - Executa operações em uma instância real
   - Pode enviar mensagens reais se `TEST_SEND_MESSAGE=true`

4. **Testes de grupo** - `api-group.test.ts`
   - Testa operações específicas de grupos
   - Requer `TEST_GROUP` definido

5. **Testes de WebSocket** - `websocket-events.test.ts`
   - Testa recebimento de eventos via WebSocket
   - Requer `TEST_SEND_MESSAGE=true`

6. **Testes gerais de integração** - `integration-test.test.ts`
   - Conjunto expandido de testes focando em todos os endpoints

## Como executar

Execute os scripts abaixo para rodar os diferentes conjuntos de testes:

```bash
# Executar todos os testes de integração
npm run test:all-integration

# Executar apenas testes básicos
npm run test:real

# Executar testes completos
npm run test:real:complete

# Executar testes de grupo
npm run test:groups

# Executar testes de WebSocket
npm run test:websocket

# Executar testes de integração abrangentes
npm run test:integration
```

## Testes e cobertura de endpoints

Os testes de integração cobrem os seguintes módulos e endpoints:

- **Instance**: conexão, QR code, logout
- **Chat**: verificação de números, mensagens lidas, arquivar chat
- **Message**: texto, mídia, localização, contato, reações
- **Group**: criar, atualizar, buscar, convidar membros
- **Profile**: atualização, foto de perfil
- **Proxy**: configuração e busca
- **Settings**: configurações globais
- **Call**: chamadas falsas
- **Webhook**: integração de eventos
- **WebSocket**: escuta de eventos em tempo real

## Solução de problemas

Se os testes falharem, verifique:

1. Conectividade com a API
2. Validade da chave de API
3. Existência da instância
4. Correto formato do número de telefone
5. ID de grupo válido (para testes de grupo)
6. Permissões adequadas na API

Use `npm run check:env` para verificar a configuração do ambiente.
