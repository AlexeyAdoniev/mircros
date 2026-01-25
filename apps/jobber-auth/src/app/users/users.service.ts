import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/jobber-auth';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.user.findMany({});
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  users() {
    return this.prismaService.user.findMany();
  }

  user(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({ where });
  }
}
