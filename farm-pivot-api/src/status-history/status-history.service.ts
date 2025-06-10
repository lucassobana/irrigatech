import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatusHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findByPivotId(pivotId: number) {
    return this.prisma.pivotStatusHistory.findMany({
      where: { pivotId },
      orderBy: { timestamp: 'desc' },
    });
  }

  async createStatus(data: any) {
    return this.prisma.pivotStatusHistory.create({
      data: {
        pivotId: data.pivotId,
        status: data.status,
        direction: data.direction,
        speed: data.speed,
        pressure: data.pressure,
        timestamp: new Date(),
      },
    });
  }
}
