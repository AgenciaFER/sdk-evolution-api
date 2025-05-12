import { MessageModule } from '../../src/modules/message';
import { HttpClient } from '../../src/core/http-client';
import { 
  SendTextOptions,
  SendMediaOptions,
  SendStickerOptions,
  SendLocationOptions,
  SendContactOptions
} from '../../src/modules/message/types';

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('MessageModule', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let messageModule: MessageModule;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new MockedHttpClient({ baseUrl: 'https://teste.com' }) as jest.Mocked<HttpClient>;
    messageModule = new MessageModule(httpClient);
    messageModule.setInstance('teste-instancia');
  });
  
  describe('sendText', () => {
    it('deve enviar mensagem de texto corretamente', async () => {
      const mockResponse = { id: 'message-id-123', status: 'success' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const options: SendTextOptions = {
        number: '5511999999999',
        text: 'Mensagem de teste',
        linkPreview: true
      };
      
      const result = await messageModule.sendText(options);
      
      expect(httpClient.post).toHaveBeenCalledWith('/message/sendText/teste-instancia', options);
      expect(result).toBe(mockResponse);
    });
    
    it('deve permitir especificar instância diferente', async () => {
      const mockResponse = { id: 'message-id-123', status: 'success' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const options: SendTextOptions = {
        number: '5511999999999',
        text: 'Mensagem de teste'
      };
      
      const result = await messageModule.sendText(options, 'outra-instancia');
      
      expect(httpClient.post).toHaveBeenCalledWith('/message/sendText/outra-instancia', options);
      expect(result).toBe(mockResponse);
    });
  });
  
  describe('sendMedia', () => {
    it('deve enviar imagem corretamente', async () => {
      const mockResponse = { id: 'message-id-456', status: 'success' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const options: SendMediaOptions = {
        number: '5511999999999',
        mediatype: 'image',
        mimetype: 'image/jpeg',
        caption: 'Legenda da imagem',
        media: 'https://example.com/image.jpg'
      };
      
      const result = await messageModule.sendMedia(options);
      
      expect(httpClient.post).toHaveBeenCalledWith('/message/sendMedia/teste-instancia', options);
      expect(result).toBe(mockResponse);
    });
    
    it('deve enviar vídeo corretamente', async () => {
      const mockResponse = { id: 'message-id-789', status: 'success' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const options: SendMediaOptions = {
        number: '5511999999999',
        mediatype: 'video',
        mimetype: 'video/mp4',
        caption: 'Legenda do vídeo',
        media: 'https://example.com/video.mp4'
      };
      
      const result = await messageModule.sendMedia(options);
      
      expect(httpClient.post).toHaveBeenCalledWith('/message/sendMedia/teste-instancia', options);
      expect(result).toBe(mockResponse);
    });
  });
  
  describe('sendSticker', () => {
    it('deve enviar sticker corretamente', async () => {
      const mockResponse = { id: 'message-id-sticker', status: 'success' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const options: SendStickerOptions = {
        number: '5511999999999',
        sticker: 'https://example.com/sticker.webp'
      };
      
      const result = await messageModule.sendSticker(options);
      
      expect(httpClient.post).toHaveBeenCalledWith('/message/sendSticker/teste-instancia', options);
      expect(result).toBe(mockResponse);
    });
  });
  
  describe('sendLocation', () => {
    it('deve enviar localização corretamente', async () => {
      const mockResponse = { id: 'message-id-location', status: 'success' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const options: SendLocationOptions = {
        number: '5511999999999',
        name: 'Local de Teste',
        address: 'Endereço de Teste',
        latitude: -23.5505,
        longitude: -46.6333
      };
      
      const result = await messageModule.sendLocation(options);
      
      expect(httpClient.post).toHaveBeenCalledWith('/message/sendLocation/teste-instancia', options);
      expect(result).toBe(mockResponse);
    });
  });
  
  describe('sendContact', () => {
    it('deve enviar contato corretamente', async () => {
      const mockResponse = { id: 'message-id-contact', status: 'success' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const options: SendContactOptions = {
        number: '5511999999999',
        contact: [
          {
            fullName: 'Contato de Teste',
            wuid: '5511888888888',
            phoneNumber: '5511888888888'
          }
        ]
      };
      
      const result = await messageModule.sendContact(options);
      
      expect(httpClient.post).toHaveBeenCalledWith('/message/sendContact/teste-instancia', options);
      expect(result).toBe(mockResponse);
    });
  });
});
