import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from '../entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesResolver, MessagesService, MessagesGateway],
})
export class MessagesModule {}
