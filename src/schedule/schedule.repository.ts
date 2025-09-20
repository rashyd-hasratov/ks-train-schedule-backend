import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ScheduleRecord } from './schedule.model';
import { ScheduleRecordCreationDto } from './dto/scheduleRecordCreation.dto';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectModel(ScheduleRecord)
    private scheduleModel: typeof ScheduleRecord,
  ) {}

  getAll() {
    return this.scheduleModel.findAll();
  }

  getOneById(id: string) {
    return this.scheduleModel.findOne({ where: { id } });
  }

  createOne({
    train,
    departurePlace,
    arrivalPlace,
    departureTime,
    arrivalTime,
  }: ScheduleRecordCreationDto) {
    return this.scheduleModel.create({
      train,
      departurePlace,
      arrivalPlace,
      departureTime,
      arrivalTime,
    });
  }
}
