import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { CommandModule } from './command.module';

@Module({
  imports: [CommandModule],
  controllers: [EquipmentController]
})
export class EquipmentModule {}
