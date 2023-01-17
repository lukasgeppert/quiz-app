import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateExamDto {
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    name: string;
    
    @IsOptional()
    @IsString()
    description?: string;
}
