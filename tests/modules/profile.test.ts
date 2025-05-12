import { ProfileModule } from '../../src/modules/profile';
import { HttpClient } from '../../src/core/http-client';
import { ProfileInfo, BusinessProfileInfo, PrivacySettings, ProfileResponse } from '../../src/modules/profile/types';

// Mock do HttpClient
jest.mock('../../src/core/http-client');
const MockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

describe('ProfileModule', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let profileModule: ProfileModule;
  
  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new MockedHttpClient({ baseUrl: 'https://teste.com' }) as jest.Mocked<HttpClient>;
    profileModule = new ProfileModule(httpClient);
    profileModule.setInstance('test-instance');
  });

  describe('fetchBusinessProfile', () => {
    it('deve obter informações do perfil comercial corretamente', async () => {
      const mockResponse: BusinessProfileInfo = {
        description: 'Test business description',
        email: 'business@example.com',
        website: 'https://example.com',
        address: '123 Business St',
        categories: ['Technology', 'Software'],
        businessHours: {
          timezone: 'America/Sao_Paulo',
          days: [
            { day: 1, openTime: '09:00', closeTime: '18:00' }
          ]
        }
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await profileModule.fetchBusinessProfile();
      
      expect(httpClient.post).toHaveBeenCalledWith('/profile/fetchBusinessProfile/test-instance', {});
      expect(result).toBe(mockResponse);
    });

    it('deve aceitar um nome de instância personalizado', async () => {
      const mockResponse: BusinessProfileInfo = {
        description: 'Test business description'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await profileModule.fetchBusinessProfile('custom-instance');
      
      expect(httpClient.post).toHaveBeenCalledWith('/profile/fetchBusinessProfile/custom-instance', {});
      expect(result).toBe(mockResponse);
    });
  });

  describe('fetchProfile', () => {
    it('deve obter informações do perfil corretamente', async () => {
      const mockResponse: ProfileInfo = {
        id: '5511999999999@c.us',
        name: 'Test User',
        status: 'Hello there!',
        profilePicUrl: 'https://example.com/pic.jpg'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await profileModule.fetchProfile();
      
      expect(httpClient.post).toHaveBeenCalledWith('/profile/fetchProfile/test-instance', {});
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateProfileName', () => {
    it('deve atualizar o nome do perfil corretamente', async () => {
      const mockResponse: ProfileResponse = {
        status: true,
        message: 'Profile name updated successfully'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await profileModule.updateProfileName('New Profile Name');
      
      expect(httpClient.post).toHaveBeenCalledWith('/profile/updateProfileName/test-instance', {
        name: 'New Profile Name'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateProfileStatus', () => {
    it('deve atualizar o status do perfil corretamente', async () => {
      const mockResponse: ProfileResponse = {
        status: true,
        message: 'Profile status updated successfully'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await profileModule.updateProfileStatus('New status message');
      
      expect(httpClient.post).toHaveBeenCalledWith('/profile/updateProfileStatus/test-instance', {
        status: 'New status message'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateProfilePicture', () => {
    it('deve atualizar a foto do perfil corretamente', async () => {
      const mockResponse: ProfileResponse = {
        status: true,
        message: 'Profile picture updated successfully'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const result = await profileModule.updateProfilePicture('data:image/jpeg;base64,ABCDEF123456');
      
      expect(httpClient.post).toHaveBeenCalledWith('/profile/updateProfilePicture/test-instance', {
        picture: 'data:image/jpeg;base64,ABCDEF123456'
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('removeProfilePicture', () => {
    it('deve remover a foto do perfil corretamente', async () => {
      const mockResponse: ProfileResponse = {
        status: true,
        message: 'Profile picture removed successfully'
      };
      httpClient.delete.mockResolvedValue(mockResponse);
      
      const result = await profileModule.removeProfilePicture();
      
      expect(httpClient.delete).toHaveBeenCalledWith('/profile/removeProfilePicture/test-instance');
      expect(result).toBe(mockResponse);
    });
  });

  describe('fetchPrivacySettings', () => {
    it('deve obter configurações de privacidade corretamente', async () => {
      const mockResponse: PrivacySettings = {
        lastSeen: 'contacts',
        online: 'match_last_seen',
        profilePhoto: 'all',
        status: 'contacts',
        readReceipts: 'all',
        groupsAdd: 'contacts'
      };
      httpClient.get.mockResolvedValue(mockResponse);
      
      const result = await profileModule.fetchPrivacySettings();
      
      expect(httpClient.get).toHaveBeenCalledWith('/profile/fetchPrivacySettings/test-instance');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updatePrivacySettings', () => {
    it('deve atualizar configurações de privacidade corretamente', async () => {
      const mockResponse: ProfileResponse = {
        status: true,
        message: 'Privacy settings updated successfully'
      };
      httpClient.post.mockResolvedValue(mockResponse);
      
      const privacySettings: PrivacySettings = {
        lastSeen: 'none',
        profilePhoto: 'contacts',
        status: 'contacts',
        readReceipts: 'none'
      };
      
      const result = await profileModule.updatePrivacySettings(privacySettings);
      
      expect(httpClient.post).toHaveBeenCalledWith('/profile/updatePrivacySettings/test-instance', privacySettings);
      expect(result).toBe(mockResponse);
    });
  });
});
