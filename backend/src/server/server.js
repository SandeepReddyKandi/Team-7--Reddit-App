'use strict';
const usersRouter = require('./routes/users');
const communityRouter = require('./routes/community');
const postsRouter = require('./routes/posts');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const cookieParser = require('cookie-parser');

var cors = require('cors');
const express = require('express');
const app = express();

const port = 3001;
const { connectToDatabase } = require('./db');

//activate body parser
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// app.use("/api", api); //routes from api folder will come here
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// forward all end-point requests to routes
app.use('/users', usersRouter);
app.use('/community', communityRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

/* Db Connection */
const db = connectToDatabase().then(() => {
  app.listen(port, console.log('Server is listening on port :', port));
});
