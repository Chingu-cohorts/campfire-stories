import prompt from 'prompt';
import mongoose from "mongoose";

import User from '../models/UserModel';
import { passwordPattern, emailPattern } from '../utils/validatorPatterns';

mongoose.Promise = global.Promise;
const mongodb = process.env.DB;

mongoose.connect(mongodb) // connect to db

const properties = [
  {
    name: 'email',
    validator: emailPattern,
    warning: 'Must be a valid email'
  },
  {
    name: 'firstName',
    validator: /\w{1,}/
  },
  {
    name: 'lastName',
    validator: /\w{1,}/
  },
  {
    name: 'password',
    validator: passwordPattern,
    warning: [
      'Password must be 8 chars long ',
      'and have at least one of ',
      'number, symbol, letter'
    ].join(''),
    hidden: true
  }
];

prompt.start();

new Promise((resolve, reject) => {
  prompt.get(properties, (err, result) => err
    ? reject(err)
    : resolve(result)
  )
})
  .then(result => new User({ ...result, role: 'Admin' }).save())
  .then(() => console.log('A new admin account has been created'))
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
