import { Controller, UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TokenGuard } from '@/modules/auth/auth.decorator';
import { InitRoleService } from '../services/init-role.service';
import { RolesService } from '../services/roles.service';
import { Crud } from '@nestjsx/crud';
import { RoleEntity } from '../entities/role.entity';

@ApiTags('Roles')
@Crud({
  model: {
    type: RoleEntity,
  },
  routes: {
    only: [
      'getManyBase',
      'getOneBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
    getManyBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    createOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    getOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    updateOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    deleteOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
  },
})
@Controller('roles')
export class RolesController {
  constructor(
    public readonly service: RolesService,
    private readonly initRoleService: InitRoleService,
  ) {}

  /**
   * update all roles
   */
  @Post('refresh')
  async refresh() {
    await this.initRoleService.onModuleInit();
  }
}
