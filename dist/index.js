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
exports.EvolutionAPI = void 0;
const http_client_1 = require("./core/http-client");
const instance_1 = require("./modules/instance");
const settings_1 = require("./modules/settings");
const message_1 = require("./modules/message");
const chat_1 = require("./modules/chat");
const group_1 = require("./modules/group");
const profile_1 = require("./modules/profile");
const label_1 = require("./modules/label");
const proxy_1 = require("./modules/proxy");
const integrations_1 = require("./modules/integrations");
const call_1 = require("./modules/call");
/**
 * Cliente principal do SDK da Evolution API
 */
class EvolutionAPI {
    /**
     * Cria uma nova instância do cliente Evolution API
     * @param config Configuração do cliente
     */
    constructor(config) {
        // Validar URL base
        if (!config.baseUrl) {
            throw new Error('A URL base (baseUrl) é obrigatória para inicializar o cliente.');
        }
        // Remover barra no final da baseUrl se existir
        if (config.baseUrl.endsWith('/')) {
            config.baseUrl = config.baseUrl.slice(0, -1);
        }
        // Criar cliente HTTP
        this.httpClient = new http_client_1.HttpClient(config);
        // Inicializar módulos
        this.instance = new instance_1.InstanceModule(this.httpClient);
        this.settings = new settings_1.SettingsModule(this.httpClient);
        this.message = new message_1.MessageModule(this.httpClient);
        this.chat = new chat_1.ChatModule(this.httpClient);
        this.group = new group_1.GroupModule(this.httpClient);
        this.profile = new profile_1.ProfileModule(this.httpClient);
        this.label = new label_1.LabelModule(this.httpClient);
        this.proxy = new proxy_1.ProxyModule(this.httpClient);
        this.integrations = new integrations_1.IntegrationsModule(this.httpClient);
        this.call = new call_1.CallModule(this.httpClient);
    }
    /**
     * Define o nome da instância para todos os módulos
     * @param instance Nome da instância
     * @returns Cliente Evolution API com a instância configurada
     */
    useInstance(instance) {
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
exports.EvolutionAPI = EvolutionAPI;
// Exportar classes e tipos
__exportStar(require("./types"), exports);
__exportStar(require("./core/http-client"), exports);
__exportStar(require("./core/base-module"), exports);
//# sourceMappingURL=index.js.map