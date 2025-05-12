import { EvolutionAPI } from '../src';

// Exemplo de como listar grupos arquivados e não arquivados
async function listGroups() {
  try {
    // Inicialize a API com suas credenciais
    const api = new EvolutionAPI({
      baseUrl: 'https://sua-api-evolution.com',
      apiKey: 'sua-api-key',
    });

    // Defina a instância (ou passe como parâmetro nas funções)
    api.useInstance('ferraz');

    // 1. Para listar todos os grupos (arquivados e não arquivados)
    const allGroups = await api.group.fetchAll();
    console.log(`Total de grupos: ${allGroups.groups.length}`);

    // 2. Para listar apenas grupos arquivados
    const archivedGroups = await api.group.fetchArchivedGroups();
    console.log(`Total de grupos arquivados: ${archivedGroups.groups.length}`);
    console.log('Grupos arquivados:', archivedGroups.groups.map(g => g.subject));

    // 3. Para listar apenas grupos não arquivados
    const unarchivedGroups = await api.group.fetchUnarchivedGroups();
    console.log(`Total de grupos não arquivados: ${unarchivedGroups.groups.length}`);
    console.log('Grupos não arquivados:', unarchivedGroups.groups.map(g => g.subject));

    // 4. Para arquivar um grupo específico
    if (unarchivedGroups.groups.length > 0) {
      const groupToArchive = unarchivedGroups.groups[0];
      console.log(`Arquivando o grupo: ${groupToArchive.subject}`);
      await api.group.archiveGroup(groupToArchive.id, true);
    }

    // 5. Para desarquivar um grupo específico
    if (archivedGroups.groups.length > 0) {
      const groupToUnarchive = archivedGroups.groups[0];
      console.log(`Desarquivando o grupo: ${groupToUnarchive.subject}`);
      await api.group.archiveGroup(groupToUnarchive.id, false);
    }

  } catch (error) {
    console.error('Erro ao listar grupos:', error);
  }
}

// Execute o exemplo
listGroups().then(() => console.log('Exemplo concluído!'));