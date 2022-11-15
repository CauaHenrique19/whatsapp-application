import { ChatLogTypeActionEnum, ChatStatusEnum } from 'src/data/enums';
import { CreateChatLogRepository, UpdateChatRepository, GetChatByIdRepository } from 'src/data/protocols/db';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { WhatsappList, WhatsappSection } from 'src/domain/models';
import { FinishChatUseCase } from 'src/domain/usecases';

export class DbFinishChat implements FinishChatUseCase {
  constructor(
    private readonly updateChatRepository: UpdateChatRepository,
    private readonly createChatLogRepository: CreateChatLogRepository,
    private readonly getChatByIdRepository: GetChatByIdRepository,
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
  ) {}

  async finish(parameters: FinishChatUseCase.Parameters): Promise<FinishChatUseCase.Result> {
    const loadedChat = await this.getChatByIdRepository.getById({ id: parameters.chatId });

    if (loadedChat.status === ChatStatusEnum.FINISHED) {
      return;
    }

    if (!loadedChat) {
      //todo
    }

    const chat: UpdateChatRepository.Parameters = {
      id: parameters.chatId,
      status: ChatStatusEnum.FINISHED,
      channelId: null,
    };

    await this.createChatLogRepository.create([
      {
        chatId: chat.id,
        actionType: ChatLogTypeActionEnum.FINISHED,
        userId: parameters.userId,
        createdAt: new Date(),
      },
    ]);

    const { instance: client } = await this.multiton.getInstance(parameters.clientId);
    await client.sendMessage(
      loadedChat.numberParticipant,
      `Seu atendimento foi finalizado, a partir desse momento qualquer mensagem enviada iniciará um novo atendimento. Tenha um ótimo dia!`,
    );

    await this.sendSelectNoteOfChatAutomaticMessage(loadedChat.numberParticipant, client);

    return await this.updateChatRepository.update(chat);
  }

  async sendSelectNoteOfChatAutomaticMessage(number: string, client: WhatsappClientInterface) {
    const rowsSections = [
      {
        id: 'avaliation_1',
        title: '⭐',
        description: 'Muito Ruim',
      },
      {
        id: 'avaliation_2',
        title: '⭐⭐',
        description: 'Ruim',
      },
      {
        id: 'avaliation_3',
        title: '⭐⭐⭐',
        description: 'Regular',
      },
      {
        id: 'avaliation_4',
        title: '⭐⭐⭐⭐',
        description: 'Muito Bom',
      },
      {
        id: 'avaliation_5',
        title: '⭐⭐⭐⭐⭐',
        description: 'Ótimo',
      },
    ];

    let sections: WhatsappSection[] = [
      {
        title: 'Selecione a opção desejada.',
        rows: rowsSections,
      },
    ];

    const text = `👋 Olá!! 
    \nAgora que seu atendimento foi finalizado queremos saber a sua opinião sobre o atendimento que você recebeu.
    \nSelecione a opção de acordo com a sua opinião, por favor não deixe de avaliar o nosso atendimento, essa informação é muito valiosa para nós continuarmos prestando um ótimo serviço ao cliente e melhorando conforme as avaliações negativas.
    \nLembrando que sua resposta só será computada se você selecionar uma das opções na lista abaixo.
    \n🤖 _Esta é uma mensagem automática_`;

    const list: WhatsappList = {
      body: text,
      buttonText: 'Avaliar',
      sections,
      title: 'Avaliação',
      footer: 'Esta é uma mensagem automática.',
    };

    await client.sendMessage(number, list);
  }
}
