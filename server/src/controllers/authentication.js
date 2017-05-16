/*
 * Dependencies
 */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/UserModel';
import Story from '../models/PostModel';
import mailer from '../services/mailer';
import messages from '../services/mailer/messages';
import { getPassToken, decodePassToken, makeValidPassword } from '../services/passport';

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
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.SECRET)
}

/**
 * Register a user
 * NOTE: make sure to use findOneAndUpdate!
 * If you use find and then save you will be introducing a race condition
 **/
export function register (req, res, next) {
  const { email, firstName, lastName } = req.body
  const password = makeValidPassword();

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
      ? Promise.reject({
        status: 400,
        message: 'Email already exists'
      })
      : mailer(message)
    )
    .then(result => res.status(201).json({ done: true }))
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
 **/

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

/**
 * The jwt token stores the old hash
 * Once a new password is created, that token will no longer contain the current hash
 * and mongoose therefore will not be able to find a corresponding account
 **/
export function makeNewPassword(req, res, next) {
  const { token, newPassword } = req.body;

  Promise
    .all([
      decodePassToken(token),
      User.hashPassword(newPassword)
    ])
    .then(([{ id, pswd }, hashedNewPassword]) => User
      .findOneAndUpdate(
        { _id: id, password: pswd },
        { $set: { password: hashedNewPassword } }
      )
      .exec()
    )
    // mongoose will send null if nothing was updated
    .then(entry => entry || Promise.reject({
      status: 400,
      message: 'jwt expired'
    }))
    .then(() => res
      .status(200)
      .json({ passwordChange: 'success' })
    )
    .catch(next);
}

export function resetPassword (req, res, next) {
  const { email } = req.body;
  const message = {
    to: email,
    subject: messages.resetPassword.subject
  };

  User.findOne({email})
    // mongoose will only send an object if it found an entry, null otherwise
    .then(entry => entry || Promise.reject({
        status: 400,
        message: 'Email does not exist'
    }))
    .then(({ _id, password }) => getPassToken(_id, password))
    .then(token => `${process.env.ORIGIN}/newpassword?jwt=${token}`)
    .then(url => messages.resetPassword.text + url)
    .then(text => ({ ...message, text }))
    .then(message => mailer(message))
    .then(result => res
      .status(201)
      .json({ done: true })
    )
    .catch(next);
}

// get users w/ pagination
export function getUsers(req, res, next) {
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)

  User
    .find()
    .select('-password')
    .sort('lastName')
    .exec((err, usersArr) => {
      if (err)return next(err);

      const pages = Math.ceil(usersArr.length / limit);
      const users = usersArr.slice((page - 1) * limit, page * limit);

      res
        .status(200)
        .json({ users, pages })
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
