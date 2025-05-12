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
exports.ChatModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para gerenciamento de chats
 */
class ChatModule extends base_module_1.BaseModule {
    /**
     * Verifica se um número é um WhatsApp válido
     * @param number Número a ser verificado (com código do país)
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Informações sobre o número
     */
    async checkNumber(number, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/chat/whatsappNumbers/${instance}`, {
            numbers: [number]
        });
    }
    /**
     * Marca mensagens como lidas
     * @param chatId ID do chat
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async readMessages(chatId, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/chat/readMessages/${instance}`, {
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
    async archiveChat(chatId, archive, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/chat/archive/${instance}`, {
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
    async markChatUnread(chatId, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/chat/markUnread/${instance}`, {
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
    async deleteMessage(chatId, messageId, onlyMe = false, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.delete(`/chat/message/${instance}`, {
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
    async fetchProfilePicture(number, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/chat/profilePicture/${instance}`, {
            number
        });
    }
    /**
     * Obtém mídia de uma mensagem em base64
     * @param messageId ID da mensagem
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Mídia em base64
     */
    async getBase64FromMediaMessage(messageId, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/chat/getBase64FromMediaMessage/${instance}`, {
            messageId
        });
    }
}
exports.ChatModule = ChatModule;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map