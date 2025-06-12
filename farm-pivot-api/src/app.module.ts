import { EquipmentModule } from './equipment/equipment.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';
import { PivotModule } from './pivot/pivot.module';
import { StatusHistoryModule } from './status-history/status-history.module';
import { StatusService } from './status/status.service';
import { StatusGateway } from './status/status.gateway';
import { StatusModule } from './status/status.module';
import { PrismaService } from './prisma/prisma.service';
import { CommandModule } from './equipment/command.module';

@Module({
  imports: [PrismaModule, UserModule, FarmModule, PivotModule, StatusHistoryModule, EquipmentModule, StatusModule, CommandModule],
  providers: [
    StatusService,
    StatusGateway,
    PrismaService
  ],
})
export class AppModule {}
