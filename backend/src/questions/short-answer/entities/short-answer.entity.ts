import { QuestionType } from '@prisma/client';
import { TagEntity } from 'src/questions/tags/entities/tag.entity';

export class ShortAnswerEntity {
  id: number;
  question: string;
  type: QuestionType = QuestionType.SHORT_ANSWER;
  description: string | null;
  answer: string;
  tags: TagEntity[];
}
