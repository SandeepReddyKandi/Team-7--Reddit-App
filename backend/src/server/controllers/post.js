const kafka = require('../kafka/client');
const {
  ADD_POST,
  GET_POST,
  GET_POST_BY_PAGE,
  UPVOTE_POST,
  DOWNVOTE_POST,
} = require('../kafka/topics');

exports.addPost = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getPost = async (req, res) => {
  const payload = { post_id: req.query.user };
  // console.log("******getPost backend controller********");
  kafka.make_request(GET_POST, payload, (error, results) => {
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

exports.getPostByPage = async (req, res) => {
  const data = {
    community_id: req.query.id,
    page: req.query.page,
    rows: req.query.rows,
  };
  const payload = data;
  // console.log("******getPost backend controller********");
  kafka.make_request(GET_POST_BY_PAGE, payload, (error, results) => {
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

exports.updatePostUpvote = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
  };
  const payload = data;
  // console.log("******getPost backend controller********");
  kafka.make_request(UPVOTE_POST, payload, (error, results) => {
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

exports.updatePostDownvote = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
  };
  const payload = data;
  // console.log("******getPost backend controller********");
  kafka.make_request(DOWNVOTE_POST, payload, (error, results) => {
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
