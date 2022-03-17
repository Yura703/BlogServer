import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'notes' })
export class Note {
  constructor(name: string, message: string, fileId: string, fileName: string) {
    this.name = name;
    this.message = message;
    this.fileId = fileId;
    this.fileName = fileName;
    this.date = new Date().toLocaleString();
    this.id = uuid();
  }
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Unique ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: '01.01.2022', description: 'Recording date' })
  @Column('varchar', {
    default: '01.01.2022',
  })
  date!: string;

  @ApiProperty({ example: 'Yura', description: 'Name' })
  @Column('varchar', {
    default: 'Yura',
  })
  name: string;

  @ApiProperty({ example: 'This is message', description: 'Message' })
  @Column('varchar', {
    default: '',
  })
  message!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Unique ID',
  })
  @Column('varchar', {
    default: '',
  })
  fileId!: string;

  @ApiProperty({ example: 'picture.jpg', description: 'fileName' })
  @Column('varchar', {
    default: '',
  })
  fileName!: string;
}
