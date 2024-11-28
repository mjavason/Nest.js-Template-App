import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { USER_ROLES, USER_TYPES } from 'src/user/user.interface';
import { RolesGuard } from 'src/auth/guard/role.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ExecutionContext,
  SetMetadata,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';

export function Auth(USER_ROLES: USER_ROLES[] = [], type?: USER_TYPES): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    SetMetadata('USER_ROLES', USER_ROLES),
    SetMetadata('USER_TYPES', USER_TYPES),
    UseGuards(RolesGuard),
    ApiBadRequestResponse({
      description: 'Bad request',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiForbiddenResponse({ description: 'forbidden' }),
    ApiBearerAuth(),
  );
}

export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();

  return user;
});
