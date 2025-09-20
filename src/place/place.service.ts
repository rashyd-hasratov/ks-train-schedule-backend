import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { PLACE_EXISTS, PLACE_NOT_FOUND } from 'src/messages';

@Injectable()
export class PlaceService {
  constructor(private placeRepository: PlaceRepository) {}

  getAll() {
    return this.placeRepository.getAll();
  }

  async getOneById(id: string) {
    const existingPlace = await this.placeRepository.getOneById(id);

    if (!existingPlace) {
      throw new NotFoundException(PLACE_NOT_FOUND);
    }

    return existingPlace;
  }

  async createOne(name: string) {
    const existingPlace = await this.placeRepository.getOneByName(name);

    if (existingPlace) {
      throw new BadRequestException(PLACE_EXISTS);
    }

    return this.placeRepository.createOne(name);
  }
}
