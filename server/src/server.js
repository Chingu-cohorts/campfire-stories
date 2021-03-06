/** Dependencies */
import express from "express"
import path from "path"
import logger from "morgan"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
/** Local imports, connect db, and start server */
import { auth, admin, content } from './routes'

const app = express() // start server

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'User'],
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}))

app.listen(process.env.PORT) // server listen on 3000 by default

mongoose.Promise = global.Promise;
const mongodb = process.env.DB;

mongoose.connect(mongodb) // connect to db

// get a little feedback
console.log(`running on port ${process.env.PORT}`)

/** Middleware */
if (process.env.NODE_ENV !== 'test'){
  app.use(logger('dev'));
}

app.use(compression({ filter: (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
} }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(mongoSanitize({ replaceWith: '_' }));

/** Routes */
auth(app);
admin(app);
content(app);

/** Error handling */
 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   let err = new Error('Page not found')
   err.status = 404;
   next(err);
 });

 // development error handler
 // will print stacktrace
 if (app.get('env') === 'development') {
   app.use(function(err, req, res, next) {
     res.status(err.status || 500);
     res.json({
       message: err.message,
       error: err
     });
   });
 }

 // production error handler
 // no stacktraces leaked to user
 app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.json({
     message: err.message,
     error: {}
   });
 });

 export default app;
