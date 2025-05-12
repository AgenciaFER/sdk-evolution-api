import { BaseModule } from '../../core/base-module';
import { ProfileInfo, BusinessProfileInfo, PrivacySettings, ProfileResponse } from './types';

/**
 * Módulo para gerenciamento de perfil
 */
export class ProfileModule extends BaseModule {
  /**
   * Obtém informações do perfil comercial
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Informações do perfil comercial
   */
  async fetchBusinessProfile(instanceName?: string): Promise<BusinessProfileInfo> {
    const instance = instanceName || this.getInstance();
    return this.http.post<BusinessProfileInfo>(`/profile/fetchBusinessProfile/${instance}`, {});
  }

  /**
   * Obtém informações do perfil
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Informações do perfil
   */
  async fetchProfile(instanceName?: string): Promise<ProfileInfo> {
    const instance = instanceName || this.getInstance();
    return this.http.post<ProfileInfo>(`/profile/fetchProfile/${instance}`, {});
  }

  /**
   * Atualiza o nome do perfil
   * @param name Novo nome
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updateProfileName(name: string, instanceName?: string): Promise<ProfileResponse> {
    const instance = instanceName || this.getInstance();
    return this.http.post<ProfileResponse>(`/profile/updateProfileName/${instance}`, {
      name
    });
  }

  /**
   * Atualiza o status do perfil
   * @param status Novo status
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updateProfileStatus(status: string, instanceName?: string): Promise<ProfileResponse> {
    const instance = instanceName || this.getInstance();
    return this.http.post<ProfileResponse>(`/profile/updateProfileStatus/${instance}`, {
      status
    });
  }

  /**
   * Atualiza a foto do perfil
   * @param picture URL ou base64 da imagem
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updateProfilePicture(picture: string, instanceName?: string): Promise<ProfileResponse> {
    const instance = instanceName || this.getInstance();
    return this.http.post<ProfileResponse>(`/profile/updateProfilePicture/${instance}`, {
      picture
    });
  }

  /**
   * Remove a foto do perfil
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async removeProfilePicture(instanceName?: string): Promise<ProfileResponse> {
    const instance = instanceName || this.getInstance();
    return this.http.delete<ProfileResponse>(`/profile/removeProfilePicture/${instance}`);
  }

  /**
   * Obtém as configurações de privacidade
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Configurações de privacidade
   */
  async fetchPrivacySettings(instanceName?: string): Promise<PrivacySettings> {
    const instance = instanceName || this.getInstance();
    return this.http.get<PrivacySettings>(`/profile/fetchPrivacySettings/${instance}`);
  }

  /**
   * Atualiza as configurações de privacidade
   * @param privacy Configurações de privacidade
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updatePrivacySettings(
    privacy: PrivacySettings,
    instanceName?: string
  ): Promise<ProfileResponse> {
    const instance = instanceName || this.getInstance();
    return this.http.post<ProfileResponse>(`/profile/updatePrivacySettings/${instance}`, privacy);
  }
}

export * from './types';
