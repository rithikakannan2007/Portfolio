import { Message, IMessage } from '../models/Message';

export class MessageService {
  public async getAllMessages(): Promise<IMessage[]> {
    return await Message.find().sort({ createdAt: -1 });
  }

  public async getMessageById(id: string): Promise<IMessage | null> {
    return await Message.findById(id);
  }

  public async createMessage(data: Partial<IMessage>): Promise<IMessage> {
    const message = new Message(data);
    return await message.save();
  }

  public async deleteMessage(id: string): Promise<IMessage | null> {
    return await Message.findByIdAndDelete(id);
  }
}

export const messageService = new MessageService();
