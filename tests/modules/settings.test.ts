import { SettingsModule } from '../../src/modules/settings';
import { HttpClient } from '../../src/core/http-client';
import { SettingsData } from '../../src/modules/settings/types';

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('SettingsModule', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let settingsModule: SettingsModule;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new MockedHttpClient({ baseUrl: 'https://teste.com' }) as jest.Mocked<HttpClient>;
    settingsModule = new SettingsModule(httpClient);
    settingsModule.setInstance('teste-instancia');
  });
  
  describe('set', () => {
    it('deve definir configurações corretamente', async () => {
      const mockResponse = { status: 'success', message: 'Settings updated' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const settings: SettingsData = {
        rejectCall: true,
        msgCall: 'Estou ocupado',
        groupsIgnore: false,
        alwaysOnline: true,
        readMessages: false,
        syncFullHistory: true
      };
      
      const result = await settingsModule.set(settings);
      
      expect(httpClient.post).toHaveBeenCalledWith('/settings/set/teste-instancia', settings);
      expect(result).toBe(mockResponse);
    });
    
    it('deve permitir especificar instância diferente', async () => {
      const mockResponse = { status: 'success', message: 'Settings updated' };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const settings: SettingsData = {
        rejectCall: true,
        msgCall: 'Estou ocupado'
      };
      
      const result = await settingsModule.set(settings, 'outra-instancia');
      
      expect(httpClient.post).toHaveBeenCalledWith('/settings/set/outra-instancia', settings);
      expect(result).toBe(mockResponse);
    });
  });
  
  describe('find', () => {
    it('deve obter configurações corretamente', async () => {
      const mockResponse: SettingsData = {
        rejectCall: true,
        msgCall: 'Estou ocupado',
        groupsIgnore: false,
        alwaysOnline: true,
        readMessages: false,
        syncFullHistory: true
      };
      httpClient.get.mockResolvedValue(mockResponse);
      
      const result = await settingsModule.find();
      
      expect(httpClient.get).toHaveBeenCalledWith('/settings/find/teste-instancia');
      expect(result).toBe(mockResponse);
    });
    
    it('deve permitir especificar instância diferente', async () => {
      const mockResponse: SettingsData = {
        rejectCall: true,
        msgCall: 'Estou ocupado'
      };
      httpClient.get.mockResolvedValue(mockResponse);
      
      const result = await settingsModule.find('outra-instancia');
      
      expect(httpClient.get).toHaveBeenCalledWith('/settings/find/outra-instancia');
      expect(result).toBe(mockResponse);
    });
  });
});
