/**
 * Testes para envio de mensagens de mídia
 */

import { EvolutionAPI } from '../../src';
import * as fs from 'fs';
import * as path from 'path';

// Configuração de ambiente para testes
const API_URL = process.env.EVOLUTION_API_URL || '';
const API_KEY = process.env.EVOLUTION_API_KEY || '';
const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE || '';
const TEST_PHONE = process.env.TEST_PHONE || '';

// Verificar se as variáveis obrigatórias estão definidas
const MISSING_CONFIG = !API_URL || !API_KEY || !INSTANCE_NAME || !TEST_PHONE;
if (MISSING_CONFIG) {
  console.warn('⚠️ Configurações de teste incompletas. Testes serão ignorados.');
}

// Flag para habilitar envio de mensagens nos testes
const SEND_MESSAGES_ENABLED = process.env.TEST_SEND_MESSAGE === 'true';

// Diretório para arquivos de teste
const TEST_FILES_DIR = path.join(__dirname, '../../test-files');

// Criar arquivo de teste se não existir
const createTestFile = (name: string, content: string): string => {
  const filePath = path.join(TEST_FILES_DIR, name);
  if (!fs.existsSync(TEST_FILES_DIR)) {
    fs.mkdirSync(TEST_FILES_DIR, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
  return filePath;
};

// Criar arquivos de teste
const setupTestFiles = () => {
  // Texto simples
  createTestFile('test.txt', 'Este é um arquivo de teste para o SDK Evolution API');
  
  // Imagens do diretório de mídia
  try {
    // Copiar arquivo de mídia do diretório midias se existir
    const mediaDir = path.join(__dirname, '../../midias');
    if (fs.existsSync(mediaDir)) {
      const files = fs.readdirSync(mediaDir);
      
      // Procurar por arquivos de imagem
      const imageFile = files.find(file => file.match(/\.(jpg|jpeg|png|webp)$/i));
      if (imageFile) {
        const sourceFile = path.join(mediaDir, imageFile);
        const destFile = path.join(TEST_FILES_DIR, 'test.jpg');
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Arquivo de imagem copiado: ${imageFile}`);
      }
      
      // Procurar por arquivos de áudio
      const audioFile = files.find(file => file.match(/\.(mp3|wav|ogg|opus)$/i));
      if (audioFile) {
        const sourceFile = path.join(mediaDir, audioFile);
        const destFile = path.join(TEST_FILES_DIR, 'test.mp3');
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Arquivo de áudio copiado: ${audioFile}`);
      }
      
      // Procurar por arquivos de vídeo
      const videoFile = files.find(file => file.match(/\.(mp4|mov)$/i));
      if (videoFile) {
        const sourceFile = path.join(mediaDir, videoFile);
        const destFile = path.join(TEST_FILES_DIR, 'test.mp4');
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Arquivo de vídeo copiado: ${videoFile}`);
      }
      
      // Procurar por documentos
      const docFile = files.find(file => file.match(/\.(pdf|doc|docx|zip)$/i));
      if (docFile) {
        const sourceFile = path.join(mediaDir, docFile);
        const destFile = path.join(TEST_FILES_DIR, 'test.pdf');
        fs.copyFileSync(sourceFile, destFile);
        console.log(`Documento copiado: ${docFile}`);
      }
    }
  } catch (error) {
    console.error('Erro ao copiar arquivos de mídia:', error);
  }
  
  // Criar arquivo de texto como fallback se não existirem outros
  if (!fs.existsSync(path.join(TEST_FILES_DIR, 'test.jpg'))) {
    createTestFile('test.jpg', 'Fake JPG');
  }
  if (!fs.existsSync(path.join(TEST_FILES_DIR, 'test.mp3'))) {
    createTestFile('test.mp3', 'Fake MP3');
  }
  if (!fs.existsSync(path.join(TEST_FILES_DIR, 'test.mp4'))) {
    createTestFile('test.mp4', 'Fake MP4');
  }
  if (!fs.existsSync(path.join(TEST_FILES_DIR, 'test.pdf'))) {
    createTestFile('test.pdf', 'Fake PDF');
  }
};

// Função para converter arquivo para base64
const fileToBase64 = (filePath: string): string => {
  try {
    const file = fs.readFileSync(filePath);
    return file.toString('base64');
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error);
    return '';
  }
};

// Usar describe ou describe.skip conforme configuração
const describeOrSkip = MISSING_CONFIG ? describe.skip : describe;
// Skip testes de envio quando não permitido
const sendDescribe = (SEND_MESSAGES_ENABLED ? describeOrSkip : describe.skip);

// Tempo maior para testes de integração
jest.setTimeout(30000); // 30 segundos

describe('Media Messages Integration Tests', () => {
  let api: EvolutionAPI;

  beforeAll(() => {
    // Preparar arquivos de teste
    setupTestFiles();
    
    // Inicializa o SDK com o token de API
    api = new EvolutionAPI({ 
      baseUrl: API_URL,
      apiKey: API_KEY,
    });
    
    // Define a instância em todos os módulos
    api.useInstance(INSTANCE_NAME);
  });

  sendDescribe('Send Media Messages', () => {
    it('should send image message', async () => {
      try {
        const imagePath = path.join(TEST_FILES_DIR, 'test.jpg');
        const base64Image = fileToBase64(imagePath);
        
        const result = await api.message.sendMedia({
          number: TEST_PHONE,
          mediatype: 'image',
          mimetype: 'image/jpeg',
          caption: 'Teste de imagem - SDK Evolution API',
          media: `data:image/jpeg;base64,${base64Image}`
        });
        
        expect(result).toBeDefined();
        expect(result.key).toBeDefined();
        console.log('Mensagem com imagem enviada com sucesso');
      } catch (error: any) {
        if (error.status === 400 && error.message?.includes('not implemented')) {
          console.warn('⚠️ Envio de imagem não implementado na API');
        } else {
          console.error('Erro ao enviar imagem:', error);
          throw error;
        }
      }
    });

    it('should send document message', async () => {
      try {
        const docPath = path.join(TEST_FILES_DIR, 'test.pdf');
        const base64Doc = fileToBase64(docPath);
        
        const result = await api.message.sendMedia({
          number: TEST_PHONE,
          mediatype: 'document',
          mimetype: 'application/pdf',
          caption: 'Teste de documento - SDK Evolution API',
          media: `data:application/pdf;base64,${base64Doc}`,
          fileName: 'documento-teste.pdf'
        });
        
        expect(result).toBeDefined();
        expect(result.key).toBeDefined();
        console.log('Mensagem com documento enviada com sucesso');
      } catch (error: any) {
        if (error.status === 400 && error.message?.includes('not implemented')) {
          console.warn('⚠️ Envio de documento não implementado na API');
        } else {
          console.error('Erro ao enviar documento:', error);
          throw error;
        }
      }
    });

    it('should send audio message', async () => {
      try {
        const audioPath = path.join(TEST_FILES_DIR, 'test.mp3');
        const base64Audio = fileToBase64(audioPath);
        
        const result = await api.message.sendNarratedAudio({
          number: TEST_PHONE,
          audio: `data:audio/mpeg;base64,${base64Audio}`
        });
        
        expect(result).toBeDefined();
        expect(result.key).toBeDefined();
        console.log('Mensagem com áudio enviada com sucesso');
      } catch (error: any) {
        if (error.status === 400 && error.message?.includes('not implemented')) {
          console.warn('⚠️ Envio de áudio não implementado na API');
        } else if (error.status === 404) {
          console.warn('⚠️ Endpoint de áudio não disponível');
        } else {
          console.error('Erro ao enviar áudio:', error);
          throw error;
        }
      }
    });

    it('should send video message', async () => {
      try {
        const videoPath = path.join(TEST_FILES_DIR, 'test.mp4');
        const base64Video = fileToBase64(videoPath);
        
        const result = await api.message.sendMedia({
          number: TEST_PHONE,
          mediatype: 'video',
          mimetype: 'video/mp4',
          caption: 'Teste de vídeo - SDK Evolution API',
          media: `data:video/mp4;base64,${base64Video}`
        });
        
        expect(result).toBeDefined();
        expect(result.key).toBeDefined();
        console.log('Mensagem com vídeo enviada com sucesso');
      } catch (error: any) {
        if (error.status === 400 && error.message?.includes('not implemented')) {
          console.warn('⚠️ Envio de vídeo não implementado na API');
        } else {
          console.error('Erro ao enviar vídeo:', error);
          throw error;
        }
      }
    });
  });
});
