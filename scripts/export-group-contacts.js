#!/usr/bin/env node

/**
 * Script para exportar contatos de grupos do WhatsApp
 * 
 * Uso:
 *   - Todos os grupos: node export-group-contacts.js
 *   - Grupo específico: node export-group-contacts.js "Nome do Grupo"
 * 
 * Argumentos:
 *   - Sem argumentos: exporta contatos de todos os grupos
 *   - Com argumento: exporta contatos apenas do grupo especificado (busca parcial pelo nome)
 * 
 * Saída:
 *   - Arquivos CSV e JSON com os contatos
 */

const { EvolutionAPI } = require('../dist');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
require('dotenv').config();

// Configuração da API
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.agenciafer.com.br/';
const API_KEY = process.env.EVOLUTION_API_KEY || '4cb762d3bd01fb9d479989ff87acebd0';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || 'ferraz';

// Interface para entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função principal
async function exportGroupContacts(targetGroupName = null) {
  try {
    console.log('Iniciando exportação de contatos...');
    
    // Inicializa a API
    const api = new EvolutionAPI({
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: false
    });

    // Define a instância
    api.useInstance(INSTANCE_NAME);
    
    console.log(`Buscando grupos da instância: ${INSTANCE_NAME}`);
    
    // Busca todos os grupos 
    const result = await api.group.fetchAll();
    
    // Verifica se o resultado tem a estrutura esperada
    const groups = Array.isArray(result) ? result : (result && result.groups ? result.groups : []);
    
    if (groups.length === 0) {
      console.log('Nenhum grupo encontrado.');
      return;
    }
    
    console.log(`Total de grupos encontrados: ${groups.length}`);
    
    // Filtra grupos se um nome específico foi fornecido
    let filteredGroups = groups;
    if (targetGroupName) {
      const lowercaseTarget = targetGroupName.toLowerCase();
      filteredGroups = groups.filter(group => 
        group.subject && group.subject.toLowerCase().includes(lowercaseTarget)
      );
      
      if (filteredGroups.length === 0) {
        console.log(`Nenhum grupo encontrado com o nome "${targetGroupName}".`);
        return;
      }
      
      console.log(`Grupos encontrados com o nome "${targetGroupName}": ${filteredGroups.length}`);
      filteredGroups.forEach((group, index) => {
        console.log(`  ${index + 1}. ${group.subject} (${group.id})`);
      });
    }
    
    // Lista para armazenar todos os contatos
    const allContacts = [];
    
    // Para cada grupo, extrair informações dos participantes
    for (const group of filteredGroups) {
      console.log(`Processando grupo: ${group.subject || '[Sem Nome]'} (${group.id})`);
      
      if (group.participants && group.participants.length > 0) {
        // Processar cada participante
        for (const participant of group.participants) {
          try {
            // Extrair o número de telefone do ID do participante (formato: 1234567890@s.whatsapp.net)
            const phoneMatch = participant.id.match(/^(\d+)@/);
            if (phoneMatch && phoneMatch[1]) {
              const phone = phoneMatch[1];
              
              // Tenta obter o nome do participante (se disponível)
              let name = participant.name || '';
              
              // Adiciona à lista de contatos
              allContacts.push({
                phone,
                name,
                groupName: group.subject || '',
                groupId: group.id
              });
            }
          } catch (err) {
            console.warn(`Erro ao processar participante: ${err}`);
          }
        }
      }
    }
    
    // Deduplica contatos (mantém a primeira ocorrência de cada número)
    const uniquePhones = new Set();
    const uniqueContacts = [];
    
    for (const contact of allContacts) {
      if (!uniquePhones.has(contact.phone)) {
        uniquePhones.add(contact.phone);
        uniqueContacts.push(contact);
      }
    }
    
    if (uniqueContacts.length === 0) {
      console.log('Nenhum contato encontrado nos grupos selecionados.');
      return;
    }
    
    console.log(`Total de contatos únicos encontrados: ${uniqueContacts.length}`);
    
    // Diretório de saída específico
    const outputDir = path.join(process.cwd(), 'midias', 'Planilha_csv');
    
    // Criar o diretório se não existir
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Criar uma versão CSV
    // Nome do arquivo baseado na exportação (todos ou específico)
    const filePrefix = targetGroupName 
      ? `contatos_grupo_${targetGroupName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}` 
      : `contatos_todos_grupos`;
    
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const csvFilePath = path.join(outputDir, `${filePrefix}_${timestamp}.csv`);
    
    // Cabeçalho do CSV
    const csvHeader = 'Telefone,Nome,Grupo,ID do Grupo\n';
    
    // Conteúdo do CSV
    const csvContent = uniqueContacts.map(contact => 
      `${contact.phone},"${(contact.name || '').replace(/"/g, '""')}","${(contact.groupName || '').replace(/"/g, '""')}","${contact.groupId || ''}"`
    ).join('\n');
    
    // Escrever o arquivo CSV
    fs.writeFileSync(csvFilePath, csvHeader + csvContent, 'utf8');
    
    // Também criar uma versão JSON para maior flexibilidade
    const jsonFilePath = path.join(outputDir, `${filePrefix}_${timestamp}.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(uniqueContacts, null, 2), 'utf8');
    
    console.log(`\nExportação concluída com sucesso!`);
    console.log(`Total de contatos exportados: ${uniqueContacts.length}`);
    console.log(`Arquivos gerados:\n- CSV: ${csvFilePath}\n- JSON: ${jsonFilePath}`);
    
    return {
      contactsCount: uniqueContacts.length,
      csvPath: csvFilePath,
      jsonPath: jsonFilePath
    };
  } catch (error) {
    console.error('Erro ao exportar contatos:', error);
    throw error;
  }
}

// Verificar se foi fornecido um nome de grupo como argumento
const targetGroupName = process.argv[2] || null;

// Se não foi fornecido um nome de grupo como argumento, perguntar ao usuário
if (!targetGroupName) {
  rl.question('Deseja exportar contatos de todos os grupos? (S/N): ', (answer) => {
    if (answer.toLowerCase() === 'n') {
      rl.question('Digite o nome do grupo para exportar contatos: ', (groupName) => {
        exportGroupContacts(groupName)
          .then(() => rl.close())
          .catch((err) => {
            console.error('\nErro na exportação:', err.message);
            rl.close();
          });
      });
    } else {
      exportGroupContacts()
        .then(() => rl.close())
        .catch((err) => {
          console.error('\nErro na exportação:', err.message);
          rl.close();
        });
    }
  });
} else {
  // Se foi fornecido um nome de grupo como argumento, usar diretamente
  exportGroupContacts(targetGroupName)
    .then(() => rl.close())
    .catch((err) => {
      console.error('\nErro na exportação:', err.message);
      rl.close();
    });
}