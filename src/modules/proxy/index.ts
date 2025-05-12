import { BaseModule } from '../../core/base-module';
import { ProxyConfig } from './types';

/**
 * Módulo para gerenciamento de configurações de proxy
 */
export class ProxyModule extends BaseModule {
  /**
   * Define as configurações de proxy para uma instância
   * @param config Configurações de proxy a serem aplicadas
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async set(config: ProxyConfig, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/proxy/set/${instance}`, config);
  }

  /**
   * Obtém as configurações de proxy atuais da instância
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Configurações de proxy atuais
   */
  async find(instanceName?: string): Promise<ProxyConfig> {
    const instance = instanceName || this.getInstance();
    return this.http.get<ProxyConfig>(`/proxy/find/${instance}`);
  }
}

export * from './types';
