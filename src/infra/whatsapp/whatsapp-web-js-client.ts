import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import {
  WhatsappChatModel,
  WhatsappList,
  WhatsappMessageAckUpdated,
  WhatsappMessageModel,
  WhatsappSendedMessageModel,
} from 'src/domain/models';
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

  onAckUpdated(cb: (ackUpdated: WhatsappMessageAckUpdated) => void) {
    this.client.on('message_ack', (message) => {
      cb({ messageId: message.id.id, ack: message.ack });
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

  async sendMessage(number: string, content: WhatsappList | string): Promise<WhatsappSendedMessageModel> {
    const contactInfo = await this.client.getNumberId(number);
    let finalContent = content;

    if (typeof content === 'object') {
      if ('sections' in (content as any)) {
        const listContent = content as WhatsappList;
        finalContent = new List(listContent.body, listContent.buttonText, listContent.sections, listContent.title, listContent.footer);
      }
    }

    const message = await this.client.sendMessage(contactInfo._serialized, finalContent);

    return {
      id: message.id.id,
      content: message.body,
      time: new Date(),
    };
  }
}
