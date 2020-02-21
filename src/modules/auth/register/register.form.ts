import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterForm {
  @ApiProperty({ example: 'Vu' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Quang Thinh' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'quangthinh' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'quangthinh' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '0967888999' })
  phoneNumber: string;

  @ApiProperty({ example: '4300205943' })
  idCardOrTaxCode: string;
}
