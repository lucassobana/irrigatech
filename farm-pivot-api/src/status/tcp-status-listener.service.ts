import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as net from 'net';
import { StatusService } from './status.service';

@Injectable()
export class TcpStatusListenerService implements OnModuleInit {
  private readonly logger = new Logger(TcpStatusListenerService.name);
  private server: net.Server;

  constructor(private readonly statusService: StatusService) { }

  onModuleInit() {
    if (!this.server) {
      this.server = net.createServer((socket) => {
        this.logger.log('Novo cliente conectado na porta TCP de status');

        socket.on('data', (data) => {
          try {
            const status = JSON.parse(data.toString());
            this.logger.log('Status recebido via TCP: ' + JSON.stringify(status));
            this.statusService.updateStatus(status);
          } catch (err) {
            this.logger.error('Erro ao parsear JSON de status TCP', err);
          }
        });

        socket.on('error', (err) => {
          this.logger.error('Erro socket TCP status', err);
        });
      });

      this.server.listen(0, () => {
        const port = (this.server.address() as net.AddressInfo).port;
        this.logger.log(`Servidor escutando na porta dinâmica: ${port}`);
      });
    }
  }
}
