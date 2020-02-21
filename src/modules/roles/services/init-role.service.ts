import { OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { PermissionEntity } from '../entities/permission.entity';
import { RolePermissionEntity } from '../entities/role-permission.entity';
import { RolesBuilder, InjectRolesBuilder } from 'nest-access-control';

interface TypeMap<T> {
  [key: string]: T;
}

interface GrantData {
  role: string;
  resource: string;
  action: string;
  attributes: string;
}

/**
 * Load services from database
 */
export class InitRoleService implements OnModuleInit {
  constructor(
    @InjectRolesBuilder()
    private rolesBuilder: RolesBuilder,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRespository: Repository<PermissionEntity>,
  ) {}

  async onModuleInit() {
    const [roles, permissions] = await Promise.all([
      this.roleRepository.find({
        where: {
          isActive: true,
        },
      }),
      this.permissionRespository.find({
        where: {
          isActive: true,
        },
      }),
    ]);

    // empty data, use default
    if (roles.length === 0 || permissions.length === 0) {
      return;
    }

    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        roleId: In(roles.map(role => role.id)),
        permissionId: In(permissions.map(permission => permission.id)),
      },
    });

    // map role & permission
    const roleMap: TypeMap<RoleEntity> = roles.reduce(
      (r, role) => ({
        ...r,
        [role.id]: role,
      }),
      {},
    );

    const permMap: TypeMap<PermissionEntity> = permissions.reduce(
      (r, permission) => ({
        ...r,
        [permission.id]: permission,
      }),
      {},
    );

    const grants: GrantData[] = rolePermissions.map(rp => {
      const role = roleMap[rp.roleId];
      const perm = permMap[rp.permissionId];

      return {
        role: role.code,
        resource: perm.resource,
        action: perm.action,
        attributes: perm.attributes,
      } as GrantData;
    });

    if (grants.length) {
      this.rolesBuilder.setGrants(grants);
    }
  }
}
