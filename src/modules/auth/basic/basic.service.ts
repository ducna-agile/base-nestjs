import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { TokenResponse } from '../token.response';
import { TokenService } from '../token.service';
import { BasicForm } from './forms/basic.form';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBasicEntity } from './entities/basic.entity';
import { ChangePasswordForm } from './forms/change-password.form';

@Injectable()
export class BasicService {
  constructor(
    @InjectRepository(UserBasicEntity)
    private readonly basicRepository: Repository<UserBasicEntity>,

    private readonly tokenService: TokenService,
  ) {}

  async findIdentity(username: string): Promise<UserBasicEntity | undefined> {
    const model = await this.basicRepository.findOne({
      where: {
        username,
      },
      select: ['userId', 'password'],
    });

    return model;
  }

  async findIdentityByEmail(
    email: string,
  ): Promise<UserBasicEntity | undefined> {
    const model = await this.basicRepository.findOne({
      where: {
        email,
      },
      select: ['userId', 'password'],
    });

    return model;
  }

  async findIdentityByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<UserBasicEntity | undefined> {
    const model = await this.basicRepository.findOne({
      where: [
        {
          username,
        },
        {
          email,
        },
      ],
      select: ['userId', 'password'],
    });

    return model;
  }

  async compareHash(plaintext: string, cyphertext: string): Promise<boolean> {
    // bcrypt
    if (cyphertext.includes('$')) {
      return bcrypt.compareSync(plaintext, cyphertext);
    }

    const md5 = crypto
      .createHash('md5')
      .update(plaintext)
      .digest('hex');
    return md5 === cyphertext;
  }

  async authenticate(payload: BasicForm): Promise<TokenResponse> {
    const user = await this.findIdentity(payload.username);

    if (!user) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'username',
          children: [],
          constraints: {
            invalid: 'wrong credentials',
          },
        },
      ]);
    }

    const isEqual = await this.compareHash(payload.password, user.password);
    if (!isEqual) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'username',
          children: [],
          constraints: {
            invalid: 'wrong credentials',
          },
        },
      ]);
    }

    return await this.tokenService.login(user.userId);
  }

  async changePassword(
    userId: number,
    payload: ChangePasswordForm,
  ): Promise<void> {
    const basicProfile = await this.basicRepository.findOne({
      select: ['userId', 'password'],
      where: {
        userId,
      },
    });

    if (!basicProfile) {
      throw new NotFoundException('User not found');
    }

    // validate old password
    const isEqual = await this.compareHash(
      payload.currentPassword,
      basicProfile.password,
    );
    if (!isEqual) {
      throw new BadRequestException([
        {
          target: payload,
          property: 'currentPassword',
          children: [],
          constraints: {
            isEqual: 'wrong password',
          },
        },
      ]);
    }

    basicProfile.password = payload.newPassword;
    await this.basicRepository.update(
      {
        userId,
      },
      {
        password: bcrypt.hashSync(payload.newPassword, 12),
      },
    );
  }
}
