import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../constants';

@Entity('Brand')
export class BrandEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id?: number;

  @ApiProperty({ example: 'Vietcombank' })
  @IsNotEmpty()
  @Column()
  name?: string = '';

  @ApiProperty({ example: 'vietcombank' })
  @IsNotEmpty()
  @Column()
  slug?: string = '';

  @ApiProperty({ example: 'VCB' })
  @Column()
  swiftCode?: string = '';

  @ApiProperty({
    example:
      'https://i1.wp.com/hopdungcardvisit.com/wp-content/uploads/2019/05/logo-ngan-hang-Vietcombank.png?resize=213%2C76&ssl=1',
  })
  @Column()
  logo?: string = '';

  @ApiProperty({ example: Status.ACTIVE })
  @Column({
    default: Status.ACTIVE,
  })
  status?: number = Status.ACTIVE;

  @ApiProperty({ example: '2020-02-18T20:38:26.678Z' })
  @Column()
  createdAt?: Date;

  @ApiProperty({ example: '2020-02-18T20:38:26.678Z' })
  @Column()
  updatedAt?: Date;
}
