import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EvolutionAPIConfig, EvolutionAPIError } from '../types';

/**
 * Cliente HTTP base para realizar requisições à API
 */
export class HttpClient {
  private client: AxiosInstance;
  private config: EvolutionAPIConfig;
  
  /**
   * Cria uma nova instância do cliente HTTP
   * @param config Configuração do cliente
   */
  constructor(config: EvolutionAPIConfig) {
    this.config = {
      timeout: 30000,
      debug: false,
      maxRetries: 3,
      retryDelay: 1000,
      ...config,
    };
    
    // Criar instância do Axios com configurações básicas
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey ? { 'apikey': this.config.apiKey } : {}),
      },
    });
    
    // Adicionar interceptores de requisição e resposta
    this.setupInterceptors();
  }
  
  /**
   * Configura interceptores para logging e tratamento de erros
   */
  private setupInterceptors(): void {
    // Interceptor de requisição
    this.client.interceptors.request.use(
      (config) => {
        if (this.config.debug) {
          console.log(`[${config.method?.toUpperCase()}] ${config.url}`, config.data || '');
        }
        return config;
      },
      (error) => {
        if (this.config.debug) {
          console.error('Erro na requisição:', error);
        }
        return Promise.reject(error);
      }
    );
    
    // Interceptor de resposta
    this.client.interceptors.response.use(
      (response) => {
        if (this.config.debug) {
          console.log(`Resposta [${response.status}]:`, response.data);
        }
        return response;
      },
      async (error) => {
        if (this.config.debug) {
          console.error('Erro na resposta:', error.response?.data || error.message);
        }
        
        // Extrair informações do erro
        const status = error.response?.status;
        const data = error.response?.data;
        const url = error.config?.url;
        
        // Transformar em erro customizado
        const apiError = new EvolutionAPIError(
          data?.message || error.message || 'Erro desconhecido',
          status,
          data,
          url
        );
        
        return Promise.reject(apiError);
      }
    );
  }
  
  /**
   * Executa uma requisição HTTP com retry automático
   * @param config Configuração da requisição
   * @returns Resposta da API
   */
  async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    let retries = 0;
    let lastError: any;
    
    while (retries <= this.config.maxRetries!) {
      try {
        return await this.client.request<T>(config);
      } catch (error: any) {
        lastError = error;
        
        // Se for erro de rede ou timeout, tenta novamente
        const isNetworkError = !error.response && error.code !== 'ECONNABORTED';
        const isTimeoutError = error.code === 'ECONNABORTED';
        const isServerError = error.response?.status >= 500;
        
        if ((isNetworkError || isTimeoutError || isServerError) && retries < this.config.maxRetries!) {
          retries++;
          if (this.config.debug) {
            console.log(`Tentativa ${retries}/${this.config.maxRetries} para ${config.url}`);
          }
          
          // Aguardar antes de tentar novamente
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
          continue;
        }
        
        // Se chegou aqui, não vai mais tentar
        throw lastError;
      }
    }
    
    // Nunca deveria chegar aqui, mas TypeScript exige um retorno
    throw lastError;
  }
  
  /**
   * Executa uma requisição GET
   * @param url URL do endpoint
   * @param params Parâmetros da query
   * @returns Resposta da API
   */
  async get<T = any>(url: string, params?: any): Promise<T> {
    const response = await this.request<T>({
      method: 'GET',
      url,
      params,
    });
    return response.data;
  }
  
  /**
   * Executa uma requisição POST
   * @param url URL do endpoint
   * @param data Dados do corpo da requisição
   * @returns Resposta da API
   */
  async post<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.request<T>({
      method: 'POST',
      url,
      data,
    });
    return response.data;
  }
  
  /**
   * Executa uma requisição DELETE
   * @param url URL do endpoint
   * @param data Dados do corpo da requisição
   * @returns Resposta da API
   */
  async delete<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.request<T>({
      method: 'DELETE',
      url,
      data,
    });
    return response.data;
  }
  
  /**
   * Executa uma requisição PUT
   * @param url URL do endpoint
   * @param data Dados do corpo da requisição
   * @returns Resposta da API
   */
  async put<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.request<T>({
      method: 'PUT',
      url,
      data,
    });
    return response.data;
  }
  
  /**
   * Executa uma requisição PATCH
   * @param url URL do endpoint
   * @param data Dados do corpo da requisição
   * @returns Resposta da API
   */
  async patch<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.request<T>({
      method: 'PATCH',
      url,
      data,
    });
    return response.data;
  }
}
