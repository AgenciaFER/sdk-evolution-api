/**
 * Testes de integração para o SDK Evolution API
 * 
 * NOTA: Esses testes exigem uma instância real da Evolution API
 * Para executar, configure as variáveis de ambiente:
 * 
 * - EVOLUTION_API_URL: URL da API (ex: https://api.example.com)
 * - EVOLUTION_API_INSTANCE: Nome da instância para testar
 * 
 * Ou ajuste as constantes abaixo para seus valores
 */

import { EvolutionAPI } from '../../src';

// Configurações para testes de integração
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.example.com';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || 'test-instance';

// Pular todos os testes se estamos rodando em ambiente de CI
const runIntegrationTests = process.env.CI !== 'true' && process.env.EVOLUTION_API_URL;

// Descritivo para os testes de integração
(runIntegrationTests ? describe : describe.skip)('Testes de integração', () => {
  let api: EvolutionAPI;

  beforeAll(() => {
    api = new EvolutionAPI({ baseUrl: API_URL });
    // Define a instância global em cada módulo
    api.instance.setInstance(INSTANCE_NAME);
    api.message.setInstance(INSTANCE_NAME);
    api.chat.setInstance(INSTANCE_NAME);
    api.group.setInstance(INSTANCE_NAME);
    api.profile.setInstance(INSTANCE_NAME);
  });

  describe('Instance Module', () => {
    it('deve verificar o estado de conexão', async () => {
      const response = await api.instance.getConnectionState();
      expect(response).toBeDefined();
      expect(response).toHaveProperty('state');
    });
  });

  describe('Chat Module', () => {
    it('deve verificar se um número é válido', async () => {
      // Substitua pelo número válido de teste
      const testNumber = '5511999999999';
      
      const response = await api.chat.checkNumber(testNumber);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('valid');
    });
  });

  describe('Message Module', () => {
    it('deve verificar a funcionalidade de mensagem sem enviar', async () => {
      // Não envia mensagem real, apenas verifica que o módulo está disponível
      expect(api.message).toBeDefined();
      expect(typeof api.message.sendText).toBe('function');
      
      // Se quisermos testar realmente o envio (descomente):
      // const response = await api.message.sendText({
      //   number: "123456789",
      //   options: { delay: 1200 },
      //   textMessage: { text: "Teste da API" }
      // });
      // expect(response).toBeDefined();
    });
  });
  
  describe('Group Module', () => {
    it('deve buscar todos os grupos', async () => {
      const response = await api.group.fetchAll();
      expect(response).toBeDefined();
      expect(response).toHaveProperty('groups');
      expect(Array.isArray(response.groups)).toBe(true);
    });
  });
  
  describe('Profile Module', () => {
    it('deve buscar informações do perfil', async () => {
      const response = await api.profile.fetchProfile();
      expect(response).toBeDefined();
      expect(response).toHaveProperty('id');
    });
  });
});
