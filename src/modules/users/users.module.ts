import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

import { UsersService, ProfileService } from './services';
import { UsersController, ProfileController } from './controllers';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, ProfileService],
})
export class UsersModule {}
