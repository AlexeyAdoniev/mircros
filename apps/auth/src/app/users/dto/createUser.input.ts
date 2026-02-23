import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword, IsNumber } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsStrongPassword()
  password: string;
  @Field()
  @IsNumber()
  phone: number;
}
