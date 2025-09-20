import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrainRepository } from './train.repository';
import { TRAIN_EXISTS, TRAIN_NOT_FOUND } from 'src/messages';

@Injectable()
export class TrainService {
  constructor(private trainRepository: TrainRepository) {}

  getAll() {
    return this.trainRepository.getAll();
  }

  async getOneById(id: string) {
    const existingTrain = await this.trainRepository.getOneById(id);

    if (!existingTrain) {
      throw new NotFoundException(TRAIN_NOT_FOUND);
    }

    return existingTrain;
  }

  async createOne(trainId: string) {
    const existingTrain = await this.trainRepository.getOneByTrainId(trainId);

    if (existingTrain) {
      throw new BadRequestException(TRAIN_EXISTS);
    }

    return this.trainRepository.createOne(trainId);
  }
}
