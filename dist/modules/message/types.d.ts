export interface MessageOptions {
    delay?: number;
    quoted?: MessageQuote;
    mentionsEveryOne?: boolean;
    mentioned?: string[];
}
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
export interface SendTextOptions extends MessageOptions {
    number: string;
    text: string;
    linkPreview?: boolean;
}
export interface SendMediaOptions extends MessageOptions {
    number: string;
    mediatype: 'image' | 'video' | 'document';
    mimetype: string;
    caption?: string;
    media: string;
    fileName?: string;
}
export interface SendPTVOptions extends MessageOptions {
    number: string;
    video: string;
}
export interface SendNarratedAudioOptions extends MessageOptions {
    number: string;
    audio: string;
    encoding?: boolean;
}
export interface SendStatusOptions {
    type: 'text' | 'image' | 'video' | 'audio';
    content: string;
    caption?: string;
    backgroundColor?: string;
    font?: 1 | 2 | 3 | 4 | 5;
    allContacts: boolean;
    statusJidList?: string[];
}
export interface SendStickerOptions extends MessageOptions {
    number: string;
    sticker: string;
}
export interface SendLocationOptions extends MessageOptions {
    number: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}
export interface ContactInfo {
    fullName: string;
    wuid: string;
    phoneNumber: string;
    organization?: string;
    email?: string;
    url?: string;
}
export interface SendContactOptions extends MessageOptions {
    number: string;
    contact: ContactInfo[];
}
export interface SendReactionOptions {
    key: {
        remoteJid: string;
        fromMe: boolean;
        id: string;
    };
    reaction: string;
}
export interface SendPollOptions extends MessageOptions {
    number: string;
    name: string;
    selectableCount: number;
    values: string[];
}
export interface ListItem {
    title: string;
    description?: string;
    rowId: string;
}
export interface ListSection {
    title: string;
    rows: ListItem[];
}
export interface SendListOptions extends MessageOptions {
    number: string;
    title: string;
    description: string;
    buttonText: string;
    sections: ListSection[];
    footer?: string;
}
export interface Button {
    buttonId: string;
    buttonText: string;
}
export interface SendButtonOptions extends MessageOptions {
    number: string;
    title: string;
    buttons: Button[];
    footer?: string;
    image?: string;
    mediaType?: 'image' | 'video' | 'document';
    mimeType?: string;
}
