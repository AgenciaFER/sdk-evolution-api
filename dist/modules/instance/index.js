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
exports.InstanceModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para gerenciamento de instâncias do WhatsApp
 */
class InstanceModule extends base_module_1.BaseModule {
    /**
     * Cria uma nova instância do WhatsApp
     * @param options Opções para criação da instância
     * @returns Informações da instância criada
     */
    async create(options) {
        return this.http.post('/instance/create', options);
    }
    /**
     * Lista todas as instâncias disponíveis
     * @returns Lista de instâncias
     */
    async fetchInstances() {
        return this.http.get('/instance/fetchInstances');
    }
    /**
     * Conecta a uma instância existente
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da conexão
     */
    async connect(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.get(`/instance/connect/${instance}`);
    }
    /**
     * Reinicia uma instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async restart(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/instance/restart/${instance}`);
    }
    /**
     * Define o status de presença (online/offline)
     * @param options Opções de presença
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async setPresence(options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/instance/setPresence/${instance}`, options);
    }
    /**
     * Obtém o status de conexão da instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status de conexão
     */
    async getConnectionState(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.get(`/instance/connectionState/${instance}`);
    }
    /**
     * Desconecta a instância (logout)
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async logout(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.delete(`/instance/logout/${instance}`);
    }
    /**
     * Remove completamente uma instância
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async delete(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.delete(`/instance/delete/${instance}`);
    }
}
exports.InstanceModule = InstanceModule;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map