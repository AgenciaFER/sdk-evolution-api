#!/usr/bin/env node

/**
 * Script para verificar se o SDK consegue se conectar à API da Evolution.
 * Este é um teste básico de conexão usando as variáveis de ambiente.
 */

require('dotenv').config();
const { EvolutionAPI } = require('../dist');

// Obtém configurações do .env
const API_URL = process.env.EVOLUTION_API_URL;
const API_KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE;

if (!API_URL || !INSTANCE_NAME) {
  console.error('❌ Erro: URL da API e nome da instância são obrigatórios.');
  console.error('Configure as variáveis EVOLUTION_API_URL e EVOLUTION_API_INSTANCE no arquivo .env');
  process.exit(1);
}

console.log('🔍 Verificando conexão com Evolution API');
console.log(`URL: ${API_URL}`);
console.log(`Instância: ${INSTANCE_NAME}`);
console.log(`API Key: ${API_KEY ? '********' : 'Não configurada'}`);

// Inicializa SDK
const api = new EvolutionAPI({
  baseUrl: API_URL,
  apiKey: API_KEY,
  debug: true
});

// Define instância
api.instance.setInstance(INSTANCE_NAME);

// Tenta obter estado da conexão
console.log('\n📡 Verificando estado da conexão...');

api.instance.getConnectionState()
  .then(response => {
    console.log(`✅ Conexão bem sucedida! Estado: ${response.state || 'desconhecido'}`);
    console.log('Detalhes da resposta:', JSON.stringify(response, null, 2));
  })
  .catch(error => {
    console.error('❌ Falha na conexão!');
    if (error.response?.data) {
      console.error('Detalhes do erro:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Mensagem de erro:', error.message);
    }
    
    if (error.statusCode === 401) {
      console.log('\n⚠️  Erro de autenticação (401). Possíveis causas:');
      console.log('1. API Key inválida ou não fornecida');
      console.log('2. API requer autenticação');
      console.log('\nSolução: Configure a variável EVOLUTION_API_KEY no arquivo .env');
    }
  });
