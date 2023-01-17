import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'src/shared/dto/query.dto';
import { IsRole } from '../shared/role/role.decorator';
import { Role } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/access-token/access-token.gaurd';

@Controller('users')
@ApiTags('users')
@UseGuards(AccessTokenGuard)
@IsRole(Role.ADMIN)
@ApiCookieAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
