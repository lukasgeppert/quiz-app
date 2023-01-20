import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class VerifyEmailDto {
    @IsString()
    otp: string;
}