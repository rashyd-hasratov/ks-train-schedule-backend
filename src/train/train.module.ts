import { Module } from '@nestjs/common';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Train } from './train.model';
import { TrainRepository } from './train.repository';

@Module({
  imports: [SequelizeModule.forFeature([Train])],
  controllers: [TrainController],
  providers: [TrainService, TrainRepository],
  exports: [TrainService],
})
export class TrainModule {}
