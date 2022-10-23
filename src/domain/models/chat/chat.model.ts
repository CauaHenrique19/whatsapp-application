export interface ChatModel {
  name: string;
  unreadCount: number;
  pinned: boolean;
  isMuted: boolean;
  muteExpiration: number;
  isGroup: boolean;
}
