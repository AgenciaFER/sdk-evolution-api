// Interfaces para o módulo de grupos

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
  archived?: boolean;
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