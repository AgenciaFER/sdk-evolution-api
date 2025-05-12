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
  participantsCount?: number;
  unreadCount?: number;
  isLocked?: boolean;
  isArchived?: boolean;
  size?: number;
}

/**
 * Interface para representar um participante de um grupo
 */
export interface GroupParticipant {
  id: string;
  name: string;
  isAdmin: boolean;
}

/**
 * Interface para resposta de operações de grupo
 */
export interface GroupResponse {
  id: string;
  name: string;
  participants: GroupParticipant[];
}

/**
 * Opções para filtrar grupos
 */
export interface GroupFilterOptions {
  /**
   * Obtém participantes dos grupos
   * @default true
   */
  getParticipants?: boolean;
  /**
   * Filtra grupos por status de arquivamento
   * - true: apenas grupos arquivados
   * - false: apenas grupos não arquivados
   * - undefined: todos os grupos (padrão)
   */
  archived?: boolean;
}

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
  async createGroup(name: string, participants: string[], instanceName?: string): Promise<GroupResponse> {
    const instance = instanceName || this.getInstance();
    return this.http.post<GroupResponse>(`/group/create/${instance}`, {
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
  async updatePicture(groupId: string, image: string, instanceName?: string): Promise<GroupResponse> {
    const instance = instanceName || this.getInstance();
    return this.http.post<GroupResponse>(`/group/pic/${instance}`, {
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
  async updateSubject(groupId: string | null, subject: string, instanceName?: string): Promise<any> {
    if (!groupId) {
      throw new Error('ID do grupo é obrigatório para updateSubject');
    }
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
  async updateDescription(groupId: string | null, description: string, instanceName?: string): Promise<any> {
    if (!groupId) {
      throw new Error('ID do grupo é obrigatório para updateDescription');
    }
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
   * @param instanceNameOrOptions Nome da instância ou opções de filtro
   * @param options Opções de filtro (se instanceName for fornecido como primeiro parâmetro)
   * @returns Lista de grupos
   */
  async fetchAll(
    instanceNameOrOptions?: string | GroupFilterOptions,
    options?: GroupFilterOptions
  ): Promise<{ groups: GroupInfo[] }> {
    let instanceName: string | undefined;
    let filterOptions: GroupFilterOptions = { getParticipants: true };
    
    // Verifica os parâmetros
    if (typeof instanceNameOrOptions === 'string') {
      instanceName = instanceNameOrOptions;
      if (options) {
        filterOptions = { ...filterOptions, ...options };
      }
    } else if (instanceNameOrOptions) {
      filterOptions = { ...filterOptions, ...instanceNameOrOptions };
    }
    
    const instance = instanceName || this.getInstance();
    const { getParticipants = true } = filterOptions;
    
    // Busca todos os grupos
    const response = await this.http.get<{ groups: GroupInfo[] }>(
      `/group/fetchAllGroups/${instance}?getParticipants=${getParticipants}`
    );
    
    // Se não precisamos filtrar por status de arquivamento, retorna todos os grupos
    if (filterOptions.archived === undefined) {
      return response;
    }
    
    // Para cada grupo, verifica seu status de arquivamento
    const groupsWithArchiveStatus = await Promise.all(
      response.groups.map(async (group) => {
        try {
          const isArchived = await this.isArchived(group.id, instance);
          return { ...group, archived: isArchived };
        } catch (error) {
          // Se ocorrer um erro ao verificar o status, assume como não arquivado
          return { ...group, archived: false };
        }
      })
    );
    
    // Filtra os grupos de acordo com o status de arquivamento
    const filteredGroups = groupsWithArchiveStatus.filter(
      (group) => group.archived === filterOptions.archived
    );
    
    return { groups: filteredGroups };
  }
  
  /**
   * Verifica se um grupo está arquivado
   * @param groupId ID do grupo
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns true se o grupo estiver arquivado, false caso contrário
   */
  async isArchived(groupId: string, instanceName?: string): Promise<boolean> {
    const instance = instanceName || this.getInstance();
    
    try {
      // A API Evolution não tem um endpoint direto para verificar se um grupo está arquivado,
      // por isso usamos uma abordagem alternativa obtendo os chats arquivados
      const response = await this.http.get<any>(`/chat/fetchChats/${instance}`);
      
      if (!response || !response.chats || !Array.isArray(response.chats)) {
        return false;
      }
      
      // Procura pelo grupo na lista de chats
      const chat = response.chats.find((chat: any) => chat.id === groupId);
      
      // Retorna o status de arquivado, se disponível
      return chat?.archived === true;
    } catch (error) {
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
  async archiveGroup(groupId: string, archive: boolean, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    
    // Usa o endpoint de arquivamento de chat, já que grupos são tratados como chats
    return this.http.post<any>(`/chat/archive/${instance}`, {
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
  async leave(groupId: string | null, instanceName?: string): Promise<any> {
    if (!groupId) {
      throw new Error('ID do grupo é obrigatório para leave');
    }
    const instance = instanceName || this.getInstance();
    return this.http.delete<any>(`/group/leave/${instance}?id=${encodeURIComponent(groupId)}`);
  }

  /**
   * Obtém apenas grupos arquivados
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @param getParticipants Define se deve buscar os participantes dos grupos (padrão: true)
   * @returns Lista de grupos arquivados
   */
  async fetchArchivedGroups(instanceName?: string, getParticipants: boolean = true): Promise<{ groups: GroupInfo[] }> {
    return this.fetchAll(
      instanceName,
      { getParticipants, archived: true }
    );
  }

  /**
   * Obtém apenas grupos não arquivados
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @param getParticipants Define se deve buscar os participantes dos grupos (padrão: true)
   * @returns Lista de grupos não arquivados
   */
  async fetchUnarchivedGroups(instanceName?: string, getParticipants: boolean = true): Promise<{ groups: GroupInfo[] }> {
    return this.fetchAll(
      instanceName,
      { getParticipants, archived: false }
    );
  }
}
