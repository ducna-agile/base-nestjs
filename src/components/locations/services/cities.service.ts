import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '../entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService extends TypeOrmCrudService<CityEntity> {
  constructor(
    @InjectRepository(CityEntity) repository: Repository<CityEntity>,
  ) {
    super(repository);
  }
}
