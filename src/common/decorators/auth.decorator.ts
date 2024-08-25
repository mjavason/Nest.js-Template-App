import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles, UserType } from 'src/user/user.interface';
import { RolesGuard } from 'src/auth/role.guard';
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

export function Auth(roles: Roles[] = [], type?: UserType): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    SetMetadata('roles', roles),
    SetMetadata('userType', type),
    UseGuards(RolesGuard),
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

export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();

  return user;
});
