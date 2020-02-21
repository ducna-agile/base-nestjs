import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BasicForm {
  @ApiProperty({ description: 'Tên đăng nhập', default: 'quangthinh' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Mật khẩu', default: '123456' })
  @IsNotEmpty()
  password: string;
}
