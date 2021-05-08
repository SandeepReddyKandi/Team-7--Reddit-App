const kafka = require('../kafka/client');
const { ADD_POST, GET_POST, GET_POST_BY_PAGE } = require('../kafka/topics');
var { auth, checkAuth } = require( '../utils/passport' )
auth(); 

exports.addPost = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getPost = async (req, res) => {
  const payload = { post_id: req.query.user };
  kafka.make_request(GET_POST, payload, (error, results) => {
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

exports.getPostByPage = async (req, res) => {
  const payload = { post_id: req.query.user };
  kafka.make_request(GET_POST_BY_PAGE, payload, (error, results) => {
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
