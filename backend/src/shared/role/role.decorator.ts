import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const IsRole = (role: Role) => SetMetadata('role', role);
