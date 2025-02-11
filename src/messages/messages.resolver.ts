import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { CreateMessagesInput } from './dto/create-messages.input';
import { Messages } from 'src/entities/messages.entity';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Messages)
export class MessagesResolver {
  constructor(private readonly messageService: MessagesService) {}

  @Mutation(() => Messages)
  @UseGuards(GqlAuthGuard)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessagesInput,
    @CurrentUser() user: any,
  ) {
    console.log('User', user.user.id);
    console.log('User id', createMessageInput.senderId);

    return this.messageService.sendMessage(
      createMessageInput.senderId,
      createMessageInput.receiverId,
      createMessageInput.content,
      createMessageInput.parentId,
      user.user.id,
    );
  }
}
