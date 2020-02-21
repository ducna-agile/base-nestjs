import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ROLE_TABLE } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

@Entity(ROLE_TABLE)
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @Column()
  code: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({ example: '' })
  @Column({
    default: '',
  })
  description: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Column({
    default: true,
  })
  isActive: boolean;
}
