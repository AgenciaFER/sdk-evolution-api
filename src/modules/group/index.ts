import { BaseModule } from '../../core/base-module';

/**
 * Módulo para gerenciamento de grupos
 */
export class GroupModule extends BaseModule {
  /**
   * Cria um novo grupo
   * @param name Nome do grupo
   * @param participants Array com os números dos participantes
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Informações do grupo criado
   */
  async createGroup(name: string, participants: string[], instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/group/create/${instance}`, {
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
  async updatePicture(groupId: string, image: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/group/pic/${instance}`, {
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
  async updateSubject(groupId: string, subject: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/group/subject/${instance}`, {
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
  async updateDescription(groupId: string, description: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/group/description/${instance}`, {
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
  async fetchInviteCode(groupId: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.get<any>(`/group/inviteCode/${instance}?id=${encodeURIComponent(groupId)}`);
  }

  /**
   * Revoga o código de convite de um grupo
   * @param groupId ID do grupo
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Novo código de convite
   */
  async revokeInviteCode(groupId: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/group/revokeInviteCode/${instance}`, {
      groupId
    });
  }

  /**
   * Obtém todos os grupos
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Lista de grupos
   */
  async fetchAll(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.get<any>(`/group/fetchAllGroups/${instance}`);
  }

  /**
   * Atualiza participantes de um grupo (adicionar, remover, promover, rebaixar)
   * @param groupId ID do grupo
   * @param action Ação a ser executada ('add', 'remove', 'promote', 'demote')
   * @param participants Array com os números dos participantes
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async updateParticipant(
    groupId: string, 
    action: 'add' | 'remove' | 'promote' | 'demote', 
    participants: string[], 
    instanceName?: string
  ): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/group/updateParticipant/${instance}`, {
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
  async leave(groupId: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.delete<any>(`/group/leave/${instance}?id=${encodeURIComponent(groupId)}`);
  }
}

export * from './types';
