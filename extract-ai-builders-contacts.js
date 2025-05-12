const { EvolutionAPI } = require('./dist');
require('dotenv').config();
const fs = require('fs');

async function extractAIBuildersContacts() {
  try {
    // Inicializa o SDK com a configuração
    const api = new EvolutionAPI({
      baseUrl: process.env.EVOLUTION_API_URL,
      apiKey: process.env.EVOLUTION_API_KEY,
      debug: true,
      timeout: 120000 // 2 minutos de timeout
    });

    // Definir instância "007"
    api.useInstance("007");

    // Número para enviar a lista de contatos
    const targetPhone = "5521970138502";
    
    console.log("Iniciando extração de contatos relacionados a AI Builders...");
    
    // Buscar todos os grupos (sem participantes para agilizar)
    const groups = await api.group.fetchAll(undefined, false);
    
    if (!groups || !Array.isArray(groups.groups) || groups.groups.length === 0) {
      console.log("Nenhum grupo encontrado");
      return;
    }
    
    console.log(`Encontrados ${groups.groups.length} grupos`);
    
    // Filtrar grupos relacionados a AI Builders
    const aiBuilderGroups = groups.groups.filter(group => {
      const subject = (group.subject || '').toLowerCase();
      return subject.includes('ai') && (
        subject.includes('builder') || 
        subject.includes('frankenstai') || 
        subject.includes('chatwoot') || 
        subject.includes('agents') || 
        subject.includes('healthcare')
      );
    });
    
    console.log(`Encontrados ${aiBuilderGroups.length} grupos relacionados a AI Builders`);
    
    // Extrair números de telefone dos campos owner e subjectOwner
    const allContacts = new Set();
    const groupsWithContacts = {};
    
    for (const group of aiBuilderGroups) {
      const groupContacts = [];
      const groupName = group.subject || 'Grupo sem nome';
      
      // Adicionar o owner
      if (group.owner) {
        const ownerNumber = group.owner.split('@')[0];
        allContacts.add(ownerNumber);
        groupContacts.push({ role: "owner", number: ownerNumber });
      }
      
      // Adicionar o subjectOwner
      if (group.subjectOwner && group.subjectOwner !== group.owner) {
        const subjectOwnerNumber = group.subjectOwner.split('@')[0];
        allContacts.add(subjectOwnerNumber);
        groupContacts.push({ role: "subjectOwner", number: subjectOwnerNumber });
      }
      
      // Adicionar o grupo à lista
      if (groupContacts.length > 0) {
        groupsWithContacts[group.id] = {
          name: groupName,
          contacts: groupContacts
        };
      }
    }
    
    // Convertendo o Set para Array e ordenando
    const uniqueContacts = Array.from(allContacts).sort();
    
    console.log(`Total de contatos únicos extraídos: ${uniqueContacts.length}`);
    
    // Salvando os contatos em um arquivo para referência
    fs.writeFileSync('ai_builders_contacts.json', JSON.stringify({
      totalUniqueContacts: uniqueContacts.length,
      uniqueContacts,
      groupsWithContacts
    }, null, 2));
    
    // Preparando a mensagem com os contatos para enviar
    const formattedDate = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const contactsMessage = `*Lista de Contatos AI Builders - ${formattedDate}*

Encontrados ${uniqueContacts.length} contatos únicos em ${Object.keys(groupsWithContacts).length} grupos relacionados a AI Builders.

*Lista de contatos únicos:*
${uniqueContacts.map((contact, index) => `${index+1}. ${contact}`).join('\n')}

*Grupos relacionados a AI Builders:*
${aiBuilderGroups.map(g => `- ${g.subject}`).join('\n')}

Esta lista contém apenas os proprietários e criadores dos grupos da AI Builders, não todos os participantes.

Atenciosamente,
SDK Evolution API`;
    
    // Enviar a mensagem
    console.log(`Enviando lista de contatos para ${targetPhone}...`);
    const result = await api.message.sendText({
      number: targetPhone,
      text: contactsMessage
    });
    
    console.log('Mensagem enviada com sucesso:', result);
    return result;
    
  } catch (error) {
    console.error('Erro ao extrair contatos:', error);
    return null;
  }
}

// Executar a função principal
extractAIBuildersContacts();