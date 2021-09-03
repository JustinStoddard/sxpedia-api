import appServer from "./app-server";
import { AuthService } from "./services/auth-service";

import { EnvVarArgs, getEnvVar } from "./helpers/getEnvVar";

const setup = async () => {
  const auth0Issuer = getEnvVar(EnvVarArgs.Auth0DomainIssuer);
  const server = await appServer({
    port: 80,
    authService: new AuthService(auth0Issuer),
  });
};

setup();