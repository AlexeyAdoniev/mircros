import { PulsarClient, FibonacciMessage } from '@jobber/pulsar';
import { Jobs } from '@jobber/nestjs';
import { Job } from '../../decorators/job.decorator';
import { Job as BaseJob } from '../job';

@Job({
  name: Jobs.FIBONACCI,
  description: 'Generate a Fibonacci sequence and store it in database',
})
export class FibonacciJob extends BaseJob<FibonacciMessage> {
  protected messageClass = FibonacciMessage;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
