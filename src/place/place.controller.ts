import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PlaceService } from './place.service';
import { JwtGuard } from 'src/auth';
import { PlaceCreationDto } from './dto/placeCreation.dto';

@Controller('places')
@UseGuards(JwtGuard)
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Post()
  createOne(@Body() { name }: PlaceCreationDto) {
    return this.placeService.createOne(name);
  }

  @Get()
  getAll() {
    return this.placeService.getAll();
  }
}
