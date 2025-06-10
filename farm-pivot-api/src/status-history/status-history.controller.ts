import { Controller, Get, Param } from '@nestjs/common';
import { StatusHistoryService } from './status-history.service';

@Controller('status-history')
export class StatusHistoryController {
  constructor(private readonly statusHistoryService: StatusHistoryService) {}

  @Get(':pivotId')
  findByPivot(@Param('pivotId') pivotId: string) {
    return this.statusHistoryService.findByPivotId(Number(pivotId));
  }
}