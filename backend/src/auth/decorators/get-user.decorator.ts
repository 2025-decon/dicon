import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  userId: number;
  email: string;
  nickname: string;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
