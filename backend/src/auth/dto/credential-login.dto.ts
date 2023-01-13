import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CredentialLogin {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ApiProperty({
        minLength: 8,
        example: 'Password@123',
        description: 'password must contain atleast 1 special character, 1 upper case and 1 number',
    })
    @IsString()
    @MinLength(8)
    @Matches(/[@$!%*#?&]/,{ message: 'password contain atleast 1 special character' })
    @Matches(/[A-Z]/, { message: 'password must contain atleast 1 upper case' })
    @Matches(/[a-z]/, { message: 'password must contain atleast 1 lower case' })
    @Matches(/[0-9]/, { message: 'password must contain atleast 1 number' })
    password: string;
}
