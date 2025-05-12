import { HttpClient } from '../../src/core/http-client';
import { BaseModule } from '../../src/core/base-module';
import { EvolutionAPIError } from '../../src/types';

// Implementação concreta de BaseModule para testes
class TestModule extends BaseModule {
  public testMethod(): string {
    return `Método de teste para instância: ${this.getInstance()}`;
  }
}

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('BaseModule', () => {
  let httpClient: HttpClient;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new HttpClient({ baseUrl: 'https://teste.com' });
  });
  
  it('deve armazenar a referência para o cliente HTTP', () => {
    const module = new TestModule(httpClient);
    expect(module['http']).toBe(httpClient);
  });
  
  it('deve permitir definir a instância', () => {
    const module = new TestModule(httpClient);
    module.setInstance('teste-instancia');
    expect(module['instance']).toBe('teste-instancia');
  });
  
  it('deve permitir definir a instância em cadeia', () => {
    const module = new TestModule(httpClient);
    const result = module.setInstance('teste-instancia');
    expect(result).toBe(module);
  });
  
  it('deve lançar erro ao tentar obter instância não definida', () => {
    const module = new TestModule(httpClient);
    expect(() => module.getInstance()).toThrow(EvolutionAPIError);
    expect(() => module.getInstance()).toThrow('Instância não definida');
  });
  
  it('deve retornar corretamente a instância definida', () => {
    const module = new TestModule(httpClient);
    module.setInstance('teste-instancia');
    expect(module.getInstance()).toBe('teste-instancia');
  });
  
  it('deve verificar corretamente se a instância está definida', () => {
    const module = new TestModule(httpClient);
    expect(module.hasInstance()).toBe(false);
    
    module.setInstance('teste-instancia');
    expect(module.hasInstance()).toBe(true);
  });
  
  it('deve usar a instância nas chamadas de método', () => {
    const module = new TestModule(httpClient);
    module.setInstance('teste-instancia');
    
    expect(module.testMethod()).toBe('Método de teste para instância: teste-instancia');
  });
});
