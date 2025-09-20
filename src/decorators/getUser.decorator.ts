import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserData } from 'src/user';

export const GetUser = createParamDecorator(
  (data: keyof UserData | undefined, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<{ user: UserData }>();

    if (data) {
      return user[data];
    }

    return user;
  },
);
