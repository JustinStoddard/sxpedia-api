import { Request } from "express";
import { Router } from "express";
import { AuthContext } from "../model/auth-context";
import { AuthError } from "../model/errors";
import { AuthService } from "../services/auth-service";

export const requestAuth = (req: Request) => {
  return (req as any).auth as AuthContext || {
    userId: undefined,
  };
};

export type AuthMiddlewareArgs = {
  authService: AuthService;
};

export const AuthMiddleware = (router: Router, {
  authService,
}: AuthMiddlewareArgs) => {
  router.use(async (req, resp, next) => {
    const authorization = req.get('authorization');
    if (!authorization) {
      //Auth will have an optional AuthContext
      return next();
    }
    const tokenMatch = authorization.match(/^(B|b)earer (.+)$/);
    if (!tokenMatch || !tokenMatch[2]) {
      throw new AuthError("Expected Bearer Token");
    }
    const auth = await authService.createAuth(tokenMatch[2]);
    (req as any).auth = auth;
    next();
  });
};