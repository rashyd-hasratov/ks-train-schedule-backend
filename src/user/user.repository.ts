import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  getOneById(id: string) {
    return this.userModel.findOne({ where: { id } });
  }

  getOneByUsername(username: string) {
    return this.userModel.findOne({ where: { username } });
  }

  createOne(username: string, hash: string) {
    return this.userModel.create({ username, hash });
  }
}
