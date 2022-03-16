import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// export interface IUser {
//   id: string;
//   name: string;
//   login: string;
//   password: string;
// }

@Entity({ name: 'notes' })
export class Note {
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
  date: string;

  @ApiProperty({ example: 'Yura', description: 'Name' })
  @Column('varchar', {
    default: 'Yura',
  })
  name: string;

  @ApiProperty({ example: 'file or string', description: 'Message' })
  @Column('varchar', {
    default: '',
  })
  message!: string;
}
