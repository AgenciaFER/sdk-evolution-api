#!/usr/bin/env node

/**
 * Script para exportar todos os contatos do WhatsApp
 * 
 * Uso:
 *   - Exportar todos os contatos: node export-all-contacts.js
 * 
 * Saída:
 *   - Arquivos CSV e JSON com todos os contatos
 */

const { EvolutionAPI } = require('../dist');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuração da API
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.agenciafer.com.br/';
const API_KEY = process.env.EVOLUTION_API_KEY || '4cb762d3bd01fb9d479989ff87acebd0';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || 'ferraz';

// Função principal
async function exportAllContacts() {
  try {
    console.log('Iniciando exportação de todos os contatos do WhatsApp...');
    
    // Inicializa a API
    const api = new EvolutionAPI({
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: false
    });

    // Define a instância
    api.useInstance(INSTANCE_NAME);
    
    console.log(`Obtendo todos os contatos da instância: ${INSTANCE_NAME}`);
    
    // Buscar todos os contatos
    // Note: usando a API de chat para obter contatos, já que é o endpoint disponível na Evolution API
    const response = await api.http.get(`/chat/contacts/${INSTANCE_NAME}`);
    
    // Verifica se o resultado tem a estrutura esperada
    const contacts = response?.contacts || [];
    
    if (contacts.length === 0) {
      console.log('Nenhum contato encontrado.');
      return;
    }
    
    console.log(`Total de contatos encontrados: ${contacts.length}`);
    
    // Processar contatos
    const processedContacts = contacts.map(contact => {
      try {
        // Extrair o número de telefone (remover @s.whatsapp.net, se presente)
        const phone = contact.id.replace('@s.whatsapp.net', '').replace('@c.us', '');
        
        return {
          phone,
          name: contact.name || contact.pushname || '',
          type: contact.type || 'individual',
          isMyContact: !!contact.isMyContact,
          isWAContact: !!contact.isWAContact,
          isGroup: !!contact.isGroup,
          isUser: !!contact.isUser
        };
      } catch (err) {
        console.warn(`Erro ao processar contato: ${err}`);
        return null;
      }
    }).filter(contact => contact !== null);
    
    // Diretório de saída específico
    const outputDir = path.join(process.cwd(), 'midias', 'Planilha_csv');
    
    // Criar o diretório se não existir
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Criar uma versão CSV
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const csvFilePath = path.join(outputDir, `todos_contatos_${INSTANCE_NAME}_${timestamp}.csv`);
    
    // Cabeçalho do CSV
    const csvHeader = 'Telefone,Nome,Tipo,Contato Salvo,Usuário WhatsApp,Grupo,Usuário\n';
    
    // Conteúdo do CSV
    const csvContent = processedContacts.map(contact => 
      `${contact.phone},"${(contact.name || '').replace(/"/g, '""')}",${contact.type},${contact.isMyContact},${contact.isWAContact},${contact.isGroup},${contact.isUser}`
    ).join('\n');
    
    // Escrever o arquivo CSV
    fs.writeFileSync(csvFilePath, csvHeader + csvContent, 'utf8');
    
    // Também criar uma versão JSON para maior flexibilidade
    const jsonFilePath = path.join(outputDir, `todos_contatos_${INSTANCE_NAME}_${timestamp}.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(processedContacts, null, 2), 'utf8');
    
    console.log(`\nExportação concluída com sucesso!`);
    console.log(`Total de contatos exportados: ${processedContacts.length}`);
    console.log(`Arquivos gerados:\n- CSV: ${csvFilePath}\n- JSON: ${jsonFilePath}`);
    
    return {
      contactsCount: processedContacts.length,
      csvPath: csvFilePath,
      jsonPath: jsonFilePath
    };
  } catch (error) {
    console.error('Erro ao exportar todos os contatos:', error);
    console.error('Detalhes do erro:', error.response?.data || error.message);
    throw error;
  }
}

// Executar função principal
exportAllContacts()
  .catch(err => {
    console.error('\nErro na exportação:', err.message);
    process.exit(1);
  });