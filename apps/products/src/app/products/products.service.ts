import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { prodcuts as productSchema } from './schema';

type Product = typeof productSchema.$inferSelect;

@Injectable()
export class ProductService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<Product>,
  ) {}

  async createProduct(product: Omit<Product, 'id'>) {
    await this.database.insert(productSchema).values({ ...product });
  }
}
