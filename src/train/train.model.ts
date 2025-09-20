import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  Default,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'trains' })
export class Train extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  declare id: string;

  @Unique
  @Column
  trainId: string;
}
