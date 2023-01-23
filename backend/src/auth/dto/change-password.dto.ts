import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/[@$!%*#?&]/, {
        message: 'password contain atleast 1 special character',
    })
    @Matches(/[A-Z]/, { message: 'password must contain atleast 1 upper case' })
    @Matches(/[a-z]/, { message: 'password must contain atleast 1 lower case' })
    @Matches(/[0-9]/, { message: 'password must contain atleast 1 number' })
    password: string;
}