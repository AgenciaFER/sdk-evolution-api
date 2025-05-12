"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para gerenciamento de grupos
 */
class GroupModule extends base_module_1.BaseModule {
    /**
     * Cria um novo grupo
     * @param name Nome do grupo
     * @param participants Array com os números dos participantes
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações do grupo criado
     */
    async createGroup(name, participants, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/group/create/${instance}`, {
            name,
            participants
        });
    }
    /**
     * Atualiza a foto de um grupo
     * @param groupId ID do grupo
     * @param image URL ou base64 da imagem
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updatePicture(groupId, image, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/group/pic/${instance}`, {
            groupId,
            image
        });
    }
    /**
     * Atualiza o nome de um grupo
     * @param groupId ID do grupo
     * @param subject Novo nome do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updateSubject(groupId, subject, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/group/subject/${instance}`, {
            groupId,
            subject
        });
    }
    /**
     * Atualiza a descrição de um grupo
     * @param groupId ID do grupo
     * @param description Nova descrição do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updateDescription(groupId, description, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/group/description/${instance}`, {
            groupId,
            description
        });
    }
    /**
     * Obtém o código de convite de um grupo
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Código de convite
     */
    async fetchInviteCode(groupId, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.get(`/group/inviteCode/${instance}?id=${encodeURIComponent(groupId)}`);
    }
    /**
     * Revoga o código de convite de um grupo
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Novo código de convite
     */
    async revokeInviteCode(groupId, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/group/revokeInviteCode/${instance}`, {
            groupId
        });
    }
    /**
     * Obtém todos os grupos
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Lista de grupos
     */
    async fetchAll(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.get(`/group/fetchAllGroups/${instance}`);
    }
    /**
     * Atualiza participantes de um grupo (adicionar, remover, promover, rebaixar)
     * @param groupId ID do grupo
     * @param action Ação a ser executada ('add', 'remove', 'promote', 'demote')
     * @param participants Array com os números dos participantes
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async updateParticipant(groupId, action, participants, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/group/updateParticipant/${instance}`, {
            groupId,
            action,
            participants
        });
    }
    /**
     * Sai de um grupo
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async leave(groupId, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.delete(`/group/leave/${instance}?id=${encodeURIComponent(groupId)}`);
    }
}
exports.GroupModule = GroupModule;
//# sourceMappingURL=index.js.map