#!/usr/bin/env node

/**
 * Script para preparar e publicar o pacote no NPM
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para log
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function execCmd(command) {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    log(`Erro ao executar: ${command}`, colors.red);
    log(error.message, colors.red);
    process.exit(1);
  }
}

// Verifica se estamos na raiz do projeto
if (!fs.existsSync('./package.json')) {
  log('Este script deve ser executado na raiz do projeto!', colors.red);
  process.exit(1);
}

// Etapas para publicação
log('🚀 Iniciando processo de publicação do pacote...', colors.bright);

// 1. Limpar diretório de build anterior se existir
log('\n📦 Limpando diretório de build anterior...', colors.blue);
if (fs.existsSync('./dist')) {
  fs.rmSync('./dist', { recursive: true, force: true });
  log('✅ Diretório de build anterior removido com sucesso!', colors.green);
}

// 2. Instalar dependências
log('\n📦 Instalando dependências...', colors.blue);
execCmd('npm install');
log('✅ Dependências instaladas com sucesso!', colors.green);

// 3. Executar testes
log('\n🧪 Executando testes...', colors.blue);
execCmd('npm test');
log('✅ Testes executados com sucesso!', colors.green);

// 4. Fazer o build do projeto
log('\n🛠️ Realizando build do projeto...', colors.blue);
execCmd('npm run build');
log('✅ Build realizado com sucesso!', colors.green);

// 5. Verificar se o usuário está logado no npm
log('\n🔑 Verificando login no NPM...', colors.blue);
try {
  const whoami = execSync('npm whoami', { stdio: 'pipe' }).toString().trim();
  log(`✅ Logado como: ${whoami}`, colors.green);
} catch (error) {
  log('❌ Você não está logado no NPM.', colors.red);
  log('📝 Execute "npm login" e tente novamente.', colors.yellow);
  process.exit(1);
}

// 6. Confirmar publicação
log('\n⚠️ Pronto para publicar o pacote no NPM.', colors.yellow);
log('📝 Verifique a versão em package.json antes de continuar.', colors.yellow);
log('📝 Use "npm version patch|minor|major" para atualizar a versão se necessário.', colors.yellow);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Deseja continuar com a publicação? (s/n) ', (answer) => {
  readline.close();
  
  if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
    // 7. Publicar no NPM
    log('\n🚀 Publicando pacote no NPM...', colors.blue);
    execCmd('npm publish');
    log('✅ Pacote publicado com sucesso!', colors.green);
    
    log('\n🎉 Processo de publicação concluído com sucesso! 🎉', colors.bright);
  } else {
    log('\n❌ Publicação cancelada pelo usuário.', colors.red);
  }
});
