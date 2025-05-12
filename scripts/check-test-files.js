/**
 * Script para verificar se os arquivos de teste estão sendo criados corretamente
 */
const fs = require('fs');
const path = require('path');

// Diretórios
const TEST_FILES_DIR = path.join(__dirname, '../test-files');
const REAL_MEDIA_DIR = '/Users/afv/Documents/sdk/midias';

// Lista de arquivos a serem verificados
const expectedFiles = [
  { file: 'test.pdf', type: 'PDF' },
  { file: 'test.jpg', type: 'Imagem' },
  { file: 'test.mp3', type: 'Áudio' },
  { file: 'test.mp4', type: 'Vídeo' }
];

// Função para verificar disponibilidade de arquivos de mídia
function checkMediaFiles() {
  console.log('===== VERIFICANDO ARQUIVOS DE MÍDIA PARA TESTE =====\n');
  
  // Verificar diretório de arquivos de teste
  if (!fs.existsSync(TEST_FILES_DIR)) {
    console.log(`Diretório de testes não existe: ${TEST_FILES_DIR}`);
    console.log('Criando diretório...');
    fs.mkdirSync(TEST_FILES_DIR, { recursive: true });
  } else {
    console.log(`Diretório de testes encontrado: ${TEST_FILES_DIR}`);
  }
  
  // Verificar diretório de mídia real
  if (!fs.existsSync(REAL_MEDIA_DIR)) {
    console.log(`⚠️ AVISO: Diretório de mídia real não encontrado: ${REAL_MEDIA_DIR}`);
    console.log('Os testes vão utilizar arquivos artificiais.');
  } else {
    console.log(`Diretório de mídia real encontrado: ${REAL_MEDIA_DIR}`);
    
    // Listar arquivos disponíveis
    console.log('\nArquivos disponíveis no diretório de mídia real:');
    const mediaFiles = fs.readdirSync(REAL_MEDIA_DIR);
    mediaFiles.forEach(file => console.log(`- ${file}`));
  }
  
  // Verificar arquivos de teste
  console.log('\nArquivos de teste:');
  for (const file of expectedFiles) {
    const testFilePath = path.join(TEST_FILES_DIR, file.file);
    
    if (fs.existsSync(testFilePath)) {
      const stats = fs.statSync(testFilePath);
      const size = (stats.size / 1024).toFixed(2);
      console.log(`✅ ${file.type}: ${file.file} (${size} KB)`);
    } else {
      console.log(`❌ ${file.type}: ${file.file} (não encontrado)`);
    }
  }
}

// Executar verificação
checkMediaFiles();
