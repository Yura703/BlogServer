import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'unique ID',
  })
  @IsUUID()
  readonly id!: string;

  @ApiProperty({ example: 'Yura', description: 'Name' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ example: 'yura', description: 'Login' })
  @IsString()
  readonly login!: string;

  @ApiProperty({ example: 'qwerty', description: 'Password' })
  @IsString()
  readonly password!: string;
}
