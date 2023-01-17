import { PartialType } from '@nestjs/swagger';
import { CreateTrueFalseDto } from './create-true-false.dto';

export class UpdateTrueFalseDto extends PartialType(CreateTrueFalseDto) {}
