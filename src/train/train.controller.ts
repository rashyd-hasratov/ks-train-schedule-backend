import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainCreationDto } from './dto/trainCreation.dto';
import { JwtGuard } from 'src/auth';

@Controller('trains')
@UseGuards(JwtGuard)
export class TrainController {
  constructor(private trainService: TrainService) {}

  @Post()
  createOne(@Body() { trainId }: TrainCreationDto) {
    return this.trainService.createOne(trainId);
  }

  @Get()
  getAll() {
    return this.trainService.getAll();
  }
}
