export enum ErrorType {
  AuthError = 'E_AUTH_ERROR',
  ArgumentError = 'E_ARG_ERROR',
};

export class AppError extends Error {
  constructor(
    public code: string,
    message?: string,
  ){
    super(`AppError ${code}:${message}`);
  }
};

export class AuthError extends AppError {
  constructor(
    message?: string,
  ){
    super(ErrorType.AuthError);
  }
};

export class ArgumentError extends AppError {
  constructor(
    public argument: string,
    message?: string,
  ){
    super(ErrorType.ArgumentError, `${argument}, ${message}`);
  }
};