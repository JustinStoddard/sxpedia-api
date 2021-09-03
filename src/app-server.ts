import express from 'express';
import { Server } from 'http'; 
import { AuthController } from './controllers/auth-controller';
import { GraphQlController } from './controllers/graphql-controller';
import { AsyncMiddleware } from './middleware/async-middleware';
import { AuthMiddleware, AuthMiddlewareArgs } from './middleware/auth-middleware';
import { ErrorMiddleware } from './middleware/error-middleware';

export type AppServerArgs = {
  port?: number; 
} & AuthMiddlewareArgs;

export default async (args: AppServerArgs): Promise<Server> => {
  const app = express();
  app.use(express.json());
  
  AuthMiddleware(app, args);
  AsyncMiddleware(app);

  await GraphQlController(app);
  AuthController(app);

  ErrorMiddleware(app);
  return app.listen(args.port || 80, () => console.log(`Server Listening On Port:${args.port}`));
};