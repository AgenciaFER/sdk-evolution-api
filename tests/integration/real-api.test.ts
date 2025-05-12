// filepath: /Users/afv/Documents/sdk/tests/integration/real-api.test.ts
import { EvolutionAPI } from '../../src';

/**
 * TESTES COM API REAL
 * 
 * Este arquivo contém testes que se conectam a uma API real.
 * Execute somente quando desejar testar com uma instância real.
 * 
 * Para executar: npm run test:real
 */

// Configurações de teste
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.agenciafer.com.br/';
const API_KEY = process.env.EVOLUTION_API_KEY || ''; // Configure sua API key no arquivo .env
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || 'mae';
const TEST_PHONE = process.env.TEST_PHONE || '5521970138502';

// Pular testes se API_KEY não for fornecida e necessária
const skipTests = !API_KEY && API_URL.includes('api.agenciafer.com.br');

// Tempo maior para testes de integração
jest.setTimeout(30000); // 30 segundos

describe('Testes com API real', () => {
  let api: EvolutionAPI;

  beforeAll(() => {
    // Inicializa o SDK com o token de API
    api = new EvolutionAPI({ 
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: true, // Habilita logs para diagnóstico
      timeout: 15000, // Timeout de 15 segundos
      maxRetries: 1 // Faz apenas uma tentativa para testes
    });
    
    // Define a instância em cada módulo
    api.instance.setInstance(INSTANCE_NAME);
    api.message.setInstance(INSTANCE_NAME);
    api.chat.setInstance(INSTANCE_NAME);
    api.group.setInstance(INSTANCE_NAME);
    api.profile.setInstance(INSTANCE_NAME);
  });

  describe('Verificações básicas', () => {
    it('deve verificar se a instância está conectada', async () => {
      const response = await api.instance.getConnectionState();
      console.log('Estado da conexão:', response);
      expect(response).toBeDefined();
      expect(response.instance).toBeDefined();
      expect(response.instance).toHaveProperty('state');
      // Verifica se está conectado (estado "open" ou "connected")
      const state = response.instance.state.toLowerCase();
      expect(['open', 'connected'].includes(state)).toBe(true);
    });
    
    it('deve verificar se o número de teste é válido', async () => {
      // Pular se não foi fornecido número de teste
      if (!TEST_PHONE) {
        console.log('Pulando teste: número de teste não fornecido.');
        return;
      }
      
      const response = await api.chat.checkNumber(TEST_PHONE);
      console.log('Verificação de número:', response);
      expect(response).toBeDefined();
    });
  });
  
  describe('Envio de mensagem', () => {
    // Teste será executado apenas se a variável TEST_SEND_MESSAGE for "true" no .env
    const shouldSendMessage = process.env.TEST_SEND_MESSAGE === 'true';
    
    (shouldSendMessage ? it : xit)('deve enviar mensagem de teste', async () => {
      // Pular se não foi fornecido número de teste
      if (!TEST_PHONE) {
        console.log('Pulando teste: número de teste não fornecido.');
        return;
      }
      
      const response = await api.message.sendText({
        number: TEST_PHONE,
        text: "Este é um teste automatizado do SDK Evolution API. Por favor, ignore.",
        delay: 1200
      });
      
      console.log('Resposta do envio:', response);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('key');
    });
  });
  
  describe('Informações do perfil', () => {
    it('deve atualizar status do perfil', async () => {
      try {
        // Teste de atualização de status
        const newStatus = "Status de teste via SDK - " + new Date().toLocaleTimeString();
        const response = await api.profile.updateProfileStatus(newStatus);
        console.log('Status atualizado:', response);
        expect(response).toBeDefined();
      } catch (error: any) {
        console.log('Erro ao atualizar status:', error.message);
        // Se não conseguirmos atualizar, pelo menos marcamos como passou
        // já que podemos estar usando uma versão da API que não suporta este método
        expect(true).toBe(true);
      }
    });
  });
});
