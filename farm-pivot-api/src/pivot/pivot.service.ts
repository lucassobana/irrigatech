import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePivotDto } from './dto/create-pivot.dto';
import { UpdatePivotDto } from './dto/update-pivot.dto';
import { PivotGateway } from 'src/gateway/pivot.gateway';
import { StatusHistoryService } from 'src/status-history/status-history.service';

@Injectable()
export class PivotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly statusHistoryService: StatusHistoryService,
    private readonly pivotGateway: PivotGateway,
  ) { }

  findAll() {
    return this.prisma.pivot.findMany();
  }

  create(data: CreatePivotDto) {
    return this.prisma.pivot.create({
      data: {
        name: data.name,
        status: data.status,
        direction: data.direction,
        speed: data.speed,
        pressure: data.pressure,
        farm: {
          connect: { id: data.farmId },
        },
      },
    });
  }

  async update(id: number, data: any) {
    const updatedPivot = await this.prisma.pivot.update({
      where: { id },
      data: {
        status: data.status,
        direction: data.direction,
        speed: data.speed,
        pressure: data.pressure,
      },
    });

    await this.statusHistoryService.createStatus({
      pivotId: id,
      status: data.status,
      direction: data.direction,
      speed: data.speed,
      pressure: data.pressure,
    });

    this.pivotGateway.notifyPivotUpdate(id, {
      pivotId: id,
      status: data.status,
      direction: data.direction,
      speed: data.speed,
      pressure: data.pressure,
    });

    return updatedPivot;
  }

  async turnOff(id: number) {
    const updatedPivot = await this.prisma.pivot.update({
      where: { id },
      data: {
        status: "desligado",
      },
    });

    await this.statusHistoryService.createStatus({
      pivotId: id,
      status: updatedPivot.status,
      direction: updatedPivot.direction,
      speed: updatedPivot.speed,
      pressure: updatedPivot.pressure,
    });

    this.pivotGateway.notifyPivotUpdate(id, {
      pivotId: id,
      status: updatedPivot.status,
      direction: updatedPivot.direction,
      speed: updatedPivot.speed,
      pressure: updatedPivot.pressure,
    });

    return updatedPivot;
  }

  async turnOn(id: number) {
    const updatedPivot = await this.prisma.pivot.update({
      where: { id },
      data: {
        status: "ligado",
      },
    });

    await this.statusHistoryService.createStatus({
      pivotId: id,
      status: updatedPivot.status,
      direction: updatedPivot.direction,
      speed: updatedPivot.speed,
      pressure: updatedPivot.pressure,
    });

    this.pivotGateway.notifyPivotUpdate(id, {
      pivotId: id,
      status: updatedPivot.status,
      direction: updatedPivot.direction,
      speed: updatedPivot.speed,
      pressure: updatedPivot.pressure,
    });

    return updatedPivot;
  }

  async remove(id: number) {
    return this.prisma.pivot.delete({
      where: { id },
    });
  }

}