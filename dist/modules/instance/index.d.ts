import { BaseModule } from '../../core/base-module';
import { CreateInstanceOptions, Instance, SetPresenceOptions } from './types';
/**
 * Módulo para gerenciamento de instâncias do WhatsApp
 */
export declare class InstanceModule extends BaseModule {
    /**
     * Cria uma nova instância do WhatsApp
     * @param options Opções para criação da instância
     * @returns Informações da instância criada
     */
    create(options: CreateInstanceOptions): Promise<Instance>;
    /**
     * Lista todas as instâncias disponíveis
     * @returns Lista de instâncias
     */
    fetchInstances(): Promise<Instance[]>;
    /**
     * Conecta a uma instância existente
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da conexão
     */
    connect(instanceName?: string): Promise<any>;
    /**
     * Reinicia uma instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    restart(instanceName?: string): Promise<any>;
    /**
     * Define o status de presença (online/offline)
     * @param options Opções de presença
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    setPresence(options: SetPresenceOptions, instanceName?: string): Promise<any>;
    /**
     * Obtém o status de conexão da instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status de conexão
     */
    getConnectionState(instanceName?: string): Promise<any>;
    /**
     * Desconecta a instância (logout)
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    logout(instanceName?: string): Promise<any>;
    /**
     * Remove completamente uma instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    delete(instanceName?: string): Promise<any>;
}
export * from './types';
