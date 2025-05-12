import { BaseModule } from '../../core/base-module';
/**
 * Módulo para integrações com sistemas externos
 */
export declare class IntegrationsModule extends BaseModule {
    /**
     * Configura um webhook para receber eventos
     * @param url URL do webhook
     * @param events Lista de eventos para escutar
     * @param options Opções adicionais
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    setWebhook(url: string, events: string[], options?: {
        enabled?: boolean;
        base64?: boolean;
        headers?: Record<string, string>;
    }, instanceName?: string): Promise<any>;
    /**
     * Configura um chatbot baseado em fluxo
     * @param enabled Ativa ou desativa o chatbot
     * @param options Opções de configuração
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    setChatbot(enabled: boolean, options: {
        type?: 'text' | 'buttons' | 'list';
        message?: string;
        options?: Array<{
            name: string;
            description?: string;
            value: string;
        }>;
        delay?: number;
        keyword?: string;
        trigger?: 'all' | 'media' | 'message';
    }, instanceName?: string): Promise<any>;
    /**
     * Configura armazenamento em nuvem para arquivos de mídia
     * @param provider Provedor de armazenamento ('minio', 's3', etc.)
     * @param config Configurações do provedor
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    setStorage(provider: string, config: Record<string, any>, instanceName?: string): Promise<any>;
}
export * from './types';
