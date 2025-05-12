import { BaseModule } from '../../core/base-module';

/**
 * Módulo para gerenciamento de perfil
 */
export class ProfileModule extends BaseModule {
  /**
   * Obtém informações do perfil comercial
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Informações do perfil comercial
   */
  async fetchBusinessProfile(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/profile/fetchBusinessProfile/${instance}`, {});
  }

  /**
   * Obtém informações do perfil
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Informações do perfil
   */
  async fetchProfile(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/profile/fetchProfile/${instance}`, {});
  }

  /**
   * Atualiza o nome do perfil
   * @param name Novo nome
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updateProfileName(name: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/profile/updateProfileName/${instance}`, {
      name
    });
  }

  /**
   * Atualiza o status do perfil
   * @param status Novo status
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updateProfileStatus(status: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/profile/updateProfileStatus/${instance}`, {
      status
    });
  }

  /**
   * Atualiza a foto do perfil
   * @param picture URL ou base64 da imagem
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updateProfilePicture(picture: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/profile/updateProfilePicture/${instance}`, {
      picture
    });
  }

  /**
   * Remove a foto do perfil
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async removeProfilePicture(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.delete<any>(`/profile/removeProfilePicture/${instance}`);
  }

  /**
   * Obtém as configurações de privacidade
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Configurações de privacidade
   */
  async fetchPrivacySettings(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.get<any>(`/profile/fetchPrivacySettings/${instance}`);
  }

  /**
   * Atualiza as configurações de privacidade
   * @param privacy Configurações de privacidade
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updatePrivacySettings(
    privacy: {
      lastSeen?: 'all' | 'contacts' | 'none';
      online?: 'all' | 'match_last_seen';
      profilePhoto?: 'all' | 'contacts' | 'none';
      status?: 'all' | 'contacts' | 'none';
      readReceipts?: 'all' | 'none';
      groupsAdd?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
    },
    instanceName?: string
  ): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/profile/updatePrivacySettings/${instance}`, privacy);
  }
}

export * from './types';
