import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
} from 'sequelize-typescript';
import { Place } from 'src/place/place.model';
import { Train } from 'src/train/train.model';

@Table({ tableName: 'schedule' })
export class ScheduleRecord extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  declare id: string;

  @ForeignKey(() => Train)
  @Column
  train: string;

  @ForeignKey(() => Place)
  @Column
  departurePlace: string;

  @ForeignKey(() => Place)
  @Column
  arrivalPlace: string;

  @Column(DataType.DATE)
  departureTime: Date;

  @Column(DataType.DATE)
  arrivalTime: Date;
}
