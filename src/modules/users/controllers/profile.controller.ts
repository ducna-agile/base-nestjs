import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiConsumes,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CurrentUser,
  TokenGuard,
  UserIdentity,
} from '@/modules/auth/auth.decorator';

import { UserEntity } from '../entities/user.entity';
import { UpdateProfileForm } from '../forms/update-profile.forms';
import { ProfileService } from '../services';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiBearerAuth()
  @ApiOperation({ tags: ['Get current profile'] })
  @UseGuards(TokenGuard)
  @Get()
  async currentProfile(
    @CurrentUser() identity: UserIdentity,
  ): Promise<UserEntity> {
    const user = await this.profileService.fetchCurrent(identity);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ tags: ['Update current profile'] })
  @Post()
  @UseGuards(TokenGuard)
  update(
    @CurrentUser() identity: UserIdentity,
    @Body() payload: UpdateProfileForm,
  ) {
    return this.profileService.update(identity, payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ tags: ['Update avatar of current profile'] })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'new avatar file',
        },
      },
      required: ['avatar'],
    },
  })
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(TokenGuard)
  async updateAvatar(
    @CurrentUser() identity: UserIdentity,
    @UploadedFile() file,
  ) {
    return this.profileService.updateAvatar(identity, file);
  }
}
