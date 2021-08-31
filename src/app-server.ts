import express from 'express';
import { Server } from 'http'; 
import { GraphQlController } from './controllers/graphql-controller';
import { AuthMiddleware, AuthMiddlewareArgs } from './middleware/auth-middleware';

export type AppServerArgs = {
  port?: number; 
} & AuthMiddlewareArgs;

export default async (args: AppServerArgs): Promise<Server> => {
  const app = express();
  app.use(express.json());
  AuthMiddleware(app, args);
  await GraphQlController(app);
  return app.listen(args.port || 80, () => console.log(`Server Listening On Port:${args.port}`));
};