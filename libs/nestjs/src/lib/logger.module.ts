import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import * as pino from 'pino';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        const logger = pino.pino({
          level: isProduction ? 'info' : 'debug',
          transport: isProduction
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                },
              },
        });

        return {
          pinoHttp: { logger },
          // forRoutes: [{ path: '*splat', method: RequestMethod.ALL }],
        };
      },
    }),
  ],
})
export class LoggerModule {}
