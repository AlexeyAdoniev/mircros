import { Response, Request } from 'express';

export interface GqlContext {
  request: Request;
  response: Response;
}
