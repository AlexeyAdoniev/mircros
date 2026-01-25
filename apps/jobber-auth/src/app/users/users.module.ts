import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [UserResolver, UsersService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
