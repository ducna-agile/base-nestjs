import { Module } from '@nestjs/common';
import { AccessControlModule } from 'nest-access-control';
import { RolesController } from './controllers/roles.controller';
import { InitRoleService } from './services/init-role.service';
import { roles } from './roles';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { RolesService } from './services/roles.service';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      RolePermissionEntity,
      PermissionEntity,
    ]),
    AccessControlModule.forRoles(roles),
  ],
  controllers: [RolesController, PermissionsController],
  providers: [InitRoleService, RolesService, PermissionsService],
})
export class RolesModule {}
