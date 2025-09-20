import { IsNotEmpty, IsString } from 'class-validator';

export class TrainCreationDto {
  @IsString()
  @IsNotEmpty()
  trainId: string;
}
