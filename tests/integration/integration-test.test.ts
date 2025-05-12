import { EvolutionAPI } from '../../src';
import { ProxyConfig } from '../../src/modules/proxy/types';
import { SettingsData } from '../../src/modules/settings/types';
import * as path from 'path';
import * as fs from 'fs';

// Configuração de ambiente para testes
const API_URL = process.env.EVOLUTION_API_URL || '';
const API_KEY = process.env.EVOLUTION_API_KEY || '';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || '';
const TEST_PHONE = process.env.TEST_PHONE || '';
const TEST_GROUP = process.env.TEST_GROUP || '';

// Verificar se as variáveis obrigatórias estão definidas
const MISSING_CONFIG = !API_URL || !API_KEY || !INSTANCE_NAME || !TEST_PHONE;
if (MISSING_CONFIG) {
  console.warn('⚠️ Configurações de teste incompletas. Testes serão ignorados.');
}

// Flag para habilitar envio de mensagens nos testes
const SEND_MESSAGES_ENABLED = process.env.TEST_SEND_MESSAGE === 'true';

// Verifica se o grupo está definido para testes de grupo
const GROUP_TESTS_ENABLED = !!TEST_GROUP;
if (!GROUP_TESTS_ENABLED) {
  console.warn('\x1b[33m%s\x1b[0m', 'AVISO: TEST_GROUP não está definido. Os testes de grupo serão pulados.');
}

// Usar describe ou describe.skip conforme configuração
const describeOrSkip = MISSING_CONFIG ? describe.skip : describe;

// Tempo maior para testes de integração
jest.setTimeout(30000); // 30 segundos

// Diretório para arquivos de teste
const TEST_FILES_DIR = path.join(__dirname, '../../test-files');

// Instância do SDK
let api: EvolutionAPI;

beforeAll(() => {
  // Inicializa o SDK com o token de API
  api = new EvolutionAPI({ 
    baseUrl: API_URL,
    apiKey: API_KEY,
    debug: false
  });
  
  // Define a instância em todos os módulos de uma vez
  api.useInstance(INSTANCE_NAME);
});

