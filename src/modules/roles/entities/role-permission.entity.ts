import { Entity, PrimaryColumn } from 'typeorm';
import { ROLE_PERMISSION_TABLE } from '../constants';

@Entity(ROLE_PERMISSION_TABLE)
export class RolePermissionEntity {
  @PrimaryColumn('uuid')
  roleId: string;

  @PrimaryColumn('uuid')
  permissionId: string;
}
