import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity('UserBasic')
export class UserBasicEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column('varchar')
  email?: string = '';

  @Exclude()
  @Column('varchar', { select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12);
    }
  }
}
