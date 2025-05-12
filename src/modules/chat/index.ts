import { BaseModule } from '../../core/base-module';

/**
 * Módulo para gerenciamento de chats
 */
export class ChatModule extends BaseModule {
  /**
   * Verifica se um número é um WhatsApp válido
   * @param number Número a ser verificado (com código do país)
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Informações sobre o número
   */
  async checkNumber(number: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/chat/whatsappNumbers/${instance}`, { 
      numbers: [number] 
    });
  }

  /**
   * Marca mensagens como lidas
   * @param chatId ID do chat
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async readMessages(chatId: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/chat/readMessages/${instance}`, {
      readMessages: [chatId]
    });
  }

  /**
   * Arquiva um chat
   * @param chatId ID do chat
   * @param archive True para arquivar, false para desarquivar
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async archiveChat(chatId: string, archive: boolean, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/chat/archive/${instance}`, {
      chatId,
      archive
    });
  }

  /**
   * Marca um chat como não lido
   * @param chatId ID do chat
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async markChatUnread(chatId: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/chat/markUnread/${instance}`, {
      chatId
    });
  }

  /**
   * Deleta uma mensagem
   * @param chatId ID do chat
   * @param messageId ID da mensagem
   * @param onlyMe Se true, deleta apenas para mim
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async deleteMessage(chatId: string, messageId: string, onlyMe = false, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.delete<any>(`/chat/message/${instance}`, {
      chatId,
      messageId,
      onlyMe
    });
  }

  /**
   * Busca a foto de perfil de um contato
   * @param number Número do contato
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Foto de perfil em base64
   */
  async fetchProfilePicture(number: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/chat/profilePicture/${instance}`, {
      number
    });
  }

  /**
   * Obtém mídia de uma mensagem em base64
   * @param messageId ID da mensagem
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Mídia em base64
   */
  async getBase64FromMediaMessage(messageId: string, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/chat/getBase64FromMediaMessage/${instance}`, {
      messageId
    });
  }
}

export * from './types';
