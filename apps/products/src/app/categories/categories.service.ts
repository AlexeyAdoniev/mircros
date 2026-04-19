import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { categories } from './schema';
import { eq } from 'drizzle-orm';
import { Schema } from '../database/schema';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<Schema>,
  ) {}

  async getCategoryByName(name: string) {
    return this.database.query.categories.findFirst({
      where: eq(categories.name, name),
    });
  }
}
