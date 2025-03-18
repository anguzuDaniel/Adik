import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { MessagesService } from './messages.service.js';
import { CreateMessagesInput } from './dto/create-messages.input.js';
import { Messages } from '../entities/messages.entity.js';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard.js';
import {
  InternalServerErrorException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { DeleteMessagesResponse } from './dto/delete-messages.response.js';

@Resolver(() => Messages)
export class MessagesResolver {
  constructor(private readonly messageService: MessagesService) {}

  @Mutation(() => Messages)
  @UseGuards(GqlAuthGuard)
  async sendMessage(
    @Args('createMessageInput') input: CreateMessagesInput,
    @CurrentUser() user: any,
  ) {
    try {
      return await this.messageService.sendMessage(
        {
          receiverId: input.receiverId,
          content: input.content,
          parentId: input.parentId
        },
        user.id
      );
    } catch (error) {
      throw new InternalServerErrorException('Message sending failed', error.message);
    }
  }

  @Query(() => [Messages])
  @UseGuards(GqlAuthGuard)
  getMessageBetweenUsers(
    @Args('receiverId', { type: () => String }) receiverId: string,
    @CurrentUser() user: any,
  ): Promise<Messages[]> {
    const senderId = user.id;
    return this.messageService.getMessageBetweenUsers(senderId, receiverId);
  }

  @Mutation(() => DeleteMessagesResponse)
  @UseGuards(GqlAuthGuard)
  deleteMessage(@Args('id', { type: () => String }) id: string) {
    return this.messageService.deleteMessageById(id);
  }
}
