import { BaseModule } from '../../core/base-module';
/**
 * Interface para representar informações de um grupo
 */
export interface GroupInfo {
    id: string;
    subject: string;
    subjectOwner?: string;
    subjectTime?: number;
    creation?: number;
    owner?: string;
    desc?: string;
    descId?: string;
    descOwner?: string;
    descTime?: number;
    restrict?: boolean;
    announce?: boolean;
    size?: number;
    participants?: GroupParticipant[];
}
/**
 * Interface para representar um participante do grupo
 */
export interface GroupParticipant {
    id: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
}
/**
 * Interface para retorno de operações com grupos
 */
export interface GroupResponse {
    status: boolean;
    message: string;
    groupInfo?: GroupInfo;
}
/**
 * Módulo para gerenciamento de grupos
 */
export declare class GroupModule extends BaseModule {
    /**
     * Cria um novo grupo
     * @param name Nome do grupo
     * @param participants Array com os números dos participantes
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações do grupo criado
     */
    createGroup(name: string, participants: string[], instanceName?: string): Promise<GroupResponse>;
    /**
     * Atualiza a foto de um grupo
     * @param groupId ID do grupo
     * @param image URL ou base64 da imagem
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updatePicture(groupId: string, image: string, instanceName?: string): Promise<GroupResponse>;
    /**
     * Atualiza o nome de um grupo
     * @param groupId ID do grupo
     * @param subject Novo nome do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updateSubject(groupId: string, subject: string, instanceName?: string): Promise<any>;
    /**
     * Atualiza a descrição de um grupo
     * @param groupId ID do grupo
     * @param description Nova descrição do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updateDescription(groupId: string, description: string, instanceName?: string): Promise<any>;
    /**
     * Obtém o código de convite de um grupo
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Código de convite
     */
    fetchInviteCode(groupId: string, instanceName?: string): Promise<any>;
    /**
     * Revoga o código de convite de um grupo
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Novo código de convite
     */
    revokeInviteCode(groupId: string, instanceName?: string): Promise<any>;
    /**
     * Obtém todos os grupos
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Lista de grupos
     */
    fetchAll(instanceName?: string): Promise<{
        groups: GroupInfo[];
    }>;
    /**
     * Atualiza participantes de um grupo (adicionar, remover, promover, rebaixar)
     * @param groupId ID do grupo
     * @param action Ação a ser executada ('add', 'remove', 'promote', 'demote')
     * @param participants Array com os números dos participantes
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updateParticipant(groupId: string, action: 'add' | 'remove' | 'promote' | 'demote', participants: string[], instanceName?: string): Promise<any>;
    /**
     * Sai de um grupo
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    leave(groupId: string, instanceName?: string): Promise<any>;
}
