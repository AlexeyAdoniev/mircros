import { PulsarClient } from '@jobber/pulsar';
import { Job } from '../../decorators/job.decorator';
import { Job as BaseJob } from '../job';
import { FibonacciData } from './data.message';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonacci sequence and store it in database',
})
export class FibonacciJob extends BaseJob<FibonacciData> {
  protected messageClass = FibonacciData;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
