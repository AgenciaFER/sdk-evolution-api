import { GroupModule } from '../../src/modules/group';
import { HttpClient } from '../../src/core/http-client';
import { GroupInfo, GroupResponse } from '../../src/modules/group';

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('GroupModule', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let groupModule: GroupModule;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new MockedHttpClient({ baseUrl: 'https://teste.com' }) as jest.Mocked<HttpClient>;
    groupModule = new GroupModule(httpClient);
    groupModule.setInstance('test-instance');
  });

  describe('createGroup', () => {
    it('deve criar um novo grupo corretamente', async () => {
      const mockResponse: GroupResponse = { 
        status: true, 
        message: 'Group created successfully', 
        groupInfo: {
          id: '123456789@g.us',
          subject: 'Test Group'
        }
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.createGroup('Test Group', ['5511999999999', '5511888888888']);
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/create/test-instance', {
        name: 'Test Group',
        participants: ['5511999999999', '5511888888888']
      });
      expect(result).toBe(mockResponse);
    });

    it('deve aceitar um nome de instância personalizado', async () => {
      const mockResponse: GroupResponse = { 
        status: true, 
        message: 'Group created successfully', 
        groupInfo: {
          id: '123456789@g.us',
          subject: 'Test Group'
        }
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.createGroup('Test Group', ['5511999999999'], 'custom-instance');
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/create/custom-instance', {
        name: 'Test Group',
        participants: ['5511999999999']
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('updatePicture', () => {
    it('deve atualizar a foto de um grupo corretamente', async () => {
      const mockResponse: GroupResponse = { 
        status: true, 
        message: 'Group picture updated successfully' 
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.updatePicture('123456789@g.us', 'https://example.com/image.jpg');
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/pic/test-instance', {
        groupId: '123456789@g.us',
        image: 'https://example.com/image.jpg'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateSubject', () => {
    it('deve atualizar o nome de um grupo corretamente', async () => {
      const mockResponse = { status: true, message: 'Group subject updated successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.updateSubject('123456789@g.us', 'New Group Name');
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/subject/test-instance', {
        groupId: '123456789@g.us',
        subject: 'New Group Name'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateDescription', () => {
    it('deve atualizar a descrição de um grupo corretamente', async () => {
      const mockResponse = { status: true, message: 'Group description updated successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.updateDescription('123456789@g.us', 'This is a new description');
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/description/test-instance', {
        groupId: '123456789@g.us',
        description: 'This is a new description'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('fetchInviteCode', () => {
    it('deve obter o código de convite de um grupo corretamente', async () => {
      const mockResponse = { status: true, code: 'abcdefgh' };
      httpClient.get.mockResolvedValue(mockResponse);
      
      const result = await groupModule.fetchInviteCode('123456789@g.us');
      
      expect(httpClient.get).toHaveBeenCalledWith('/group/inviteCode/test-instance?id=123456789%40g.us');
      expect(result).toBe(mockResponse);
    });
  });

  describe('revokeInviteCode', () => {
    it('deve revogar o código de convite de um grupo corretamente', async () => {
      const mockResponse = { status: true, code: 'newcode123' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.revokeInviteCode('123456789@g.us');
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/revokeInviteCode/test-instance', {
        groupId: '123456789@g.us'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('fetchAll', () => {
    it('deve obter todos os grupos corretamente', async () => {
      const mockGroups: GroupInfo[] = [
        { id: '123456789@g.us', subject: 'Group 1' },
        { id: '987654321@g.us', subject: 'Group 2' }
      ];
      const mockResponse = { groups: mockGroups };
      httpClient.get.mockResolvedValue(mockResponse);
      
      const result = await groupModule.fetchAll();
      
      expect(httpClient.get).toHaveBeenCalledWith('/group/fetchAllGroups/test-instance');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateParticipant', () => {
    it('deve adicionar participantes a um grupo corretamente', async () => {
      const mockResponse = { status: true, message: 'Participants added successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.updateParticipant(
        '123456789@g.us', 
        'add', 
        ['5511999999999', '5511888888888']
      );
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/updateParticipant/test-instance', {
        groupId: '123456789@g.us',
        action: 'add',
        participants: ['5511999999999', '5511888888888']
      });
      expect(result).toBe(mockResponse);
    });

    it('deve remover participantes de um grupo corretamente', async () => {
      const mockResponse = { status: true, message: 'Participants removed successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.updateParticipant(
        '123456789@g.us', 
        'remove', 
        ['5511999999999']
      );
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/updateParticipant/test-instance', {
        groupId: '123456789@g.us',
        action: 'remove',
        participants: ['5511999999999']
      });
      expect(result).toBe(mockResponse);
    });

    it('deve promover participantes em um grupo corretamente', async () => {
      const mockResponse = { status: true, message: 'Participants promoted successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.updateParticipant(
        '123456789@g.us', 
        'promote', 
        ['5511999999999']
      );
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/updateParticipant/test-instance', {
        groupId: '123456789@g.us',
        action: 'promote',
        participants: ['5511999999999']
      });
      expect(result).toBe(mockResponse);
    });

    it('deve rebaixar participantes em um grupo corretamente', async () => {
      const mockResponse = { status: true, message: 'Participants demoted successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await groupModule.updateParticipant(
        '123456789@g.us', 
        'demote', 
        ['5511999999999']
      );
      
      expect(httpClient.post).toHaveBeenCalledWith('/group/updateParticipant/test-instance', {
        groupId: '123456789@g.us',
        action: 'demote',
        participants: ['5511999999999']
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('leave', () => {
    it('deve sair de um grupo corretamente', async () => {
      const mockResponse = { status: true, message: 'Left group successfully' };
      httpClient.delete.mockResolvedValue(mockResponse);
      
      const result = await groupModule.leave('123456789@g.us');
      
      expect(httpClient.delete).toHaveBeenCalledWith('/group/leave/test-instance?id=123456789%40g.us');
      expect(result).toBe(mockResponse);
    });
  });
});
