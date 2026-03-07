import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export class GqlLoggerPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(GqlLoggerPlugin.name);

  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>,
  ): Promise<void | GraphQLRequestListener<BaseContext>> {
    const { request } = requestContext;
    const start = Date.now();
    const requestId = randomUUID();

    this.logger.log({
      requestId,
      headers: request.http?.headers,
      query: request.query,
      variables: request.variables,
    });

    return {
      willSendResponse: async (resposeContext) => {
        const duration = Date.now() - start;
        this.logger.log({
          requestId,
          query: request.query,
          statusCode: resposeContext.response?.http?.status,
          duration: `${duration}ms`,
        });
      },
    };
  }
}
