import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({ description: 'Nome da fazenda' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email' })
  @IsNumber()
  userId: number;
}
