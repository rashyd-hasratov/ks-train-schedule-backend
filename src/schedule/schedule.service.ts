import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import {
  ARRIVAL_PLACE_NOT_FOUND,
  DEPARTURE_PLACE_NOT_FOUND,
  SCHEDULE_RECORD_NOT_FOUND,
  SCHEDULE_REQUIRED_RESOURCES_NOT_FOUND,
  TRAIN_NOT_FOUND,
} from 'src/messages';
import { ScheduleRecordCreationDto } from './dto/scheduleRecordCreation.dto';
import { TrainService } from 'src/train/train.service';
import { PlaceService } from 'src/place/place.service';

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private trainService: TrainService,
    private placeService: PlaceService,
  ) {}

  getAll() {
    return this.scheduleRepository.getAll();
  }

  async getOneById(id: string) {
    const existingScheduleRecord = await this.scheduleRepository.getOneById(id);

    if (!existingScheduleRecord) {
      throw new NotFoundException(SCHEDULE_RECORD_NOT_FOUND);
    }

    return existingScheduleRecord;
  }

  async createOne(scheduleRecordCreationDto: ScheduleRecordCreationDto) {
    const { train, departurePlace, arrivalPlace } = scheduleRecordCreationDto;

    const trainPromise = this.trainService.getOneById(train);
    const departurePlacePromise = this.placeService.getOneById(departurePlace);
    const arrivalPlacePromise = this.placeService.getOneById(arrivalPlace);

    // Please, pay attention to the order of resource promises.
    // Promise results are processed base on the order.
    const requiredResources = await Promise.all([
      trainPromise,
      departurePlacePromise,
      arrivalPlacePromise,
    ]);
    const requiredResourceErrors: string[] = [];

    requiredResources.forEach((resource, index) => {
      if (resource) {
        return;
      }

      switch (index) {
        case 0:
          requiredResourceErrors.push(TRAIN_NOT_FOUND);
          break;

        case 1:
          requiredResourceErrors.push(DEPARTURE_PLACE_NOT_FOUND);
          break;

        case 2:
          requiredResourceErrors.push(ARRIVAL_PLACE_NOT_FOUND);
          break;

        default:
          requiredResourceErrors.push(SCHEDULE_REQUIRED_RESOURCES_NOT_FOUND);
          break;
      }
    });

    if (requiredResourceErrors.length > 0) {
      throw new BadRequestException(JSON.stringify(requiredResourceErrors));
    }

    return this.scheduleRepository.createOne(scheduleRecordCreationDto);
  }
}
