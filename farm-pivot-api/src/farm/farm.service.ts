import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PivotService } from 'src/pivot/pivot.service';
import { CreateFarmDto } from './dto/create-farm.dto';

@Injectable()
export class FarmService {
  constructor(
    private prisma: PrismaService,
    private readonly pivotService: PivotService
  ) { }

  findAll() {
    return this.prisma.farm.findMany({ include: { pivots: true } });
  }

  create(data: CreateFarmDto) {
    return this.prisma.farm.create({
      data: {
        name: data.name,
        user: {
          connect: { id: data.userId },
        },
      },
    });
  }

  async update(id: number, data: any) {
    const updatedFarm = await this.prisma.farm.update({
      where: { id },
      data: {
        name: data.name
      },
    });

    if (data.pivots) {
      for (const pivotData of data.pivots) {
        if (
          pivotData.id &&
          (pivotData.status || pivotData.direction || pivotData.speed || pivotData.pressure)
        ) {
          await this.pivotService.update(pivotData.id, pivotData);
        }
      }
    }

    return updatedFarm;
  }

  delete(id: number) {
    return this.prisma.farm.delete({ where: { id } });
  }
}