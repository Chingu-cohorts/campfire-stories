/*
 * Dependencies
 */
import passport from 'passport'
import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import LocalStrategy from 'passport-local'

/*
 * Local imports
 */
import User from '../models/UserModel'

/*
 * Local Strategy (For validating login)
 */

// unique field is Email
const localOptions = { usernameField: 'email' }

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  email = email.trim();
  password = password.trim();

  User.findOne({ email })
    .exec((err, user) => {
      if (err) return done(err);
      if(!user) return done(null, false); // couldn't find user by email
      return user
    })
    // compare passwords
    .then(user => user
      .checkPassword(password)
      .then(isMatch => isMatch ? user : false)
    )
    .then(res => done(null, res))
    .catch(done)
})


/*
 * JWT Strategy (For token authentication)
 */
// JWT options
const opts = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET
}
// payload is decoded token, use it to check if it is a valid token
const jwtLogin = new Strategy(opts, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if(err) { return done(err, false); } // catch db err
    if(!user) { return done(null, false); } // user doesn't exist with given ID
    // all good -> return user
    return done(null, user)
  })
})


/*
 * Helper function (For admin authentication through token ID)
 */
export function authAdmin (req, res, next)  {
  User.findById(req.user._id, (err, user) => {
      if (err) { return next(err); }
      if (user.role !== "Admin") { return res.status(403).json({ res: 'Forbidden' }); }
      next();
  })
}

/*
 * Add Strategies as middleware
 */
passport.use(jwtLogin);
passport.use(localLogin);
