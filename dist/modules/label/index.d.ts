import { BaseModule } from '../../core/base-module';
/**
 * Módulo para gerenciamento de etiquetas
 */
export declare class LabelModule extends BaseModule {
    /**
     * Obtém todas as etiquetas
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Lista de etiquetas
     */
    findLabels(instanceName?: string): Promise<any>;
    /**
     * Gerencia etiquetas (adicionar, remover)
     * @param chatId ID do chat
     * @param labelId ID da etiqueta
     * @param action Ação a ser executada ('add' ou 'remove')
     * @param instanceName Nome da instância (opcional se já definido no módulo)
     * @returns Status da operação
     */
    handleLabels(chatId: string, labelId: string, action: 'add' | 'remove', instanceName?: string): Promise<any>;
}
export * from './types';
