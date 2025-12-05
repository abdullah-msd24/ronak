import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, WebSocketAdapter } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationService } from './notifications.service';
import { Notification } from './notification.entity';

@WebSocketGateway({ cors: true })
export class NotificationsGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('sendNotification')
  async handleSendNotification(client: any, payload: { userId: string; notification: Notification }) {
    const notification = await this.notificationService.createNotification(payload.userId, payload.notification);
    this.server.to(payload.userId).emit('notification', notification);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, roomId: string) {
    client.join(roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: any, roomId: string) {
    client.leave(roomId);
  }
}