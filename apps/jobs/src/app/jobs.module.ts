import { Module } from '@nestjs/common';
import { FibonacciJob } from './jobs/fibonacci/fibo.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@jobber/grpc';
import { join } from 'path';
import { PulsarModule } from '@jobber/pulsar';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_PACKAGE_NAME,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
              package: AUTH_PACKAGE_NAME,
              protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
