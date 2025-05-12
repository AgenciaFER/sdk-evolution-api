import axios from 'axios';
import { HttpClient } from '../../src/core/http-client';
import { EvolutionAPIError } from '../../src/types';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HttpClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Configurar mock padrão para axios.create
    mockedAxios.create.mockReturnValue(mockedAxios);
  });

  it('deve criar uma instância com configurações padrão', () => {
    const client = new HttpClient({ baseUrl: 'https://api.exemplo.com' });
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://api.exemplo.com',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  });

  it('deve criar uma instância com configurações personalizadas', () => {
    const client = new HttpClient({
      baseUrl: 'https://api.exemplo.com',
      apiKey: 'minha-chave',
      timeout: 5000,
      debug: true,
    });
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://api.exemplo.com',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'minha-chave',
        },
      })
    );
  });

  it('deve executar método GET corretamente', async () => {
    const responseData = { success: true };
    mockedAxios.request.mockResolvedValueOnce({ data: responseData });

    const client = new HttpClient({ baseUrl: 'https://api.exemplo.com' });
    const result = await client.get('/endpoint');

    expect(mockedAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: '/endpoint',
      params: undefined,
    });
    expect(result).toEqual(responseData);
  });

  it('deve executar método POST corretamente', async () => {
    const responseData = { id: 1 };
    const requestData = { name: 'teste' };
    mockedAxios.request.mockResolvedValueOnce({ data: responseData });

    const client = new HttpClient({ baseUrl: 'https://api.exemplo.com' });
    const result = await client.post('/endpoint', requestData);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      method: 'POST',
      url: '/endpoint',
      data: requestData,
    });
    expect(result).toEqual(responseData);
  });

  it('deve lidar com erros corretamente', async () => {
    const errorResponse = {
      response: {
        status: 404,
        data: {
          message: 'Não encontrado',
        },
      },
      config: {
        url: '/endpoint',
      },
    };
    
    // Criar uma instância do erro personalizado para o mock
    const apiError = new EvolutionAPIError(
      'Não encontrado',
      404,
      errorResponse.response.data,
      '/endpoint'
    );
    
    mockedAxios.request.mockRejectedValueOnce(apiError);

    const client = new HttpClient({ baseUrl: 'https://api.exemplo.com' });
    
    let receivedError: any = null;
    
    try {
      await client.get('/endpoint');
      // Se chegar aqui, o teste falha
      expect('Código não deveria chegar aqui').toBe('Exceção esperada');
    } catch (error) {
      receivedError = error;
    }
    
    // Verificar se o erro foi capturado e é do tipo correto
    expect(receivedError).toBeInstanceOf(EvolutionAPIError);
    expect(receivedError.message).toBe('Não encontrado');
    expect(receivedError.statusCode).toBe(404);
    expect(receivedError.endpoint).toBe('/endpoint');
  });

  it('deve tentar novamente em caso de erro de rede', async () => {
    // Simular falha nas duas primeiras tentativas e sucesso na terceira
    const networkError = {
      message: 'Network Error',
      code: undefined,
      response: undefined,
    };
    const successResponse = { data: { success: true } };
    
    mockedAxios.request
      .mockRejectedValueOnce(networkError)
      .mockRejectedValueOnce(networkError)
      .mockResolvedValueOnce(successResponse);

    const client = new HttpClient({ 
      baseUrl: 'https://api.exemplo.com',
      maxRetries: 3,
      retryDelay: 10, // pequeno delay para testes
    });
    
    const result = await client.get('/endpoint');
    
    expect(mockedAxios.request).toHaveBeenCalledTimes(3);
    expect(result).toEqual(successResponse.data);
  });
});
