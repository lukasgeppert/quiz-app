import { IsOptional, IsString } from "class-validator";

export class CreateExamDto {
    @IsString()
    title: string;
    
    @IsOptional()
    description?: string;
}
