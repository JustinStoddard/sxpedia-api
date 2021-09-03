import { Response, Router } from 'express';
import uuid from 'node-uuid';

const handleError = (err: Error, req, resp: Response, next) => {
  const errorId = uuid.v4();
  console.log('InternalError %s: %s', errorId, err.message);
  console.error(err);
  resp.status(500).json({
    errorId,
  });
};

export const ErrorMiddleware = (app: Router) => {
  app.use(handleError);
};