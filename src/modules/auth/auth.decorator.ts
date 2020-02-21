import { createParamDecorator } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export interface UserIdentity {
  sub: string;
}

export const CurrentUser = createParamDecorator((data, req) => req.user);

export const TokenGuard = AuthGuard('jwt');
