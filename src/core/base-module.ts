import { HttpClient } from './http-client';
import { EvolutionAPIError } from '../types';

/**
 * Classe base para todos os módulos da API
 */
export abstract class BaseModule {
  protected http: HttpClient;
  protected instance?: string;
  
  /**
   * Cria uma nova instância do módulo
   * @param http Cliente HTTP compartilhado
   * @param instance Nome da instância do WhatsApp (opcional)
   */
  constructor(http: HttpClient, instance?: string) {
    this.http = http;
    this.instance = instance;
  }
  
  /**
   * Define o nome da instância para o módulo
   * @param instance Nome da instância
   */
  setInstance(instance: string): this {
    this.instance = instance;
    return this;
  }
  
  /**
   * Obtém o nome da instância atual
   * @returns Nome da instância
   * @throws EvolutionAPIError se nenhuma instância estiver definida
   */
  getInstance(): string {
    if (!this.instance) {
      throw new EvolutionAPIError('Instância não definida. Use setInstance() ou defina na inicialização.');
    }
    return this.instance;
  }
  
  /**
   * Verifica se há uma instância definida
   * @returns true se há uma instância definida
   */
  hasInstance(): boolean {
    return !!this.instance;
  }
}
