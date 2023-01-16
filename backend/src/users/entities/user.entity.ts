import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Prisma, Role, User } from "@prisma/client"
import { Exclude } from "class-transformer";
import * as bcript from 'bcrypt';

export class UserEntity implements User {
    id: number;
    email: string;

    firstName: string | null;
    lastName: string | null;
    image: string | null;

    emailVerified: boolean;

    @ApiHideProperty()
    @Exclude()
    password: string | null;


    @ApiProperty({ enum: Role, default: Role.USER })
    role: Role;

    @ApiHideProperty()
    @Exclude()
    createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;


    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    async comparePassword(password: string) {
        return bcript.compare(password, this.password);
    }
}
