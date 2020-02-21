import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TokenGuard } from '@/modules/auth/auth.decorator';
import { BrandEntity } from '../entities/brand.entity';
import { Crud } from '@nestjsx/crud';
import { BrandsService } from '../services/brands.service';

@ApiTags('Brands')
@Controller('brands')
@Crud({
  model: {
    type: BrandEntity,
  },
  routes: {
    only: [
      'getManyBase',
      'getOneBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
    getManyBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    createOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    getOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    updateOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
    deleteOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(TokenGuard)],
    },
  },
})
export class BrandsController {
  constructor(public readonly service: BrandsService) {}
}
