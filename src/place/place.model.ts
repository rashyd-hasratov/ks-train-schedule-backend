import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  Default,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'places' })
export class Place extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  declare id: string;

  @Unique
  @Column
  name: string;
}
