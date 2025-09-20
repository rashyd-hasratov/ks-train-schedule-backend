import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth';
import { GetUser } from 'src/decorators';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser('id') id: string) {
    return this.userService.getOneById(id);
  }
}
