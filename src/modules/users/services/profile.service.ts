import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as uuid from 'uuid';

import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserIdentity } from '../../auth/auth.decorator';
import { UpdateProfileForm } from '../forms/update-profile.forms';

export interface FileInfo {
  fieldname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  fetchCurrent(identity: UserIdentity) {
    return this.userRepository.findOne(identity.sub);
  }

  /**
   * Update Profile
   */
  async update(
    user: UserIdentity,
    profile: UpdateProfileForm,
  ): Promise<UpdateProfileForm> {
    await this.userRepository.update(user.sub, profile);
    return profile;
  }

  async updateAvatar(identity: UserIdentity, file: FileInfo) {
    const user = await this.fetchCurrent(identity);

    const oldAvatar = user.avatar;

    // fs.writeFile();
    const name = '/users/' + uuid.v4() + '.jpg';
    fs.writeFileSync(process.env.ASSET_DIR + name, file.buffer);

    if (oldAvatar) {
      fs.unlink(process.env.ASSET_DIR + user.avatar, () => {
        // old
      });
    }

    await this.userRepository.update(user.id, {
      avatar: name,
    });
  }
}
