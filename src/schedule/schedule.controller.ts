import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { JwtGuard } from 'src/auth';
import { ScheduleRecordCreationDto } from './dto/scheduleRecordCreation.dto';

@Controller('schedule')
@UseGuards(JwtGuard)
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post()
  createOne(@Body() dto: ScheduleRecordCreationDto) {
    return this.scheduleService.createOne(dto);
  }

  @Get()
  getAll() {
    return this.scheduleService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.scheduleService.getOneById(id);
  }
}
