import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { randomUUID } from 'node:crypto';

@Injectable()
export class GrpcLogginInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GrpcLogginInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const hander = context.getHandler().name;
    const args = context.getArgs()[0];
    const statTime = Date.now();
    const requestId = randomUUID();
    this.logger.log({
      requestId,
      hander,
      args,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          requestId,
          hander,
          duration: Date.now() - statTime,
        });
      }),
    );
  }
}
