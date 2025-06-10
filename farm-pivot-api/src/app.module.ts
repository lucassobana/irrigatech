import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';
import { PivotModule } from './pivot/pivot.module';
import { StatusHistoryModule } from './status-history/status-history.module';

@Module({
  imports: [PrismaModule, UserModule, FarmModule, PivotModule, StatusHistoryModule],
})
export class AppModule {}
