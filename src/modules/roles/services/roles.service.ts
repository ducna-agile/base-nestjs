import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService extends TypeOrmCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) repository: Repository<RoleEntity>,
  ) {
    super(repository);
  }
}
