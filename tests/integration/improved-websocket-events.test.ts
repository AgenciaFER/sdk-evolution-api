import { EvolutionAPI } from '../../src';
import WebSocket from 'ws';

// Configuração de ambiente para testes
const API_URL = process.env.EVOLUTION_API_URL || '';
const API_KEY = process.env.EVOLUTION_API_KEY || '';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || '';
const TEST_PHONE = process.env.TEST_PHONE || '';

// Verificar se as variáveis obrigatórias estão definidas
const MISSING_CONFIG = !API_URL || !API_KEY || !INSTANCE_NAME || !TEST_PHONE;
if (MISSING_CONFIG) {
  console.warn('⚠️ Configurações de teste incompletas. Testes serão ignorados.');
}

// Flag para habilitar envio de mensagens nos testes
const SEND_MESSAGES_ENABLED = process.env.TEST_SEND_MESSAGE === 'true';

// Possíveis URLs de WebSocket para testar
const possibleWsUrls = [
  process.env.EVOLUTION_API_WS_URL,                         // URL explícita de WS
  process.env.EVOLUTION_API_URL?.replace(/^http/, 'ws'),    // URL com http->ws
  `${process.env.EVOLUTION_API_URL?.replace(/^http/, 'ws')}/ws`,  // URL com /ws no final
  `${process.env.EVOLUTION_API_URL?.replace(/^http/, 'ws')}/v1`   // URL com /v1 (versão da API)
].filter(Boolean) as string[];

// Usar describe ou describe.skip conforme configuração
const describeOrSkip = MISSING_CONFIG ? describe.skip : describe;
// Skip testes de WebSocket se envio de mensagens não estiver habilitado
const wsDescribe = (SEND_MESSAGES_ENABLED ? describeOrSkip : describe.skip);

// Tempo maior para testes de WebSocket
jest.setTimeout(30000); // 30 segundos

/**
 * Tenta conectar em diferentes URLs de WebSocket até encontrar uma que funcione
 */
async function tryConnectToWebsocket(urls: string[], apiKey: string, timeoutMs = 5000): Promise<{
  ws: WebSocket | null,
  workingUrl: string | null
}> {
  // Testaremos cada URL
  for (const url of urls) {
    console.log(`Tentando conectar ao WebSocket: ${url}`);
    
    try {
      // Criar uma promessa que será resolvida quando a conexão for estabelecida ou falhar
      const connectionResult = await new Promise<{success: boolean, ws: WebSocket | null}>((resolve) => {
        const ws = new WebSocket(url, {
          headers: {
            'apikey': apiKey
          }
        });

        // Timeout para esta tentativa específica
        const timeout = setTimeout(() => {
          ws.close();
          resolve({ success: false, ws: null });
        }, timeoutMs);

        // Se conectar com sucesso
        ws.on('open', () => {
          clearTimeout(timeout);
          resolve({ success: true, ws });
        });

        // Se falhar na conexão
        ws.on('error', () => {
          clearTimeout(timeout);
          ws.close();
          resolve({ success: false, ws: null });
        });
      });

      if (connectionResult.success) {
        console.log(`✅ Conexão bem-sucedida em: ${url}`);
        return { ws: connectionResult.ws, workingUrl: url };
      }
    } catch (error) {
      console.log(`❌ Falha ao conectar em: ${url}`, error);
    }
  }

  return { ws: null, workingUrl: null };
}

describe('WebSocket Integration Tests (Improved)', () => {
  let api: EvolutionAPI;

  beforeAll(() => {
    // Inicializa o SDK com o token de API
    api = new EvolutionAPI({ 
      baseUrl: API_URL,
      apiKey: API_KEY,
    });
    
    // Define a instância em todos os módulos
    api.useInstance(INSTANCE_NAME);
  });

  wsDescribe('WebSocket Event Handling with Multiple URL Testing', () => {
    it('should connect to WebSocket using one of the available URLs', async () => {
      // Busca uma conexão WebSocket que funciona
      const { ws, workingUrl } = await tryConnectToWebsocket(possibleWsUrls, API_KEY);
      
      // Se nenhuma URL funcionou, falhar o teste
      if (!ws || !workingUrl) {
        console.error('❌ Não foi possível conectar a nenhuma das URLs de WebSocket testadas');
        expect(workingUrl).not.toBeNull();
        return;
      }

      // Se chegamos aqui, temos uma conexão WebSocket funcionando
      console.log(`✅ Conexão WebSocket estabelecida em: ${workingUrl}`);
      
      // Aguardar pela recepção de eventos
      const eventReceived = await new Promise<boolean>((resolve) => {
        // Timeout para o teste
        const timeout = setTimeout(() => {
          console.error('❌ Timeout - Nenhum evento recebido no tempo esperado');
          ws.close();
          resolve(false);
        }, 15000);

        // Enviar uma mensagem para gerar um evento
        setTimeout(() => {
          api.message.sendText({
            number: TEST_PHONE,
            text: `🔌 Teste de WebSocket (URL: ${workingUrl}) - ${new Date().toLocaleTimeString()}`
          }).then(() => {
            console.log('✅ Mensagem enviada para gerar evento');
          }).catch(error => {
            console.error('❌ Erro ao enviar mensagem:', error);
            clearTimeout(timeout);
            ws.close();
            resolve(false);
          });
        }, 1000);

        // Handler para mensagens recebidas
        ws.on('message', (data) => {
          try {
            const event = JSON.parse(data.toString());
            console.log('✅ Evento recebido:', JSON.stringify(event, null, 2));
            
            // Verificar se o evento contém informações básicas
            if (event && event.instanceName === INSTANCE_NAME) {
              clearTimeout(timeout);
              ws.close();
              resolve(true);
            }
          } catch (error) {
            console.error('❌ Erro ao processar evento:', error);
          }
        });

        // Handler para erros
        ws.on('error', (error) => {
          console.error('❌ Erro no WebSocket:', error);
          clearTimeout(timeout);
          resolve(false);
        });
        
        // Handler para fechamento
        ws.on('close', () => {
          console.log('WebSocket desconectado');
          clearTimeout(timeout);
        });
      });

      // Verificação final
      expect(eventReceived).toBe(true);
    });
  });
});
