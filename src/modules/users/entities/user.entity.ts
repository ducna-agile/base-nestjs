import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  firstName?: string = '';

  @Column()
  lastName?: string = '';

  @Column()
  avatar?: string = '';

  @Column()
  phoneNumber?: string = '';

  @Column()
  idCardOrTaxCode?: string = '';

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
