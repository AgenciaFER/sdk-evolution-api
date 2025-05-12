// Vamos definir todas as interfaces necessárias para o módulo Instance
export interface CreateInstanceOptions {
  // Configurações obrigatórias
  instanceName: string;
  
  // Configurações opcionais
  token?: string;
  number?: string;
  qrcode?: boolean;
  integration?: 'WHATSAPP-BAILEYS' | 'WHATSAPP-BUSINESS' | 'EVOLUTION';
  
  // Configurações adicionais
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
  
  // Proxy
  proxyHost?: string;
  proxyPort?: string;
  proxyProtocol?: string;
  proxyUsername?: string;
  proxyPassword?: string;
  
  // Webhook
  webhook?: {
    url: string;
    byEvents?: boolean;
    base64?: boolean;
    headers?: Record<string, string>;
    events?: WebhookEvent[];
  };
  
  // RabbitMQ
  rabbitmq?: {
    enabled: boolean;
    events: WebhookEvent[];
  };
  
  // SQS
  sqs?: {
    enabled: boolean;
    events: WebhookEvent[];
  };
  
  // Chatwoot
  chatwootAccountId?: string;
  chatwootToken?: string;
  chatwootUrl?: string;
  chatwootSignMsg?: boolean;
  chatwootReopenConversation?: boolean;
  chatwootConversationPending?: boolean;
  chatwootImportContacts?: boolean;
  chatwootNameInbox?: string;
  chatwootMergeBrazilContacts?: boolean;
  chatwootImportMessages?: boolean;
  chatwootDaysLimitImportMessages?: number;
  chatwootOrganization?: string;
  chatwootLogo?: string;
}

export type WebhookEvent =
  | 'APPLICATION_STARTUP'
  | 'QRCODE_UPDATED'
  | 'MESSAGES_SET'
  | 'MESSAGES_UPSERT'
  | 'MESSAGES_UPDATE'
  | 'MESSAGES_DELETE'
  | 'SEND_MESSAGE'
  | 'CONTACTS_SET'
  | 'CONTACTS_UPSERT'
  | 'CONTACTS_UPDATE'
  | 'PRESENCE_UPDATE'
  | 'CHATS_SET'
  | 'CHATS_UPSERT'
  | 'CHATS_UPDATE'
  | 'CHATS_DELETE'
  | 'GROUPS_UPSERT'
  | 'GROUP_UPDATE'
  | 'GROUP_PARTICIPANTS_UPDATE'
  | 'CONNECTION_UPDATE'
  | 'LABELS_EDIT'
  | 'LABELS_ASSOCIATION'
  | 'CALL'
  | 'TYPEBOT_START'
  | 'TYPEBOT_CHANGE_STATUS';

export interface SetPresenceOptions {
  presence: 'available' | 'unavailable';
}

export interface Instance {
  instanceName: string;
  status?: string;
  qrcode?: {
    code?: string;
    base64?: string;
  };
  connection?: {
    state?: string;
    date?: Date;
    browser?: string;
  };
}
