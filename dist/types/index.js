"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionAPIError = void 0;
/**
 * Classe de erro customizada para o SDK
 */
class EvolutionAPIError extends Error {
    /**
     * Construtor para o erro da API
     */
    constructor(message, statusCode, response, endpoint) {
        super(message);
        this.name = 'EvolutionAPIError';
        this.statusCode = statusCode;
        this.response = response;
        this.endpoint = endpoint;
    }
}
exports.EvolutionAPIError = EvolutionAPIError;
//# sourceMappingURL=index.js.map