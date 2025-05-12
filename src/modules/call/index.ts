import { BaseModule } from '../../core/base-module';

/**
 * Módulo para gerenciamento de chamadas
 */
export class CallModule extends BaseModule {
  /**
   * Simula uma chamada (fake call)
   * @param number Número para o qual será feita a chamada
   * @param type Tipo de chamada ('audio' ou 'video')
   * @param options Opções adicionais
   * @param instanceName Nome da instância (opcional se já definido no módulo)
   * @returns Status da operação
   */
  async fakeCall(
    number: string, 
    type: 'audio' | 'video' = 'audio', 
    options?: { delay?: number }, 
    instanceName?: string
  ): Promise<any> {
    const instance = instanceName || this.getInstance();
    return this.http.post<any>(`/call/fakeCall/${instance}`, {
      number,
      type,
      ...options
    });
  }
}

export * from './types';
