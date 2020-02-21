import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { RegisterForm } from './register.form';
import { BasicService } from '../basic/basic.service';
import { getConnection } from 'typeorm';
import { UserBasicEntity } from '../basic/entities/basic.entity';

@Injectable()
export class RegisterService {
  constructor(private readonly basicService: BasicService) {}

  async create(payload: RegisterForm): Promise<void> {
    // validate username
    const user = await this.basicService.findIdentity(payload.username);
    if (user) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'username',
          children: [],
          constraints: {
            username: 'username is not available',
          },
        },
      ]);
    }

    const userEmail = await this.basicService.findIdentity(payload.username);
    if (userEmail) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'email',
          children: [],
          constraints: {
            email: 'email is not available',
          },
        },
      ]);
    }

    return await getConnection().transaction(async manager => {
      const profile = manager.create(UserEntity, {
        ...payload,
      });
      const newUser: UserEntity = await manager.save(profile);

      const basic = manager.create(UserBasicEntity, {
        ...payload,
        userId: newUser.id,
      });

      await manager.save(basic);
    });
  }
}
