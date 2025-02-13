import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service.js';
import { CreateMessagesInput } from './dto/create-messages.input.js';
import { Messages } from '../entities/messages.entity.js';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard.js';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { DeleteMessagesResponse } from './dto/delete-messages.response.js';

@Resolver(() => Messages)
export class MessagesResolver {
  constructor(private readonly messageService: MessagesService) {}

  @Mutation(() => Messages)
  @UseGuards(GqlAuthGuard)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessagesInput,
    @CurrentUser() user: any,
  ) {
    console.log('User', user.user?.id);
    console.log('User id', createMessageInput.senderId);

    return this.messageService.sendMessage(
      createMessageInput.senderId,
      createMessageInput.receiverId,
      createMessageInput.content,
      createMessageInput.parentId,
      user.user.id,
    );
  }

  @Mutation(() => [Messages])
  @UseGuards(GqlAuthGuard)
  getMessageBetweenUsers(
    @Args('receiverId') receiverId: string,
    @CurrentUser() user: any,
  ): Promise<Messages[]> {
    const senderId = user.user.id;
    return this.messageService.getMessageBetweenUsers(senderId, receiverId);
  }

  @Mutation(() => DeleteMessagesResponse)
  @UseGuards(GqlAuthGuard)
  deleteMessage(@Args('messageId') messageId: number) {
    return this.messageService.deleteMessageById(messageId);
  }
}
