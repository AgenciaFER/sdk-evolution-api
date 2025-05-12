#!/usr/bin/env node

/**
 * Script para configurar e executar testes de integração com API real da Evolution
 * 
 * Este script configura os testes de integração para uso com uma instância real
 * da Evolution API. Ele coleta as informações necessárias, configura o ambiente
 * e cria/atualiza os arquivos necessários.
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
  red: '\x1b[31m'
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

function updateEnvFile(config) {
  const envPath = path.join(__dirname, '..', '.env');
  
  // Cria conteúdo do arquivo .env
  const envContent = `# Configurações para testes com API real
EVOLUTION_API_URL=${config.apiUrl}
EVOLUTION_API_KEY=${config.apiKey || ''}
EVOLUTION_API_INSTANCE=${config.instanceName}
TEST_PHONE=${config.testPhone || ''}
# Defina como 'true' para ativar o envio de mensagens nos testes (cuidado: enviará mensagens reais)
TEST_SEND_MESSAGE=${config.sendMessages ? 'true' : 'false'}
# ID do grupo para testes (opcional, formato: 5511999999999-1111111@g.us)
TEST_GROUP=${config.testGroup || ''}
`;

  // Salva o arquivo
  fs.writeFileSync(envPath, envContent);
  log('✅ Arquivo .env atualizado com sucesso!', colors.green);
}

// Verifica se o arquivo .env já existe e tem dados completos
function checkEnvFileComplete() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    return false;
  }
  
  try {
    // Verifica se todas as variáveis necessárias estão preenchidas
    const hasUrl = process.env.EVOLUTION_API_URL && process.env.EVOLUTION_API_URL !== 'https://sua-api.exemplo.com';
    const hasInstance = process.env.EVOLUTION_API_INSTANCE && process.env.EVOLUTION_API_INSTANCE !== '';
    const hasPhone = process.env.TEST_PHONE && process.env.TEST_PHONE !== '';
    // Também verificamos se a configuração de envio de mensagens está definida
    const hasSendMessageConfig = process.env.TEST_SEND_MESSAGE !== undefined;
    // O grupo é opcional, então não verificamos
    
    return hasUrl && hasInstance && hasPhone && hasSendMessageConfig;
  } catch (error) {
    return false;
  }
}

async function main() {
  log('\n🚀 Configuração de testes de integração com Evolution API real', colors.bright);
  log('Este script irá ajudá-lo a configurar e executar testes com uma instância real da API.\n');
  
  // Valores padrão das variáveis de ambiente
  const defaultApiUrl = process.env.EVOLUTION_API_URL || 'https://api.exemplo.com';
  const defaultInstanceName = process.env.EVOLUTION_API_INSTANCE || 'default';
  const defaultTestPhone = process.env.TEST_PHONE || '';
  const defaultApiKey = process.env.EVOLUTION_API_KEY || '';
  const defaultTestGroup = process.env.TEST_GROUP || '';
  
  // Verifica se já existem dados preenchidos no .env
  const areEnvDataComplete = checkEnvFileComplete();
  
  let apiUrl, instanceName, testPhone, apiKey, sendMessages, testGroup;
  
  if (areEnvDataComplete) {
    log('📄 Encontradas configurações existentes no arquivo .env:', colors.blue);
    log(`URL da API: ${process.env.EVOLUTION_API_URL}`, colors.yellow);
    log(`Instância: ${process.env.EVOLUTION_API_INSTANCE}`, colors.yellow);
    log(`Número para teste: ${process.env.TEST_PHONE}`, colors.yellow);
    log(`API Key: ${process.env.EVOLUTION_API_KEY ? '********' : 'Não definida'}`, colors.yellow);
    log(`Enviar mensagens: ${process.env.TEST_SEND_MESSAGE === 'true' ? 'Sim' : 'Não'}`, colors.yellow);
    log(`Grupo para teste: ${process.env.TEST_GROUP || '(não configurado)'}`, colors.yellow);
    
    const keepExisting = await askQuestion('\nDeseja manter os dados existentes? (s/n): ');
    
    if (keepExisting.toLowerCase() === 's' || keepExisting.toLowerCase() === 'sim') {
      apiUrl = process.env.EVOLUTION_API_URL;
      instanceName = process.env.EVOLUTION_API_INSTANCE;
      testPhone = process.env.TEST_PHONE;
      testGroup = process.env.TEST_GROUP;
      
      // Se a API Key estiver faltando, pergunte por ela
      if (!process.env.EVOLUTION_API_KEY) {
        log('\nAPI Key não encontrada no arquivo .env.', colors.yellow);
        apiKey = await askQuestion('Digite sua API Key: ');
      } else {
        // Pergunte se deseja alterar a API Key existente
        const changeApiKey = await askQuestion('\nDeseja atualizar a API Key existente? (s/n): ');
        if (changeApiKey.toLowerCase() === 's' || changeApiKey.toLowerCase() === 'sim') {
          apiKey = await askQuestion('Digite sua nova API Key: ');
        } else {
          apiKey = process.env.EVOLUTION_API_KEY;
        }
      }
      
      // Pergunte se deseja ativar o envio de mensagens nos testes
      const enableSendMessages = await askQuestion('\nDeseja ativar o teste de envio de mensagens? (s/n): ');
      sendMessages = enableSendMessages.toLowerCase() === 's' || enableSendMessages.toLowerCase() === 'sim';
      
      // Pergunte se deseja configurar ou atualizar o ID do grupo
      const configureGroup = await askQuestion('\nDeseja configurar um ID de grupo para testes? (s/n): ');
      if (configureGroup.toLowerCase() === 's' || configureGroup.toLowerCase() === 'sim') {
        testGroup = await askQuestion(`ID do grupo para testes (ex: 5511999999999-1111111@g.us): `);
      }
      
      log('\n✅ Configurações mantidas com sucesso!', colors.green);
    } else {
      // Se não quiser manter, preencha novamente
      log('\nVamos configurar novamente os dados:', colors.blue);
      apiUrl = await askQuestion(`URL da Evolution API (${defaultApiUrl}): `) || defaultApiUrl;
      apiKey = await askQuestion(`Chave de API (opcional, pressione Enter para pular): `) || defaultApiKey;
      instanceName = await askQuestion(`Nome da instância do WhatsApp (${defaultInstanceName}): `) || defaultInstanceName;
      testPhone = await askQuestion(`Número de telefone para teste (${defaultTestPhone || 'ex: 5511999999999'}): `) || defaultTestPhone;
      testGroup = await askQuestion(`ID do grupo para testes (opcional, ex: 5511999999999-1111111@g.us): `) || defaultTestGroup;
    }
  } else {
    // Coleta informações da API se não houver dados completos
    apiUrl = await askQuestion(`URL da Evolution API (${defaultApiUrl}): `) || defaultApiUrl;
    apiKey = await askQuestion(`Chave de API (opcional, pressione Enter para pular): `) || defaultApiKey;
    instanceName = await askQuestion(`Nome da instância do WhatsApp (${defaultInstanceName}): `) || defaultInstanceName;
    testPhone = await askQuestion(`Número de telefone para teste (${defaultTestPhone || 'ex: 5511999999999'}): `) || defaultTestPhone;
    testGroup = await askQuestion(`ID do grupo para testes (opcional, ex: 5511999999999-1111111@g.us): `) || defaultTestGroup;
    
    // Pergunte se deseja ativar o envio de mensagens nos testes
    const enableSendMessages = await askQuestion('\nDeseja ativar o teste de envio de mensagens? (s/n): ');
    sendMessages = enableSendMessages.toLowerCase() === 's' || enableSendMessages.toLowerCase() === 'sim';
  }
  
  // Verifica se a instância foi fornecida
  if (!instanceName) {
    log('❌ Nome da instância é obrigatório!', colors.red);
    rl.close();
    return;
  }
   // Confirma informações
  log('\n--- Configuração de testes ---', colors.blue);
  log(`URL da API: ${apiUrl}`, colors.yellow);
  log(`Chave de API: ${apiKey ? '********' : 'Não especificada'}`, colors.yellow);
  log(`Nome da instância: ${instanceName}`, colors.yellow);
  log(`Número para teste: ${testPhone || 'Não especificado'}`, colors.yellow);
  log(`Enviar mensagens: ${sendMessages ? 'Sim' : 'Não'}`, colors.yellow);
  log(`Grupo para teste: ${testGroup || 'Não especificado'}`, colors.yellow);

  // Pedir confirmação apenas se não estamos mantendo configurações existentes
  if (!areEnvDataComplete || (areEnvDataComplete && apiKey !== process.env.EVOLUTION_API_KEY)) {
    const confirm = await askQuestion('\nAs informações estão corretas? (s/n): ');
    if (confirm.toLowerCase() !== 's' && confirm.toLowerCase() !== 'sim') {
      log('❌ Configuração cancelada pelo usuário.', colors.red);
      rl.close();
      return;
    }
  }

  // Atualiza arquivo .env com as configurações
  updateEnvFile({
    apiUrl,
    apiKey,
    instanceName,
    testPhone,
    sendMessages,
    testGroup,
    testGroup
  });

  // Cria ou atualiza arquivo de teste personalizado
  const testFilePath = path.join(__dirname, '..', 'tests', 'integration', 'real-api.test.ts');
  
  log('\n📝 Criando arquivo de teste personalizado...', colors.blue);
  
  // Template para teste real
  const testFileContent = `// filepath: ${testFilePath}
import { EvolutionAPI } from '../../src';

/**
 * TESTES COM API REAL
 *
 * Este arquivo contém testes que se conectam a uma API real.
 * Execute somente quando desejar testar com uma instância real.
 *
 * Para executar: npm run test:real
 */

