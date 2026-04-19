import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { prodcuts as productSchema } from './schema';
import { CategoriesService } from '../categories/categories.service';

type Product = typeof productSchema.$inferSelect;

@Injectable()
export class ProductService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProduct(product: Omit<Product, 'id'>) {
    const category = product.category
      ? await this.categoriesService.getCategoryByName(product.category)
      : null;

    await this.database
      .insert(productSchema)
      .values({
        ...product,
        price: category
          ? Number(product.price) + Number(category.charge)
          : product.price,
      });
  }
}
