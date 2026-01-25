import { Job } from '../decorators/job.decorator';
import { Job as BaseJob } from './job';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonacci sequence and store it in database',
})
export class FibonacciJob extends BaseJob {}
