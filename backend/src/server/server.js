'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const usersRouter = require('./routes/users');
const communityRouter = require('./routes/community');
const postsRouter = require('./routes/posts');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

// const dotenv = require('dotenv');
const passport = require('passport');
const { auth } = require('./utils/passport');
var session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
//dotenv.config();

//activate body parser
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    key: 'user_sid',
    secret: 'CMPE_273_Splitwise_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
auth();

// forward all end-point requests to routes
app.use('/users', usersRouter);
app.use('/community', communityRouter);
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,  Authorization, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  return next();
});

// forward all end-point requests to routes
app.use('/users', usersRouter);
app.use('/community', communityRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
const port = 3001;
const { connectToDatabase } = require('./db');

/* Db Connection */
const db = connectToDatabase().then(() => {
  app.listen(port, console.log('Server is listening on port :', port));
});
