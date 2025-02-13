import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { MessagesResolver } from './messages.resolver.js';
import { MessagesGateway } from './messages.gateway.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from '../entities/messages.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesResolver, MessagesService, MessagesGateway],
})
export class MessagesModule {}
