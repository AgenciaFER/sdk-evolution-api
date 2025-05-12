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
exports.IntegrationsModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para integrações com sistemas externos
 */
class IntegrationsModule extends base_module_1.BaseModule {
    /**
     * Configura um webhook para receber eventos
     * @param url URL do webhook
     * @param events Lista de eventos para escutar
     * @param options Opções adicionais
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async setWebhook(url, events, options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/webhook/set/${instance}`, {
            url,
            webhook: {
                url,
                enabled: options?.enabled ?? true,
                base64: options?.base64 ?? false,
                events,
                headers: options?.headers
            }
        });
    }
    /**
     * Configura um chatbot baseado em fluxo
     * @param enabled Ativa ou desativa o chatbot
     * @param options Opções de configuração
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async setChatbot(enabled, options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/chatbot/set/${instance}`, {
            enabled,
            ...options
        });
    }
    /**
     * Configura armazenamento em nuvem para arquivos de mídia
     * @param provider Provedor de armazenamento ('minio', 's3', etc.)
     * @param config Configurações do provedor
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async setStorage(provider, config, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/storage/set/${instance}`, {
            provider,
            config
        });
    }
}
exports.IntegrationsModule = IntegrationsModule;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map