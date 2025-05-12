import { BaseModule } from '../../core/base-module';
import { SendTextOptions, SendMediaOptions, SendPTVOptions, SendNarratedAudioOptions, SendStatusOptions, SendStickerOptions, SendLocationOptions, SendContactOptions, SendReactionOptions, SendPollOptions, SendListOptions, SendButtonOptions } from './types';
/**
 * Módulo para envio de mensagens
 */
export declare class MessageModule extends BaseModule {
    /**
     * Envia uma mensagem de texto
     * @param options Opções para envio do texto
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendText(options: SendTextOptions, instanceName?: string): Promise<any>;
    /**
     * Envia uma mensagem com mídia (imagem, vídeo ou documento)
     * @param options Opções para envio de mídia
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendMedia(options: SendMediaOptions, instanceName?: string): Promise<any>;
    /**
     * Envia um vídeo que só pode ser visto uma vez (PTV)
     * @param options Opções para envio do vídeo
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendPtv(options: SendPTVOptions, instanceName?: string): Promise<any>;
    /**
     * Envia um áudio narrado (aparece como mensagem de voz)
     * @param options Opções para envio do áudio
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendNarratedAudio(options: SendNarratedAudioOptions, instanceName?: string): Promise<any>;
    /**
     * Envia um status/story (para contatos específicos ou todos)
     * @param options Opções para envio do status/story
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendStatus(options: SendStatusOptions, instanceName?: string): Promise<any>;
    /**
     * Envia um sticker
     * @param options Opções para envio do sticker
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendSticker(options: SendStickerOptions, instanceName?: string): Promise<any>;
    /**
     * Envia uma localização
     * @param options Opções para envio da localização
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendLocation(options: SendLocationOptions, instanceName?: string): Promise<any>;
    /**
     * Envia um ou mais contatos
     * @param options Opções para envio dos contatos
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendContact(options: SendContactOptions, instanceName?: string): Promise<any>;
    /**
     * Envia uma reação a uma mensagem
     * @param options Opções para envio da reação
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendReaction(options: SendReactionOptions, instanceName?: string): Promise<any>;
    /**
     * Envia uma enquete
     * @param options Opções para envio da enquete
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendPoll(options: SendPollOptions, instanceName?: string): Promise<any>;
    /**
     * Envia uma mensagem com lista de opções
     * @param options Opções para envio da lista
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendList(options: SendListOptions, instanceName?: string): Promise<any>;
    /**
     * Envia uma mensagem com botões
     * @param options Opções para envio dos botões
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    sendButton(options: SendButtonOptions, instanceName?: string): Promise<any>;
}
export * from './types';
