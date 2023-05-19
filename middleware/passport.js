const passport = require('passport');
const config = require('config');

const db = require('../model/db_config');
const User = db.user;

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("secret");

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await User.findOne({where: { id: jwt_payload.id }})
    if(!user) {
      return done(null, false, { message: 'Incorrect credentials' })
    } 
    return done(null, user)
  } catch (error) {
    done(error)
  }
}));

module.exports = passport;