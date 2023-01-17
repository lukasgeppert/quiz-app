import { PartialType } from '@nestjs/swagger';
import { CreateShortAnswerDto } from './create-short-answer.dto';

export class UpdateShortAnswerDto extends PartialType(CreateShortAnswerDto) {}
