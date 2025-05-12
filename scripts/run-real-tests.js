#!/usr/bin/env node

/**
 * Script para executar testes de integração com API real da Evolution
 * 
 * Este script executa testes de integração específicos para a Evolution API
 * permitindo que o usuário selecione quais módulos deseja testar.
 * 
 * @author Agência FER
 * @version 1.0.0
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
// Carrega variáveis de ambiente do arquivo .env, se existir
try {
  require('dotenv').config();
} catch (error) {
  console.log('Módulo dotenv não encontrado, ignorando arquivo .env');
}

// Cores para log
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para perguntar ao usuário
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Checa se o arquivo de teste real existe
function checkTestFileExists() {
  const testFilePath = path.join(__dirname, '..', 'tests', 'integration', 'real-api-test.ts');
  return fs.existsSync(testFilePath);
}

// Lista os módulos disponíveis para teste
const availableModules = [
  'instance', 
  'message', 
  'chat', 
  'group', 
  'profile', 
  'label', 
  'integrations',
  'call'
];

async function enableMessageTests() {
  const testFilePath = path.join(__dirname, '..', 'tests', 'integration', 'real-api-test.ts');
  
  // Lê o arquivo
  let content = fs.readFileSync(testFilePath, 'utf8');
  
  // Substitui it.skip por it nos testes de mensagem
  content = content.replace(/it\.skip\('deve enviar mensagem de texto'/g, "it('deve enviar mensagem de texto'");
  content = content.replace(/it\.skip\('deve enviar mensagem de imagem via URL'/g, "it('deve enviar mensagem de imagem via URL'");
  
  // Salva as alterações
  fs.writeFileSync(testFilePath, content);
  log('✅ Testes de envio de mensagem habilitados!', colors.green);
}

async function disableMessageTests() {
  const testFilePath = path.join(__dirname, '..', 'tests', 'integration', 'real-api-test.ts');
  
  // Lê o arquivo
  let content = fs.readFileSync(testFilePath, 'utf8');
  
  // Substitui it por it.skip nos testes de mensagem
  content = content.replace(/it\('deve enviar mensagem de texto'/g, "it.skip('deve enviar mensagem de texto'");
  content = content.replace(/it\('deve enviar mensagem de imagem via URL'/g, "it.skip('deve enviar mensagem de imagem via URL'");
  
  // Salva as alterações
  fs.writeFileSync(testFilePath, content);
  log('✅ Testes de envio de mensagem desabilitados!', colors.green);
}

async function main() {
  log('\n🚀 Execução de testes reais com Evolution API', colors.bright);
  
  // Verifica se o arquivo de teste existe
  if (!checkTestFileExists()) {
    log('❌ Arquivo de teste real não encontrado!', colors.red);
    log('Execute primeiro o script de configuração:', colors.yellow);
    log('npm run setup:real-tests\n', colors.cyan);
    rl.close();
    return;
  }
  
  log('\nQuais módulos você deseja testar?', colors.blue);
  log('(Deixe em branco para testar todos os módulos)\n', colors.yellow);
  
  availableModules.forEach((module, index) => {
    log(`${index + 1}. ${module}`, colors.cyan);
  });
  
  log('');
  const selectedModulesInput = await askQuestion('Selecione os módulos (números separados por vírgula, ex: 1,3,5): ');
  
  let testCommand = 'jest tests/integration/real-api-test.ts';
  
  // Se o usuário selecionou módulos específicos
  if (selectedModulesInput.trim()) {
    const selectedIndexes = selectedModulesInput.split(',').map(i => parseInt(i.trim()) - 1);
    const selectedModules = selectedIndexes
      .filter(i => i >= 0 && i < availableModules.length)
      .map(i => availableModules[i]);
    
    if (selectedModules.length > 0) {
      // Constrói a regex para filtrar testes por nome do módulo
      const modulePattern = selectedModules.join('|');
      testCommand += ` -t "${modulePattern}"`;
      
      log('\nMódulos selecionados:', colors.blue);
      selectedModules.forEach(module => log(`- ${module}`, colors.cyan));
    }
  }
  
  // Pergunta se deseja habilitar testes de envio de mensagem
  const enableSending = await askQuestion('\nDeseja habilitar testes de envio de mensagem? (s/n): ');
  if (enableSending.toLowerCase() === 's' || enableSending.toLowerCase() === 'sim') {
    await enableMessageTests();
  } else {
    await disableMessageTests();
  }
  
  // Confirmação final
  log('\n--- Configuração de execução ---', colors.blue);
  log(`Comando: ${testCommand}`, colors.yellow);
  const confirm = await askQuestion('\nExecutar os testes? (s/n): ');
  
  if (confirm.toLowerCase() === 's' || confirm.toLowerCase() === 'sim') {
    log('\n🧪 Executando testes...', colors.bright);
    try {
      execSync(testCommand, { stdio: 'inherit' });
      log('\n✅ Testes concluídos com sucesso!', colors.green);
    } catch (error) {
      log('\n❌ Alguns testes falharam. Verifique os erros acima.', colors.red);
    }
  } else {
    log('❌ Execução cancelada pelo usuário.', colors.red);
  }
  
  rl.close();
}

main().catch(error => {
  console.error('Erro:', error);
  rl.close();
});
