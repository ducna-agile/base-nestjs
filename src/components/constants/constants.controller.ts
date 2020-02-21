import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Constants')
@Controller('constants')
export class ConstantsController {
  @Get()
  async index() {
    return {};
  }
}
