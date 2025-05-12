import { EvolutionAPIConfig } from './types';
import { InstanceModule } from './modules/instance';
import { SettingsModule } from './modules/settings';
import { MessageModule } from './modules/message';
import { ChatModule } from './modules/chat';
import { GroupModule } from './modules/group';
import { ProfileModule } from './modules/profile';
import { LabelModule } from './modules/label';
import { ProxyModule } from './modules/proxy';
import { IntegrationsModule } from './modules/integrations';
import { CallModule } from './modules/call';
/**
 * Cliente principal do SDK da Evolution API
 */
export declare class EvolutionAPI {
    private httpClient;
    /**
     * Módulo de gerenciamento de instâncias
     */
    readonly instance: InstanceModule;
    /**
     * Módulo de configurações
     */
    readonly settings: SettingsModule;
    /**
     * Módulo de envio de mensagens
     */
    readonly message: MessageModule;
    /**
     * Módulo de gerenciamento de chats
     */
    readonly chat: ChatModule;
    /**
     * Módulo de gerenciamento de grupos
     */
    readonly group: GroupModule;
    /**
     * Módulo de gerenciamento de perfil
     */
    readonly profile: ProfileModule;
    /**
     * Módulo de etiquetas
     */
    readonly label: LabelModule;
    /**
     * Módulo de proxy
     */
    readonly proxy: ProxyModule;
    /**
     * Módulo de integrações
     */
    readonly integrations: IntegrationsModule;
    /**
     * Módulo de chamadas
     */
    readonly call: CallModule;
    /**
     * Cria uma nova instância do cliente Evolution API
     * @param config Configuração do cliente
     */
    constructor(config: EvolutionAPIConfig);
    /**
     * Define o nome da instância para todos os módulos
     * @param instance Nome da instância
     * @returns Cliente Evolution API com a instância configurada
     */
    useInstance(instance: string): this;
}
export * from './types';
export * from './core/http-client';
export * from './core/base-module';
