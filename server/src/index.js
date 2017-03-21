/** Dependencies */
import express from "express"
import path from "path"
import logger from "morgan"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import compression from 'compression'
import cors from 'cors'
/** Local imports, connect db, and start server */
import { auth, admin, content } from './routes'

const app = express() // start server

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}))

app.listen(process.env.PORT) // server listen on 3000 by default

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
// app.use(favicon(path.join(__dirname, '../client/public', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, '../client/public')));

/** Routes */
auth(app);
admin(app);
content(app);


// /** Hot Module Reloading */
// if (process.env.NODE_ENV === 'dev') {
//   const webpackConfig = require('../webpack/webpack.config')
//   const webpackDevMiddleware = require('webpack-dev-middleware')
//   const webpackHotMiddleware = require('webpack-hot-middleware')
//
//   const compiler = webpack(webpackConfig)
//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//     contentBase: '../client/public'
//   }))
//
//   app.use(webpackHotMiddleware(compiler, {
//     log: console.log,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
//   }))
//   /** Load everything from memory */
//   app.get('*', (req, res) => {
//     let memoryFs = compiler.outputFileSystem;
//     let index = path.join(webpackConfig.output.path, 'index.html')
//     let html = memoryFs.readFileSync(index)
//     res.send(html)
//   })
// } else {
//   /** Production */
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/public/assets', 'index.html'))
//   })
// }

/** Error handling */
 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   let err = new Error('Page not found')
   err.status = 404;
   next(err);
 });

 // error handlers

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
