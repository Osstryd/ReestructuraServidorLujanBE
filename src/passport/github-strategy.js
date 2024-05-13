import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
  clientID: "Iv1.d3dae0d8b8efb40c",
  clientSecret: "30af5e72ca9c91d9cbdb368ddc5437e1e412e589",
  callbackURL: "http://localhost:8080/users/profile-github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const email =
    profile._json.email !== null ? profile._json.email : profile._json.blog;
  const user = await userDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.register({
    first_name: profile._json.name.split(" ")[0],
    last_name: profile._json.name.split(" ")[1],
    email,
    password: "",
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
