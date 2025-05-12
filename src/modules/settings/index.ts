import { BaseModule } from '../../core/base-module';
import { SettingsData } from './types';

/**
 * Módulo para gerenciamento de configurações da instância
 */
export class SettingsModule extends BaseModule {
  /**
   * Define as configurações para uma instância
   * @param settings Configurações a serem aplicadas
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async set(settings: SettingsData, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/settings/set/${instance}`, settings);
  }

  /**
   * Obtém as configurações atuais da instância
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Configurações atuais
   */
  async find(instanceName?: string): Promise<SettingsData> {
    const instance = instanceName || this.getInstance();
    return this.http.get<SettingsData>(`/settings/find/${instance}`);
  }
}

export * from './types';
