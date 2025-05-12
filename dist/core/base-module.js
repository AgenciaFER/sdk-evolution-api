"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
const types_1 = require("../types");
/**
 * Classe base para todos os módulos da API
 */
class BaseModule {
    /**
     * Cria uma nova instância do módulo
     * @param http Cliente HTTP compartilhado
     * @param instance Nome da instância do WhatsApp (opcional)
     */
    constructor(http, instance) {
        this.http = http;
        this.instance = instance;
    }
    /**
     * Define o nome da instância para o módulo
     * @param instance Nome da instância
     */
    setInstance(instance) {
        this.instance = instance;
        return this;
    }
    /**
     * Obtém o nome da instância atual
     * @returns Nome da instância
     * @throws EvolutionAPIError se nenhuma instância estiver definida
     */
    getInstance() {
        if (!this.instance) {
            throw new types_1.EvolutionAPIError('Instância não definida. Use setInstance() ou defina na inicialização.');
        }
        return this.instance;
    }
    /**
     * Verifica se há uma instância definida
     * @returns true se há uma instância definida
     */
    hasInstance() {
        return !!this.instance;
    }
}
exports.BaseModule = BaseModule;
//# sourceMappingURL=base-module.js.map