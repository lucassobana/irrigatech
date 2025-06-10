import { Module } from '@nestjs/common';
import { PivotGateway } from './pivot.gateway';

@Module({
  providers: [PivotGateway],
  exports: [PivotGateway], // importante exportar para outros módulos usarem
})
export class GatewayModule {}
