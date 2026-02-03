import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
// import { Packages, AUTH_SERVICE_NAME, AuthServiceClient } from '@jobber/grpc';
import { catchError, map, Observable, of } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  AUTH_PACKAGE_NAME,
} from 'types/proto/auth';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
  private authService: AuthServiceClient;
  private readonly logger = new Logger(GqlAuthGuard.name);

  constructor(
    @Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc,
    //private readonly logger: Logger,
  ) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.getRequest(context).cookies?.Authentication;

    if (!token) {
      return false;
    }
    console.log(token, 't');
    return this.authService.authenticate({ token }).pipe(
      map((res) => {
        this.logger.log(res, 'xar');
        this.getRequest(context).user = res;
        return true;
      }),
      catchError(() => {
        this.logger.log('err');
        return of(false);
      }),
    );
  }

  private getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
