import appServer from "./app-server";
import { AuthService } from "./services/auth-service";

const setup = async () => {
  const server = await appServer({
    port: 80,
    authService: {
      createAuth: async (token) => {
        return {
          userId: "TestUser"
        }
      }
    } as AuthService,
  });
};

setup();