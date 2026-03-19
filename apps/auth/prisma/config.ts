import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

const x = defineConfig({
  schema: 'schema.prisma',
  migrations: {
    path: 'migrations',
    seed: 'tsx seed.ts',
  },
  datasource: {
    url: env('AUTH_DATABASE_URL'),
  },
});

export default x;