// ==========================================================================
// TESTES DE PROXY API
// ==========================================================================
describe('Integration: Proxy API', () => {
  describeOrSkip('proxy.set', () => {
    it('should set proxy configuration', async () => {
      try {
        const proxyConfig: ProxyConfig = {
          enabled: false,
          host: '127.0.0.1', 
          port: '8080',
          protocol: 'http'
        };
        
        const result = await api.proxy.set(proxyConfig);
        expect(result).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint proxy.set não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  describeOrSkip('proxy.find', () => {
    it('should find proxy configuration', async () => {
      try {
        const result = await api.proxy.find();
        expect(result).toBeDefined();
        if (typeof result === 'object') {
          expect(Object.prototype.hasOwnProperty.call(result, 'enabled')).toBe(true);
        }
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint proxy.find não disponível');
        } else {
          throw error;
        }
      }
    });
  });
});

// ==========================================================================
// TESTES DE SETTINGS API
// ==========================================================================
describe('Integration: Settings API', () => {
  describeOrSkip('settings.set', () => {
    it('should set settings', async () => {
      try {
        const settings: SettingsData = {
          rejectCall: true,
          msgCall: 'Estou ocupado no momento, retorno em breve.',
          groupsIgnore: false,
          alwaysOnline: true,
          readMessages: true
        };
        
        const result = await api.settings.set(settings);
        expect(result).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint settings.set não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  describeOrSkip('settings.find', () => {
    it('should find settings', async () => {
      try {
        const settings = await api.settings.find();
        expect(settings).toBeDefined();
        if (typeof settings === 'object') {
          expect(['true', 'false', undefined].includes(String(settings.rejectCall))).toBe(true);
        }
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint settings.find não disponível');
        } else {
          throw error;
        }
      }
    });
  });
});

// ==========================================================================
// TESTES DE CALL API
// ==========================================================================
describe('Integration: Call API', () => {
  // Skip sempre que não estiver explicitamente permitido enviar mensagens
  (SEND_MESSAGES_ENABLED ? describeOrSkip : describe.skip)('call.fakeCall', () => {
    it('should perform fake call', async () => {
      try {
        const result = await api.call.fakeCall(TEST_PHONE, 'audio', { delay: 5000 });
        expect(result).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint call.fakeCall não disponível');
        } else {
          throw error;
        }
      }
    });
  });
});

// ==========================================================================
// TESTES DE CHAT EXTENDED FEATURES
// ==========================================================================
describe('Integration: Chat Extended Features', () => {
  describeOrSkip('chat.archiveChat', () => {
    it('should archive and unarchive chat', async () => {
      try {
        // Arquivar chat
        const archiveResult = await api.chat.archiveChat(TEST_PHONE + '@s.whatsapp.net', true);
        expect(archiveResult).toBeDefined();
        
        // Desarquivar chat
        const unarchiveResult = await api.chat.archiveChat(TEST_PHONE + '@s.whatsapp.net', false);
        expect(unarchiveResult).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint chat.archive não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  describeOrSkip('chat.markChatUnread', () => {
    it('should mark chat as unread', async () => {
      try {
        const result = await api.chat.markChatUnread(TEST_PHONE + '@s.whatsapp.net');
        expect(result).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint chat.markUnread não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  describeOrSkip('chat.fetchProfilePicture', () => {
    it('should fetch profile picture', async () => {
      try {
        const result = await api.chat.fetchProfilePicture(TEST_PHONE);
        expect(result).toBeDefined();
        if (result && typeof result === 'object') {
          expect(result.profilePictureUrl).toBeDefined();
        }
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint chat.profilePicture não disponível');
        } else {
          throw error;
        }
      }
    });
  });
});

// ==========================================================================
// TESTES DE GROUP API
// ==========================================================================
describe('Integration: Group API', () => {
  // Skip testes de grupo quando TEST_GROUP não estiver definido
  (GROUP_TESTS_ENABLED ? describeOrSkip : describe.skip)('group.fetchAll', () => {
    it('should fetch all groups', async () => {
      try {
        const result = await api.group.fetchAll();
        expect(result).toBeDefined();
        expect(Array.isArray(result.groups)).toBe(true);
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.fetchAll não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  // Skip testes de grupo quando TEST_GROUP não estiver definido
  (GROUP_TESTS_ENABLED ? describeOrSkip : describe.skip)('group.fetchInviteCode', () => {
    it('should fetch invite code', async () => {
      try {
        const result = await api.group.fetchInviteCode(TEST_GROUP);
        expect(result).toBeDefined();
        expect(result.inviteCode).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.inviteCode não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  // Skip testes de grupo quando TEST_GROUP não estiver definido ou não for permitido enviar mensagens
  ((GROUP_TESTS_ENABLED && SEND_MESSAGES_ENABLED) ? describeOrSkip : describe.skip)('group.updateDescription', () => {
    it('should update group description', async () => {
      try {
        const description = `Grupo de teste - ${new Date().toISOString()}`;
        const result = await api.group.updateDescription(TEST_GROUP, description);
        expect(result).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.description não disponível');
        } else {
          throw error;
        }
      }
    });
  });
});

// ==========================================================================
// TESTES DE INTEGRATIONS
// ==========================================================================
describe('Integration: Webhook', () => {
  describeOrSkip('integrations.setWebhook', () => {
    it('should set webhook', async () => {
      const webhookUrl = 'https://webhook.site/test-webhook';
      try {
        const result = await api.integrations.setWebhook(
          webhookUrl,
          ['message', 'group-update'],
          { enabled: false } // Não ativar para teste
        );
        expect(result).toBeDefined();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint webhook.set não disponível');
        } else {
          throw error;
        }
      }
    });
  });
});

// Módulos específicos para cobrir todas as rotas conforme coleção Postman
// v2.2.2, incluindo os rotas de todos os módulos

// ==========================================================================
// TESTES DE SEND MESSAGE VARIANTS
// ==========================================================================

// Skip testes de envio quando não permitido
(SEND_MESSAGES_ENABLED ? describeOrSkip : describe.skip)('Integration: Send Message Variants', () => {
  it('should send text message', async () => {
    try {
      const result = await api.message.sendText({
        number: TEST_PHONE,
        text: `Teste de mensagem de texto - ${new Date().toLocaleTimeString()}`
      });
      expect(result).toBeDefined();
      expect(result.key).toBeDefined();
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  });

  it('should send location message', async () => {
    try {
      const result = await api.message.sendLocation({
        number: TEST_PHONE,
        name: 'Evolution API HQ',
        address: 'Av. Paulista, 1000',
        latitude: -23.5505,
        longitude: -46.6333
      });
      expect(result).toBeDefined();
      expect(result.key).toBeDefined();
    } catch (error: any) {
      if (error.status === 400 && error.message.includes('not implemented')) {
        console.warn('⚠️ Mensagem de localização não implementada na API');
      } else {
        throw error;
      }
    }
  });

  it('should send media message', async () => {
    try {
      // Lê um arquivo de teste
      const file = path.join(TEST_FILES_DIR, 'test.jpg');
      if (!fs.existsSync(file)) {
        throw new Error('Arquivo de teste não encontrado: ' + file);
      }

      const base64 = fs.readFileSync(file).toString('base64');
      const result = await api.message.sendMedia({
        number: TEST_PHONE,
        mediatype: 'image',
        mimetype: 'image/jpeg',
        caption: 'Teste de imagem',
        media: `data:image/jpeg;base64,${base64}`
      });
      expect(result).toBeDefined();
      expect(result.key).toBeDefined();
    } catch (error: any) {
      console.error('Erro ao enviar mídia:', error);
      throw error;
    }
  });

  it('should send contact message', async () => {
    try {
      const result = await api.message.sendContact({
        number: TEST_PHONE,
        contact: [{
          fullName: 'Contato de Teste',
          wuid: '5511999999999@s.whatsapp.net',
          phoneNumber: '+55 11 99999-9999'
        }]
      });
      expect(result).toBeDefined();
      expect(result.key).toBeDefined();
    } catch (error: any) {
      if (error.status === 400 && error.message.includes('not implemented')) {
        console.warn('⚠️ Mensagem de contato não implementada na API');
      } else {
        throw error;
      }
    }
  });
});
