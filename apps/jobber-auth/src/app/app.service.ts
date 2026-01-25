import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getData(): Promise<{ message: string }> {
    const user = await this.prismaService.user.findFirst({ where: { id: 23 } });
    return { message: JSON.stringify(user) };
  }
}
