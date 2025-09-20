import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ScheduleRecordCreationDto {
  @IsString()
  @IsNotEmpty()
  train: string;

  @IsString()
  @IsNotEmpty()
  departurePlace: string;

  @IsString()
  @IsNotEmpty()
  arrivalPlace: string;

  @IsDate()
  departureTime: Date;

  @IsDate()
  arrivalTime: Date;
}
