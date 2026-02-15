import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@jobber/pulsar';
import { Message } from 'pulsar-client';
import { FibonacciData } from './fibonacci-data.interface';

const fibonacci = require('fibonacci');

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonacciData>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected async onMessage(data: FibonacciData): Promise<void> {
    try {
      console.log('x1');
      const result = fibonacci.iterate(data.iterations);
      console.log('x2');
      this.logger.log(result);
    } catch (e) {
      console.log(e);
    }
    //console.log(result, 'result ');
  }

  //   async onModuleInit(): Promise<void> {}
}
