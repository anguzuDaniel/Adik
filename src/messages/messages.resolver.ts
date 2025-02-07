import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { CreateMessagesInput } from './dto/create-messages.input';
import { Message } from 'src/entities/messages.entity';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messageService: MessagesService) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessagesInput,
  ) {
    return this.messageService.sendMessage(
      createMessageInput.senderId,
      createMessageInput.receiverId,
      createMessageInput.content,
    );
  }
}
