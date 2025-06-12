import { Module } from '@nestjs/common';
import { TcpStatusListenerService } from './tcp-status-listener.service';
import { StatusService } from './status.service';
import { StatusGateway } from './status.gateway';

@Module({
  providers: [TcpStatusListenerService, StatusService, StatusGateway],
  exports: [StatusService],
})
export class StatusModule {}
