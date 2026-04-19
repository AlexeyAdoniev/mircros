import { Controller, UseInterceptors } from '@nestjs/common';
import {
  GrpcLogginInterceptor,
  ProductsServiceControllerMethods,
  ProductsServiceController,
  CreateProductRequest,
  CreateProductResponse,
} from '@jobber/grpc';
import { Observable } from 'rxjs';
import { ProductService } from './products.service';

@Controller()
@ProductsServiceControllerMethods()
@UseInterceptors(GrpcLogginInterceptor)
export class ProductsController implements ProductsServiceController {
  constructor(private readonly productService: ProductService) {}

  createProduct(request: CreateProductRequest) {
    return this.productService.createProduct(request);
  }
}
