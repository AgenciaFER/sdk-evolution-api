import { BaseModule } from '../../core/base-module';

/**
 * Módulo para gerenciamento de etiquetas
 */
export class LabelModule extends BaseModule {
  /**
   * Obtém todas as etiquetas
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Lista de etiquetas
   */
  async findLabels(instanceName?: string): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.get<any>(`/label/findLabels/${instance}`);
  }

  /**
   * Gerencia etiquetas (adicionar, remover)
   * @param chatId ID do chat
   * @param labelId ID da etiqueta
   * @param action Ação a ser executada ('add' ou 'remove')
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async handleLabels(
    chatId: string,
    labelId: string,
    action: 'add' | 'remove',
    instanceName?: string
  ): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/label/handleLabels/${instance}`, {
      chatId,
      labelId,
      action
    });
  }
}

export * from './types';
