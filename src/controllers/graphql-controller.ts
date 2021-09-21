import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { requestAuth } from '../middleware/auth-middleware';
import graphqlSchema from '../resolvers/graphql-schema';
import { EnvVarArgs, getEnvVar } from '../helpers/getEnvVar';

export const GraphQlController = async (router: Express) => {
  const enviornment = getEnvVar(EnvVarArgs.NodeEnv);
  const schema = graphqlSchema();

  const server = new ApolloServer({
    context: (ctx: any) => {
      return requestAuth(ctx.req);
    },
    plugins: [
      enviornment === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    schema,
  } as any);

  await server.start();

  server.applyMiddleware({
    app: router,
    path: "/graphql",
  });
};