import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(createMessageInput: CreateMessageInput) {
    const message = this.messageRepository.create(createMessageInput);
    return this.messageRepository.save(message);
  }

  async getMessageBetweenUsers(fromId: number, toId: number) {
    return await this.messageRepository.find({
      where: [
        { sender_id: fromId, receiver_id: toId },
        { sender_id: toId, receiver_id: fromId },
      ],
      order: {
        timestamp: 'ASC',
      },
    });
  }
}
