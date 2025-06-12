import { Injectable } from '@nestjs/common';
import { StatusGateway } from './status.gateway';

@Injectable()
export class StatusService {
  constructor(private readonly statusGateway: StatusGateway) {}

  async updateStatus(status: any) {
    // Aqui você salva no banco - substitua com seu ORM
    console.log('Salvando status no DB:', status);
    // Exemplo: await this.prisma.equipmentStatus.upsert({...});

    // Depois de salvar, notifique o frontend
    this.statusGateway.sendStatusUpdate(status);
  }
}
