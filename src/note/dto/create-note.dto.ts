import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ example: 'Yura', description: 'Name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'This is message', description: 'Message' })
  message: string;
}
