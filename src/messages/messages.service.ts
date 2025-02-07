import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/messages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<Message> {
    const message = this.messageRepository.create({
      senderId,
      receiverId,
      content,
    });
    return await this.messageRepository.save(message);
  }

  async getMessageBetweenUsers(fromId: string, toId: string) {
    return await this.messageRepository.find({
      where: [
        { senderId: fromId, receiverId: toId },
        { senderId: toId, receiverId: fromId },
      ],
      order: {
        timestamp: 'ASC',
      },
    });
  }
}
