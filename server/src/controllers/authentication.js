/*
 * Dependencies
 */
import jwt from 'jwt-simple';
import mongoose from 'mongoose';

import User from '../models/UserModel';
import Story from '../models/PostModel';
import mailer from '../services/mailer';
import messages from '../services/messages';

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

/**
 * Register a user
 * NOTE: make sure to use findOneAndUpdate!
 * If you use find and then save you will be introducing a race condition
 **/
export function register (req, res, next) {
  const { email, password, firstName, lastName } = req.body

  const message = {
    to: email,
    subject: messages.newAccount.subject,
    text: messages.newAccount.text + `email: ${email}\npassword: ${password}`
  }

  User.hashPassword(password)
    .then(hash => ({ email, firstName, lastName, password: hash }))
    .then(entryData => User.findOneAndUpdate(
      { email },
      { $setOnInsert: entryData },
      { upsert: true, setDefaultsOnInsert: true }
    ).exec())
    // mongoose will only send an object if it found an entry, null otherwise
    .then(result => result
      ? null
      : mailer(message)
    )
    .then(result => result === 'success'
      ? res.status(201).json({ done: true })
      : res.status(400).json({ error: 'Email already exists' })
    )
    .catch(next);
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
  const _id = req.user._id;
  const { oldPassword, newPassword} = req.body;

  User.findOne({ _id })
    .then(entry => entry.checkPassword(oldPassword))
    .then(isCorrect => isCorrect
      ? User.hashPassword(newPassword)
      : Promise.reject('Wrong password')
    )
    .then(hashedNewPassword => User.update(
      { _id },
      { $set: { password: hashedNewPassword } }
    ).exec())
    .then(() => res
      .status(200)
      .json({ passwordChange: 'success' })
    )
    .catch(next);
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
