import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { BasicForm } from '../forms/basic.form';
import { BasicService } from '../basic.service';
import { TokenResponse } from '../../token.response';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ChangePasswordForm } from '../forms/change-password.form';

import {
  CurrentUser,
  UserIdentity,
  TokenGuard,
} from '@/modules/auth/auth.decorator';

@ApiTags('Authentication')
@Controller('auth/basic')
export class LoginController {
  constructor(private readonly basicService: BasicService) {}

  @Post()
  async login(@Body() payload: BasicForm): Promise<TokenResponse> {
    return await this.basicService.authenticate(payload);
  }

  @ApiOperation({ tags: ['Change password'] })
  @ApiBearerAuth()
  @Post('password')
  @UseGuards(TokenGuard)
  @HttpCode(204)
  async changePassword(
    @Body() payload: ChangePasswordForm,
    @CurrentUser() identity: UserIdentity,
  ): Promise<void> {
    await this.basicService.changePassword(parseInt(identity.sub, 0), payload);
  }
}
