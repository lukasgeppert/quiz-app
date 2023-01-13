import { Role } from "@prisma/client";

export class Payload {
    sub: number;
    email: string;
    role: Role;
}
