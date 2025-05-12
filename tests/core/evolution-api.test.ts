import { EvolutionAPI } from '../../src';
import { EvolutionAPIConfig } from '../../src/types';
import { HttpClient } from '../../src/core/http-client';
import { InstanceModule } from '../../src/modules/instance';
import { MessageModule } from '../../src/modules/message';

// Mock dos módulos
jest.mock('../../src/core/http-client');
jest.mock('../../src/modules/instance');
jest.mock('../../src/modules/message');

describe('EvolutionAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('deve criar uma instância com configuração básica', () => {
    const config: EvolutionAPIConfig = {
      baseUrl: 'https://api.exemplo.com'
    };
    
    const client = new EvolutionAPI(config);
    
    expect(HttpClient).toHaveBeenCalledWith(config);
    expect(InstanceModule).toHaveBeenCalled();
    expect(client.instance).toBeDefined();
    expect(client.message).toBeDefined();
    expect(client.chat).toBeDefined();
    expect(client.group).toBeDefined();
  });
  
  it('deve lançar erro se não for fornecida uma URL base', () => {
    expect(() => {
      // @ts-ignore para testar o caso inválido
      new EvolutionAPI({});
    }).toThrow('A URL base (baseUrl) é obrigatória');
  });
  
  it('deve remover barra no final da URL base', () => {
    const config: EvolutionAPIConfig = {
      baseUrl: 'https://api.exemplo.com/'
    };
    
    new EvolutionAPI(config);
    
    expect(HttpClient).toHaveBeenCalledWith({
      baseUrl: 'https://api.exemplo.com'
    });
  });
  
  it('deve definir instância para todos os módulos', () => {
    const config: EvolutionAPIConfig = {
      baseUrl: 'https://api.exemplo.com'
    };
    
    const client = new EvolutionAPI(config);
    
    const mockedInstanceModule = client.instance as jest.Mocked<InstanceModule>;
    const mockedMessageModule = client.message as jest.Mocked<MessageModule>;
    
    client.useInstance('teste-instancia');
    
    expect(mockedInstanceModule.setInstance).toHaveBeenCalledWith('teste-instancia');
    expect(mockedMessageModule.setInstance).toHaveBeenCalledWith('teste-instancia');
  });
});
