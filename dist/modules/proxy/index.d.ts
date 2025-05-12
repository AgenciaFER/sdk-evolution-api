import { BaseModule } from '../../core/base-module';
import { ProxyConfig } from './types';
/**
 * Módulo para gerenciamento de configurações de proxy
 */
export declare class ProxyModule extends BaseModule {
    /**
     * Define as configurações de proxy para uma instância
     * @param config Configurações de proxy a serem aplicadas
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    set(config: ProxyConfig, instanceName?: string): Promise<any>;
    /**
     * Obtém as configurações de proxy atuais da instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Configurações de proxy atuais
     */
    find(instanceName?: string): Promise<ProxyConfig>;
}
export * from './types';
