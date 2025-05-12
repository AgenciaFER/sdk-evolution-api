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
exports.GroupModule = void 0;
const base_module_1 = require("../../core/base-module");
__exportStar(require("./types"), exports);
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
        if (!groupId) {
            throw new Error('ID do grupo é obrigatório para updateSubject');
        }
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
        if (!groupId) {
            throw new Error('ID do grupo é obrigatório para updateDescription');
        }
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
     * @param instanceNameOrOptions Nome da instância ou opções de filtro
     * @param options Opções de filtro (se instanceName for fornecido como primeiro parâmetro)
     * @returns Lista de grupos
     */
    async fetchAll(instanceNameOrOptions, options) {
        let instanceName;
        let filterOptions = { getParticipants: true };
        // Verifica os parâmetros
        if (typeof instanceNameOrOptions === 'string') {
            instanceName = instanceNameOrOptions;
            if (options) {
                filterOptions = { ...filterOptions, ...options };
            }
        }
        else if (instanceNameOrOptions) {
            filterOptions = { ...filterOptions, ...instanceNameOrOptions };
        }
        const instance = instanceName || this.getInstance();
        const { getParticipants = true } = filterOptions;
        // Busca todos os grupos
        const response = await this.http.get(`/group/fetchAllGroups/${instance}?getParticipants=${getParticipants}`);
        // Se não precisamos filtrar por status de arquivamento, retorna todos os grupos
        if (filterOptions.archived === undefined) {
            return response;
        }
        // Para cada grupo, verifica seu status de arquivamento
        const groupsWithArchiveStatus = await Promise.all(response.groups.map(async (group) => {
            try {
                const isArchived = await this.isArchived(group.id, instance);
                return { ...group, archived: isArchived };
            }
            catch (error) {
                // Se ocorrer um erro ao verificar o status, assume como não arquivado
                return { ...group, archived: false };
            }
        }));
        // Filtra os grupos de acordo com o status de arquivamento
        const filteredGroups = groupsWithArchiveStatus.filter((group) => group.archived === filterOptions.archived);
        return { groups: filteredGroups };
    }
    /**
     * Verifica se um grupo está arquivado
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns true se o grupo estiver arquivado, false caso contrário
     */
    async isArchived(groupId, instanceName) {
        const instance = instanceName || this.getInstance();
        try {
            // A API Evolution não tem um endpoint direto para verificar se um grupo está arquivado,
            // por isso usamos uma abordagem alternativa obtendo os chats arquivados
            const response = await this.http.get(`/chat/fetchChats/${instance}`);
            if (!response || !response.chats || !Array.isArray(response.chats)) {
                return false;
            }
            // Procura pelo grupo na lista de chats
            const chat = response.chats.find((chat) => chat.id === groupId);
            // Retorna o status de arquivado, se disponível
            return chat?.archived === true;
        }
        catch (error) {
            // Em caso de erro, assume que o grupo não está arquivado
            return false;
        }
    }
    /**
     * Arquiva ou desarquiva um grupo
     * @param groupId ID do grupo
     * @param archive true para arquivar, false para desarquivar
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async archiveGroup(groupId, archive, instanceName) {
        const instance = instanceName || this.getInstance();
        // Usa o endpoint de arquivamento de chat, já que grupos são tratados como chats
        return this.http.post(`/chat/archive/${instance}`, {
            chatId: groupId,
            archive
        });
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
        if (!groupId) {
            throw new Error('ID do grupo é obrigatório para leave');
        }
        const instance = instanceName || this.getInstance();
        return this.http.delete(`/group/leave/${instance}?id=${encodeURIComponent(groupId)}`);
    }
    /**
     * Obtém apenas grupos arquivados
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @param getParticipants Define se deve buscar os participantes dos grupos (padrão: true)
     * @returns Lista de grupos arquivados
     */
    async fetchArchivedGroups(instanceName, getParticipants = true) {
        return this.fetchAll(instanceName, { getParticipants, archived: true });
    }
    /**
     * Obtém apenas grupos não arquivados
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @param getParticipants Define se deve buscar os participantes dos grupos (padrão: true)
     * @returns Lista de grupos não arquivados
     */
    async fetchUnarchivedGroups(instanceName, getParticipants = true) {
        return this.fetchAll(instanceName, { getParticipants, archived: false });
    }
}
exports.GroupModule = GroupModule;
//# sourceMappingURL=index.js.map