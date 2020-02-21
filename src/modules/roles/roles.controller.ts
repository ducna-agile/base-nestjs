import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TokenGuard } from '../auth/auth.decorator';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  // constructor( @InjectRolesBuilder() private rolesBuilder: RolesBuilder ) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(TokenGuard, ACGuard)
  @UseRoles({
    resource: 'video',
    action: 'read',
    possession: 'any',
  })
  async findAll(@UserRoles() userRoles: any) {
    return userRoles;
  }

  // /**
  //  * update all roles
  //  */
  // @Post('xyz')
  // async bundle(

  //   @Body() grantList: object[],
  // ) {

  //   // let grantList = [
  //   //   { role: '@', resource: 'video', action: 'read:any', attributes: '*, !views' },
  //   //   { role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
  //   //   { role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
  //   //   { role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
  //   //   { role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },

  //   //   { role: 'user', resource: 'video', action: 'create:own', attributes: '*, !rating, !views' },
  //   //   { role: 'user', resource: 'video', action: 'read:any', attributes: '*' },
  //   //   { role: 'user', resource: 'video', action: 'update:own', attributes: '*, !rating, !views' },
  //   //   { role: 'user', resource: 'video', action: 'delete:own', attributes: '*' },
  //   // ];

  //   this.rolesBuilder.setGrants(grantList);

  //   return 'ok';
  // }
}
