import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { LoginController } from './basic/controllers/login.controller';
import { BasicService } from './basic/basic.service';
import { UserBasicEntity } from './basic/entities/basic.entity';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserBasicEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [RegisterController, LoginController, AuthController],
  providers: [
    RegisterService,
    BasicService,
    JwtStrategy,
    TokenService,
    UsersService,
  ],
  exports: [TokenService, BasicService],
})
export class AuthModule {}
