import { PartialType } from '@nestjs/swagger';
import { CreateMultipleSelectDto } from './create-multiple-select.dto';

export class UpdateMultipleSelectDto extends PartialType(
  CreateMultipleSelectDto,
) {}
