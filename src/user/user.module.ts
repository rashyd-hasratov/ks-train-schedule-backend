import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
