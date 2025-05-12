import { BaseModule } from '../../core/base-module';
import { ProfileInfo, BusinessProfileInfo, PrivacySettings, ProfileResponse } from './types';
/**
 * Módulo para gerenciamento de perfil
 */
export declare class ProfileModule extends BaseModule {
    /**
     * Obtém informações do perfil comercial
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações do perfil comercial
     */
    fetchBusinessProfile(instanceName?: string): Promise<BusinessProfileInfo>;
    /**
     * Obtém informações do perfil
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações do perfil
     */
    fetchProfile(instanceName?: string): Promise<ProfileInfo>;
    /**
     * Atualiza o nome do perfil
     * @param name Novo nome
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updateProfileName(name: string, instanceName?: string): Promise<ProfileResponse>;
    /**
     * Atualiza o status do perfil
     * @param status Novo status
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updateProfileStatus(status: string, instanceName?: string): Promise<ProfileResponse>;
    /**
     * Atualiza a foto do perfil
     * @param picture URL ou base64 da imagem
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updateProfilePicture(picture: string, instanceName?: string): Promise<ProfileResponse>;
    /**
     * Remove a foto do perfil
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    removeProfilePicture(instanceName?: string): Promise<ProfileResponse>;
    /**
     * Obtém as configurações de privacidade
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Configurações de privacidade
     */
    fetchPrivacySettings(instanceName?: string): Promise<PrivacySettings>;
    /**
     * Atualiza as configurações de privacidade
     * @param privacy Configurações de privacidade
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updatePrivacySettings(privacy: PrivacySettings, instanceName?: string): Promise<ProfileResponse>;
}
export * from './types';
