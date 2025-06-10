import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PivotService } from './pivot.service';
import { CreatePivotDto } from './dto/create-pivot.dto';
import { UpdatePivotDto } from './dto/update-pivot.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pivots')
@Controller('pivots')
export class PivotController {
  constructor(private readonly pivotService: PivotService) { }

  @Get()
  findAll() {
    return this.pivotService.findAll();
  }

  @Post()
  create(@Body() createPivotDto: CreatePivotDto) {
    return this.pivotService.create(createPivotDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdatePivotDto })
  update(@Param('id') id: string, @Body() updatePivotDto: UpdatePivotDto) {
    return this.pivotService.update(+id, updatePivotDto);
  }

  @Put(':id/off')
  @ApiOperation({ summary: 'Desliga o pivô (status = desligado)' })
  turnOff(@Param('id') id: string) {
    return this.pivotService.turnOff(+id);
  }

  @Put(':id/on')
  @ApiOperation({ summary: 'Liga o pivô (status = ligado)' })
  turnOn(@Param('id') id: string) {
    return this.pivotService.turnOn(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pivotService.remove(+id);
  }

}