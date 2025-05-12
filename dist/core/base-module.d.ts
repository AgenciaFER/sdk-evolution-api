import { HttpClient } from './http-client';
/**
 * Classe base para todos os módulos da API
 */
export declare abstract class BaseModule {
    protected http: HttpClient;
    protected instance?: string;
    /**
     * Cria uma nova instância do módulo
     * @param http Cliente HTTP compartilhado
     * @param instance Nome da instância do WhatsApp (opcional)
     */
    constructor(http: HttpClient, instance?: string);
    /**
     * Define o nome da instância para o módulo
     * @param instance Nome da instância
     */
    setInstance(instance: string): this;
    /**
     * Obtém o nome da instância atual
     * @returns Nome da instância
     * @throws EvolutionAPIError se nenhuma instância estiver definida
     */
    getInstance(): string;
    /**
     * Verifica se há uma instância definida
     * @returns true se há uma instância definida
     */
    hasInstance(): boolean;
}
