import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService extends TypeOrmCrudService<BrandEntity> {
  constructor(
    @InjectRepository(BrandEntity) repository: Repository<BrandEntity>,
  ) {
    super(repository);
  }
}
