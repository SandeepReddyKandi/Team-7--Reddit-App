const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const Validator = require("fastest-validator");
const { v4: uuid } = require("uuid");
const UserModel = require("../../models/UserModel");

const handle_request = async (req, callback) => {
  const registerSchema = {
    name: { type: "string", nullable: false },
    email: { type: "email", nullable: false },
    password: { type: "string", min: 6, nullable: false },
  };

  const v = new Validator();

  const registerCheck = v.compile(registerSchema);

  //check if inputs are proper
  const errors = registerCheck(req.body);

  if (errors.length) {
    //res.status(400).json({ msg: 'Validation errors', errors });
    callback(null, {
      msg: "Validation errors",
      errors,
      success: false,
    });
  } else {
    try {
      //check if user already exists in DB
      await UserModel.find({ email: req.body.email }, (err, docs) => {
        if (docs.length) {
          //return res.status(400).json({ msg: 'Email already registered!' });
          callback(null, {
            msg: "Email already exists.",
            success: false,
          });
        } else {
          //encrpyt password before insering into DB
          req.body.password = bcrypt.hashSync(req.body.password, salt);
          req.body.emailToken = uuid();

          //create new User instance
          const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });

          //register the new user
          newUser
            .save()
            .then(() => {
              const token = jwt.sign(
                { userId: newUser.id, email: newUser.email },
                `${process.env.JWT_SECRET}`,
                {
                  expiresIn: "4h",
                }
              );
              // res.cookie('authtkn', token, {
              //     maxAge: 1000 * 60 * 60 * 4,
              //     httpOnly: true,
              // });
              // res.status(200).json({
              //     msg: 'Registered successfully',
              //     userId: newUser.id,
              // });

              callback(null, {
                token,
                msg: "Registered successfully",
                userId: newUser.id,
                success: true,
              });
            })
            .catch((err) => {
              // res.status(400).json({ msg: err.message });
              callback(null, {
                msg: err.message,
                success: false,
              });
            });
        }
      });
    } catch (error) {
      //res.status(400).json({ msg: error.message });
      callback(null, {
        msg: error.message,
        success: false,
      });
    }
  }
};

exports.handle_request = handle_request;
