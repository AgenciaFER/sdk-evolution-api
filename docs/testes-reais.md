# Guia de Testes Reais - Evolution API SDK

Este guia explica como configurar e executar testes de integração com uma instância real da Evolution API utilizando o SDK.

## Requisitos

Para executar os testes de integração, você precisa:

1. Uma instância da Evolution API em execução
2. Acesso ao endpoint da API
3. Uma instância do WhatsApp conectada
4. Um número de telefone para testes (opcional)

## Passos para Configuração

### Método 1: Usando o Script de Configuração (Recomendado)

O SDK inclui um script de configuração que facilita o processo:

```bash
npm run setup:real-tests
```

Este script vai solicitar:
- URL da Evolution API (ex: https://api.example.com)
- Nome da instância do WhatsApp (ex: default)
- Número de telefone para teste (opcional)

O script vai criar/atualizar o arquivo de teste apropriado automaticamente.

### Método 2: Configuração Manual

Alternativa para configurar manualmente:

1. Crie um arquivo `.env` na raiz do projeto com os seguintes parâmetros:
   ```
   EVOLUTION_API_URL=https://sua-api.exemplo.com
   EVOLUTION_API_INSTANCE=nome-da-instancia
   TEST_PHONE=5511999999999
   TEST_SEND_MESSAGE=false
   TEST_GROUP=5511999999999-1111111@g.us
   ```

   Para ativar o envio de mensagens reais durante os testes, defina `TEST_SEND_MESSAGE=true`.
   O parâmetro `TEST_GROUP` é opcional e só é necessário para testes que envolvem grupos.

2. Execute os testes com os valores das variáveis de ambiente:
   ```bash
   EVOLUTION_API_URL=https://sua-api.exemplo.com EVOLUTION_API_INSTANCE=nome-da-instancia TEST_PHONE=5511999999999 npm run test:real
   ```

## Executando os Testes

Depois de configurar, execute os testes com:

```bash
npm run test:real
```

## Habilitando Testes de Envio de Mensagem

Por padrão, os testes que enviam mensagens reais estão desativados para evitar envios acidentais.

Para ativar:

1. Abra o arquivo `tests/integration/real-api-test.ts`
2. Localize os testes com `it.skip` (que estão pulados)
3. Altere para `it` para ativar o teste

Exemplo:
```typescript
// De:
it.skip('deve enviar mensagem de texto', async () => {
  // código do teste
});

// Para:
it('deve enviar mensagem de texto', async () => {
  // código do teste
});
```

## Notas Importantes

- **Cuidado ao enviar mensagens**: Certifique-se de que o número de teste é válido e que você tem permissão para enviar mensagens para ele.
- **Uso de recursos**: Os testes reais consomem recursos da API e podem gerar custos, dependendo de como sua instância da Evolution API está configurada.
- **Dados sensíveis**: Nunca cometa credenciais ou URLs reais no controle de versão.

## Módulos Testados

Os testes de integração cobrem os seguintes módulos:

- **Instance**: Verificação de estado de conexão
- **Message**: Envio de diferentes tipos de mensagem e listagem
- **Chat**: Verificação de números e chat
- **Label**: Criação, listagem e gerenciamento de labels
- **Integrations**: Verificação de webhooks e chatbots
- **Profile**: Informações de perfil

## Solução de Problemas

- **Erro de conexão**: Verifique se a URL da API está correta e acessível.
- **Instância não encontrada**: Confirme se o nome da instância está correto.
- **Falha na autenticação**: Se sua API requer autenticação, configure o token na inicialização do SDK.
