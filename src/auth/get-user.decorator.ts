import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // const req = ctx.switchToHttp().getRequest();
    // return req.user;

    if (ctx && ctx.switchToHttp) {
      const req = ctx.switchToHttp().getRequest();
      return req.user;
    } else {
      throw new Error(
        'ExecutionContext is undefined or switchToHttp is not available.',
      );
    }
  },
);
