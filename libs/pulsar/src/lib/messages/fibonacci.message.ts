import { IsNumber, IsNotEmpty } from 'class-validator';

export class FibonacciMessage {
  @IsNumber()
  @IsNotEmpty()
  iterations: number;
}
