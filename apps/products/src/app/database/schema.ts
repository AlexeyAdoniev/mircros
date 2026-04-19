import { prodcuts } from '../products/schema';
import { categories } from '../categories/schema';

export const schema = {
  prodcuts,
  categories,
};

export type Schema = typeof schema;
