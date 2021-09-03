import dotenv from 'dotenv';
dotenv.config();

/**
 * Function that will grab a value from process.env based on a key
 * @param key Key of the value you want to grab
 * @returns The value from process.env
 */
export enum EnvVarArgs {
  Auth0DomainIssuer = 'AUTH0_DOMAIN_ISSUER',
  Auth0ClientId = 'AUTH0_CLIENTID',
  Auth0ClientSecret = 'AUTH0_CLIENT_SECRET',
  Auth0ClientCallback = 'AUTH0_CLIENT_CALLBACK',
  Auth0ClientLogin = 'AUTH0_CLIENT_LOGIN',
  NodeEnv = 'NODE_ENV',
};

export const getEnvVar = (key: EnvVarArgs) => {
  let value;
  try {
    value = process.env[key];
  } catch (err) {
    console.log(`Couldn't Fetch ${key} >>> ${err}`);
  }
  return value;
};