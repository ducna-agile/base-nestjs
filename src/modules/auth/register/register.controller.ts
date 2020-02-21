import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterForm } from './register.form';
import { ApiTags } from '@nestjs/swagger';
// import { SentryInterceptor } from '../../../components/sentry/sentry.interceptor';

// @UseInterceptors(SentryInterceptor)
@ApiTags('Authentication')
@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() payload: RegisterForm) {
    // throw new Error('Cai gi do');
    return this.registerService.create(payload);
  }
}
