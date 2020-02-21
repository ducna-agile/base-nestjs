import { Controller, UseGuards } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { TokenGuard } from '../../auth/auth.decorator';
import { UseRoles, ACGuard } from 'nest-access-control';

@ApiTags('Users')
@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
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
      decorators: [
        ApiBearerAuth(),
        UseGuards(TokenGuard, ACGuard),
        UseRoles({
          resource: 'user',
          action: 'read',
          possession: 'any',
        }),
      ],
    },
    createOneBase: {
      decorators: [
        ApiBearerAuth(),
        UseGuards(TokenGuard, ACGuard),
        UseRoles({
          resource: 'user',
          action: 'create',
          possession: 'any',
        }),
      ],
    },
    getOneBase: {
      decorators: [
        ApiBearerAuth(),
        UseGuards(TokenGuard, ACGuard),
        UseRoles(
          {
            resource: 'user',
            action: 'read',
            possession: 'own',
          },
          {
            resource: 'user',
            action: 'read',
            possession: 'any',
          },
        ),
      ],
    },
    updateOneBase: {
      decorators: [
        ApiBearerAuth(),
        UseGuards(TokenGuard, ACGuard),
        UseRoles({
          resource: 'user',
          action: 'update',
          possession: 'own',
        }),
      ],
    },
    deleteOneBase: {
      decorators: [
        ApiBearerAuth(),
        UseGuards(TokenGuard, ACGuard),
        UseRoles({
          resource: 'user',
          action: 'delete',
          possession: 'own',
        }),
      ],
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UsersService) {}
}
