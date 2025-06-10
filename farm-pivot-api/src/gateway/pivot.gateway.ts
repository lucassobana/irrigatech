import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PivotGateway {
  notifyPivotUpdate(pivotId: number, data: any) {
    this.server.emit(`pivot-update-${pivotId}`, data);
  }
  @WebSocketServer()
  server: Server;

  sendStatusUpdate(pivot: any) {
    this.server.emit('pivotStatusUpdate', pivot);
  }
}