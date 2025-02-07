import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessagesResolver, MessagesService, MessagesGateway],
})
export class MessagesModule {}
