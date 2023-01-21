import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorator/auth.gaurd';
import { AccessTokenGuard } from 'src/auth/access-token/access-token.gaurd';
import { QueryExamDto } from './dto/query-exam.dto';
import { QueryDeleteDto } from 'src/shared/dto/query.dto';
import { ParamDto } from 'src/shared/dto/param.dto';

@Controller('exams')
@ApiTags('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @ApiCookieAuth()
  @UseGuards(AccessTokenGuard)
  create(@AuthUser() userId: number, @Body() createExamDto: CreateExamDto) {
    return this.examsService.create(userId, createExamDto);
  }

  @Get()
  findAll(@Query() query: QueryExamDto) {
    return this.examsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() { id }: ParamDto) {
    return this.examsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCookieAuth()
  @UseGuards(AccessTokenGuard)
  update(
    @AuthUser() userId: number,
    @Param() { id }: ParamDto,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examsService.update(userId, id, updateExamDto);
  }

  @Delete(':id')
  @ApiCookieAuth()
  @UseGuards(AccessTokenGuard)
  remove(
    @AuthUser() userId: number,
    @Param() { id }: ParamDto,
    @Query() { force }: QueryDeleteDto,
  ) {
    return this.examsService.remove(userId, id, force);
  }
}
