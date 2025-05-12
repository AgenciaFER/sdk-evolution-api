import { BaseModule } from '../../core/base-module';
/**
 * Módulo para gerenciamento de chamadas
 */
export declare class CallModule extends BaseModule {
    /**
     * Simula uma chamada (fake call)
     * @param number Número para o qual será feita a chamada
     * @param type Tipo de chamada ('audio' ou 'video')
     * @param options Opções adicionais
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    fakeCall(number: string, type?: 'audio' | 'video', options?: {
        delay?: number;
    }, instanceName?: string): Promise<any>;
}
export * from './types';
