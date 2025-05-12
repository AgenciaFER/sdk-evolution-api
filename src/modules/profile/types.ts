/**
 * Interface para representar informações do perfil
 */
export interface ProfileInfo {
  id: string;
  name?: string;
  status?: string;
  profilePicUrl?: string;
  phoneNumber?: string;
  business?: BusinessProfileInfo;
}

/**
 * Interface para representar informações do perfil comercial
 */
export interface BusinessProfileInfo {
  description?: string;
  email?: string;
  address?: string;
  website?: string;
  categories?: string[];
  businessHours?: BusinessHours;
}

/**
 * Interface para representar horário comercial
 */
export interface BusinessHours {
  timezone?: string;
  days?: BusinessDayHours[];
}

/**
 * Interface para representar horário comercial de um dia
 */
export interface BusinessDayHours {
  day: number;
  openTime: string;
  closeTime: string;
}

/**
 * Interface para configurações de privacidade
 */
export interface PrivacySettings {
  lastSeen?: 'all' | 'contacts' | 'none';
  online?: 'all' | 'match_last_seen';
  profilePhoto?: 'all' | 'contacts' | 'none';
  status?: 'all' | 'contacts' | 'none';
  readReceipts?: 'all' | 'none';
  groupsAdd?: 'all' | 'contacts' | 'contact_blacklist' | 'none';
}

/**
 * Interface para resposta de operações com o perfil
 */
export interface ProfileResponse {
  status: boolean;
  message: string;
}
