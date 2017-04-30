/*
 * Dependencies
 */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

/*
 * Schema
 */
var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['Writer', 'Admin'],
    default: 'Writer'
  }
});

/*
 * Password encryption
 */
const SALT_FACTOR = 10;

const noop = () => {};

function hashPassword(password) {
  return bcrypt.genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hash(password, salt))
    .catch('error', console.error);
};

userSchema.pre("save", function(done){
  var user = this;
  // only hash password if it has been modified
  if (!user.isModified("password")) { return done(); }
  // make the hacker salty
  hashPassword(user.password)
    .then(hashedPassword => user.password = hashedPassword)
    .then(done)
    .catch(done);
});

/*
 * Check password method
 */
userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    if (err) { return done(err); }
    done(null, isMatch); // match -> respond with no errs
  });
};

userSchema.statics.hashPassword = hashPassword;

/*
 * Export User
 */
let User = mongoose.model("User", userSchema)
export default User
