import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { CreateMessagesInput } from './dto/create-messages.input';
import { Messages } from 'src/entities/messages.entity';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Messages)
export class MessagesResolver {
  constructor(private readonly messageService: MessagesService) {}

  @Mutation(() => Messages)
  @UseGuards(GqlAuthGuard)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessagesInput,
  ) {
    return this.messageService.sendMessage(
      createMessageInput.senderId,
      createMessageInput.receiverId,
      createMessageInput.content,
      createMessageInput.parentId,
    );
  }
}
