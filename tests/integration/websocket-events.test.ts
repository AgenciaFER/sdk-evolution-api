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

// URL do WebSocket (usa URL da API por padrão, substituindo http/https por ws/wss)
const WS_URL = process.env.EVOLUTION_API_WS_URL || API_URL.replace(/^http/, 'ws');

// Usar describe ou describe.skip conforme configuração
const describeOrSkip = MISSING_CONFIG ? describe.skip : describe;
// Skip testes de WebSocket se envio de mensagens não estiver habilitado
const wsDescribe = (SEND_MESSAGES_ENABLED ? describeOrSkip : describe.skip);

// Tempo maior para testes de WebSocket
jest.setTimeout(30000); // 30 segundos

describe('WebSocket Integration Tests', () => {
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

  wsDescribe('WebSocket Event Handling', () => {
    it('should connect to WebSocket and receive events', (done) => {
      // Flag para controlar se o teste já foi finalizado
      let testFinished = false;
      
      // Função para evitar chamadas múltiplas de done()
      const safelyFinishTest = (success = true) => {
        if (!testFinished) {
          testFinished = true;
          success ? done() : done(new Error('Falha ao receber evento via WebSocket'));
        }
      };
      
      // Montar URL do WebSocket
      const wsUrl = `${WS_URL}`;
      console.log(`Conectando ao WebSocket: ${wsUrl}`);
      
      // Criar cliente WebSocket
      const ws = new WebSocket(wsUrl, {
        headers: {
          'apikey': API_KEY
        }
      });
      
      // Timeout para o teste
      const timeout = setTimeout(() => {
        console.error('❌ Timeout - Nenhum evento recebido no tempo esperado');
        ws.close();
        safelyFinishTest(false);
      }, 15000);
      
      // Handler para eventos de conexão
      ws.on('open', () => {
        console.log('✅ WebSocket conectado');
        
        // Enviar uma mensagem para gerar um evento
        setTimeout(() => {
          api.message.sendText({
            number: TEST_PHONE,
            text: `🔌 Teste de WebSocket - ${new Date().toLocaleTimeString()}`
          }).then(() => {
            console.log('✅ Mensagem enviada para gerar evento');
          }).catch(error => {
            console.error('❌ Erro ao enviar mensagem:', error);
            clearTimeout(timeout);
            ws.close();
            safelyFinishTest(false);
          });
        }, 1000);
      });
      
      // Handler para mensagens recebidas
      ws.on('message', (data) => {
        try {
          const event = JSON.parse(data.toString());
          console.log('✅ Evento recebido:', JSON.stringify(event, null, 2));
          
          // Verificar se o evento contém informações básicas
          if (event && event.instanceName === INSTANCE_NAME) {
            clearTimeout(timeout);
            ws.close();
            safelyFinishTest(true);
          }
        } catch (error) {
          console.error('❌ Erro ao processar evento:', error);
        }
      });
      
      // Handler para erros
      ws.on('error', (error) => {
        console.error('❌ Erro no WebSocket:', error);
        clearTimeout(timeout);
        safelyFinishTest(false);
      });
      
      // Handler para fechamento
      ws.on('close', () => {
        console.log('WebSocket desconectado');
        clearTimeout(timeout);
      });
    });
  });
});
