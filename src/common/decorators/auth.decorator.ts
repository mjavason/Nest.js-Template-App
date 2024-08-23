import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

export function Auth(): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBadRequestResponse({
      description: 'Bad request',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiForbiddenResponse({ description: 'forbidden' }),
    ApiBearerAuth('jwt'),
  );
}

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    return user;
  },
);
