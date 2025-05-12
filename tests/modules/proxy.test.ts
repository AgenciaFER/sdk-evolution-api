import { ProxyModule } from '../../src/modules/proxy';
import { HttpClient } from '../../src/core/http-client';
import { ProxyConfig } from '../../src/modules/proxy/types';

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('ProxyModule', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let proxyModule: ProxyModule;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new MockedHttpClient({ baseUrl: 'https://teste.com' }) as jest.Mocked<HttpClient>;
    proxyModule = new ProxyModule(httpClient);
    proxyModule.setInstance('teste-instancia');
  });
  
  describe('set', () => {
    it('deve configurar o proxy corretamente', async () => {
      const mockResponse = { success: true, message: 'Proxy configurado com sucesso' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const proxyConfig: ProxyConfig = {
        enabled: true,
        host: 'proxy.example.com',
        port: '8080',
        protocol: 'http',
        username: 'user',
        password: 'pass'
      };
      
      const result = await proxyModule.set(proxyConfig);
      
      expect(httpClient.post).toHaveBeenCalledWith('/proxy/set/teste-instancia', proxyConfig);
      expect(result).toBe(mockResponse);
    });
    
    it('deve permitir especificar instância diferente', async () => {
      const mockResponse = { success: true, message: 'Proxy configurado com sucesso' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const proxyConfig: ProxyConfig = {
        enabled: true,
        host: 'proxy.example.com',
        port: '8080',
        protocol: 'http'
      };
      
      const result = await proxyModule.set(proxyConfig, 'outra-instancia');
      
      expect(httpClient.post).toHaveBeenCalledWith('/proxy/set/outra-instancia', proxyConfig);
      expect(result).toBe(mockResponse);
    });
  });
  
  describe('find', () => {
    it('deve obter as configurações de proxy corretamente', async () => {
      const mockResponse: ProxyConfig = {
        enabled: true,
        host: 'proxy.example.com',
        port: '8080',
        protocol: 'http',
        username: 'user'
      };
      httpClient.get.mockResolvedValue(mockResponse);
      
      const result = await proxyModule.find();
      
      expect(httpClient.get).toHaveBeenCalledWith('/proxy/find/teste-instancia');
      expect(result).toBe(mockResponse);
    });
    
    it('deve permitir especificar instância diferente', async () => {
      const mockResponse: ProxyConfig = {
        enabled: false,
        host: '',
        port: '',
        protocol: 'http'
      };
      httpClient.get.mockResolvedValue(mockResponse);
      
      const result = await proxyModule.find('outra-instancia');
      
      expect(httpClient.get).toHaveBeenCalledWith('/proxy/find/outra-instancia');
      expect(result).toBe(mockResponse);
    });
  });
});
