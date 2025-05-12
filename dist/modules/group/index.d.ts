import { BaseModule } from '../../core/base-module';
import { GroupInfo, GroupResponse, GroupFilterOptions } from './types';
export * from './types';
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
    updateSubject(groupId: string | null, subject: string, instanceName?: string): Promise<any>;
    /**
     * Atualiza a descrição de um grupo
     * @param groupId ID do grupo
     * @param description Nova descrição do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    updateDescription(groupId: string | null, description: string, instanceName?: string): Promise<any>;
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
     * @param instanceNameOrOptions Nome da instância ou opções de filtro
     * @param options Opções de filtro (se instanceName for fornecido como primeiro parâmetro)
     * @returns Lista de grupos
     */
    fetchAll(instanceNameOrOptions?: string | GroupFilterOptions, options?: GroupFilterOptions): Promise<{
        groups: GroupInfo[];
    }>;
    /**
     * Verifica se um grupo está arquivado
     * @param groupId ID do grupo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns true se o grupo estiver arquivado, false caso contrário
     */
    isArchived(groupId: string, instanceName?: string): Promise<boolean>;
    /**
     * Arquiva ou desarquiva um grupo
     * @param groupId ID do grupo
     * @param archive true para arquivar, false para desarquivar
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    archiveGroup(groupId: string, archive: boolean, instanceName?: string): Promise<any>;
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
    leave(groupId: string | null, instanceName?: string): Promise<any>;
    /**
     * Obtém apenas grupos arquivados
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @param getParticipants Define se deve buscar os participantes dos grupos (padrão: true)
     * @returns Lista de grupos arquivados
     */
    fetchArchivedGroups(instanceName?: string, getParticipants?: boolean): Promise<{
        groups: GroupInfo[];
    }>;
    /**
     * Obtém apenas grupos não arquivados
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @param getParticipants Define se deve buscar os participantes dos grupos (padrão: true)
     * @returns Lista de grupos não arquivados
     */
    fetchUnarchivedGroups(instanceName?: string, getParticipants?: boolean): Promise<{
        groups: GroupInfo[];
    }>;
}
