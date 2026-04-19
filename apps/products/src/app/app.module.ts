import { Module, ValidationPipe } from '@nestjs/common';
import { LoggerModule } from '@jobber/nestjs';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { ProductsMoudle } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ProductsMoudle,
    CategoriesModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
