import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PivotGateway {
  @WebSocketServer()
  server: Server;

  notifyStatusUpdate(pivotId: string, status: string) {
    this.server.emit(`pivot-status-${pivotId}`, { pivotId, status });
  }
}
