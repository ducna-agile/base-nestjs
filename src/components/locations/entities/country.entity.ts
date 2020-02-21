import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('LocationCountry')
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;
}
