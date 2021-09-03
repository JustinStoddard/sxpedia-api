import { AuthContext } from "../model/auth-context";
import JWK, { JwksClient } from 'jwks-rsa';
import JWT, { JwtPayload } from 'jsonwebtoken';
import { AuthError } from "../model/errors";

type JwtToken = {
  iss?: string;
  sub?: string;
} & JwtPayload;

export class AuthService {

  private jwk: JwksClient;

  constructor(
    private oauthIssuer: string,
  ){
    const wellKnownEndpoint = new URL(oauthIssuer);
    wellKnownEndpoint.pathname = '/well-known/jwks.json';
    this.jwk = JWK({
      jwksUri: wellKnownEndpoint.toString(),
    });
  };

  async createAuth(token: string): Promise<AuthContext> {
    const { iss, header } = JWT.decode(token, { complete: true }) as JwtToken;
    //Verifies we are able to be decoded
    if (!iss) {
      throw new AuthError("Issuer Missing");
    }
    if (iss !== this.oauthIssuer) {
      throw new AuthError("Issuer Not Trusted");
    }
    if (!header.kid) {
      throw new AuthError("Token Is Missing Key ID");
    }
    const key = await this.jwk.getSigningKey(header.kid);
    const verified = JWT.verify(token, key.getPublicKey());
    if (!verified.sub) {
      throw new AuthError("Subject Is Missing");
    }
    return {
      userId: verified.sub as string,
    };
  };
};