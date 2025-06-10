import { Module } from '@nestjs/common';
import { StatusHistoryService } from './status-history.service';
import { StatusHistoryController } from './status-history.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StatusHistoryService],
  controllers: [StatusHistoryController],
  exports: [StatusHistoryService],
})
export class StatusHistoryModule {}