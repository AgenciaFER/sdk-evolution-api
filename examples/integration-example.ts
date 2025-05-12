/**
 * Exemplo de integração real com a Evolution API
 * 
 * Este exemplo demonstra como usar o SDK para conectar a uma instância real
 * da Evolution API e realizar operações básicas.
 * 
 * Para executar:
 * ts-node examples/integration-example.ts
 */

import { EvolutionAPI } from '../src';
import * as readline from 'readline';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env, se existir
dotenv.config();

// Configurações - substitua pelos valores corretos ou use variáveis de ambiente
const API_URL = process.env.EVOLUTION_API_URL || 'https://sua-api.exemplo.com';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || 'default';

// Interface de leitura para interação com o usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Função para perguntar ao usuário
 */
function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

/**
 * Função principal do exemplo
 */
async function main() {
  console.log('🚀 Evolution API SDK - Exemplo de Integração Real');
  console.log('=================================================');
  console.log(`URL da API: ${API_URL}`);
  console.log(`Nome da instância: ${INSTANCE_NAME}`);
  
  // Inicializa o SDK
  console.log('\nInicializando SDK...');
  const api = new EvolutionAPI({ 
    baseUrl: API_URL,
    debug: true,
    maxRetries: 3
  });
  
  // Define a instância padrão para todos os módulos
  console.log(`\nConfigurando instância: ${INSTANCE_NAME}`);
  api.instance.setInstance(INSTANCE_NAME);
  api.message.setInstance(INSTANCE_NAME);
  api.chat.setInstance(INSTANCE_NAME);
  api.profile.setInstance(INSTANCE_NAME);
  
  // Menu de operações
  while (true) {
    console.log('\n=== MENU DE OPÇÕES ===');
    console.log('1. Verificar status da conexão');
    console.log('2. Verificar perfil');
    console.log('3. Verificar um número');
    console.log('4. Enviar mensagem de texto');
    console.log('5. Listar chats recentes');
    console.log('0. Sair');
    
    const opcao = await question('\nEscolha uma opção: ');
    
    try {
      switch (opcao) {
        case '1': // Status da conexão
          const status = await api.instance.getConnectionState();
          console.log('\n✅ Status da conexão:');
          console.log(status);
          break;
          
        case '2': // Informações do perfil
          const perfil = await api.profile.fetchProfile();
          console.log('\n✅ Informações do perfil:');
          // Filtrando dados para exibição
          const { id, name, pushname, profilePictureUrl, status } = perfil;
          console.log({ id, name, pushname, profilePictureUrl, status });
          break;
          
        case '3': // Verificar número
          const numeroParaVerificar = await question('\nDigite o número para verificar (com DDD e país, ex: 5511999999999): ');
          const verificacao = await api.chat.checkNumber(numeroParaVerificar);
          console.log('\n✅ Resultado da verificação:');
          console.log(verificacao);
          break;
          
        case '4': // Enviar mensagem de texto
          const numeroParaEnviar = await question('\nDigite o número para enviar (com DDD e país, ex: 5511999999999): ');
          const mensagem = await question('Digite a mensagem a ser enviada: ');
          
          const confirmacao = await question(`\nConfirma o envio da mensagem "${mensagem}" para ${numeroParaEnviar}? (s/n): `);
          if (confirmacao.toLowerCase() !== 's' && confirmacao.toLowerCase() !== 'sim') {
            console.log('❌ Envio cancelado pelo usuário.');
            break;
          }
          
          const resultadoEnvio = await api.message.sendText({
            number: numeroParaEnviar,
            options: { delay: 1200 },
            textMessage: {
              text: mensagem
            }
          });
          
          console.log('\n✅ Mensagem enviada:');
          console.log(resultadoEnvio);
          break;
          
        case '5': // Listar chats
          const limite = await question('\nQuantos chats deseja listar? ');
          const chats = await api.chat.listChats({
            count: parseInt(limite, 10) || 10
          });
          
          console.log(`\n✅ ${chats.length} chats encontrados:`);
          chats.forEach((chat, index) => {
            console.log(`\n[${index + 1}] ${chat.id || chat.name || 'Chat sem nome'}`);
            console.log(`- Tipo: ${chat.isGroup ? 'Grupo' : 'Individual'}`);
            if (chat.lastMessage) {
              console.log(`- Última mensagem: ${chat.lastMessage.body?.substring(0, 30) || '[mídia]'}${chat.lastMessage.body?.length > 30 ? '...' : ''}`);
            }
          });
          break;
          
        case '0': // Sair
          console.log('\n👋 Encerrando exemplo...');
          rl.close();
          return;
          
        default:
          console.log('\n❌ Opção inválida. Tente novamente.');
      }
    } catch (error: any) {
      console.error('\n❌ Erro na operação:', error.message);
      if (error.response?.data) {
        console.error('Detalhes:', error.response.data);
      }
    }
    
    // Pausa antes de mostrar o menu novamente
    await question('\nPressione Enter para continuar...');
  }
}

// Executa o programa principal e trata erros
main()
  .catch((error) => {
    console.error('\n❌ Erro fatal:', error);
    rl.close();
  });
