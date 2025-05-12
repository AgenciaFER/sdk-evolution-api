import { InstanceModule } from '../../src/modules/instance';
import { HttpClient } from '../../src/core/http-client';
import { CreateInstanceOptions } from '../../src/modules/instance/types';

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('InstanceModule', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let instanceModule: InstanceModule;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new MockedHttpClient({ baseUrl: 'https://teste.com' }) as jest.Mocked<HttpClient>;
    instanceModule = new InstanceModule(httpClient);
  });

  it('deve criar uma nova instância corretamente', async () => {
    const mockResponse = { instanceName: 'teste', status: 'created' };
    httpClient.post.mockResolvedValue(mockResponse);
    
    const options: CreateInstanceOptions = {
      instanceName: 'teste',
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS',
    };
    
    const result = await instanceModule.create(options);
    
    expect(httpClient.post).toHaveBeenCalledWith('/instance/create', options);
    expect(result).toBe(mockResponse);
  });
  
  it('deve obter todas as instâncias', async () => {
    const mockResponse = [{ instanceName: 'teste1' }, { instanceName: 'teste2' }];
    httpClient.get.mockResolvedValue(mockResponse);
    
    const result = await instanceModule.fetchInstances();
    
    expect(httpClient.get).toHaveBeenCalledWith('/instance/fetchInstances');
    expect(result).toBe(mockResponse);
  });
  
  it('deve conectar a uma instância específica', async () => {
    const mockResponse = { status: 'connected' };
    httpClient.get.mockResolvedValue(mockResponse);
    
    instanceModule.setInstance('teste-instancia');
    const result = await instanceModule.connect();
    
    expect(httpClient.get).toHaveBeenCalledWith('/instance/connect/teste-instancia');
    expect(result).toBe(mockResponse);
  });
  
  it('deve permitir conectar a uma instância diferente', async () => {
    const mockResponse = { status: 'connected' };
    httpClient.get.mockResolvedValue(mockResponse);
    
    instanceModule.setInstance('teste-instancia');
    const result = await instanceModule.connect('outra-instancia');
    
    expect(httpClient.get).toHaveBeenCalledWith('/instance/connect/outra-instancia');
    expect(result).toBe(mockResponse);
  });
  
  it('deve reiniciar uma instância', async () => {
    const mockResponse = { status: 'restarted' };
    httpClient.post.mockResolvedValue(mockResponse);
    
    instanceModule.setInstance('teste-instancia');
    const result = await instanceModule.restart();
    
    expect(httpClient.post).toHaveBeenCalledWith('/instance/restart/teste-instancia');
    expect(result).toBe(mockResponse);
  });
  
  it('deve definir o status de presença', async () => {
    const mockResponse = { status: 'success' };
    httpClient.post.mockResolvedValue(mockResponse);
    
    instanceModule.setInstance('teste-instancia');
    const result = await instanceModule.setPresence({ presence: 'available' });
    
    expect(httpClient.post).toHaveBeenCalledWith(
      '/instance/setPresence/teste-instancia', 
      { presence: 'available' }
    );
    expect(result).toBe(mockResponse);
  });
  
  it('deve obter o status de conexão', async () => {
    const mockResponse = { state: 'open' };
    httpClient.get.mockResolvedValue(mockResponse);
    
    instanceModule.setInstance('teste-instancia');
    const result = await instanceModule.getConnectionState();
    
    expect(httpClient.get).toHaveBeenCalledWith('/instance/connectionState/teste-instancia');
    expect(result).toBe(mockResponse);
  });
  
  it('deve fazer logout de uma instância', async () => {
    const mockResponse = { status: 'success' };
    httpClient.delete.mockResolvedValue(mockResponse);
    
    instanceModule.setInstance('teste-instancia');
    const result = await instanceModule.logout();
    
    expect(httpClient.delete).toHaveBeenCalledWith('/instance/logout/teste-instancia');
    expect(result).toBe(mockResponse);
  });
  
  it('deve excluir uma instância', async () => {
    const mockResponse = { status: 'success' };
    httpClient.delete.mockResolvedValue(mockResponse);
    
    instanceModule.setInstance('teste-instancia');
    const result = await instanceModule.delete();
    
    expect(httpClient.delete).toHaveBeenCalledWith('/instance/delete/teste-instancia');
    expect(result).toBe(mockResponse);
  });
});
