import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { QueryDto } from "src/shared/dto/query.dto";

export class QueryQuestionDto extends QueryDto {
    @IsNumber()
    examId: number;

    @ApiPropertyOptional()
    @IsString()
    field?: 'question' | 'description'| 'tag' = 'question';

    @ApiPropertyOptional()
    @IsString()
    contains?: string;
}