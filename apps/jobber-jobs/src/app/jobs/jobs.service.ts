import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';

import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { Job as BaseJob } from './job';
import { JobMetadata } from '../interfaces/job-metadata.interface';

@Injectable()
export class JobsService implements OnModuleInit {
  constructor(private readonly discoveryService: DiscoveryService) {}
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  async onModuleInit() {
    this.jobs =
      await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
        JOB_METADATA_KEY,
      );
  }

  getJobs() {
    return this.jobs.map((job) => job.meta);
  }
  async executeJob(name: string) {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Jon ${name} does not exist`);
    }

    await (job.discoveredClass.instance as BaseJob).execute();
    return job.meta;
  }
}
