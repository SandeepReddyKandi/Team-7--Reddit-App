const kafka = require('../kafka/client');
const {
  ADD_COMMENT,
  GET_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  ADD_SUB_COMMENT,
} = require('../kafka/topics');
var { auth, checkAuth } = require('../utils/passport');
auth();

exports.addComment = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_COMMENT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getComment = async (req, res) => {
  const payload = { comment_id: req.query.id };
  kafka.make_request(GET_COMMENT, payload, (error, results) => {
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

exports.downvoteComment = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
  };
  const payload = data;
  // console.log("******getPost backend controller********");
  kafka.make_request(DOWNVOTE_COMMENT, payload, (error, results) => {
    // console.log("******results********", results);
    if (!results.success) {
      res.status(400).send(results);
    } else {
      //console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.upvoteComment = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
  };
  const payload = data;
  // console.log("******getPost backend controller********");
  kafka.make_request(UPVOTE_COMMENT, payload, (error, results) => {
    // console.log("******results********", results);
    if (!results.success) {
      res.status(400).send(results);
    } else {
      //console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.addSubComment = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_SUB_COMMENT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};
