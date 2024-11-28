import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLES, USER_TYPES } from 'src/user/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const USER_ROLES = this.reflector.getAllAndOverride<USER_ROLES[]>('USER_ROLES', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!USER_ROLES || USER_ROLES.length === 0) return true;

    const USER_TYPES = this.reflector.getAllAndOverride<USER_TYPES>('USER_TYPES', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (USER_TYPES && USER_TYPES !== user.USER_TYPES) {
      throw new ForbiddenException(
        `Access denied. Expected user type: ${USER_TYPES}, but found: ${user.USER_TYPES}.`,
      );
    }

    if (!USER_ROLES.includes(user.role)) {
      throw new ForbiddenException(
        `Access denied. Your role does not have the necessary permissions.`,
      );
    }

    return true;
  }
}
