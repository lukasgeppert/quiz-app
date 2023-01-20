import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { QueryDto } from "../../shared/dto/query.dto";

export class QueryExamDto extends QueryDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean; 

    @ApiPropertyOptional()
    @IsOptional()
    field?: 'name' | 'description' = 'name';

    @ApiPropertyOptional()
    @IsOptional()
    contains?: string;
    
}