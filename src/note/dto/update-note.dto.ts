import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Unique ID',
  })
  id!: string;

  //@IsDate()
  @IsString()
  @ApiProperty({ example: '01.01.2022', description: 'Recording date' })
  date!: string;

  @IsString()
  @ApiProperty({ example: 'Yura', description: 'Name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'This is message', description: 'Message' })
  message!: string;

  @IsString()
  @ApiProperty({ example: 'Src picture or video', description: 'Media' })
  media!: string;
}
