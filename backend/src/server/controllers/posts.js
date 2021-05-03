const kafka = require('../kafka/client');
const { ADD_POST_TEXT,ADD_POST_IMAGE,ADD_POST_LINK, GET_POST, GET_POST_BY_ID } = require('../kafka/topics');

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
          success: results.success
          //role: results.role,
        });
      }
    });
  };

  exports.getPostbyID = async (req, res) => {
    console.log("******getPostbyID backend controller********");

    const payload = { body: req.body };
    
    kafka.make_request(GET_POST_BY_ID, payload, (error, results) => {
      console.log("******results********", results);
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
  