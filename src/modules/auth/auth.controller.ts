import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TokenForm } from './token.form';
import { TokenService } from './token.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  @ApiForbiddenResponse({ description: 'invalid token' })
  @ApiCreatedResponse({ description: 'refresh successfully' })
  @Post('token')
  refreshToken(@Body() payload: TokenForm) {
    return this.tokenService.refresh(payload.refreshToken);
  }

  @Post('logout')
  @ApiOperation({ tags: ['logout'] })
  @HttpCode(204)
  logout(@Body() payload: TokenForm) {
    return this.tokenService.revokeRefreshToken(payload.refreshToken);
  }
}
