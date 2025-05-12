/**
 * Configurações do cliente do SDK
 */
export interface EvolutionAPIConfig {
    /**
     * URL base da API (ex: "https://api.agenciafer.com.br")
     */
    baseUrl: string;
    /**
     * Chave de API global
     */
    apiKey?: string;
    /**
     * Tempo máximo de timeout para as requisições (em ms)
     * @default 30000
     */
    timeout?: number;
    /**
     * Habilitar logs detalhados
     * @default false
     */
    debug?: boolean;
    /**
     * Número máximo de tentativas para requisições que falharem
     * @default 3
     */
    maxRetries?: number;
    /**
     * Tempo de espera entre tentativas de retry (em ms)
     * @default 1000
     */
    retryDelay?: number;
}
/**
 * Classe de erro customizada para o SDK
 */
export declare class EvolutionAPIError extends Error {
    /**
     * Código de status HTTP
     */
    statusCode?: number;
    /**
     * Resposta da API
     */
    response?: any;
    /**
     * Endpoint chamado que gerou o erro
     */
    endpoint?: string;
    /**
     * Construtor para o erro da API
     */
    constructor(message: string, statusCode?: number, response?: any, endpoint?: string);
}
