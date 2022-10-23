import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { ChatModel, MessageModel } from 'src/domain/models';
import { Client, Chat as WhatsappWebChat } from 'whatsapp-web.js';

export class WhatsappWebJsWhatsappClient implements WhatsappClientInterface {
  constructor(private readonly client: Client) {}

  onMessage(cb: (message: MessageModel) => void) {
    this.client.on('message', async (message) => {
      const contact = await message.getContact();
      const urlContactImage = await contact.getProfilePicUrl();

      const formattedMessage: MessageModel = {
        type: message.type,
        content: message.body,
        from: message.from,
        id: message.id.id,
        time: new Date(),
        isStatus: message.isStatus,
        isGroup: contact.isGroup,
        sender: {
          id: contact.id.user,
          profileName: contact.pushname,
          isMyContact: contact.isMyContact,
          urlProfileImage: urlContactImage,
          contactName: contact.name,
        },
      };

      //console.log(message);
      cb(formattedMessage);
    });
  }

  async getUnreadChats(): Promise<ChatModel[]> {
    const chats = await this.client.getChats();
    const unreadChats = chats.filter((chat) => chat.unreadCount !== 0);

    const fomattedChats: ChatModel[] = unreadChats.map(
      (chat: WhatsappWebChat & { pinned: boolean }) => ({
        name: chat.name,
        isGroup: chat.isGroup,
        isMuted: chat.isMuted,
        unreadCount: chat.unreadCount,
        pinned: chat.pinned,
        muteExpiration: chat.muteExpiration,
      }),
    );

    return fomattedChats;
  }
}
