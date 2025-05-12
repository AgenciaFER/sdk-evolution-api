import { BaseModule } from '../../core/base-module';
/**
 * Módulo para gerenciamento de chats
 */
export declare class ChatModule extends BaseModule {
    /**
     * Verifica se um número é um WhatsApp válido
     * @param number Número a ser verificado (com código do país)
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações sobre o número
     */
    checkNumber(number: string, instanceName?: string): Promise<any>;
    /**
     * Marca mensagens como lidas
     * @param chatId ID do chat
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    readMessages(chatId: string, instanceName?: string): Promise<any>;
    /**
     * Arquiva um chat
     * @param chatId ID do chat
     * @param archive True para arquivar, false para desarquivar
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    archiveChat(chatId: string, archive: boolean, instanceName?: string): Promise<any>;
    /**
     * Marca um chat como não lido
     * @param chatId ID do chat
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    markChatUnread(chatId: string, instanceName?: string): Promise<any>;
    /**
     * Deleta uma mensagem
     * @param chatId ID do chat
     * @param messageId ID da mensagem
     * @param onlyMe Se true, deleta apenas para mim
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    deleteMessage(chatId: string, messageId: string, onlyMe?: boolean, instanceName?: string): Promise<any>;
    /**
     * Busca a foto de perfil de um contato
     * @param number Número do contato
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Foto de perfil em base64
     */
    fetchProfilePicture(number: string, instanceName?: string): Promise<any>;
    /**
     * Obtém mídia de uma mensagem em base64
     * @param messageId ID da mensagem
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Mídia em base64
     */
    getBase64FromMediaMessage(messageId: string, instanceName?: string): Promise<any>;
}
export * from './types';
