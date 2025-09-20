import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Place } from './place.model';

@Injectable()
export class PlaceRepository {
  constructor(
    @InjectModel(Place)
    private placeModel: typeof Place,
  ) {}

  getAll() {
    return this.placeModel.findAll();
  }

  getOneById(id: string) {
    return this.placeModel.findOne({ where: { id } });
  }

  getOneByName(name: string) {
    return this.placeModel.findOne({ where: { name } });
  }

  createOne(name: string) {
    return this.placeModel.create({ name });
  }
}
