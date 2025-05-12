import { BaseModule } from '../../core/base-module';
import {
  SendTextOptions,
  SendMediaOptions,
  SendPTVOptions,
  SendNarratedAudioOptions,
  SendStatusOptions,
  SendStickerOptions,
  SendLocationOptions,
  SendContactOptions,
  SendReactionOptions,
  SendPollOptions,
  SendListOptions,
  SendButtonOptions,
} from './types';

/**
 * Módulo para envio de mensagens
 */
export class MessageModule extends BaseModule {
  /**
   * Envia uma mensagem de texto
   * @param options Opções para envio do texto
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendText(options: SendTextOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendText/${instance}`, options);
  }

  /**
   * Envia uma mensagem com mídia (imagem, vídeo ou documento)
   * @param options Opções para envio de mídia
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendMedia(options: SendMediaOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendMedia/${instance}`, options);
  }

  /**
   * Envia um vídeo que só pode ser visto uma vez (PTV)
   * @param options Opções para envio do vídeo
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendPtv(options: SendPTVOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendPtv/${instance}`, options);
  }

  /**
   * Envia um áudio narrado (aparece como mensagem de voz)
   * @param options Opções para envio do áudio
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendNarratedAudio(options: SendNarratedAudioOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendWhatsAppAudio/${instance}`, options);
  }

  /**
   * Envia um status/story (para contatos específicos ou todos)
   * @param options Opções para envio do status/story
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendStatus(options: SendStatusOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendStatus/${instance}`, options);
  }

  /**
   * Envia um sticker
   * @param options Opções para envio do sticker
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendSticker(options: SendStickerOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendSticker/${instance}`, options);
  }

  /**
   * Envia uma localização
   * @param options Opções para envio da localização
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendLocation(options: SendLocationOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendLocation/${instance}`, options);
  }

  /**
   * Envia um ou mais contatos
   * @param options Opções para envio dos contatos
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendContact(options: SendContactOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendContact/${instance}`, options);
  }

  /**
   * Envia uma reação a uma mensagem
   * @param options Opções para envio da reação
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendReaction(options: SendReactionOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendReaction/${instance}`, options);
  }

  /**
   * Envia uma enquete
   * @param options Opções para envio da enquete
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendPoll(options: SendPollOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendPoll/${instance}`, options);
  }

  /**
   * Envia uma mensagem com lista de opções
   * @param options Opções para envio da lista
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendList(options: SendListOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendList/${instance}`, options);
  }

  /**
   * Envia uma mensagem com botões
   * @param options Opções para envio dos botões
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async sendButton(options: SendButtonOptions, instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/message/sendButton/${instance}`, options);
  }
}

export * from './types';
