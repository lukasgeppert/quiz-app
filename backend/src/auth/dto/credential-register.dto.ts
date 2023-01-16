import { Role } from "@prisma/client";
import { IsEnum } from "class-validator";
import { CredentialLogin } from "./credential-login.dto";

export class CredentailRegister extends CredentialLogin {
    @IsEnum(Role)
    role: Role = Role.USER;
}