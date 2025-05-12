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
exports.MessageModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para envio de mensagens
 */
class MessageModule extends base_module_1.BaseModule {
    /**
     * Envia uma mensagem de texto
     * @param options Opções para envio do texto
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendText(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendText/${instance}`, options);
    }
    /**
     * Envia uma mensagem com mídia (imagem, vídeo ou documento)
     * @param options Opções para envio de mídia
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendMedia(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendMedia/${instance}`, options);
    }
    /**
     * Envia um vídeo que só pode ser visto uma vez (PTV)
     * @param options Opções para envio do vídeo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendPtv(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendPtv/${instance}`, options);
    }
    /**
     * Envia um áudio narrado (aparece como mensagem de voz)
     * @param options Opções para envio do áudio
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendNarratedAudio(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendWhatsAppAudio/${instance}`, options);
    }
    /**
     * Envia um status/story (para contatos específicos ou todos)
     * @param options Opções para envio do status/story
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendStatus(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendStatus/${instance}`, options);
    }
    /**
     * Envia um sticker
     * @param options Opções para envio do sticker
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendSticker(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendSticker/${instance}`, options);
    }
    /**
     * Envia uma localização
     * @param options Opções para envio da localização
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendLocation(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendLocation/${instance}`, options);
    }
    /**
     * Envia um ou mais contatos
     * @param options Opções para envio dos contatos
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendContact(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendContact/${instance}`, options);
    }
    /**
     * Envia uma reação a uma mensagem
     * @param options Opções para envio da reação
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendReaction(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendReaction/${instance}`, options);
    }
    /**
     * Envia uma enquete
     * @param options Opções para envio da enquete
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendPoll(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendPoll/${instance}`, options);
    }
    /**
     * Envia uma mensagem com lista de opções
     * @param options Opções para envio da lista
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendList(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendList/${instance}`, options);
    }
    /**
     * Envia uma mensagem com botões
     * @param options Opções para envio dos botões
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async sendButton(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/message/sendButton/${instance}`, options);
    }
}
exports.MessageModule = MessageModule;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map