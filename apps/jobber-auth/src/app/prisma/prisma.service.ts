import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-clients/jobber-auth';
import Config from '../../../prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: Config.datasource.url,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
