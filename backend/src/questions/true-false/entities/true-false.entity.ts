import { QuestionType } from '@prisma/client';
import { TagEntity } from 'src/questions/tags/entities/tag.entity';

export class TrueFalseEntity {
  id: number;
  type: QuestionType = QuestionType.TRUE_FALSE;
  question: string;
  description: string | null;
  answer: boolean;
  tags: TagEntity[];
}
