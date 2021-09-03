import { Request, Router } from "express";
import Auth0Strategy from 'passport-auth0';
import passport from 'passport';
import { EnvVarArgs, getEnvVar } from '../helpers/getEnvVar';


const domain = getEnvVar(EnvVarArgs.Auth0DomainIssuer);
const logoutUrl = `https://${domain}/v2/logout`;

const clientID = getEnvVar(EnvVarArgs.Auth0ClientId);
const clientSecret = getEnvVar(EnvVarArgs.Auth0ClientSecret);
const callbackURL = getEnvVar(EnvVarArgs.Auth0ClientCallback);

passport.use(new Auth0Strategy(
  {
    domain,
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, params, profile, done) => {
    console.log("Logging in with token %j", accessToken);
    done(null, {
      profile: {
        id: profile.id,
      },
      accessToken,
    });
  },
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export const AuthController = async (router: Router) => {

  router.use(passport.initialize());

  router.use(passport.session());

  router.get(EnvVarArgs.Auth0ClientLogin, passport.authenticate("auth0", {
    scope: "openid email profile"
  }));

  router.get(EnvVarArgs.Auth0ClientCallback, async (req: Request, resp, next) => {
    passport.authenticate("auth0", (err, user, info) => {
      console.log("info", info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return resp.redirect("/login");
      }
      (req as any).logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        resp.status(200).json(user);
      });
    })(req, resp, next);
  });
};