import { PartialType } from '@nestjs/swagger';
import { CreatePivotDto } from './create-pivot.dto';

export class UpdatePivotDto extends PartialType(CreatePivotDto) {}