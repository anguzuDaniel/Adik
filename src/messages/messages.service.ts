import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from '../entities/messages.entity';
import { Repository } from 'typeorm';
import { DeleteMessagesResponse } from './dto/delete-messages.response';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private messageRepository: Repository<Messages>,
  ) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
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

  async deleteMessageById(messageId: number): Promise<DeleteMessagesResponse> {
    if (!messageId) {
      throw new UnauthorizedException('Message not found');
    }

    const message = await this.messageRepository.findOne({ where: { id: messageId } });

    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }

    await this.messageRepository.delete(messageId);

    return {
      success: true,
      message: `Message with ID ${messageId} has been successfully deleted.`,
    };
  }
}
