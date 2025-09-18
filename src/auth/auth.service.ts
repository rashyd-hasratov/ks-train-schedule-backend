import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { INVALID_USER_CREDENTIALS } from 'src/messages';
import { UserService } from 'src/user/user.service';
import { UserData } from 'src/user/user.types';
import { AuthResponsePayload } from './auth.types';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, password } = signUpDto;
    const userData = await this.userService.createOne(username, password);
    const accessToken = this.signToken(userData);
    const payload: AuthResponsePayload = { accessToken };

    return payload;
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    try {
      const { id, hash } =
        await this.userService.getFullModelByUsername(username);
      const isCorrectPassword = await argon.verify(hash, password);

      if (!isCorrectPassword) {
        throw new BadRequestException(INVALID_USER_CREDENTIALS);
      }

      const userData: UserData = {
        id,
        username,
      };
      const accessToken = this.signToken(userData);
      const payload: AuthResponsePayload = { accessToken };

      return payload;
    } catch {
      throw new BadRequestException(INVALID_USER_CREDENTIALS);
    }
  }

  async signToken(userData: UserData) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const accessToken = await this.jwtService.signAsync(userData, {
      secret,
    });

    return accessToken;
  }

  async verifyToken(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const userData = await this.jwtService.verifyAsync<UserData>(token, {
      secret,
    });

    return userData;
  }
}
