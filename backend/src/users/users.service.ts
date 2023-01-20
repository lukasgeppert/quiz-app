import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryDto } from 'src/shared/dto/query.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService) {}


  private hashPassword(password: string) {
    return bcrypt.hash(password, this.config.getOrThrow('SALT'));
  }


  async create(data: CreateUserDto) {
    data.password = await this.hashPassword(data.password);
    const user = await this.prisma.user.create({ data });
    return new UserEntity(user);
  }


  async findOne(where: { id?: number, email?: string }) {
    const user = await this.prisma.user.findUnique({ where });
    return new UserEntity(user);
  }


  async findAll({
    skip,
    take,
    from: gte,
    to: lte,
    field,
    contains,
    sort,
    order,
  }: QueryDto
  ) {
    const where = {
      [field]: { contains },
      createdAt: { gte, lte },
    };

    const orderBy = { [sort]: order };

    const users = await this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    })
    return users.map(user => new UserEntity(user));
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(user);
  }
}
