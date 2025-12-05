import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, WebSocketAdapter } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from './dto/send-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Chat Gateway Initialized');
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, payload: Message): void {
    this.server.emit('message', payload);
  }
}