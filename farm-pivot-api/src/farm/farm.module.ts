import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StatusHistoryModule } from '../status-history/status-history.module'; 
import { GatewayModule } from '../gateway/gateway.module';
import { PivotService } from 'src/pivot/pivot.service';

@Module({
  imports: [PrismaModule, StatusHistoryModule, GatewayModule],
  controllers: [FarmController],
  providers: [FarmService, PivotService],
})
export class FarmModule {}
