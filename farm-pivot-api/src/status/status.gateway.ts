import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class StatusGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket Gateway iniciado');
  }

  sendStatusUpdate(status: any) {
    this.server.emit('statusUpdate', status);
  }
}
