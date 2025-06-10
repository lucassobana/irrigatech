import { Module } from '@nestjs/common';
import { PivotService } from './pivot.service';
import { PivotController } from './pivot.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PivotGateway } from '../gateway/pivot.gateway';
import { StatusHistoryModule } from 'src/status-history/status-history.module';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [PrismaModule,StatusHistoryModule, GatewayModule],
  controllers: [PivotController],
  providers: [PivotService, PivotGateway],
  exports: [PivotService],
})
export class PivotModule {}