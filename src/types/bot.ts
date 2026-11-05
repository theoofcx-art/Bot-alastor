export interface GroupRent {
  id: string;
  name: string;
  daysRemaining: number;
  expiresAt: string;
  active: boolean;
  ownerOnly: boolean;
}

export interface UserEconomy {
  coins: number;
  bank: number;
  lastDaily: number;
}

export interface BotConfig {
  botName: string;
  creator: string;
  ownerNumber: string;
  prefix: string;
  menuThumb: string;
  apiKey: string;
  apiSite: string;
  autoRead: boolean;
  antiLink: boolean;
  antiSpam: boolean;
  antiFake: boolean;
  antiTrava: boolean;
  welcomeMessage: boolean;
  welcomeText: string;
  goodbyeText: string;
  radioFrequency: string;
  rentMode: boolean;
  groupsRent: GroupRent[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  image?: string;
  quoted?: {
    sender: string;
    text: string;
  };
  isCommand?: boolean;
}

export type CommandCategory =
  | 'dono'
  | 'aluguel'
  | 'adm'
  | 'seguranca'
  | 'membros'
  | 'brincadeiras'
  | 'economia'
  | 'figurinhas'
  | 'downloads'
  | 'ia';

export interface CommandItem {
  name: string;
  category: CommandCategory;
  usage: string;
  description: string;
  isOwnerOnly?: boolean;
  isAdminOnly?: boolean;
}
