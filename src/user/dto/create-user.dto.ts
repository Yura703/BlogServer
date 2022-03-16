import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Yura', description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'yura', description: 'Login' })
  @IsOptional()
  @IsString()
  login: string;

  @ApiProperty({ example: 'qwerty', description: 'Password' })
  @IsOptional()
  @IsString()
  password: string;
}
