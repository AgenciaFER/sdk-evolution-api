import { EvolutionAPIConfig } from './types';
import { HttpClient } from './core/http-client';
import { InstanceModule } from './modules/instance';
import { SettingsModule } from './modules/settings';
import { MessageModule } from './modules/message';
import { ChatModule } from './modules/chat';
import { GroupModule } from './modules/group';
import { ProfileModule } from './modules/profile';
import { LabelModule } from './modules/label';
import { ProxyModule } from './modules/proxy';
import { IntegrationsModule } from './modules/integrations';
import { CallModule } from './modules/call';

/**
 * Cliente principal do SDK da Evolution API
 */
export class EvolutionAPI {
  private httpClient: HttpClient;
  
  /**
   * Módulo de gerenciamento de instâncias
   */
  public readonly instance: InstanceModule;
  
  /**
   * Módulo de configurações
   */
  public readonly settings: SettingsModule;
  
  /**
   * Módulo de envio de mensagens
   */
  public readonly message: MessageModule;
  
  /**
   * Módulo de gerenciamento de chats
   */
  public readonly chat: ChatModule;
  
  /**
   * Módulo de gerenciamento de grupos
   */
  public readonly group: GroupModule;
  
  /**
   * Módulo de gerenciamento de perfil
   */
  public readonly profile: ProfileModule;
  
  /**
   * Módulo de etiquetas
   */
  public readonly label: LabelModule;
  
  /**
   * Módulo de proxy
   */
  public readonly proxy: ProxyModule;
  
  /**
   * Módulo de integrações
   */
  public readonly integrations: IntegrationsModule;
  
  /**
   * Módulo de chamadas
   */
  public readonly call: CallModule;
  
  /**
   * Cria uma nova instância do cliente Evolution API
   * @param config Configuração do cliente
   */
  constructor(config: EvolutionAPIConfig) {
    // Validar URL base
    if (!config.baseUrl) {
      throw new Error('A URL base (baseUrl) é obrigatória para inicializar o cliente.');
    }
    
    // Remover barra no final da baseUrl se existir
    if (config.baseUrl.endsWith('/')) {
      config.baseUrl = config.baseUrl.slice(0, -1);
    }
    
    // Criar cliente HTTP
    this.httpClient = new HttpClient(config);
    
    // Inicializar módulos
    this.instance = new InstanceModule(this.httpClient);
    this.settings = new SettingsModule(this.httpClient);
    this.message = new MessageModule(this.httpClient);
    this.chat = new ChatModule(this.httpClient);
    this.group = new GroupModule(this.httpClient);
    this.profile = new ProfileModule(this.httpClient);
    this.label = new LabelModule(this.httpClient);
    this.proxy = new ProxyModule(this.httpClient);
    this.integrations = new IntegrationsModule(this.httpClient);
    this.call = new CallModule(this.httpClient);
  }
  
  /**
   * Define o nome da instância para todos os módulos
   * @param instance Nome da instância
   * @returns Cliente Evolution API com a instância configurada
   */
  useInstance(instance: string): this {
    this.instance.setInstance(instance);
    this.settings.setInstance(instance);
    this.message.setInstance(instance);
    this.chat.setInstance(instance);
    this.group.setInstance(instance);
    this.profile.setInstance(instance);
    this.label.setInstance(instance);
    this.proxy.setInstance(instance);
    this.integrations.setInstance(instance);
    this.call.setInstance(instance);
    
    return this;
  }
}

// Exportar classes e tipos
export * from './types';
export * from './core/http-client';
export * from './core/base-module';
