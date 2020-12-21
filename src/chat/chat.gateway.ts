import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ChatPayload {
  sender: string;
  message: string;
}

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit{
  private logger = new Logger('ChatGateway');

  @WebSocketServer()
  private wss: Server

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: ChatPayload): void {
    this.wss.emit('chatToClient', message);
  }
}
