import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'src/shared/dto/query.dto';
import { IsRole } from 'src/auth/decorator/role.gaurd';
import { Role } from '@prisma/client';

@Controller('users')
@ApiTags('users')
// @IsRole(Role.ADMIN)
// @ApiCookieAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  findAll(@Query() query: QueryDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
