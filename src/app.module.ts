import { Module, CacheModule } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from '@/modules/auth/auth.module';

import { LocationsModule } from '@/components/locations/locations.module';
import { UsersModule } from '@/modules/users/users.module';

import { NotificationModule } from '@/modules/notification/notification.module';
import { ConfigModule } from '@/components/config/config.module';
import { TerminusModuleRegister } from '@/components/monitors';
import { RolesModule } from '@/modules/roles/roles.module';
import { ConstantsModule } from '@/components/constants/constants.module';
import { MailerRegister } from '@/components/mailer/mailer.register';

import { AppService } from './app.service';
import { BrandsModule } from './modules/brands/brands.module';

// TODO: install npm install --save @nest-modules/mailer

/**
 * AppModule Here
 */
@Module({
  imports: [
    // common
    RedisModule.register({
      url: process.env.REDIS_URL,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      charset: 'utf8mb4',
      synchronize: true, // auto migration
      logging: !process.env.NODE_ENV || process.env.NODE_ENV === 'local',
    }),
    CacheModule.register(),
    TerminusModuleRegister,
    MailerRegister,

    LocationsModule,
    ConstantsModule,
    ConfigModule,

    // extends
    AuthModule,
    UsersModule,
    RolesModule,

    NotificationModule,

    // brand
    BrandsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
