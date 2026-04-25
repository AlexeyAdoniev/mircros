import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer, FibonacciMessage } from '@jobber/pulsar';
import { Jobs } from '@jobber/nestjs';
import { JobConsumer } from '../job.consumer';
import { Packages } from '@jobber/grpc';
import { ClientGrpc } from '@nestjs/microservices';

const fibonacci = require('fibonacci');

@Injectable()
export class FibonacciConsumer
  extends JobConsumer<FibonacciMessage>
  implements OnModuleInit
{
  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.JOBS) private clientJobs: ClientGrpc,
  ) {
    super(Jobs.FIBONACCI, pulsarClient, clientJobs);
  }

  protected async execute(data: FibonacciMessage): Promise<void> {
    try {
      const result = fibonacci.iterate(data.iterations);

      this.logger.log(result);
    } catch (e) {
      console.log(e);
    }
    //console.log(result, 'result ');
  }

  //   async onModuleInit(): Promise<void> {}
}
