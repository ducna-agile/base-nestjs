import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class PermissionsService extends TypeOrmCrudService<PermissionEntity> {
  constructor(@InjectRepository(PermissionEntity) repository) {
    super(repository);
  }
}
