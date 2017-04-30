/*
 * Dependencies
 */
import jwt from 'jwt-simple';
import mongoose from 'mongoose';
import User from '../models/UserModel';
import Story from '../models/PostModel';

/*
 * Helper functions
 */

 function setUserInfo(request) {
   let getUserInfo = {
     _id: request._id,
     firstName: request.firstName,
     lastName: request.lastName,
     email: request.email,
     role: request.role
   };

   return getUserInfo;
 }

 // make token
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // iat = issued at time
  // sub = identifying characteristic
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET)
}


/*
 * Register
 */
export function register (req, res, next) {
  // trim inputs
  //req.body = _.mapObj(req.body, (v) => { v.trim(); } )
  // define vars
  let { email, password, firstName, lastName } = req.body
  // see if user with email already exists
  User.findOne({email}, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" })
    }
    // make new user
    let newUser = new User({ email, password, firstName, lastName })
    // save new user
    newUser.save((err, user) => {
      if (err) return next(err);
      // return user with their token
      res.status(201).json({
        done: true
      })
    })
  })
}

/*
 * Login
 */

export function login (req, res, next) {
  // user already authenticated
  // just give them a token
  res.send({
    token: tokenForUser(req.user),
    user: setUserInfo(req.user)
  });
}

/**
 * User Editing
 *
 **/
 // delete
export function deleteUser(req, res, next) {
  const _id = req.query.id
  const _currentUserId = req.headers.user;

  Story
    .update(
      { postedBy: _id },
      { $set: { postedBy: _currentUserId } },
      { multi: true }
    )
    .exec()
    .then(() => User.remove({ _id }))
    .then(() => res
      .status(200)
      .json({ "delete": "success" })
    )
    .catch(next);
}

export function changePassword(req, res, next) {
  /*const _id = req.user;
  const { oldPassword, password} = req.body;

  User.update(
    { _id, User.hashPassword(password) },
    { $set: { _id }}
  )*/
}

// get users w/ pagination
export function getUsers(req, res, next) {
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)

  User
    .find()
    .sort('lastName')
    .exec((err, usersArr) => {
      if (err)return next(err);

      const pages = Math.ceil(usersArr.length / limit);
      const users = usersArr.slice((page - 1) * limit, page * limit);

      res
        .status(200)
        .json({
          users,
          pages
        })
    })
}

// promote and demote users
export function roleControl (req, res, next) {
  let _id = req.query.id

  User
    .findOne({ _id })
    .exec((err, doc) => {
      if (err) { return next(err); }
      let newRole = (doc.role === 'Admin') ? 'Writer': 'Admin';

      User.findOneAndUpdate(
        { _id },
        { $set: { role: newRole }},
        { new: true },
        (err, user) => {
            if (err) return next(err);
            res
              .status(200)
              .json({
                user
              })
        })
    })
}
