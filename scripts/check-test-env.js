#!/usr/bin/env node

/**
 * Test Environment Status Check
 * 
 * Este script verifica o status do ambiente de testes da Evolution API.
 * Útil para validar rapidamente se as configurações estão corretas.
 */

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { EvolutionAPI } = require('../dist');

// Carrega variáveis de ambiente
dotenv.config();

// Cores para o console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bright: '\x1b[1m'
};

// Função para colorir a saída
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Verifica o status do ambiente de testes
 */
async function checkEnvironment() {
  log('\n🔍 Verificando ambiente de testes da Evolution API SDK...', colors.bright);

  // 1. Verificar arquivo .env
  const envFile = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envFile)) {
    log('❌ Arquivo .env não encontrado. Execute npm run setup:real-tests para configurar.', colors.red);
    return false;
  }

  // 2. Verificar variáveis de ambiente necessárias
  const requiredVars = ['EVOLUTION_API_URL', 'EVOLUTION_API_INSTANCE'];
  const missingVars = requiredVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    log(`❌ Variáveis de ambiente faltantes: ${missingVars.join(', ')}`, colors.red);
    return false;
  }

  log('✅ Arquivo .env encontrado com configurações básicas', colors.green);
  
  // 3. Mostrar resumo das configurações
  log('\n📝 Configurações encontradas:', colors.blue);
  log(`URL da API: ${process.env.EVOLUTION_API_URL}`, colors.yellow);
  log(`Instância: ${process.env.EVOLUTION_API_INSTANCE}`, colors.yellow);
  log(`Número para teste: ${process.env.TEST_PHONE || '(não configurado)'}`, colors.yellow);
  log(`API Key configurada: ${process.env.EVOLUTION_API_KEY ? 'Sim' : 'Não'}`, colors.yellow);
  log(`Envio de mensagens nos testes: ${process.env.TEST_SEND_MESSAGE === 'true' ? 'Ativado' : 'Desativado'}`, colors.yellow);

  // 4. Tentar se conectar à API
  try {
    log('\n🔄 Tentando conectar à Evolution API...', colors.blue);
    
    // Inicializa o SDK com configurações atuais
    const api = new EvolutionAPI({ 
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: false, 
      timeout: 15000,
      maxRetries: 1
    });

    const instanceName = process.env.EVOLUTION_API_INSTANCE;
    api.instance.setInstance(instanceName);
    
    // Verifica estado da conexão
    const response = await api.instance.getConnectionState();
    
    if (response && response.instance && response.instance.state) {
      const state = response.instance.state.toLowerCase();
      
      if (state === 'open' || state === 'connected') {
        log(`✅ Conexão estabelecida com sucesso! Estado: ${state}`, colors.green);
      } else {
        log(`⚠️ Instância encontrada, mas não está conectada. Estado: ${state}`, colors.yellow);
      }
    } else {
      log('❌ Formato de resposta inesperado:', colors.red);
      console.log(response);
    }
  } catch (error) {
    log('❌ Erro ao conectar com a API:', colors.red);
    if (error.response) {
      console.error(error.response.data || error.message);
    } else {
      console.error(error.message);
    }
    return false;
  }

  log('\n📋 Próximos passos possíveis:', colors.blue);
  log('- Execute npm run test:real para rodar os testes com a API real', colors.cyan);
  log('- Execute npm run setup:real-tests para reconfigurar o ambiente', colors.cyan);
  
  return true;
}

// Executa a verificação
checkEnvironment().catch(error => {
  log('\n❌ Ocorreu um erro inesperado durante a verificação:', colors.red);
  console.error(error);
  process.exit(1);
});
