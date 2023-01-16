import { Prisma, Role } from "@prisma/client";

export class CreateUserDto implements Prisma.UserCreateInput {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    emailVerified?: boolean;
    role?: Role;
}

