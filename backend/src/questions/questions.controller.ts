import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateMultipleChoiceDto } from './multiple-choice/dto/create-multiple-choice.dto';
import { CreateTrueFalseDto } from './true-false/dto/create-true-false.dto';
import { CreateShortAnswerDto } from './short-answer/dto/create-short-answer.dto';
import { QueryDeleteDto } from 'src/shared/dto/query.dto';
import { ParamDto } from 'src/shared/dto/param.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateMultipleSelectDto } from './multiple-select/dto/create-multiple-select.dto';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('multiple-choice')
  createMultipleChoice(@Body() createQuestionDto: CreateMultipleChoiceDto) {
    return this.questionsService.create(createQuestionDto.toQuestion());
  }

  @Post('true-false')
  createTrueFalse(@Body() createQuestionDto: CreateTrueFalseDto) {
    return this.questionsService.create(createQuestionDto.toQuestion());
  }

  @Post('short-answer')
  createShortAnswer(@Body() createQuestionDto: CreateShortAnswerDto) {
    return this.questionsService.create(createQuestionDto.toQuestion());
  }

  @Post('multiple-select')
  createMultipleSelect(@Body() createQuestionDto: CreateMultipleSelectDto) {
    return this.questionsService.create(createQuestionDto.toQuestion());
  }

  @Get(':id')
  findOne(@Param() { id }: ParamDto) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: ParamDto,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param() { id }: ParamDto, @Query() { force }: QueryDeleteDto) {
    return this.questionsService.remove(id, force);
  }
}
