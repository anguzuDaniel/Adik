import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: { senderId: string; receiverId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.sendMessage(
      data.senderId,
      data.receiverId,
      data.content,
    );

    client.broadcast.emit(`receiveMessage-${data.receiverId}`, message);

    return message;
  }
}
