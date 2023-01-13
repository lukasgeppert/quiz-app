import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { QueryDto } from 'src/shared/dto/query.dto';
import { IsRole } from '../auth/decorator/role.gaurd';

@Injectable()
export class UsersService {
  salt!: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService) {
    this.salt = this.config.get('SALT');
  }


  private hashPassword(password: string) {
    return bcrypt.hash(password, this.salt);
  }

  public validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async validateUserCredentail(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await this.validatePassword(password, user.password)) {
      return new UserEntity(user);
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async create(data: CreateUserDto) {
    data.password = await this.hashPassword(data.password);
    const user = await this.prisma.user.create({ data });
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

  async findOne(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    return new UserEntity(user);
  }


  async verifyEmail(id: number) {
    const user = await this.prisma.user.update({ where: { id }, data: { verified: true } });
    return new UserEntity(user);
  }


  async remove(id: number) {
    const user = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(user);
  }
}
