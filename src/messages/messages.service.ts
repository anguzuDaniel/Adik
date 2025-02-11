import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from '../entities/messages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private messageRepository: Repository<Messages>,
  ) {}

  async sendMessage(
    senderId: number,
    receiverId: number,
    content: string,
    parentId?: number,
    userId?: string,
  ): Promise<Messages> {
    if (userId !== senderId.toString()) {
      throw new UnauthorizedException('You can only send message as yourself.');
    }

    const message = this.messageRepository.create({
      senderId,
      receiverId,
      content,
      parentId,
    });

    return await this.messageRepository.save(message);
  }

  async getMessageBetweenUsers(fromId: number, toId: number) {
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
