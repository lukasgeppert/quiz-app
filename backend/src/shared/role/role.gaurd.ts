import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RoleGaurd implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.getAllAndOverride<Role>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) return true;
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;
    const data = await this.userService.findOne(user.id);
    return data.role === requiredRole || user?.role === requiredRole;
  }
}
