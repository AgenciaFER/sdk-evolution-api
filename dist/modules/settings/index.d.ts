import { BaseModule } from '../../core/base-module';
import { SettingsData } from './types';
/**
 * Módulo para gerenciamento de configurações da instância
 */
export declare class SettingsModule extends BaseModule {
    /**
     * Define as configurações para uma instância
     * @param settings Configurações a serem aplicadas
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    set(settings: SettingsData, instanceName?: string): Promise<any>;
    /**
     * Obtém as configurações atuais da instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Configurações atuais
     */
    find(instanceName?: string): Promise<SettingsData>;
}
export * from './types';
