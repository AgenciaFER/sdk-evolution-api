import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { EvolutionAPIConfig } from '../types';
/**
 * Cliente HTTP base para realizar requisições à API
 */
export declare class HttpClient {
    private client;
    private config;
    /**
     * Cria uma nova instância do cliente HTTP
     * @param config Configuração do cliente
     */
    constructor(config: EvolutionAPIConfig);
    /**
     * Configura interceptores para logging e tratamento de erros
     */
    private setupInterceptors;
    /**
     * Executa uma requisição HTTP com retry automático
     * @param config Configuração da requisição
     * @returns Resposta da API
     */
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    /**
     * Executa uma requisição GET
     * @param url URL do endpoint
     * @param params Parâmetros da query
     * @returns Resposta da API
     */
    get<T = any>(url: string, params?: any): Promise<T>;
    /**
     * Executa uma requisição POST
     * @param url URL do endpoint
     * @param data Dados do corpo da requisição
     * @returns Resposta da API
     */
    post<T = any>(url: string, data?: any): Promise<T>;
    /**
     * Executa uma requisição DELETE
     * @param url URL do endpoint
     * @param data Dados do corpo da requisição
     * @returns Resposta da API
     */
    delete<T = any>(url: string, data?: any): Promise<T>;
    /**
     * Executa uma requisição PUT
     * @param url URL do endpoint
     * @param data Dados do corpo da requisição
     * @returns Resposta da API
     */
    put<T = any>(url: string, data?: any): Promise<T>;
    /**
     * Executa uma requisição PATCH
     * @param url URL do endpoint
     * @param data Dados do corpo da requisição
     * @returns Resposta da API
     */
    patch<T = any>(url: string, data?: any): Promise<T>;
}
