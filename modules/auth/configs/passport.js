const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../../user/models/user');

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    console.log("jwt_payload: ", jwt_payload);
    try {
      const user = await UserModel.findOne({ id: jwt_payload.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  console.log("serialized: ", user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});