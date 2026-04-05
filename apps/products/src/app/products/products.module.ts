import { Module } from '@nestjs/common';
import { ProductService } from './products.service';

@Module({
  providers: [ProductService],
})
export class ProductsMoudle {}
