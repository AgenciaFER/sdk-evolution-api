// Interfaces para o módulo de proxy
export interface ProxyConfig {
  enabled: boolean;
  host: string;
  port: string;
  protocol: string;
  username?: string;
  password?: string;
}
