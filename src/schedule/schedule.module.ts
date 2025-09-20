import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleRecord } from './schedule.model';
import { PlaceModule } from 'src/place/place.module';
import { TrainModule } from 'src/train/train.module';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([ScheduleRecord]),
    PlaceModule,
    TrainModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
