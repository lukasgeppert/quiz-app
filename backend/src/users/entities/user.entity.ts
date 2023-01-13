import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Prisma, Role, User } from "@prisma/client"
import { Exclude } from "class-transformer";


export class UserEntity implements User {
    id: number;
    email: string;

    firstName: string | null;
    lastName: string | null;
    image: string | null;

    verified: boolean;

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
}
