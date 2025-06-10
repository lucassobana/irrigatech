import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Farms')
@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get()
  findAll() {
    return this.farmService.findAll();
  }

  @Post()
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmService.create(createFarmDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateFarmDto })
    update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
      return this.farmService.update(+id, UpdateFarmDto);
    }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.farmService.delete(+id);
  }
}
