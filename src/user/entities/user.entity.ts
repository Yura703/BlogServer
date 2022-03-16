import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'Unique ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'Yura', description: 'Name' })
  @Column('varchar', {
    default: 'USER',
  })
  name!: string;

  @ApiProperty({ example: 'yura', description: 'Login' })
  @Column('varchar', {
    default: 'user',
  })
  login!: string;

  @ApiProperty({ example: 'qwerty', description: 'Password' })
  @Column('varchar', {
    default: 'qwerty',
    select: false,
  })
  password!: string;
}

export type UserDto = Omit<IUser, 'password'>;
