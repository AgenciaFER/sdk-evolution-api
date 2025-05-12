import { ChatModule } from '../../src/modules/chat';
import { HttpClient } from '../../src/core/http-client';

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('ChatModule', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let chatModule: ChatModule;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new MockedHttpClient({ baseUrl: 'https://teste.com' }) as jest.Mocked<HttpClient>;
    chatModule = new ChatModule(httpClient);
    chatModule.setInstance('test-instance');
  });

  describe('checkNumber', () => {
    it('deve verificar número de WhatsApp corretamente', async () => {
      const mockResponse = { 
        valid: true, 
        numberExists: true,
        number: '5511999999999'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.checkNumber('5511999999999');
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/whatsappNumbers/test-instance', {
        numbers: ['5511999999999']
      });
      expect(result).toBe(mockResponse);
    });

    it('deve aceitar nome de instância personalizado', async () => {
      const mockResponse = { 
        valid: true, 
        numberExists: true,
        number: '5511999999999'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.checkNumber('5511999999999', 'custom-instance');
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/whatsappNumbers/custom-instance', {
        numbers: ['5511999999999']
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('readMessages', () => {
    it('deve marcar mensagens como lidas corretamente', async () => {
      const mockResponse = { status: true, message: 'Messages marked as read' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.readMessages('5511999999999@c.us');
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/readMessages/test-instance', {
        readMessages: ['5511999999999@c.us']
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('archiveChat', () => {
    it('deve arquivar um chat corretamente', async () => {
      const mockResponse = { status: true, message: 'Chat archived successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.archiveChat('5511999999999@c.us', true);
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/archive/test-instance', {
        chatId: '5511999999999@c.us',
        archive: true
      });
      expect(result).toBe(mockResponse);
    });

    it('deve desarquivar um chat corretamente', async () => {
      const mockResponse = { status: true, message: 'Chat unarchived successfully' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.archiveChat('5511999999999@c.us', false);
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/archive/test-instance', {
        chatId: '5511999999999@c.us',
        archive: false
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('markChatUnread', () => {
    it('deve marcar um chat como não lido corretamente', async () => {
      const mockResponse = { status: true, message: 'Chat marked as unread' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.markChatUnread('5511999999999@c.us');
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/markUnread/test-instance', {
        chatId: '5511999999999@c.us'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteMessage', () => {
    it('deve deletar uma mensagem para todos corretamente', async () => {
      const mockResponse = { status: true, message: 'Message deleted for everyone' };
      httpClient.delete.mockResolvedValue(mockResponse);
      
      const result = await chatModule.deleteMessage('5511999999999@c.us', 'MESSAGE_ID_123');
      
      expect(httpClient.delete).toHaveBeenCalledWith('/chat/message/test-instance', {
        chatId: '5511999999999@c.us',
        messageId: 'MESSAGE_ID_123',
        onlyMe: false
      });
      expect(result).toBe(mockResponse);
    });

    it('deve deletar uma mensagem apenas para mim corretamente', async () => {
      const mockResponse = { status: true, message: 'Message deleted for me' };
      httpClient.delete.mockResolvedValue(mockResponse);
      
      const result = await chatModule.deleteMessage('5511999999999@c.us', 'MESSAGE_ID_123', true);
      
      expect(httpClient.delete).toHaveBeenCalledWith('/chat/message/test-instance', {
        chatId: '5511999999999@c.us',
        messageId: 'MESSAGE_ID_123',
        onlyMe: true
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('fetchProfilePicture', () => {
    it('deve buscar a foto de perfil corretamente', async () => {
      const mockResponse = { 
        status: true, 
        profilePictureUrl: 'https://example.com/profile.jpg',
        base64: 'data:image/jpeg;base64,ABCDEF123456'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.fetchProfilePicture('5511999999999');
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/profilePicture/test-instance', {
        number: '5511999999999'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('getBase64FromMediaMessage', () => {
    it('deve obter mídia de uma mensagem em base64 corretamente', async () => {
      const mockResponse = { 
        status: true, 
        base64: 'data:image/jpeg;base64,ABCDEF123456',
        mimetype: 'image/jpeg'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await chatModule.getBase64FromMediaMessage('MESSAGE_ID_123');
      
      expect(httpClient.post).toHaveBeenCalledWith('/chat/getBase64FromMediaMessage/test-instance', {
        messageId: 'MESSAGE_ID_123'
      });
      expect(result).toBe(mockResponse);
    });
  });
});
