import { Module } from '@nestjs/common';

import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { LoggerModule } from '@jobber/nestjs';

@Module({
  imports: [
    LoggerModule,
    JobsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'apps/.env'),
        join(process.cwd(), 'apps/executor/.env'),
      ],
    }),
  ],
})
export class AppModule {}
