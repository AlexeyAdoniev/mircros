import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer, FibonacciMessage } from '@jobber/pulsar';
import { Jobs } from '@jobber/nestjs';

const fibonacci = require('fibonacci');

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonacciMessage>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, Jobs.FIBONACCI);
  }

  protected async onMessage(data: FibonacciMessage): Promise<void> {
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
