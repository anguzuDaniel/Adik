import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from '../entities/messages.entity.js';
import { Repository } from 'typeorm';
import { DeleteMessagesResponse } from './dto/delete-messages.response.js';
import { decryptMessage, encryptMessage } from '../helpers/crypto.js';

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

    const encryptedContent = encryptMessage(content);

    const message = this.messageRepository.create({
      senderId,
      receiverId,
      content: encryptedContent,
      parentId,
    });

    return await this.messageRepository.save(message);
  }

  /**
   * Find a message by ID (decrypt content after retrieving).
   */
  async findOne(id: number): Promise<Messages | null> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (message) {
      message.content = decryptMessage(message.content);
    }
    return message;
  }

  async getMessageBetweenUsers(fromId: string, toId: string) {
    try {
      const messages = await this.messageRepository.find({
        where: [
          { senderId: fromId, receiverId: toId },
          { senderId: toId, receiverId: fromId },
        ],
        order: {
          timestamp: 'ASC',
        },
      });

      return messages.map((message) => {
        try {
          message.content = decryptMessage(message.content);
          return message;
        } catch (decryptionError) {
          console.error('Failed to decrypt message:', decryptionError);
          throw new Error('Failed to decrypt message content');
        }
      });
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  async deleteMessageById(messageId: number): Promise<DeleteMessagesResponse> {
    if (!messageId) {
      throw new UnauthorizedException('Message not found');
    }

    const message = await this.messageRepository.findOne({
      where: { id: messageId },
    });

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
