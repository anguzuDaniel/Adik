import {
  Injectable, InternalServerErrorException,
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
    messageData: {
      receiverId: string,
      content: string,
      parentId?: string,
      userId?: string
    },
    authenticatedUserId: string
  ): Promise<Messages> {
    if (messageData.parentId) {
      const parentExists = await this.messageRepository.existsBy({
        id: messageData.parentId
      });
      if (!parentExists) {
        throw new NotFoundException('Parent message not found');
      }
    }

    let encryptedContent: string;
    try {
      encryptedContent = encryptMessage(messageData.content);
    } catch (error) {
      throw new InternalServerErrorException('Message encryption failed');
    }

    try {
      const message = this.messageRepository.create({
        ...messageData,
        content: encryptedContent,
        senderId: authenticatedUserId
      });

      return await this.messageRepository.save(message);
    } catch (dbError) {
      throw new InternalServerErrorException('Failed to send message');
    }
  }

  /**
   * Find a message by ID (decrypt content after retrieving).
   */
  async findOne(id: string): Promise<Messages | null> {
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

  async deleteMessageById(messageId: string): Promise<DeleteMessagesResponse> {
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
