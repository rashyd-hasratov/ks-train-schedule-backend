import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Place } from './place.model';
import { PlaceRepository } from './place.repository';

@Module({
  imports: [SequelizeModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository],
  exports: [PlaceService],
})
export class PlaceModule {}
