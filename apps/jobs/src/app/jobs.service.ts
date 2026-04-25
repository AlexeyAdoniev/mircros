import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';

import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from './decorators/job.decorator';
import { Job as BaseJob } from './jobs/job';
import { JobMetadata } from './interfaces/job-metadata.interface';
import { readFileSync } from 'node:fs';
import { UPLOAD_FILEPATH } from './uploads/upload';
import { PrismaService } from './prisma/prisma.service';
import { JobStatus } from './models/job-status.enum';

@Injectable()
export class JobsService implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly prismaService: PrismaService,
  ) {}
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
  async executeJob(name: string, data: any) {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Jon ${name} does not exist`);
    }

    if (!(job.discoveredClass.instance instanceof BaseJob)) {
      throw new InternalServerErrorException("Job doesn't implement BaseJob");
    }

    await job.discoveredClass.instance.execute(
      data.fileName ? this.getFile(data.fileName) : data,
      job.meta.name,
    );
    return job.meta;
  }

  async acknowledge(jobId: number) {
    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new BadRequestException(`Job with ID ${jobId} does not exist`);
    }

    if (job.ended) return;

    const updatedJob = await this.prismaService.job.update({
      where: { id: jobId },
      data: {
        completed: { increment: 1 },
      },
    });

    if (updatedJob.completed === job.size) {
      await this.prismaService.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.COMPLETED,
          ended: new Date(),
        },
      });
    }

    return updatedJob;
  }

  private getFile(filename?: string) {
    if (!filename) return;

    try {
      return JSON.parse(
        readFileSync(`${UPLOAD_FILEPATH}/${filename}`, 'utf-8'),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to read file: ${filename}`,
      );
    }
  }
}
