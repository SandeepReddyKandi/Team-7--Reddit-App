const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const Validator = require('fastest-validator');
const { v4: uuid } = require('uuid');
const UserModel = require('../models/UserModel');
const { USER_LOGIN, USER_SIGNUP, GET_USERS, GET_USERS_BY_NAME } = require('../kafka/topics');
const kafka = require('../kafka/client');
const { client } = require('../db');
const util = require('util');
const validator = new Validator();
var { auth, checkAuth } = require('../utils/passport');
auth();

//registeration input schema
const registerSchema = {
  name: { type: 'string', nullable: false },
  email: { type: 'email', nullable: false },
  password: { type: 'string', min: 6, nullable: false },
  cpassword: { type: 'equal', field: 'password' },
};

//checker function to check validate the input
const registerCheck = validator.compile(registerSchema);

//api to create a new user account
exports.register = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(USER_SIGNUP, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.cookie('authtkn', results.token, {
        maxAge: 1000 * 60 * 60 * 4,
        httpOnly: true,
      });
      res.status(200).json({
        token: results.token,
        msg: results.msg,
        userId: results.userId,
        success: true,
      });
    }
  });  
};

//api to login existing user account
exports.login = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(USER_LOGIN, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.cookie('authtkn', results.token, {
        maxAge: 1000 * 60 * 60 * 4,
        httpOnly: true,
      });

      res.status(200).json({
        token: results.token,
        msg: results.msg,
        userId: results.userId,
        success: true,
      });
    }
  });
};

//not migrated yet
exports.autoLogin = (req, res) => {
  if (req.user) {
    res.json({ loggedIn: true, role: req.user.role });
  } else {
    res.json({ loggedIn: false, role: '' });
  }
};
//api to build user profile
exports.profile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId);
    await UserModel.updateOne(
      { _id: req.user.userId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          location: req.body.location,
          description: req.body.description,
          photo: req.body.photo ? req.body.photo : '',
          //add topics also
        },
      },
      () => {
        res.json({ user: { ...user.toObject(), password: '' } });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getUsersByName = async (req, res) => {
  const payload = { name: req.query.name };
  kafka.make_request(GET_USERS_BY_NAME, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getUsers = async (req, res) => {
  try {
    const payload = { body: req.body };
    kafka.make_request(GET_USERS, payload, (error, results) => {
      if (!results.success) {
        res.status(400).send(results);
      } else {
        res.status(200).json({
          msg: results.msg,
          users: results.data,
          success: true,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
