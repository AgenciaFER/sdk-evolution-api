import { EvolutionAPI } from '../../src';

// Configuração de ambiente para testes
const API_URL = process.env.EVOLUTION_API_URL || '';
const API_KEY = process.env.EVOLUTION_API_KEY || '';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || '';
const TEST_PHONE = process.env.TEST_PHONE || '';
const TEST_GROUP = process.env.TEST_GROUP || '';

// Verificar se as variáveis obrigatórias estão definidas
const MISSING_CONFIG = !API_URL || !API_KEY || !INSTANCE_NAME || !TEST_PHONE;

// Flag para habilitar CRUD completo de grupo
const SEND_MESSAGES_ENABLED = process.env.TEST_SEND_MESSAGE === 'true';
const GROUP_TESTS_ENABLED = !!TEST_GROUP;

// Usar describe ou describe.skip conforme configuração
const describeOrSkip = MISSING_CONFIG ? describe.skip : describe;
// Skip testes que necessitam de grupo se TEST_GROUP não estiver definido
const groupDescribe = (GROUP_TESTS_ENABLED ? describeOrSkip : describe.skip);

// Tempo maior para testes de integração
jest.setTimeout(30000); // 30 segundos

describe('Group API Integration Tests', () => {
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

  // Testes que não necessitam de grupo específico
  describeOrSkip('Group API - Basic Operations', () => {
    it('should fetch all groups', async () => {
      try {
        const result = await api.group.fetchAll();
        expect(result).toBeDefined();
        expect(result.groups).toBeDefined();
        expect(Array.isArray(result.groups)).toBe(true);

        console.log(`Grupos encontrados: ${result.groups.length}`);
        if (result.groups.length > 0) {
          // Mostrar o primeiro grupo como exemplo
          console.log('Exemplo de grupo:');
          console.log(`ID: ${result.groups[0].id}`);
          console.log(`Nome: ${result.groups[0].subject}`);
        } else {
          console.log('Nenhum grupo encontrado');
        }
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.fetchAll não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  // Testes que necessitam de grupo específico
  groupDescribe('Group API - Existing Group Operations', () => {
    it('should fetch group invite code', async () => {
      try {
        const result = await api.group.fetchInviteCode(TEST_GROUP);
        expect(result).toBeDefined();
        expect(result.inviteCode).toBeDefined();
        console.log(`Código de convite: ${result.inviteCode}`);
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.fetchInviteCode não disponível');
        } else {
          throw error;
        }
      }
    });

    it('should update group description', async () => {
      if (!SEND_MESSAGES_ENABLED) {
        console.log('⚠️ Teste pulado pois TEST_SEND_MESSAGE não está habilitado');
        return;
      }

      try {
        const description = `Grupo de teste SDK - ${new Date().toLocaleString()}`;
        const result = await api.group.updateDescription(TEST_GROUP, description);
        expect(result).toBeDefined();
        console.log('Descrição do grupo atualizada com sucesso');
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.updateDescription não disponível');
        } else {
          throw error;
        }
      }
    });
  });

  // Testes para criar e gerenciar um novo grupo
  (SEND_MESSAGES_ENABLED ? describeOrSkip : describe.skip)('Group API - Create New Group', () => {
    let newGroupId: string | null = null;

    it('should create a new group', async () => {
      try {
        const groupName = `Teste SDK ${new Date().toLocaleTimeString()}`;
        const participants = [TEST_PHONE]; // Adicionar o número de teste como participante
        
        const result = await api.group.createGroup(groupName, participants);
        expect(result).toBeDefined();
        expect(result.groupInfo).toBeDefined();
        expect(result.groupInfo?.id).toBeDefined();
        
        // Salvar o ID do novo grupo para testes subsequentes
        newGroupId = result.groupInfo?.id || null;
        console.log(`Grupo criado: ${groupName}`);
        console.log(`ID: ${newGroupId}`);
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.createGroup não disponível');
        } else {
          throw error;
        }
      }
    });

    it('should update group subject and description', async () => {
      // Pular se o grupo não foi criado
      if (!newGroupId) {
        console.log('⚠️ Teste pulado pois nenhum grupo foi criado');
        return;
      }

      try {
        // Atualizar nome do grupo
        const newSubject = `SDK Teste ${new Date().toLocaleTimeString()}`;
        const subjectResult = await api.group.updateSubject(newGroupId, newSubject);
        expect(subjectResult).toBeDefined();
        
        // Atualizar descrição do grupo
        const newDescription = `Grupo de teste criado pelo SDK em ${new Date().toLocaleString()}`;
        const descResult = await api.group.updateDescription(newGroupId, newDescription);
        expect(descResult).toBeDefined();
        
        console.log('Nome e descrição do grupo atualizados');
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoints group.updateSubject/updateDescription não disponível');
        } else {
          throw error;
        }
      }
    });

    it('should leave group at the end', async () => {
      // Pular se o grupo não foi criado
      if (!newGroupId) {
        console.log('⚠️ Teste pulado pois nenhum grupo foi criado');
        return;
      }

      try {
        const result = await api.group.leave(newGroupId);
        expect(result).toBeDefined();
        console.log('Saiu do grupo com sucesso');
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('⚠️ Endpoint group.leave não disponível');
        } else {
          throw error;
        }
      }
    });
  });
});
