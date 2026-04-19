import { Job } from '../../decorators/job.decorator';
import { Jobs } from '@jobber/nestjs';
import { Job as AbstractJob } from '../job';
import { LoadProductsMessage, PulsarClient } from '@jobber/pulsar';
@Job({
  name: Jobs.LOAD_PRODUCTS,
  description: 'Loads uploaded products data into DB after enrichment',
})
export class LoadProductsJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;

  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
