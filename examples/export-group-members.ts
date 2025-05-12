import { EvolutionAPI } from '../src';
import * as fs from 'fs';
import * as path from 'path';

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configuração da API
const API_URL = process.env.EVOLUTION_API_URL || 'https://api.agenciafer.com.br/';
const API_KEY = process.env.EVOLUTION_API_KEY || '4cb762d3bd01fb9d479989ff87acebd0';
// A instância que queremos verificar
const INSTANCE_NAME = 'ferraz';

interface Contact {
  phone: string;
  name?: string;
  groupName?: string;
  groupId?: string;
}

async function exportGroupMembers() {
  try {
    // Inicializa a API
    const api = new EvolutionAPI({
      baseUrl: API_URL,
      apiKey: API_KEY,
      debug: false  // Desativa logs para depuração
    });

    // Define a instância
    api.useInstance(INSTANCE_NAME);
    
    console.log(`Buscando todos os grupos da instância: ${INSTANCE_NAME}`);
    
    // Busca todos os grupos 
    const result = await api.group.fetchAll();
    
    // Verifica se o resultado tem a estrutura esperada
    const groups = Array.isArray(result) ? result : (result && result.groups ? result.groups : []);
    
    console.log(`Total de grupos encontrados: ${groups.length}`);
    
    // Lista para armazenar todos os contatos
    const allContacts: Contact[] = [];
    
    // Para cada grupo, extrair informações dos participantes
    for (const group of groups) {
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
    const uniquePhones = new Set<string>();
    const uniqueContacts: Contact[] = [];
    
    for (const contact of allContacts) {
      if (!uniquePhones.has(contact.phone)) {
        uniquePhones.add(contact.phone);
        uniqueContacts.push(contact);
      }
    }
    
    console.log(`Total de contatos únicos encontrados: ${uniqueContacts.length}`);
    
    // Criar uma versão CSV
    // Caminho para o arquivo CSV
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const csvFilePath = path.join(process.cwd(), `contatos_${INSTANCE_NAME}_${timestamp}.csv`);
    
    // Cabeçalho do CSV
    const csvHeader = 'Telefone,Nome,Grupo,ID do Grupo\n';
    
    // Conteúdo do CSV
    const csvContent = uniqueContacts.map(contact => 
      `${contact.phone},"${(contact.name || '').replace(/"/g, '""')}","${(contact.groupName || '').replace(/"/g, '""')}","${contact.groupId || ''}"`
    ).join('\n');
    
    // Escrever o arquivo CSV
    fs.writeFileSync(csvFilePath, csvHeader + csvContent, 'utf8');
    
    console.log(`\nArquivo CSV criado com sucesso: ${csvFilePath}`);
    
    // Também criar uma versão JSON para maior flexibilidade
    const jsonFilePath = path.join(process.cwd(), `contatos_${INSTANCE_NAME}_${timestamp}.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(uniqueContacts, null, 2), 'utf8');
    
    console.log(`Arquivo JSON criado com sucesso: ${jsonFilePath}`);
    
    return {
      contactsCount: uniqueContacts.length,
      csvPath: csvFilePath,
      jsonPath: jsonFilePath
    };
  } catch (error) {
    console.error('Erro ao exportar membros dos grupos:', error);
    throw error;
  }
}

// Executa a função
exportGroupMembers()
  .then(result => {
    console.log(`\nExportação concluída com sucesso!`);
    console.log(`Total de contatos exportados: ${result.contactsCount}`);
    console.log(`Arquivos gerados:\n- ${result.csvPath}\n- ${result.jsonPath}`);
  })
  .catch(err => console.error('\nFalha na exportação:', err.message));