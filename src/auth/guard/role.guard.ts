import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLES, USER_TYPES } from 'src/user/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const roles = this.reflector.getAllAndOverride<USER_ROLES[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) return true;

    const userType = this.reflector.getAllAndOverride<USER_TYPES>('userType', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (userType && userType !== user.userType) {
      throw new ForbiddenException(
        `Access denied. Expected user type: ${userType}, but found: ${user.userType}.`,
      );
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException(
        `Access denied. Your role does not have the necessary permissions.`,
      );
    }

    return true;
  }
}
