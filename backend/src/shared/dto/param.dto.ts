import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class ParamDto {
    @ApiProperty()
    @IsNumber()
    @Min(1)
    id: number;
}


