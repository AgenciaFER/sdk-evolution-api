#!/usr/bin/env node

/**
 * Script para execução dos testes completos da API
 * 
 * Este script prepara o ambiente e executa testes completos com todas
 * as funcionalidades da Evolution API.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Cores para console
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

// Interface de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para fazer perguntas
function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

// Função para log com cores
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Função principal
async function main() {
  log('\n🔬 EXECUÇÃO DE TESTES COMPLETOS DA EVOLUTION API', colors.bright);
  log('Este script executará testes para todas as funcionalidades da API.\n');
  
  // 1. Verificar se o ambiente está configurado
  log('1. Verificando configurações do ambiente...', colors.blue);
  const envFile = path.join(__dirname, '..', '.env');
  
  if (!fs.existsSync(envFile)) {
    log('❌ Arquivo .env não encontrado!', colors.red);
    const setupNow = await askQuestion('Deseja configurar o ambiente agora? (s/n): ');
    
    if (setupNow.toLowerCase() === 's' || setupNow.toLowerCase() === 'sim') {
      log('\nExecutando script de configuração...', colors.yellow);
      try {
        execSync('npm run setup:real-tests', { stdio: 'inherit' });
      } catch (error) {
        log('❌ Falha na configuração do ambiente. Por favor, configure manualmente.', colors.red);
        rl.close();
        return;
      }
    } else {
      log('❌ Configuração cancelada. Execute npm run setup:real-tests para configurar o ambiente.', colors.red);
      rl.close();
      return;
    }
  }
  
  // 2. Verificar se a variável TEST_SEND_MESSAGE está habilitada
  require('dotenv').config();
  const sendMessagesEnabled = process.env.TEST_SEND_MESSAGE === 'true';
  
  if (!sendMessagesEnabled) {
    log('\n⚠️ ATENÇÃO: Testes de envio de mensagens estão DESABILITADOS!', colors.yellow);
    log('Para habilitar o envio de mensagens, defina TEST_SEND_MESSAGE=true no arquivo .env', colors.yellow);
    
    const enableSending = await askQuestion('\nDeseja habilitar o envio de mensagens para este teste? (s/n): ');
    
    if (enableSending.toLowerCase() === 's' || enableSending.toLowerCase() === 'sim') {
      log('\nHabilitando envio de mensagens temporariamente...', colors.yellow);
      // Atualiza o arquivo .env
      const envContent = fs.readFileSync(envFile, 'utf8');
      const updatedContent = envContent.replace(/TEST_SEND_MESSAGE=.*/g, 'TEST_SEND_MESSAGE=true');
      fs.writeFileSync(envFile, updatedContent);
    } else {
      log('\n⚠️ Continuando com o envio de mensagens DESABILITADO.', colors.yellow);
      log('Alguns testes serão pulados.', colors.yellow);
    }
  }
  
  // 3. Criar diretório para arquivos de teste
  const testFilesDir = path.join(__dirname, '..', 'test-files');
  
  if (!fs.existsSync(testFilesDir)) {
    log('\nCriando diretório para arquivos de teste...', colors.blue);
    fs.mkdirSync(testFilesDir, { recursive: true });
  }
  
  // 4. Perguntar se deseja executar os testes agora
  const runNow = await askQuestion('\nDeseja executar os testes completos agora? (s/n): ');
  
  if (runNow.toLowerCase() === 's' || runNow.toLowerCase() === 'sim') {
    log('\n🚀 Iniciando execução dos testes completos...', colors.bright);
    log('(Isso pode levar alguns minutos)', colors.yellow);
    
    try {
      execSync('npm run test:real:complete', { stdio: 'inherit' });
      log('\n✅ Todos os testes foram concluídos!', colors.green);
    } catch (error) {
      log('\n⚠️ Alguns testes falharam. Verifique os erros acima.', colors.yellow);
    }
  } else {
    log('\n❌ Execução cancelada. Para executar os testes manualmente, use:', colors.red);
    log('npm run test:real:complete', colors.cyan);
  }
  
  rl.close();
}

// Executar script principal
main().catch(error => {
  console.error('Erro:', error);
  rl.close();
  process.exit(1);
});
