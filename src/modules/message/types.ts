// Interfaces para o módulo de mensagens

// Interface para opções de mensagens
export interface MessageOptions {
  delay?: number;
  quoted?: MessageQuote;
  mentionsEveryOne?: boolean;
  mentioned?: string[];
}

// Interface para citação de mensagem
export interface MessageQuote {
  key?: {
    id: string;
    remoteJid?: string;
    fromMe?: boolean;
  };
  message?: {
    conversation?: string;
    [key: string]: any;
  };
}

// Interface para envio de texto
export interface SendTextOptions extends MessageOptions {
  number: string;
  text: string;
  linkPreview?: boolean;
}

// Interface para envio de mídia
export interface SendMediaOptions extends MessageOptions {
  number: string;
  mediatype: 'image' | 'video' | 'document';
  mimetype: string;
  caption?: string;
  media: string; // url ou base64
  fileName?: string;
}

// Interface para envio de PTV (Played Once Video)
export interface SendPTVOptions extends MessageOptions {
  number: string;
  video: string; // url ou base64
}

// Interface para envio de áudio narrado
export interface SendNarratedAudioOptions extends MessageOptions {
  number: string;
  audio: string; // url ou base64
  encoding?: boolean;
}

// Interface para envio de Status/Stories
export interface SendStatusOptions {
  type: 'text' | 'image' | 'video' | 'audio';
  content: string; // texto ou url
  caption?: string;
  backgroundColor?: string;
  font?: 1 | 2 | 3 | 4 | 5;
  allContacts: boolean;
  statusJidList?: string[];
}

// Interface para envio de sticker
export interface SendStickerOptions extends MessageOptions {
  number: string;
  sticker: string; // url ou base64
}

// Interface para envio de localização
export interface SendLocationOptions extends MessageOptions {
  number: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// Interface para contato
export interface ContactInfo {
  fullName: string;
  wuid: string;
  phoneNumber: string;
  organization?: string;
  email?: string;
  url?: string;
}

// Interface para envio de contato
export interface SendContactOptions extends MessageOptions {
  number: string;
  contact: ContactInfo[];
}

// Interface para envio de reação
export interface SendReactionOptions {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  reaction: string;
}

// Interface para envio de enquete
export interface SendPollOptions extends MessageOptions {
  number: string;
  name: string;
  selectableCount: number;
  values: string[];
}

// Interface para item de lista
export interface ListItem {
  title: string;
  description?: string;
  rowId: string;
}

// Interface para seção de lista
export interface ListSection {
  title: string;
  rows: ListItem[];
}

// Interface para envio de lista
export interface SendListOptions extends MessageOptions {
  number: string;
  title: string;
  description: string;
  buttonText: string;
  sections: ListSection[];
  footer?: string;
}

// Interface para botão
export interface Button {
  buttonId: string;
  buttonText: string;
}

// Interface para envio de botões
export interface SendButtonOptions extends MessageOptions {
  number: string;
  title: string;
  buttons: Button[];
  footer?: string;
  image?: string;
  mediaType?: 'image' | 'video' | 'document';
  mimeType?: string;
}
