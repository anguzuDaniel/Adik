import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service.js';
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
    const message = await this.messagesService.sendMessage({
        userId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
      },
      data.senderId
    );

    client.broadcast.emit(`receiveMessage-${data.receiverId}`, message);

    return message;
  }
}
