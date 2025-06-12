import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class CommandService implements OnModuleInit {
  private readonly logger = new Logger(CommandService.name);
  private client: net.Socket;
  private readonly host = '127.0.0.1';
  private readonly port = 9000;

  onModuleInit() {
    this.connect();
  }

  private connect() {
    this.client = new net.Socket();

    this.client.connect(this.port, this.host, () => {
      this.logger.log(`Conectado na porta TCP ${this.port} para comandos`);
    });

    this.client.on('error', (err) => {
      this.logger.error('Erro no cliente TCP comando', err);
      // tenta reconectar após 5 segundos
      setTimeout(() => this.connect(), 5000);
    });
  }

  sendCommand(deviceId: string, command: 'ligado' | 'desligado') {
    if (!this.client || this.client.destroyed) {
      this.logger.warn('Tentativa de enviar comando, mas cliente TCP não está conectado');
      return { status: 'failed', reason: 'Client TCP não conectado' };
    }
    const message = JSON.stringify({ deviceId, command });
    this.client.write(message);
    this.logger.log(`Comando enviado: ${message}`);
    return { status: 'sent', deviceId, command };
  }
}

