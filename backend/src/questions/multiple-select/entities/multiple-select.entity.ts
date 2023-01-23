import { QuestionType } from '@prisma/client';
import { TagEntity } from 'src/questions/tags/entities/tag.entity';

export class MultipleSelectEntity {
  id: number;
  question: string;
  type: QuestionType = QuestionType.MULTIPLE_SELECT;
  description: string | null;
  options: string[];
  answers: number[];
  tags: TagEntity[];
  score: number;
}
