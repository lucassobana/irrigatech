import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, Min, Max } from 'class-validator';

export enum PivotStatus {
  LIGADO = 'ligado',
  DESLIGADO = 'desligado',
}

export enum PivotDirection {
  HORARIO = 'horario',
  ANTIHORARIO = 'antihorario',
}

export class CreatePivotDto {
  @ApiProperty({ description: 'Nome do pivô' })
  @IsString()
  name: string;

  @ApiProperty({ enum: PivotStatus, description: 'Status do pivô' })
  @IsEnum(PivotStatus)
  status: PivotStatus;

  @ApiProperty({ enum: PivotDirection, description: 'Direção do pivô' })
  @IsEnum(PivotDirection)
  direction: PivotDirection;

  @ApiProperty({ description: 'Velocidade do pivô', minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  speed: number;

  @ApiProperty({ description: 'Pressão do pivô' })
  @IsNumber()
  pressure: number;

  @ApiProperty({ description: 'ID da fazenda associada' })
  @IsNumber()
  farmId: number;
}
