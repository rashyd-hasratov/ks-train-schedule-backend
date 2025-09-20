import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { USER_NOT_FOUND, USERNAME_EXISTS } from 'src/messages';
import { UserRepository } from './user.repository';
import { UserData } from './user.types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getOneById(id: string) {
    const user = await this.userRepository.getOneById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const userData: UserData = {
      id,
      username: user.username,
    };

    return userData;
  }

  async getOneByUsername(username: string) {
    const existingUser = await this.userRepository.getOneByUsername(username);

    if (!existingUser) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const userData: UserData = {
      id: existingUser.id,
      username,
    };

    return userData;
  }

  async getFullModelByUsername(username: string) {
    const existingUser = await this.userRepository.getOneByUsername(username);

    if (!existingUser) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return existingUser;
  }

  async createOne(username: string, password: string) {
    const existingUser = await this.userRepository.getOneByUsername(username);

    if (existingUser) {
      throw new BadRequestException(USERNAME_EXISTS);
    }

    const hash = await argon.hash(password);
    const { id } = await this.userRepository.createOne(username, hash);
    const userData: UserData = {
      id,
      username,
    };

    return userData;
  }
}
