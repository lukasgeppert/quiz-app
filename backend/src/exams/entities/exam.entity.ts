import { ApiHideProperty } from '@nestjs/swagger';
import { Exam } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { MultipleChoiceEntity } from 'src/questions/multiple-choice/entities/multiple-choice.entity';
import { ShortAnswerEntity } from 'src/questions/short-answer/entities/short-answer.entity';
import { TrueFalseEntity } from 'src/questions/true-false/entities/true-false.entity';

export class ExamEntity implements Exam {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  @ApiHideProperty()
  deletedAt: Date | null = null;

  @Exclude()
  @ApiHideProperty()
  isDeleted: boolean;

  @Exclude()
  @ApiHideProperty()
  userId: number;

  isNegativeMarking: boolean;

  @Exclude()
  isShuffle: boolean;
  isPublic: boolean;
  allowReview: boolean;

  constructor(partial: Partial<ExamEntity>) {
    Object.assign(this, partial);
  }
}

export class EntityWithQuestions {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  @ApiHideProperty()
  deletedAt: Date | null = null;

  @Exclude()
  @ApiHideProperty()
  isDeleted: boolean;

  @Exclude()
  @ApiHideProperty()
  @Exclude()
  @ApiHideProperty()
  userId: number;

  trueFalse: TrueFalseEntity[];
  multipleChoice: MultipleChoiceEntity[];
  shortAnswer: ShortAnswerEntity[];
  multipleSelect: MultipleChoiceEntity[];

  constructor(partial: Partial<EntityWithQuestions>) {
    Object.assign(this, partial);
  }
}
