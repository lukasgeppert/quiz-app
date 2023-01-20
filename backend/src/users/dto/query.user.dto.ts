import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/shared/dto/query.dto"

export class QueryUserDto extends QueryDto {
    @ApiPropertyOptional({ default: 'id', description: 'Filter by this field' })
    @IsOptional()
    @IsString()
    field?: 'firstName'| 'lastName'| 'email' = 'firstName';

    @ApiPropertyOptional({ description: 'Filter by this value' })
    @IsOptional()
    @IsString()
    contains?: string;
}