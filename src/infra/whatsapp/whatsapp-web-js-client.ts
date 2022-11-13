import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { WhatsappChatModel, WhatsappList, WhatsappMessageModel } from 'src/domain/models';
import { Client, Chat as WhatsappWebChat, List } from 'whatsapp-web.js';

export class WhatsappWebJsWhatsappClient implements WhatsappClientInterface {
  constructor(private readonly client: Client) {}

  onMessage(cb: (message: WhatsappMessageModel) => void) {
    this.client.on('message', async (message) => {
      const contact = await message.getContact();

      const messageIsStatusOrFromGroup = message.isStatus || message.from.includes('@g.us') || contact.isGroup;

      if (messageIsStatusOrFromGroup) {
        return;
      }

      const urlContactImage = await contact.getProfilePicUrl();

      const formattedMessage: WhatsappMessageModel = {
        type: message.type,
        content: message.body,
        from: message.from,
        id: message.id.id,
        time: new Date(),
        isStatus: message.isStatus,
        isGroup: contact.isGroup || message.from.includes('@g.us'),
        selectedRowId: message.selectedRowId,
        sender: {
          id: contact.id.user,
          profileName: contact.pushname,
          isMyContact: contact.isMyContact,
          urlProfileImage: urlContactImage,
          contactName: contact.name,
        },
      };

      cb(formattedMessage);
    });
  }

  async getUnreadChats(): Promise<WhatsappChatModel[]> {
    const chats = await this.client.getChats();
    const unreadChats = chats.filter((chat) => chat.unreadCount !== 0);

    const fomattedChats: WhatsappChatModel[] = unreadChats.map((chat: WhatsappWebChat & { pinned: boolean }) => ({
      name: chat.name,
      isGroup: chat.isGroup,
      isMuted: chat.isMuted,
      unreadCount: chat.unreadCount,
      pinned: chat.pinned,
      muteExpiration: chat.muteExpiration,
    }));

    return fomattedChats;
  }

  async sendMessage(number: string, content: string | WhatsappList) {
    const contactInfo = await this.client.getNumberId(number);
    let finalContent = content;

    if (typeof content === 'object') {
      const listContent = content as WhatsappList;
      finalContent = new List(listContent.body, listContent.buttonText, listContent.sections);
    }

    await this.client.sendMessage(contactInfo._serialized, finalContent);
  }
}
