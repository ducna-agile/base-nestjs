import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileForm {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
