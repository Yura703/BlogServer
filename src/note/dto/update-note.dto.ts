import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @ApiProperty({ example: 'This is message', description: 'Message' })
  message!: string;
}
