import { IsNotEmpty, IsString } from 'class-validator';

export class PlaceCreationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
