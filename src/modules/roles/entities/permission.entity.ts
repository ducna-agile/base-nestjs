import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PERMISSION_TABLE } from '../constants';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity(PERMISSION_TABLE)
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin' })
  @Column()
  title: string;

  @ApiProperty({ example: 'resource' })
  @IsNotEmpty()
  @Column()
  resource: string;

  @ApiProperty({ example: '*:any' })
  @IsNotEmpty()
  @Column({
    default: '*:any',
  })
  action: string;

  @ApiProperty({ example: '' })
  @Column({
    default: '',
  })
  attributes: string;

  @ApiProperty({ example: true })
  @Column({
    default: true,
  })
  isActive: boolean;
}
