import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email' })
  @IsString()
  email: string;
}
