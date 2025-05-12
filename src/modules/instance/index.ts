import { BaseModule } from '../../core/base-module';
import { CreateInstanceOptions, Instance, SetPresenceOptions } from './types';

/**
 * Módulo para gerenciamento de instâncias do WhatsApp
 */
export class InstanceModule extends BaseModule {
  /**
   * Cria uma nova instância do WhatsApp
   * @param options Opções para criação da instância
   * @returns Informações da instância criada
   */
  async create(options: CreateInstanceOptions): Promise<Instance> {
    return this.http.post<Instance>('/instance/create', options);
  }

  /**
   * Lista todas as instâncias disponíveis
   * @returns Lista de instâncias
   */
  async fetchInstances(): Promise<Instance[]> {
    return this.http.get<Instance[]>('/instance/fetchInstances');
  }

  /**
   * Conecta a uma instância existente
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da conexão
   */
  async connect(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.get<any>(`/instance/connect/${instance}`);
  }

  /**
   * Reinicia uma instância
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async restart(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/instance/restart/${instance}`);
  }

  /**
   * Define o status de presença (online/offline)
   * @param options Opções de presença
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async setPresence(options: SetPresenceOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/instance/setPresence/${instance}`, options);
  }

  /**
   * Obtém o status de conexão da instância
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status de conexão
   */
  async getConnectionState(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.get<any>(`/instance/connectionState/${instance}`);
  }

  /**
   * Desconecta a instância (logout)
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async logout(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.delete<any>(`/instance/logout/${instance}`);
  }

  /**
   * Remove completamente uma instância
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async delete(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.delete<any>(`/instance/delete/${instance}`);
  }
}

export * from './types';
