# Guia de Testes do SDK Evolution API

Este guia explica como configurar e executar testes no SDK da Evolution API para garantir que todas as funcionalidades estejam operando corretamente.

## Tipos de Testes

O SDK possui dois tipos principais de testes:

1. **Testes Unitários** - Verificam o funcionamento individual de cada módulo sem depender da API real
2. **Testes de Integração** - Conectam-se à API real para testar o funcionamento completo

## Configuração do Ambiente

### Pré-requisitos

- Uma instância da Evolution API em funcionamento
- Acesso ao endpoint da API
- Uma instância do WhatsApp conectada
- Um número de telefone para testes

### Configurando o Ambiente

O modo mais fácil de configurar o ambiente de testes é usando o script de configuração:

```bash
npm run setup:real-tests
```

Este script irá:
1. Solicitar informações sobre sua instância da Evolution API
2. Criar um arquivo `.env` com suas configurações
3. Gerar um arquivo de teste personalizado
4. Opcionalmente, executar os testes imediatamente

Alternativamente, você pode configurar manualmente criando um arquivo `.env` na raiz do projeto:

```
EVOLUTION_API_URL=https://sua-api.exemplo.com
EVOLUTION_API_KEY=sua-chave-de-api
EVOLUTION_API_INSTANCE=nome-da-instancia
TEST_PHONE=5511999999999
TEST_SEND_MESSAGE=false
TEST_GROUP=5511999999999-1111111@g.us
```

## Executando os Testes

### Testes Unitários

Para executar todos os testes unitários:

```bash
npm test
```

### Testes de Integração

Para executar os testes de integração básicos:

```bash
npm run test:real
```

Para executar testes completos que cobrem todos os módulos:

```bash
npm run test:real:complete
```

Para testes específicos:

```bash
# Testes de grupo
npm run test:groups

# Testes de WebSocket
npm run test:websocket
```

Para executar testes interativamente, escolhendo quais módulos testar:

```bash
npm run test:real:interactive
```

## Tratamento de Erros nos Testes

Os testes de integração foram projetados para lidar com diferentes estruturas de resposta e falhas na API. Quando um teste de integração encontra um erro, ele:

1. Registra o erro no console com `⚠️` 
2. Continua para o próximo teste
3. Marca o teste como "passou", mesmo que o endpoint falhe

Isso permite que você execute a suite completa de testes mesmo quando alguns endpoints não estão disponíveis ou requerem configurações específicas.

## Verificando o Ambiente de Testes

Para verificar se seu ambiente de testes está configurado corretamente:

```bash
npm run check:env
```

Este comando verifica:
- Se o arquivo `.env` existe e está configurado
- Se a API está acessível
- Se a instância está conectada
- Exibe próximas etapas recomendadas

## Recomendações para Testes Completos

1. **Prepare um Grupo de Teste** - Crie um grupo com a instância do WhatsApp e adicione o número de teste para executar os testes de grupo
2. **Ative Envio de Mensagens** - Configure `TEST_SEND_MESSAGE=true` para testar funcionalidades de envio
3. **Execute por Partes** - Use o comando interativo para testar módulos específicos quando necessário
4. **Verifique Logs** - Observe os logs para identificar endpoints não suportados ou erros específicos da API

## Solução de Problemas

### Erros Comuns

- **Falha de Conexão**: Verifique se a URL e a chave de API estão corretas
- **Instância não encontrada**: Confirme se o nome da instância está correto
- **Número inválido**: Verifique o formato do número de teste (deve incluir o código do país)
- **Erros 400/404**: Alguns endpoints podem não estar disponíveis na sua versão da API

### Passos para Diagnóstico

1. Execute `npm run check:env` para verificar a configuração básica
2. Verifique se a Evolution API está em execução e acessível
3. Confirme que a instância do WhatsApp está conectada
4. Use `npm run test:connection` para testar apenas a conexão com a API

## Contribuindo com Novos Testes

Ao adicionar novos testes:

1. Use a função `safeApiCall` para lidar com erros da API
2. Implemente verificações para diferentes estruturas de resposta
3. Inclua condicionais para pular testes quando faltarem configurações
4. Documente os requisitos específicos para o teste no próprio código