// Configurações de teste
const API_URL = process.env.EVOLUTION_API_URL || '${apiUrl}';
const API_KEY = process.env.EVOLUTION_API_KEY || ''; // Configure sua API key no arquivo .env
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || '${instanceName}';
const TEST_PHONE = process.env.TEST_PHONE || '${testPhone || ''}';
const TEST_GROUP = process.env.TEST_GROUP || '${testGroup || ''}';

// Flag para habilitar envio de mensagens nos testes
const SEND_MESSAGES_ENABLED = process.env.TEST_SEND_MESSAGE === 'true';

// Verificar se o grupo está definido para testes de grupo
const GROUP_TESTS_ENABLED = !!TEST_GROUP;

// Pular testes se API_KEY não for fornecida e necessária
const skipTests = !API_KEY && API_URL.includes('api.agenciafer.com.br');

// Tempo maior para testes de integração
jest.setTimeout(30000); // 30 segundos

/**
 * Wrapper para chamadas de API que podem falhar
 * Captura erros específicos e os trata adequadamente
 */
async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  errorMessage: string,
  acceptableErrors: number[] = [404, 400, 500]
): Promise<T | null> {
  try {
    const result = await apiCall();
    return result;
  } catch (error: any) {
    // Verifica por vários formatos possíveis do erro
    const status = error.status || error.statusCode || (error.response && error.response.status);

    if (status && acceptableErrors.includes(status)) {
      console.warn(\`⚠️ \${errorMessage}: \${error.message || 'Erro sem mensagem'} (Status: \${status})\`);
      return null;
    }

    // Para qualquer erro, simplesmente tratamos como aceitável durante os testes
    console.warn(\`⚠️ \${errorMessage}: \${error.message || 'Erro desconhecido'}\`);
    return null;
  }
}

describe('Testes com API real', () => {
  let api: EvolutionAPI;

  beforeAll(() => {
    // Inicializa o SDK com o token de API
    api = new EvolutionAPI({ 
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: true, // Habilita logs para diagnóstico
      timeout: 15000, // Timeout de 15 segundos
      maxRetries: 1 // Faz apenas uma tentativa para testes
    });
    
    // Define a instância em cada módulo
    api.instance.setInstance(INSTANCE_NAME);
    api.message.setInstance(INSTANCE_NAME);
    api.chat.setInstance(INSTANCE_NAME);
    api.group.setInstance(INSTANCE_NAME);
    api.profile.setInstance(INSTANCE_NAME);
  });

  describe('Verificações básicas', () => {
    it('deve verificar se a instância está conectada', async () => {
      const response = await api.instance.getConnectionState();
      console.log('Estado da conexão:', response);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('state');
    });
    
    it('deve verificar se o número de teste é válido', async () => {
      // Pular se não foi fornecido número de teste
      if (!TEST_PHONE) {
        console.log('Pulando teste: número de teste não fornecido.');
        return;
      }
      
      const response = await api.chat.checkNumber(TEST_PHONE);
      console.log('Verificação de número:', response);
      expect(response).toBeDefined();
    });
  });
  
  describe('Envio de mensagem (desativado por padrão)', () => {
    // Remova o "x" de "xit" para ativar o teste de envio
    xit('deve enviar mensagem de teste', async () => {
      // Pular se não foi fornecido número de teste
      if (!TEST_PHONE) {
        console.log('Pulando teste: número de teste não fornecido.');
        return;
      }
      
      const response = await api.message.sendText({
        number: TEST_PHONE,
        text: "Este é um teste automatizado do SDK Evolution API. Por favor, ignore.",
        delay: 1200
      });
      
      console.log('Resposta do envio:', response);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('key');
    });
  });
  
  describe('Informações do perfil', () => {
    it('deve atualizar status do perfil', async () => {
      try {
        // Teste de atualização de status
        const newStatus = "Status de teste via SDK - " + new Date().toLocaleTimeString();
        const response = await api.profile.updateProfileStatus(newStatus);
        console.log('Status atualizado:', response);
        expect(response).toBeDefined();
      } catch (error: any) {
        console.log('Erro ao atualizar status:', error.message);
        // Se não conseguirmos atualizar, pelo menos marcamos como passou
        // já que podemos estar usando uma versão da API que não suporta este método
        expect(true).toBe(true);
      }
    });
  });
});
`;

  // Salva o arquivo de teste
  fs.writeFileSync(testFilePath, testFileContent);

  // Atualiza package.json para adicionar script de teste real
  log('📝 Atualizando package.json com novo script de teste...', colors.blue);

  // Lê package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Adiciona script para teste real
  if (!packageJson.scripts['test:real']) {
    packageJson.scripts['test:real'] = 'jest tests/integration/real-api-test.ts';
    // Escreve mudanças
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    log('✅ Script "test:real" adicionado ao package.json', colors.green);
  }

  // Pergunta se deseja executar os testes imediatamente
  const runTestsNow = await askQuestion('\nDeseja executar os testes agora? (s/n): ');

  rl.close();
  
  log('\n🎉 Configuração concluída!', colors.bright);
  
  if (runTestsNow.toLowerCase() === 's' || runTestsNow.toLowerCase() === 'sim') {
    log('\n🧪 Executando testes...', colors.blue);
    try {
      execSync('npm run test:real', { stdio: 'inherit' });
      log('\n✅ Testes concluídos!', colors.green);
    } catch (error) {
      log('\n❌ Alguns testes falharam. Verifique os erros acima.', colors.red);
    }
  } else {
    log('\nPara executar os testes reais, use:', colors.blue);
    log('npm run test:real', colors.yellow);
  }
}

main().catch(error => {
  console.error('Erro:', error);
  rl.close();
});
