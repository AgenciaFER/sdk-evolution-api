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
exports.CallModule = void 0;
const base_module_1 = require("../../core/base-module");
/**
 * Módulo para gerenciamento de chamadas
 */
class CallModule extends base_module_1.BaseModule {
    /**
     * Simula uma chamada (fake call)
     * @param number Número para o qual será feita a chamada
     * @param type Tipo de chamada ('audio' ou 'video')
     * @param options Opções adicionais
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    async fakeCall(number, type = 'audio', options, instanceName) {
        const instance = instanceName || this.getInstance();
        return this.http.post(`/call/fakeCall/${instance}`, {
            number,
            type,
            ...options
        });
    }
}
exports.CallModule = CallModule;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map