const kafka = require('../kafka/client');
var { auth, checkAuth } = require('../utils/passport');
const {
  ADD_POST,
  GET_POST,
  GET_POST_BY_PAGE,
  UPVOTE_POST,
  DOWNVOTE_POST,
  SORT_POST_BY_UPVOTE,
  SORT_POST_BY_DOWNVOTE,
  SORT_POST_BY_DATE,
  ADD_POST_TEXT,
  ADD_POST_IMAGE,
  ADD_POST_LINK,
  GET_POST_COMMUNITY,
  GET_POST_BY_ID,
  GET_POST_BY_COMMUNITY,
} = require('../kafka/topics');
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
  const data = {
    community_id: req.query.id,
    page: req.query.page,
    rows: req.query.rows,
  };
  const payload = data;
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

exports.updatePostUpvote = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
    page: req.body.page,
    rows: req.body.rows,
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
    page: req.body.page,
    rows: req.body.rows,
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

exports.sortPostByUpvote = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
    page: req.body.page,
    rows: req.body.rows,
  };
  const payload = data;
  kafka.make_request(SORT_POST_BY_UPVOTE, payload, (error, results) => {
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

exports.sortPostByDownvote = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
    page: req.body.page,
    rows: req.body.rows,
  };
  const payload = data;
  kafka.make_request(SORT_POST_BY_DOWNVOTE, payload, (error, results) => {
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

exports.sortPostByDate = async (req, res) => {
  const data = {
    id: req.body.id,
    user: req.body.user,
    page: req.body.page,
    rows: req.body.rows,
  };
  const payload = data;
  kafka.make_request(SORT_POST_BY_DATE, payload, (error, results) => {
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

exports.getPostById = async (req, res) => {
  const data = {
    post_id: req.query.id,
  };
  const payload = data;
  kafka.make_request(GET_POST_BY_ID, payload, (error, results) => {
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
exports.addPostText = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST_TEXT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.addPostImage = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST_IMAGE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      //  console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.addPostLink = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_POST_LINK, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.getPosts = async (req, res) => {
  // console.log("******getPosts backend controller********");

  const payload = { body: req.body };
  kafka.make_request(GET_POST, payload, (error, results) => {
    // console.log("******results********", results);

    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
        success: results.success,
        //role: results.role,
      });
    }
  });
};

exports.getPostbyID = async (req, res) => {
  console.log('******getPostbyID backend controller********');

  const payload = { body: req.body };

  kafka.make_request(GET_POST_BY_ID, payload, (error, results) => {
    console.log('******results********', results);
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        //role: results.role,
      });
    }
  });
};

exports.getPostCommunity = async (req, res) => {
  // console.log("******getPosts backend controller********");

  const payload = { body: req.body };
  kafka.make_request(GET_POST_COMMUNITY, payload, (error, results) => {
    // console.log("******results********", results);

    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
        success: results.success,
        //role: results.role,
      });
    }
  });
};

exports.getPostByCommunity = async (req, res) => {
  // console.log("******getPosts backend controller********");

  const payload = { body: req.body };
  kafka.make_request(GET_POST_BY_COMMUNITY, payload, (error, results) => {
    // console.log("******results********", results);

    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
        success: results.success,
        //role: results.role,
      });
    }
  });
};
