import { IsBoolean, IsOptional } from "class-validator";
import { QueryDto } from "../../shared/dto/query.dto";

export class QueryExamDto extends QueryDto {
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean; 
}