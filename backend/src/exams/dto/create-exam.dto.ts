import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateExamDto {
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  isShuffle?: boolean;

  @IsOptional()
  @IsBoolean()
  isNegativeMarking?: boolean;

  @IsOptional()
  @IsBoolean()
  allowReview?: boolean;
}
