import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './entities/country.entity';
import { StateEntity } from './entities/state.entity';
import { CityEntity } from './entities/city.entity';
import { CitiesService } from './services/cities.service';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesController } from './controllers/cities.controller';
import { CountriesController } from './controllers/countries.controller';
import { StatesController } from './controllers/states.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, StateEntity, CityEntity])],
  controllers: [CitiesController, CountriesController, StatesController],
  providers: [CitiesService, CountriesService, StatesService],
})
export class LocationsModule {}
