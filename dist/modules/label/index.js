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
exports.LabelModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para gerenciamento de etiquetas
 */
class LabelModule extends base_module_1.BaseModule {
    /**
     * Obtém todas as etiquetas
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Lista de etiquetas
     */
    async findLabels(instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.get(`/label/findLabels/${instance}`);
    }
    /**
     * Gerencia etiquetas (adicionar, remover)
     * @param chatId ID do chat
     * @param labelId ID da etiqueta
     * @param action Ação a ser executada ('add' ou 'remove')
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async handleLabels(chatId, labelId, action, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/label/handleLabels/${instance}`, {
            chatId,
            labelId,
            action
        });
    }
}
exports.LabelModule = LabelModule;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map