import { Controller, Post, Body } from '@nestjs/common';
import { CommandService } from './command.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly commandService: CommandService) {}

  @Post('command')
  async sendCommand(@Body() body: { deviceId: string; command: 'ligado' | 'desligado' }) {
    return this.commandService.sendCommand(body.deviceId, body.command);
  }
}
