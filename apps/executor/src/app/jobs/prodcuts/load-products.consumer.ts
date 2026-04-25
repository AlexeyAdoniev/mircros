import { ProductsServiceClient, PRODUCTS_SERVICE_NAME } from '@jobber/grpc';
import { Jobs } from '@jobber/nestjs';
import {
  LoadProductsMessage,
  PulsarClient,
  PulsarConsumer,
} from '@jobber/pulsar';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Packages } from '@jobber/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JobConsumer } from '../job.consumer';

@Injectable()
export class LoadProductsConsumer
  extends JobConsumer<LoadProductsMessage>
  implements OnModuleInit
{
  private productsService!: ProductsServiceClient;

  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.JOBS) private clientJobs: ClientGrpc,
    @Inject(Packages.PRODUCTS) private clientProducs: ClientGrpc,
  ) {
    super(Jobs.LOAD_PRODUCTS, pulsarClient, clientJobs);
  }

  async onModuleInit(): Promise<void> {
    this.productsService = this.clientProducs.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME,
    );
    await super.onModuleInit();
  }

  protected async execute(data: LoadProductsMessage) {
    await firstValueFrom(this.productsService.createProduct(data));
  }
}
