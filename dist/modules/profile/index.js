"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para gerenciamento de perfil
 */
class ProfileModule extends base_module_1.BaseModule {
    /**
     * Obtém informações do perfil comercial
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações do perfil comercial
     */
    async fetchBusinessProfile(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/profile/fetchBusinessProfile/${instance}`, {});
    }
    /**
     * Obtém informações do perfil
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações do perfil
     */
    async fetchProfile(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/profile/fetchProfile/${instance}`, {});
    }
    /**
     * Atualiza o nome do perfil
     * @param name Novo nome
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updateProfileName(name, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/profile/updateProfileName/${instance}`, {
            name
        });
    }
    /**
     * Atualiza o status do perfil
     * @param status Novo status
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updateProfileStatus(status, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/profile/updateProfileStatus/${instance}`, {
            status
        });
    }
    /**
     * Atualiza a foto do perfil
     * @param picture URL ou base64 da imagem
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updateProfilePicture(picture, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/profile/updateProfilePicture/${instance}`, {
            picture
        });
    }
    /**
     * Remove a foto do perfil
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async removeProfilePicture(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.delete(`/profile/removeProfilePicture/${instance}`);
    }
    /**
     * Obtém as configurações de privacidade
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Configurações de privacidade
     */
    async fetchPrivacySettings(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.get(`/profile/fetchPrivacySettings/${instance}`);
    }
    /**
     * Atualiza as configurações de privacidade
     * @param privacy Configurações de privacidade
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updatePrivacySettings(privacy, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/profile/updatePrivacySettings/${instance}`, privacy);
    }
}
exports.ProfileModule = ProfileModule;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map