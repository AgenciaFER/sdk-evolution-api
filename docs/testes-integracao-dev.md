# Documentação Técnica: Testes de Integração

Este documento descreve a estrutura dos testes de integração do SDK da Evolution API e fornece informações para desenvolvedores que desejam implementar novos testes.

## Estrutura dos Testes

O projeto implementa duas categorias principais de testes:

1. **Testes Unitários** (`tests/modules/`): Testam unidades individuais de código usando mocks.
2. **Testes de Integração** (`tests/integration/`): Testam a integração do SDK com a API real.

## Arquivos Principais

- **`tests/integration/real-api-test.ts`**: Testes de integração com instância real da API
- **`tests/integration/basic-integration.test.ts`**: Testes de integração básicos com suporte a variáveis de ambiente
- **`scripts/setup-real-tests.js`**: Script de configuração interativa para testes reais
- **`scripts/run-real-tests.js`**: Script para executar testes reais de forma interativa

## Configuração dos Testes de Integração

Os testes de integração podem ser configurados de duas maneiras:

### 1. Via Script Interativo

Execute o script de configuração:

```bash
npm run setup:real-tests
```

Este script irá:
- Solicitar a URL da API
- Solicitar o nome da instância
- Opcionalmente, solicitar um número de telefone para testes
- Criar/atualizar o arquivo `tests/integration/real-api-test.ts`
- Atualizar o `package.json` com o script de teste necessário

### 2. Via Variáveis de Ambiente

Alternativa para ambientes de CI/CD ou execuções automatizadas:

```bash
EVOLUTION_API_URL=https://sua-api.exemplo.com \
EVOLUTION_API_INSTANCE=nome-da-instancia \
TEST_PHONE=5511999999999 \
npm run test:real
```

## Estrutura do Arquivo de Teste

O arquivo `real-api-test.ts` segue esta estrutura:

```typescript
describe('Testes com API real', () => {
  let api: EvolutionAPI;

  // Inicialização da API antes dos testes
  beforeAll(() => {
    api = new EvolutionAPI({ baseUrl: API_URL });
    // Configuração dos módulos
  });

  // Grupos de testes por módulo
  describe('Módulo X', () => {
    it('deve realizar ação Y', async () => {
      // código do teste
    });
  });
});
```

## Implementando Novos Testes

Para adicionar novos testes de integração, siga estas diretrizes:

1. **Organize por módulos**: Adicione testes dentro do bloco `describe` correspondente ao módulo.

2. **Considere dependências**: Se um teste depende do resultado de outro teste, agrupe-os em uma sequência clara.

3. **Desative testes que enviam mensagens**: Use `it.skip` para testes que enviam mensagens reais para evitar spam acidental.

4. **Logs úteis**: Inclua logs informativos usando `console.log` para facilitar o diagnóstico.

5. **Tratamento de condições opcionais**: Verifique se os dados necessários estão disponíveis (ex: número de teste).

### Exemplo de adição de novo teste:

```typescript
describe('Módulo Message', () => {
  // Testes existentes
  
  // Novo teste
  it('deve verificar histórico de mensagens', async () => {
    const response = await api.message.getHistory({
      count: 10
    });
    
    console.log(`Histórico recuperado: ${response.length} mensagens`);
    expect(Array.isArray(response)).toBe(true);
  });
});
```

## Boas Práticas para Testes de Integração

1. **Isolamento**: Evite que testes dependam de estado criado por outros testes sempre que possível.

2. **Limpeza**: Se um teste cria dados (ex: uma label), inclua código para limpar após o teste.

3. **Timeouts**: Considere aumentar o timeout para testes que podem demorar:
   ```typescript
   it('teste com operação lenta', async () => {
     // código
   }, 30000); // 30 segundos
   ```

4. **Skip condicional**: Use verificações dentro do teste para pular condicionalmente:
   ```typescript
   it('teste condicional', async () => {
     if (!condicaoNecessaria) {
       console.log('Pulando teste: condição não atendida');
       return;
     }
     // resto do teste
   });
   ```

5. **Dados de teste**: Evite hardcoding de dados sensíveis. Use variáveis de ambiente ou arquivos de configuração.

## Solução de Problemas

- **API inacessível**: Verifique a URL e conexão com o servidor
- **Instância não conectada**: Verifique se a instância está ativa e autenticada
- **Erros de autenticação**: Verifique se sua API requer token e se foi configurado corretamente
- **Tempo limite excedido**: Aumente o timeout para testes específicos ou considere falhas de rede

## Convenções de Código

Conforme as boas práticas definidas para o projeto:

- Use TypeScript para tipagem forte
- Implemente tratamento de erros robusto em seus testes
- Documente cada caso de teste com descrições claras
- Mantenha compatibilidade com a estrutura existente
