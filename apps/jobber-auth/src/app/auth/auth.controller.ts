import { Controller, UseGuards } from '@nestjs/common';

import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/proto/auth';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './token-payload.interface';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload },
  ): Promise<User> | Observable<User> | User {
    return this.usersService.user({ id: request.user.id });
  }
}
