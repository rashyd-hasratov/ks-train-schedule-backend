import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Train } from './train.model';

@Injectable()
export class TrainRepository {
  constructor(
    @InjectModel(Train)
    private trainModel: typeof Train,
  ) {}

  getAll() {
    return this.trainModel.findAll();
  }

  getOneById(id: string) {
    return this.trainModel.findOne({ where: { id } });
  }

  getOneByTrainId(trainId: string) {
    return this.trainModel.findOne({ where: { trainId } });
  }

  createOne(trainId: string) {
    return this.trainModel.create({ trainId });
  }
}
