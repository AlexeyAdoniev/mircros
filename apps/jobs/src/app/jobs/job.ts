import { Producer } from 'pulsar-client';
import { PulsarClient, serialize } from '@jobber/pulsar';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export abstract class Job<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, job: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }

    if (Array.isArray(data)) {
      for (const message of data) {
        await this.validateData(message);
        await this.send(message);
      }
      return;
    }

    await this.validateData(data);
    await this.send(data);
  }

  private async send(data: T) {
    await this.producer.send({ data: serialize<T>(data) });
  }

  private async validateData(data: T) {
    const errors = await validate(plainToInstance(this.messageClass, data));
    if (errors.length) {
      throw new BadRequestException(
        `Job data is invalid ${JSON.stringify(errors)}`,
      );
    }
  }
}
