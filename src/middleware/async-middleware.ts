import { Router } from 'express';
import Layer from 'express/lib/router/layer';

export const AsyncMiddleware = (app: Router) => {
  Layer.prototype.handle_request = async function handle (req, res, next) {
    const fn = this.handle;
    if (fn.length > 3) {
      return next();
    }

    try {
      await Promise.resolve(fn(req, res, next));
    }
    catch (err) {
      next(err);
    };
  };
};